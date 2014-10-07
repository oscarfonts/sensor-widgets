var require = (function() {
    "use strict";
    
    var scripts = document.getElementsByTagName('script');
    var CONFIG_LOCATION = scripts[scripts.length-1].src.replace(/[^\/]*$/, '');
    
    return {
        baseUrl: CONFIG_LOCATION + "js/",
        paths: {
            "text": "../lib/requirejs-text/text",
            "css": "../lib/requirejs-css/css",
            "daterangepicker": "../lib/daterangepicker/jquery.daterangepicker",
            "flot": "../lib/flot/jquery.flot",
            "flot-navigate": "../lib/flot/jquery.flot.navigate",
            "flot-resize": "../lib/flot/jquery.flot.resize",
            "flot-time": "../lib/flot/jquery.flot.time",
            "flot-tooltip": "../lib/flot.tooltip/jquery.flot.tooltip",
            "highcharts": "../lib/highcharts/highcharts",
            "highcharts-more": "../lib/highcharts/highcharts-more",
            "jquery": "../lib/jquery/jquery",
            "jquery-ui": "../lib/jquery-ui/jquery-ui",
            "jqgrid": "../lib/jqgrid/jquery.jqGrid",
            "jqgrid-locale-en": "../lib/jqgrid/grid.locale-en",
            "leaflet": "../lib/leaflet/leaflet",
            "leaflet-label": "../lib/Leaflet.label/leaflet.label",
            "moment": "../lib/moment/moment",
            "proj4leaflet": "../lib/proj4leaflet/proj4leaflet",
            "proj4": "../lib/proj4/proj4"
        },
        shim: {
            "daterangepicker": {
                deps: ["jquery", "moment", "css!../lib/daterangepicker/daterangepicker.css"]
            },
            "flot": {
                deps: ["jquery"]
            },
            "flot-navigate": {
                deps: ["flot"]
            },
            "flot-resize": {
                deps: ["flot"]
            },
            "flot-time": {
                deps: ["flot"]
            },
            "flot-tooltip": {
                deps: ["flot"]
            },
            "highcharts": {
                exports: "Highcharts",
                deps: ["jquery"]
            },
            "highcharts-more": {
                deps: ["highcharts"]
            },
            "jquery-ui": {
                deps: ["jquery", "css!../lib/jquery-ui/jquery-ui.css"]
            },
            "jqgrid": {
                deps: ["jquery-ui", "jqgrid-locale-en", "css!../lib/jqgrid/ui.jqgrid.css"]
            },
            "jqgrid-locale-en": {
                deps: ["jquery"]
            },
            "leaflet": {
                deps: ["css!../lib/leaflet/leaflet.css"]
            },
            "leaflet-label": {
                deps: ["leaflet", "css!../lib/Leaflet.label/leaflet.label.css"]
            },
            "proj4leaflet": {
                deps: ["leaflet", "proj4"]
            }
        }
    };
})();