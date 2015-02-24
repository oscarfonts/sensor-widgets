/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(function() {
    "use strict";
    
    function init(config, renderTo) {
        if (!renderTo) {
            renderTo = document.body;
        }

        if (config && config.name) {
            if (!config.service) {
                config.service = '/52n-sos/sos/json';
            }
            require(["widget/" + config.name], function(widget) {
                if (checkConfig(widget.inputs, config)) {
                    console.info("Creating " + config.name + " widget from given parameters.");
                    widget.init(config, renderTo);
                } else {
                	//TODO: error handling
                    console.warn("Widget '" + config.name + "' exists, but some mandatory parameters missing.");
                }
            }, function(error) {
            	//TODO: error handling
            	console.error("Widget '" + config.name + "' cannot be found.");
            });
        } else {
        	//TODO: error handling
        	console.info("No widget name specified.");
        }

    }

    function getParams() {
        function str2obj(search) {
            var obj = {};
            var arr = search.split("&");
            for (var i = 0; i < arr.length; i++) {
                var keyval = arr[i].split("=");
                obj[keyval[0]] = decodeURIComponent(keyval[1]);
            }
            return obj;
        }

        var search = window.location.search.substr(1);
        return search !== null && search !== "" ? str2obj(search) : null;
    }

    function checkConfig(inputs, config) {
        var missing = [];
        
        for (var i in inputs) {
            var input = inputs[i];
            if (!config.hasOwnProperty(input)) {
                missing.push(input);
            }
        }
        if (missing.length) {
            console.warn("The following parameters are mandatory: " + missing.join(", "));
        }
        return !missing.length;
    }

    init(getParams());

});
