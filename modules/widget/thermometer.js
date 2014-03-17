/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'text!svg/thermometer.svg'], function(SOS, drawing) {

	var inputs = ["service", "offering", "feature", "property", "refresh_interval"];
	var dy = 3.342574;
	var y_max = 206.34359+267.40595;
	var t_min = -24;
	var t_max = 56;

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			var contents = '<div class="widget">';
			contents += '<h1 id="feature_name"></h1><h2 id="property_name"></h2>';
			contents += drawing;
			contents += '<h1><span id="value"></span>º</h1><h3 id="date"></h3></div>';
			renderTo.innerHTML = contents;

			var clip = document.getElementById("temp").firstChild;

			SOS.setUrl(config.service);
			setInterval(read, config.refresh_interval * 1000);
			read();

			function read() {
				SOS.getObservation(config.offering, [config.feature], [config.property], "latest", draw);
			};

			function draw(observations) {
				if (observations.length == 1// Single observation
				&& observations[0].result.uom == 'Cel'// UoM is celsius
				&& typeof observations[0].result.value == 'number') {// Value is numeric

					var obs = observations[0], foi_name = obs.featureOfInterest.name.value, date = obs.resultTime, // TODO cast to date object, &c.
					value = obs.result.value, procedure = obs.procedure;

					var h = dy * (value - t_min);
					var y_min = y_max - h;

					document.getElementById("feature_name").innerHTML = foi_name;
					document.getElementById("date").innerHTML = date;
					document.getElementById("value").innerHTML = value;
					clip.setAttribute("height", h);
					clip.setAttribute("y", y_min);

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
					console.error("Thermometer Widget Error - Got an invalid observation from the SOS service");
				}
			};
		}
	};
});
