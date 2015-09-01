require.config({
    waitSeconds: 30,
    baseUrl: '../js',
    paths: {
        'text': '../lib/requirejs-text/text',
        'bootstrap': '../lib/bootstrap/bootstrap',
        'daterangepicker': '../lib/bootstrap-daterangepicker/daterangepicker',
        'flot': '../lib/flot/jquery.flot',
        'flot-navigate': '../lib/flot/jquery.flot.navigate',
        'flot-resize': '../lib/flot/jquery.flot.resize',
        'flot-time': '../lib/flot/jquery.flot.time',
        'flot-tooltip': '../lib/flot.tooltip/jquery.flot.tooltip',
        'highcharts': '../lib/highcharts/highcharts',
        'highcharts-more': '../lib/highcharts/highcharts-more',
        'jquery': '../lib/jquery/jquery',
        'jquery-ui': '../lib/jquery-ui/jquery-ui',
        'jqgrid': '../lib/jqgrid/jquery.jqGrid',
        'jqgrid-locale-en': '../lib/jqgrid/grid.locale-en',
        'leaflet': '../lib/leaflet/leaflet',
        'leaflet-label': '../lib/Leaflet.label/leaflet.label',
        'moment': '../lib/moment/moment',
        'moment-es': '../lib/moment/locale/es',
        'moment-ca': '../lib/moment/locale/ca'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
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
            exports: 'Highcharts',
            deps: ['jquery']
        },
        'highcharts-more': {
            deps: ['highcharts']
        },
        'jquery-ui': {
            deps: ['jquery', 'css!../css/jquery-ui.css']
        },
        'jqgrid': {
            deps: ['jquery-ui', 'jqgrid-locale-en', 'css!../lib/jqgrid/ui.jqgrid.css']
        },
        'jqgrid-locale-en': {
            deps: ['jquery']
        },
        'leaflet': {
            deps: ['css!../lib/leaflet/leaflet.css']
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

// 'Leak' SensorWidget to global scope.
window.SensorWidget = function() {
    var args = arguments;
    require(['SensorWidget'], function(SensorWidget) {
                SensorWidget.apply(this, args);
    });
};
