/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'css!widget/progressbar.css'], function(SOS, drawing) {

	var inputs = ["service", "offering", "feature", "property", "min_value", "max_value", "refresh_interval"];

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			var contents = '<div class="widget">';
			contents += '<h1 id="feature_name"></h1><h3 id="property_name"></h3>';
			contents += '<div class="progress"><span id="bar" class="blue"><div id="value"></div></span><div id="min">0</div><div id="max">100</div></div>';
			contents += '<h3 id="date"></h3></div>';
			renderTo.innerHTML = contents;

			document.getElementById("min").innerHTML = config.min_value;
			document.getElementById("max").innerHTML = config.max_value;

			SOS.setUrl(config.service);
			setInterval(read, config.refresh_interval * 1000);
			read();

			function read() {
				SOS.getObservation(config.offering, [config.feature], [config.property], "latest", draw);
			};

			function draw(observations) {
				if (observations.length == 1// Single observation
				&& typeof observations[0].result.value == 'number') {// Value is numeric

					var obs = observations[0], foi_name = obs.featureOfInterest.name.value, date = obs.resultTime, // TODO cast to date object, &c.
					value = obs.result.value, procedure = obs.procedure;

					var width = 100 * (value - config.min_value) / (config.max_value - config.min_value);

					document.getElementById("feature_name").innerHTML = foi_name;
					document.getElementById("date").innerHTML = date;
					document.getElementById("value").innerHTML = value;
					document.getElementById("bar").style = "width: " + width + "%";

					SOS.describeSensor(obs.procedure, function(description) {
						var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
						for (var i in properties) {
							var property = properties[i];
							if (property.Quantity.definition == config.property) {
								document.getElementById("property_name").innerHTML = property.name;
							}
						}
					});
				} else {
					console.error("Progress Widget Error - Got an invalid observation from the SOS service");
				}
			};
		}
	};
});
