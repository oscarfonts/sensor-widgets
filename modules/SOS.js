/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['XML'], function(XML) {

	SOS = {
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
			if (procedures) {
				request["procedures"] = procedures;
			}
			if (features) {
				request["features"] = features;
			}
			if (properties) {
				request["properties"] = properties;
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
				request["offering"] = offering;
			}

			if (features && features.length) {
				request["featureOfInterest"] = features;
			}

			if (properties && properties.length) {
				request["observedProperty"] = properties;
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
				filter = {};
				filter[operation] = {
					"ref": "om:phenomenonTime",
					"value": time
				};
				request["temporalFilter"] = [filter];
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
						// TODO better error handling
						alert("Error accessing " + this._url);
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
