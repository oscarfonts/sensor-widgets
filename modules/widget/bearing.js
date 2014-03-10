/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'text!svg/bearing.svg'], function(SOS, drawing) {
	
	var inputs = {
		title: [false, false],
		service: [true, false],
		offering: [true, false],
		features: [true, false],
		properties: [true, false],
		refresh_interval: [true, false]
	};

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			var contents = config.title ? "<h1>" + config.title + "</h1>" : "";
			contents += '<h2 id="feature"></h2><h1><span id="value"></span> º</h1><h3 id="date"></h3>';
			contents += drawing;
			renderTo.innerHTML = contents;
			
			var arrow = document.getElementById("arrow"),
				shadow = document.getElementById("shadow");
	
	        SOS.setUrl(config.service);
	        setInterval(read, config.refresh_interval * 1000);
	        read();
	
	        function read() {
	            SOS.getObservation(config.offering, config.features, config.properties, "latest", draw);
	        };
	
	        function draw(observations) {
	        	if (observations.length == 1                                  // Single observation
	        			&& observations[0].result.uom == 'deg'                // UoM is degrees
	        			&& typeof observations[0].result.value == 'number') { // Value is numeric
	
	        		var obs = observations[0],
	        			foi_name = obs.featureOfInterest.name.value,
	        			date = obs.resultTime, // TODO cast to date object, &c.
	        			value = obs.result.value;
					
					document.getElementById("feature").innerHTML = foi_name;
					document.getElementById("date").innerHTML = date;
					document.getElementById("value").innerHTML = value;
					arrow.setAttribute("transform", "rotate("+value+", 256, 256)");
					shadow.setAttribute("transform", "translate(5, 5) rotate("+value+", 256, 256)");
	        		
	    		} else {
					console.error("Bearing Widget Error - Got an invalid observation from the SOS service");    			
	    		}
	        };
        }
	};
});
