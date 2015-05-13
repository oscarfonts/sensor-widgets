define(['errorhandler'], function(errorhandler) {
    "use strict";

    return function(name, config, renderTo) {
        if (name && config) {
            if (!renderTo) {
                renderTo = document.body;
            }

            if (!config.service) {
                config.service = '/52n-sos/sos/json';
            }

            require(["widget/" + name], function(widget) {
                if (checkConfig(widget.inputs, config)) {
                    console.debug("Creating " + name + " widget from given parameters.");
                    widget.init(config, renderTo);
                    return widget;
                } else {
                	errorhandler.throwWidgetError("Widget '" + name + "' exists, but some mandatory parameters missing.");
                }
            }, function() {
            	errorhandler.throwWidgetError("Widget '" + name + "' cannot be found.");
            });

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
                    function relPathToAbs(sRelPath) {
                        var nUpLn, sDir = "", sPath = location.pathname.replace(/[^\/]*$/, sRelPath.replace(/(\/|^)(?:\.?\/+)+/g, "$1"));
                        for (var nEnd, nStart = 0; nEnd = sPath.indexOf("/../", nStart), nEnd > -1; nStart = nEnd + nUpLn) {
                            nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
                            sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((nUpLn - 1) / 3) + "}$"), "/");
                            }
                        return sDir + sPath.substr(nStart);
                    }
                    var url = window.location.origin +relPathToAbs(require.toUrl("../widget/")) + "?";
                    url += "name="+ encodeURIComponent(name)+"&";
                    url += Object.keys(config).map(function(key) {
                        if(typeof config[key] === 'object') {
                            config[key] = JSON.stringify(config[key]);
                        }
                        return key + "=" + encodeURIComponent(config[key]);
                    }).join("&");
                    return url;
                },
                iframe: function(w, h) {
                    w = w ? w : "100%";
                    h = h ? h : "100%";
                    return '<iframe src="'+this.url()+'" width="'+w+'" height="'+h+'" frameBorder="0"></iframe>';
                },
                javascript: function() {
                    var code_sample = "SensorWidget('"+name+"', " + JSON.stringify(config, null, 3) + ",\r\ndocument.getElementById('"+name+"-container'));\r\n";
                    return "require(['SensorWidget'], function(SensorWidget) {\r\n" + code_sample.indent(3) + "});";
                }
            };
        } else {
        	errorhandler.throwWidgetError("No widget name specified.");
        }
    };

    function checkConfig(inputs, config) {
        var missing = [];

        for (var i in inputs) {
            var input = inputs[i];
            if (!config.hasOwnProperty(input)) {
                missing.push(input);
            }
        }
        if (missing.length) {
        	errorhandler.throwWidgetError("The following parameters are mandatory: " + missing.join(", "));
        }
        return !missing.length;
    }


});
