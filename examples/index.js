define([], function() {
    var defs = {
        service: function() {
            //return "http://sos.fonts.cat/sos/json";
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
    var a_day_ago = new Date(now.getTime() - 1000 * 60 * 60 * 24);
    
    now = now.toISOString().substring(0, 19) + "Z";
    a_day_ago = a_day_ago.toISOString().substring(0, 19) + "Z";

    require(['widget/bearing'], function(widget) {
        widget.init({
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("02"),
            property: defs.property("31"),
            refresh_interval: 15
        }, document.querySelector("#bearing-container"));
    });

    require(['widget/gauge'], function(widget) {
        widget.init({
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("02"),
            property: defs.property("33"),
            refresh_interval: 15
        }, document.querySelector("#gauge-container"));
    });

    require(['widget/jqgrid'], function(widget) {
        widget.init({
            title: "jqGrid Example",
            service: defs.service(),
            offering: defs.offering("30m"),
            features: [
                defs.feature("02"),
                defs.feature("01")
            ],
            properties: [defs.property("32")],
            time_start: a_day_ago,
            time_end: now
        }, document.querySelector('#jqgrid-container'));
    });

    require(['widget/map'], function(widget) {
        widget.init({
            service: defs.service(),
            offering: defs.offering("1m"),
            maxInitialZoom: 17,
            baseMapWms: "http://planolws.portdebarcelona.cat/mapproxy/service",
            baseMapWmsParams: '{ \
                "layers": "PDBFAV_20140621", \
                "attribution": "Tiles courtesy of Port de Barcelona", \
                "format": "image/jpeg" \
            }',
            features: []
        }, document.querySelector('#map-container'));
    });

    require(['widget/progressbar'], function(widget) {
        widget.init({
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("01"),
            property: defs.property("34"),
            min_value: "900",
            max_value: "1101",
            refresh_interval: 15
        }, document.querySelector("#progressbar-container"));
    });

    require(['widget/thermometer'], function(widget) {
        widget.init({
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("P6"),
            property: defs.property("32"),
            refresh_interval: 15
        }, document.querySelector('#thermometer-container'));
    });

    require(['widget/timechart'], function(widget) {
        widget.init({
            title: "Temperatures",
            service: defs.service(),
            offering: defs.offering("30m"),
            features: [
                defs.feature("P6"),
                defs.feature("03"),
                defs.feature("02"),
                defs.feature("01")
            ],
            properties: [defs.property("32")],
            time_start: a_day_ago,
            time_end: now
        }, document.querySelector('#timechart-container'));
    });

});
