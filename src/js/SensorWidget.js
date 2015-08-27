define(['i18n'], function(i18n) {
    "use strict";

    var instances = {};
    var uid = function (i) {
        return function () {
            return 'SensorWidgetTarget-' + (++i);
        };
    }(0);

    function indent(str, spaces) {
        return str.replace(/^(?=.)/gm, new Array(spaces + 1).join(' '));
    }

    return function(name, config, renderTo) {
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

            require(["widget/" + name], function (widget) {
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
            }, function () {
                errorHandler(i18n.t("Widget '{name}' cannot be found", {name: name}));
            });
        } else if (!name) {
            errorHandler(i18n.t("No widget name specified"));
        }
        return {
            name: name,
            config: config,
            renderTo: renderTo,
            inspect: function(cb) {
                require(['widget/'+name], function(widget) {
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
                var url = relPathToAbs(require.toUrl("../widget/")) + "?";
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
                var code_sample = "SensorWidget('"+name+"', " + JSON.stringify(config, null, 3) + ",\r\ndocument.getElementById('"+name+"-container'));\r\n";
                return "require(['SensorWidget'], function(SensorWidget) {\r\n" + indent(code_sample, 3) + "});";
            }
        };
    };

});
