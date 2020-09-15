/*
require.config({
    waitSeconds: 30,
    baseUrl: '../js',
    paths: {
        'text': '../lib/requirejs-text/text',
        'bootstrap': '../lib/bootstrap/bootstrap.amd',
        'daterangepicker': '../lib/bootstrap-daterangepicker/daterangepicker',
        'flot': '../lib/flot/jquery.flot.amd',
        'flot-navigate': '../lib/flot/jquery.flot.navigate.amd',
        'flot-resize': '../lib/flot/jquery.flot.resize.amd',
        'flot-time': '../lib/flot/jquery.flot.time.amd',
        'flot-tooltip': '../lib/flot.tooltip/jquery.flot.tooltip.amd',
        'highcharts': '../lib/highcharts/highcharts',
        'highcharts-more': '../lib/highcharts/highcharts-more',
        'highlight': '../lib/highlightjs/highlight.pack',
        'jquery': '../lib/jquery/jquery',
        'jquery-ui': '../lib/jquery-ui/jquery-ui',
        'jqgrid': '../lib/jqgrid/jquery.jqGrid.amd',
        'jqgrid-locale-en': '../lib/jqgrid/grid.locale-en.amd',
        'leaflet': '../lib/leaflet/leaflet',
        'leaflet-cluster': '../lib/leaflet.markercluster/leaflet.markercluster',
        'leaflet-label': '../lib/Leaflet.label/leaflet.label',
        'moment': '../lib/moment/moment',
        'moment-es': '../lib/moment/locale/es',
        'moment-ca': '../lib/moment/locale/ca'
    },
    map: {
        "*": {
            "jquery": "jquery-noconflict"
        },
        "jquery-noconflict": {
            "jquery": "jquery"
        }
    },
    shim: {
        'daterangepicker': {
            deps: ['bootstrap', 'moment-es', 'moment-ca', 'jquery', 'css!../lib/bootstrap-daterangepicker/daterangepicker-bs3.css']
        },
        'flot': {
            deps: ['jquery']
        },
        'flot-navigate': {
            deps: ['flot']
        },
        'flot-resize': {
            deps: ['flot']
        },
        'flot-time': {
            deps: ['flot']
        },
        'flot-tooltip': {
            deps: ['flot']
        },
        'highcharts': {
            exports: 'Highcharts'
        },
        'highcharts-more': {
            deps: ['highcharts']
        },
        'highlight': {
            deps: ['css!../lib/highlightjs/color-brewer.css']
        },
        'jquery-ui': {
            deps: ['jquery', 'css!../css/jquery-ui.css']
        },
        'jqgrid': {
            deps: ['jquery-ui', 'jqgrid-locale-en', 'css!../lib/jqgrid/ui.jqgrid.css']
        },
        'leaflet': {
            deps: ['css!../lib/leaflet/leaflet.css']
        },
        'leaflet-cluster': {
            deps: ['leaflet', 'css!../lib/leaflet.markercluster/MarkerCluster.css', 'css!../lib/leaflet.markercluster/MarkerCluster.Default.css']
        },
        'leaflet-label': {
            deps: ['leaflet', 'css!../lib/Leaflet.label/leaflet.label.css']
        },
        'moment-es': {
            deps: ['moment']
        },
        'moment-ca': {
            deps: ['moment']
        }
    }
});

(function(requirejs) {
    var script;
    if (document.currentScript) {
        script = document.currentScript;
    } else {
        var scripts = document.getElementsByTagName('script');
        script = scripts[scripts.length - 1];
    }

    var baseUrl = script.src.replace(/[^\/]*$/, '');
    console.debug("Sensor Widgets' Base URL is: " + baseUrl);

    requirejs.config({
        baseUrl: baseUrl
    });
})(requirejs);
*/

import SensorWidget from './SensorWidget.js';
import sos from './SOS.js';

// 'Leak' SensorWidget to global scope.
window.SensorWidget = function() {
    var args = arguments;
    window.onload = function() {
        SensorWidget.apply(this, args);
    }
};

// Expose SOS as well.
window.getSOS = function(callback) {
    callback(sos);
};
