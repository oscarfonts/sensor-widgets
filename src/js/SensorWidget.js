import i18n from './i18n';
import './SensorWidgets.css';

var instances = {};
var uid = function (i) {
    return function () {
        return 'SensorWidgetTarget-' + (++i);
    };
}(0);

export default function(name, config, renderTo) {
    if (!renderTo) {
        renderTo = document.body;
    }

    function errorHandler(message, url, request) {
        var text = "";
        if (url){
            text = "[" + url + "] ";
        }
        if (request && request.request) {
            text += request.request + ": ";
        }
        if (message) {
            text += message;
        }
        renderTo.innerHTML = '<div class="text-danger">' + text + '</div>';
    }

    function checkConfig(name, inputs, config) {
        var missing = [];

        for (var i in inputs) {
            var input = inputs[i];
            if (!config.hasOwnProperty(input)) {
                missing.push(input);
            }
        }
        if (missing.length) {
            errorHandler(i18n.t("The '{name}' widget is missing some mandatory parameters: ", {name: name}) + missing.join(", "));
        }
        return !missing.length;
    }

    if (name && config) {
        if(!renderTo.id) renderTo.id = uid();

        if (!config.service) {
            config.service = '/52n-sos/sos/json';
        }

        import(/* webpackChunkName: "widget-[request]" */ `./widget/${name}.js`)
            .then(({default: widget}) => {
                renderTo.innerHTML = "";
                if (instances.hasOwnProperty(renderTo.id) && instances[renderTo.id] && instances[renderTo.id].hasOwnProperty("destroy")) {
                    console.debug("Destroying previous widget on ElementId=" + renderTo.id);
                    instances[renderTo.id].destroy();
                    delete instances[renderTo.id];
                }
                if (checkConfig(name, widget.inputs, config)) {
                    console.debug("Creating new " + name + " widget on ElementId=" + renderTo.id);
                    instances[renderTo.id] = widget.init(config, renderTo, errorHandler);
                }
            }).catch(cause => {
                console.error(cause);
                errorHandler(i18n.t("Widget '{name}' cannot be found, or there was an error instantiating it", {name: name}));
            });
    } else if (!name) {
        errorHandler(i18n.t("No widget name specified"));
    }
    return {
        name: name,
        config: config,
        renderTo: renderTo,
        inspect: function(cb) {
            import(/* webpackChunkName: "widget-[request]" */ `./widget/${name}.js`)
                .then(({default: widget}) => {
                    cb.call(this, widget.inputs, widget.optional_inputs, widget.preferredSizes);
            });
        },
        url: function() {
            function relPathToAbs(pathname) {
                var output = [];
                pathname.replace(/^(\.\.?(\/|$))+/, "")
                        .replace(/\/(\.(\/|$))+/g, "/")
                        .replace(/\/\.\.$/, "/../")
                        .replace(/\/?[^\/]*/g, function (p) {
                          if (p === "/..") {
                            output.pop();
                          } else {
                            output.push(p);
                          }
                        });
                return output.join("").replace(/^\//, pathname.charAt(0) === "/" ? "/" : "");
            }
            var url = relPathToAbs("../widget/") + "?";
            url += "name="+ encodeURIComponent(name)+"&";
            url += Object.keys(config).map(function(key) {
                var val = config[key];
                if (typeof config[key] === 'object') {
                    val = JSON.stringify(config[key]);
                }
                return key + "=" + encodeURIComponent(val);
            }).join("&");
            url += "&lang="+i18n.getLang();
            return url;
        },
        iframe: function(w, h) {
            w = w ? w : "100%";
            h = h ? h : "100%";
            return '<iframe src="'+this.url()+'" width="'+w+'" height="'+h+'" frameBorder="0"></iframe>';
        },
        javascript: function() {
            return "SensorWidget('"+name+"', " + JSON.stringify(config, null, 3) + ", document.getElementById('"+name+"-container'));";
        }
    };
};
