/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS'], function(SOS) {

	function setup() {

        var config = {
        	url: "http://localhost:8080/52n-sos/sos/json",
        	offering: "http://sensors.portdebarcelona.cat/def/weather/offerings#1m",
        	feature: "http://sensors.portdebarcelona.cat/def/weather/features#P7",
        	property: "http://sensors.portdebarcelona.cat/def/weather/properties#31"
        }
        SOS.setUrl(config.url);

		var svg = document.getElementById("svgembed").getSVGDocument();
		var arrow = svg.getElementById("arrow");
		var shadow = svg.getElementById("shadow");

        get();
        setInterval(get, 60000);

        function get() {
        	// TODO get LAST observation
            SOS.getObservation(config.offering, [config.feature], [config.property], draw);
        };

        function draw(data) {
        	// TODO: Check that it is a single, "deg", quantity
        	angle = data.pop().result.value;
			arrow.setAttribute("transform", "rotate("+angle+", 256, 256)");
			shadow.setAttribute("transform", "translate(5,5) rotate("+angle+", 256, 256)");
        };

		/*
		var angle = 0;
        window.setInterval(function() {
        	angle = (angle + 1) % 360;
			arrow.setAttribute("transform", "rotate("+angle+", 256, 256)");
			shadow.setAttribute("transform", "translate(5,5) rotate("+angle+", 256, 256)");
    	}, 25);
		*/
	};

	setup();

});
