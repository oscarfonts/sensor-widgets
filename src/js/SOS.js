/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['XML'], function(XML) {
    "use strict";

    var SOS = {
        _url: null,

        setUrl: function(url) {
            this._url = url;
        },

        getCapabilities: function(callback, errorHandler) {
            var request = {
                request: "GetCapabilities",
                sections: ["Contents"]
            };

            this._send(request, function(response) {
                callback(response.contents);
            }, errorHandler);
        },

        describeSensor: function(procedure, callback, errorHandler) {
            var request = {
                request: "DescribeSensor",
                procedure: procedure,
                procedureDescriptionFormat: "http://www.opengis.net/sensorML/1.0.1"
            };

            this._send(request, function(response) {
                // Convert the SensorML description to a JSON object
                var description = response.procedureDescription.hasOwnProperty("description") ?
                        response.procedureDescription.description : response.procedureDescription;
                var json = XML.read(description, true);
                callback(json.SensorML.member);
            }, errorHandler);
        },

        getFeatureOfInterest: function(procedure, callback, errorHandler) {
            var request = {
                request: "GetFeatureOfInterest",
                procedure: procedure
            };

            this._send(request, function(response) {
                callback(response.featureOfInterest);
            }, errorHandler);
        },

        getDataAvailability: function(procedure, features, properties, callback, errorHandler) {
            var request = {
                request: "GetDataAvailability"
            };
            if (procedure) {
                request.procedure = procedure;
            }
            if (features && features.length) {
                request.featureOfInterest = features;
            }
            if (properties && properties.length) {
                request.observedProperty = properties;
            }

            this._send(request, function(response) {
                callback(response.dataAvailability);
            }, errorHandler);
        },

        getObservation: function(offering, features, properties, time, callback, errorHandler) {
            var request = {
                "request": "GetObservation"
            };

            if (offering) {
                request.offering = offering;
            }

            if (features && features.length) {
                request.featureOfInterest = features;
            }

            if (properties && properties.length) {
                request.observedProperty = properties;
            }

            if (time) {
                var operation;
                if (time.length && time.length == 2) {
                    // Time Range
                    operation = "during";
                } else {
                    // Time Instant
                    operation = "equals";
                }
                var filter = {};
                filter[operation] = {
                    "ref": "om:resultTime",
                    "value": time
                };
                request.temporalFilter = [filter];
            }

            this._send(request, function(response) {
                callback(response.observations);
            }, errorHandler);
        },

        _send: function(request, onSuccess, onError) {
            request.service = "SOS";
            request.version = "2.0.0";

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var response = xhr.responseText;
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        // OK, not JSON
                    }
                    if (xhr.status == 200) {
                        onSuccess.call(this, response);
                    } else {
                        var e = {
                            status: xhr.statusText,
                            url: this._url,
                            request: request,
                            response: response
                        };
                        console.log(e);
                        if (onError) {
                            onError.call(this, e.status, e.url, e.request, e.response);
                        }
                    }
                }
            }.bind(this);

            xhr.open("POST", this._url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(request));
        }
    };

    return SOS;
});
