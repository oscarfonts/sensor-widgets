/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'css!widget/table.css'], function(SOS) {

	var inputs = ["service", "offering", "features", "properties", "time_start", "time_end"];

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			var contents = config.title ? "<h3>" + config.title + "</h3>" : "";
			renderTo.innerHTML = contents;

			SOS.setUrl(config.service);
			read();

			function read() {
				var features = isArray(config.features) ? config.features : JSON.parse(config.features);
				var properties = isArray(config.properties) ? config.properties : JSON.parse(config.properties);
				var time_range = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : null;
				SOS.getObservation(config.offering, features, properties, time_range, draw);
			};

			function isArray(obj) {
				return Object.prototype.toString.call(obj) === '[object Array]';
			}

			function draw(observations) {
				function d(n) {
					return n < 10 ? "0" + n : "" + n;
				};

				// Get tabular data from observations
				var rows = [];
				for (i in observations) {
					var obs = observations[i];
					var time = new Date(obs.resultTime);
					time = time.getUTCFullYear() + "/" + d(time.getUTCMonth() + 1) + "/" + d(time.getUTCDate()) + " " + d(time.getUTCHours()) + ":" + d(time.getUTCMinutes()) + ":" + d(time.getUTCSeconds());

					var result = obs.result;

					rows.push({
						feature: obs.featureOfInterest.identifier["value"], // featureNames[obs.featureOfInterest.identifier["value"]],
						property: obs.observableProperty, // propertyNames[obs.observableProperty],
						time: time,
						value: result.hasOwnProperty("value") ? result.value : result,
						uom: result.hasOwnProperty("uom") ? result.uom : "(N/A)"
					});
				}

				// Render data as HTML table
				var table = "<table class='results'>" + "<th>Feature</th><th>Property</th><th>Time</th><th>Value</th><th>UoM</th>";
				for (var i in rows) {
					var tr = "";
					for (var key in rows[i]) {
						tr += "<td>" + rows[i][key] + "</td>";
					}
					table += "<tr>" + tr + "</tr>";
				}
				table += "</table>";

				var title = config.title ? "<h3>" + config.title + "</h3>" : "";
				renderTo.innerHTML = title + table;
			};
		}
	};

});
