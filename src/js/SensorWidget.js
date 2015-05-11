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
