/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['XML', 'errorhandler'], function(XML, errorhandler) {
    "use strict";

    var SOS = {
        _url: null,

        setUrl: function(url) {
            this._url = url;
        },

        getCapabilities: function(callback) {
            var request = {
                request: "GetCapabilities",
                sections: ["Contents"]
            };

            this._send(request, function(response) {
                callback(response.contents);
            });
        },

        describeSensor: function(procedure, callback) {
            var request = {
                request: "DescribeSensor",
                procedure: procedure,
                procedureDescriptionFormat: "http://www.opengis.net/sensorML/1.0.1"
            };

            this._send(request, function(response) {
                // Convert the SensorML description to a JSON object
                var description = response.procedureDescription.description;
                var json = XML.read(description, true);
                callback(json.SensorML.member);
            });
        },

        getFeatureOfInterest: function(procedure, callback) {
            var request = {
                request: "GetFeatureOfInterest",
                procedure: procedure
            };

            this._send(request, function(response) {
                callback(response.featureOfInterest);
            });
        },

        getDataAvailability: function(procedures, features, properties, callback) {
            var request = {
                request: "GetDataAvailability"
            };
            if (procedures != false) {
                request.procedure = procedures;
            }
            if (features != false) {
                request.featureOfInterest = features;
            }
            if (properties != false) {
                request.observedProperty = properties;
            }

            this._send(request, function(response) {
                callback(response.dataAvailability);
            });
        },

        getObservation: function(offering, features, properties, time, callback) {
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
            });
        },

        _send: function(request, callback) {
            request.service = "SOS";
            request.version = "2.0.0";

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var response = JSON.parse(xhr.responseText);
                        callback.call(this, response);
                    } else {
                        console.error("Error accessing " + this._url);
                        errorhandler.throwError("Server " + this._url + " does not seem to respond");
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
