/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'graph'], function(SOS) {

	var inputs = ["title", "service", "offering", "features", "properties", "time_start", "time_end"];
	var propertyNames = null;

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			SOS.setUrl(config.service);
			read();

			function read() {
				var features = isArray(config.features) ? config.features : JSON.parse(config.features);
				var properties = isArray(config.properties) ? config.properties : JSON.parse(config.properties);
				var time_range = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : null;
				SOS.getObservation(config.offering, features, properties, time_range, draw);
			}

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
						time: time,
						feature: obs.featureOfInterest.name.value,
						property: obs.observableProperty,
						value: result.hasOwnProperty("value") ? result.value : result,
						uom: result.hasOwnProperty("uom") ? result.uom : "(N/A)"
					});
				}

				if (propertyNames) {
					createChart(rows);
				} else if (observations.length) {
					getPropertyNames(observations[0].procedure, rows);
				}
			};

			function getPropertyNames(procedure, rows) {
				SOS.describeSensor(procedure, function(description) {
					var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
					properties = properties instanceof Array ? properties : [properties];
					var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];
					propertyNames = [];

					for (i in properties) {
						var property = properties[i];
						for (i in types) {
							var type = types[i];
							if (property.hasOwnProperty(type)) {
								property.id = property[type].definition;
							}
						}
						propertyNames[property.id] = property.name;
					}
					createChart(rows);
				});
			};

			function createChart(rows) {
				var series = {};
				for (var i in rows) {
					var row = rows[i];
					var label = propertyNames[row.property] + " (" + row.feature + ")";
					if (!series[label]) {
						series[label] = { data: [] };
					}
					series[label].data.push({
						date: new Date(row.time),
						value: row.value
					});
				}

				var data = [];
				for (var key in series) {
					series[key].label = key;
					data.push(series[key]);
				};

				for (var s in data) {
					var series = data[s];
					series.data.sort(function(a, b) {
						return b.date - a.date;
					});
				}

				var options = {
					"width": "100%",
					"bottom": "0",
					"overflow": "hidden",
					"legend" : {
						"visible": false
					}
				};

				// Widget contents
				var contents = '<div class="timechart widget">';
				contents += config.title ? '<h3 class="title">' + config.title + '</h3>' : "";
				contents += "<div class='graph'></div>";
				contents += '</div>';
				renderTo.innerHTML = contents;

				var graph = new links.Graph(renderTo.querySelector('.graph'));
				graph.draw(data, options);

				// TODO on resize...

			}
		}
	};

});
