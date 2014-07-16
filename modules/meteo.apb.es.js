/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['widget/bearing', 'widget/thermometer', 'widget/timechart-flot', 'widget/windrose', 'widget/table-plain'],
	function(bearing, thermometer, timechart, windrose, table) {

	var defs = {
		service: function() {
			return "http://sensors.portdebarcelona.cat/sos/json";
		},
		offering: function(p) {
			return "http://sensors.portdebarcelona.cat/def/weather/offerings#" + p;
		},
		feature: function(p) {
			return "http://sensors.portdebarcelona.cat/def/weather/features#" + p;
		},
		property: function(p) {
			return "http://sensors.portdebarcelona.cat/def/weather/properties#" + p;
		},
	};

	var now = new Date();
	var a_day_ago = new Date(now.getTime() - 1000*60*60*24);
	var back_33_samples = new Date(now.getTime() - 1000*60*60*17);
	var three_hours_ago = new Date(now.getTime() - 1000*60*60*3);

	bearing.init({
		service: defs.service(),
		offering: defs.offering("10m"),
		feature: defs.feature("02"),
		property: defs.property("31"),
		refresh_interval: 15
	}, document.querySelector(".sirena .bearing"));

	thermometer.init({
		service: defs.service(),
		offering: defs.offering("10m"),
		feature: defs.feature("02"),
		property: defs.property("32"),
		refresh_interval: 15
	}, document.querySelector(".sirena .thermometer"));

	timechart.init({
		title: "Velocitat Vent",
		service: defs.service(),
		offering: defs.offering("30m"),
		features: [defs.feature("02")],
		properties: [defs.property("30M"), defs.property("30")],
		time_start: a_day_ago.toISOString().substring(0,19)+"Z",
		time_end: now.toISOString().substring(0,19)+"Z"
	}, document.querySelector(".sirena .timechart"));

	windrose.init({
		title: "Rosa vents últimes 3h",
		subtitle: "Sirena, mostres 10-minutals",
		service: defs.service(),
		offering: defs.offering("10m"),
		feature: defs.feature("02"),
		properties: [defs.property("30"), defs.property("31")],
		time_start: three_hours_ago.toISOString().substring(0,19)+"Z",
		time_end: now.toISOString().substring(0,19)+"Z",
		refresh_interval: 600 // TODO Doesn't make sense with fixed time_start and time_end
	}, document.querySelector(".sirena .windrose"));

	table.init({
		title: "Data Table",
		service: defs.service(),
		offering: defs.offering("30m"),
		feature: defs.feature("02"),
		properties: [
			defs.property("30"), defs.property("30M"), defs.property("31"),
			defs.property("32"), defs.property("33"), defs.property("35"),
			defs.property("36"), defs.property("34")],
		time_start: back_33_samples.toISOString().substring(0,19)+"Z",
		time_end: now.toISOString().substring(0,19)+"Z"
	}, document.querySelector(".sirena .tablex"));
});
