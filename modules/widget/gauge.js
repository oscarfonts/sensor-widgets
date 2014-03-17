/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'text!svg/gauge.svg'], function(SOS, drawing) {

	var inputs = ["service", "offering", "feature", "property", "refresh_interval"];

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			renderTo.innerHTML = '<div class="widget">' + drawing;

			var arrow = document.getElementById("arrow");

			SOS.setUrl(config.service);
			setInterval(read, config.refresh_interval * 1000);
			read();

			function read() {
				SOS.getObservation(config.offering, [config.feature], [config.property], "latest", draw);
			};

			function draw(observations) {
				if (observations.length == 1// Single observation
				&& observations[0].result.uom == '%'// UoM is percent
				&& typeof observations[0].result.value == 'number') {// Value is numeric

					var obs = observations[0], foi_name = obs.featureOfInterest.name.value, date = obs.resultTime, // TODO cast to date object, &c.
					value = obs.result.value, procedure = obs.procedure;

					document.getElementById("value").innerHTML = value + " %";
					var angle = 2.7 * value;
					arrow.setAttribute("transform", "rotate(" + angle + ", 365.396, 495)");

					SOS.describeSensor(obs.procedure, function(description) {
						var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
						for (var i in properties) {
							var property = properties[i];
							if (property.Quantity.definition == config.property) {
								document.getElementById("title").innerHTML = property.name;
							}
						}
					});
				} else {
					console.error("Gauge Widget Error - Got an invalid observation from the SOS service");
				}
			};
		}
	};
});
