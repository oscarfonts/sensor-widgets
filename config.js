var require = (function() {
	var scripts = document.getElementsByTagName('script');
	var BASE = scripts[scripts.length-1].src.replace(/[^\/]*$/, '');
	var LIB_PATH = BASE + "lib/";
	return {
		baseUrl: BASE + "modules/",
		paths: {
			"examples": BASE + "../examples",
			"text": LIB_PATH + "text-2.0.10",
			"css": LIB_PATH + "css",
			"jquery": LIB_PATH + "jquery-2.1.0.min",
			"jquery-ui": LIB_PATH + "jquery-ui-1.10.4.custom.min",
			"flot": LIB_PATH + "flot-0.8.3",
			"flot-time": LIB_PATH + "flot-time",
			"flot-resize": LIB_PATH + "flot-resize",
			"flot-navigate": LIB_PATH + "flot-navigate",
			"flot-tooltip": LIB_PATH + "flot-tooltip-0.7.1",
			"highcharts":  LIB_PATH + "highcharts-4.0.3",
			"highcharts-more":  LIB_PATH + "highcharts-more-4.0.3",
			"jqgrid": LIB_PATH + "jqGrid-4.6.0.min",
			"jqgrid-locale-en": LIB_PATH + "jqGrid.locale-en",
			"moment": LIB_PATH + "moment-2.0.0.min",
			"daterangepicker": LIB_PATH + "daterangepicker-1.2",
			"leaflet": LIB_PATH + "leaflet-0.7.3",
			"proj4leaflet": LIB_PATH + "proj4leaflet",
			"proj4": LIB_PATH + "proj4.min",
			"leaflet-label": LIB_PATH + "leaflet-label-0.2.1.min"
		},
		shim: {
			"daterangepicker": {
				deps: ["jquery", "moment"]
			},
			"jquery-ui": {
				deps: ["jquery", "css!../css/jquery-ui-1.10.4.custom.min.css"]
			},
			"jqgrid": {
				deps: ["jqgrid-locale-en", "jquery-ui", "css!../css/ui.jqgrid.css"]
			},
			"jqgrid-locale-en": {
				deps: ["jquery"]
			},
			"flot-time": {
				deps: ["flot"]
			},
			"flot-navigate": {
				deps: ["flot"]
			},
			"flot-resize": {
				deps: ["flot"]
			},
			"flot-tooltip": {
				deps: ["flot"]
			},
			"flot": {
				deps: ["jquery"]
			},
			"highcharts": {
				exports: "Highcharts",
				deps: ["jquery"]
			},
			"highcharts-more": {
				deps: ["highcharts"]
			},
			"proj4leaflet": {
				deps: ["leaflet", "proj4"]
			},
			"leaflet": {
				deps: ["css!../css/leaflet.css"]
			},
			"leaflet-label": {
				deps: ["leaflet", "css!../css/leaflet.label.css"]
			}
		}
	};
})();
