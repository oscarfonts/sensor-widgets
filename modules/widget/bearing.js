/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'text!svg/bearing.svg'], function(SOS, drawing) {

	var inputs = ["service", "offering", "feature", "property", "refresh_interval"];

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			var contents = '<div class="bearing widget">';
			contents += '<h1 class="feature_name"></h1>';
			contents += drawing;
			contents += '<h2><span class="property_name"></span>:<br/><span class="result_value"></span> deg</h2>';
			contents += '<h3>Request time:<br/><span class="request_time"></span></h3>';
			contents += '<h3>Result time:<br/><span class="result_time"></span></h3>';
			contents += '</div>';
			renderTo.innerHTML = contents;

			var arrow = renderTo.querySelector(".arrow");
			var shadow = renderTo.querySelector(".shadow");

			SOS.setUrl(config.service);
			setInterval(read, config.refresh_interval * 1000);
			read();

			function read() {
				SOS.getObservation(config.offering, [config.feature], [config.property], "latest", draw);
			};

			function draw(observations) {
				if (observations.length == 1 // Single observation
				&& observations[0].result.uom == 'deg' // UoM is degrees
				&& typeof observations[0].result.value == 'number') { // Value is numeric

					var obs = observations[0];
					var foi_name = obs.featureOfInterest.name.value;
					var date = new Date(obs.resultTime);
					var value = obs.result.value;
					var procedure = obs.procedure;

					renderTo.querySelector(".feature_name").innerHTML = foi_name;
					renderTo.querySelector(".request_time").innerHTML = (new Date()).toLocaleString();
					renderTo.querySelector(".result_time").innerHTML = date.toLocaleString();
					renderTo.querySelector(".result_value").innerHTML = value;
					arrow.setAttribute("transform", "rotate(" + value + ", 256, 256)");
					shadow.setAttribute("transform", "translate(5, 5) rotate(" + value + ", 256, 256)");

					SOS.describeSensor(obs.procedure, function(description) {
						var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
						for (var i in properties) {
							var property = properties[i];
							if (property.Quantity.definition == config.property) {
								renderTo.querySelector(".property_name").innerHTML = property.name;
							}
						}
					});
				} else {
					console.error("Bearing Widget Error - Got an invalid observation from the SOS service");
				}
			};
		}
	};
});
