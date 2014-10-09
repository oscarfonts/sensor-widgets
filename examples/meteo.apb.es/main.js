/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['locale-date'], function(ld) {

    ld.utc(false);
    ld.locale("es");

    var defs = {
        service: function() {
            return "http://sensors.portdebarcelona.cat/sos/json";
            //return "http://172.17.4.37:8080/52n-sos/sos/json";
            //return "http://metagato.fonts.cat/52n-sos/sos/json";
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
    var two_hours_ago = new Date(now.getTime() - 1000 * 60 * 60 * 2);
    var three_hours_ago = new Date(now.getTime() - 1000 * 60 * 60 * 3);
    var back_33_samples = new Date(now.getTime() - 1000 * 60 * 60 * 17);
    var a_day_ago = new Date(now.getTime() - 1000 * 60 * 60 * 24);

    var section = $(".active a").text();

    switch (section) {

        case "Sirena":

            require(['widget/bearing', 'widget/thermometer', 'widget/timechart', 'widget/windrose', 'widget/table'], function(bearing, thermometer, timechart, windrose, table) {

                bearing.init({
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    property: defs.property("31"),
                    refresh_interval: 15
                }, document.querySelector(".sirena .bearing"));

                thermometer.init({
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    property: defs.property("32"),
                    refresh_interval: 15
                }, document.querySelector(".sirena .meteo-thermometer"));

                timechart.init({
                    title: "Velocitat Vent",
                    service: defs.service(),
                    offering: defs.offering("10m"),
                    features: [defs.feature("02")],
                    properties: [defs.property("30M"), defs.property("30")],
                    time_start: a_day_ago.toISOString().substring(0, 19) + "Z",
                    time_end: now.toISOString().substring(0, 19) + "Z"
                }, document.querySelector(".sirena .timechart"));

                windrose.init({
                    title: "Rosa vents últimes 3h",
                    subtitle: "Sirena, mostres minutals",
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    properties: [defs.property("30"), defs.property("31")],
                    time_start: three_hours_ago.toISOString().substring(0, 19) + "Z",
                    time_end: now.toISOString().substring(0, 19) + "Z",
                    refresh_interval: 120
                }, document.querySelector(".sirena .windrose"));

                table.init({
                    title: "Data Table",
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    feature: defs.feature("02"),
                    properties: [defs.property("30"), defs.property("30M"), defs.property("31"), defs.property("32"), defs.property("33"), defs.property("35"), defs.property("36"), defs.property("34")],
                    time_start: back_33_samples.toISOString().substring(0, 19) + "Z",
                    time_end: now.toISOString().substring(0, 19) + "Z"
                }, document.querySelector(".sirena .tablex"));

            });

            break;

        case "XMVQA":

            require(['widget/bearing', 'widget/panel', 'widget/timechart'], function(bearing, panel, timechart) {

                bearing.init({
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    property: defs.property("31"),
                    refresh_interval: 15
                }, document.querySelector(".xmvqa .left .bearing"));

                panel.init({
                    title: "Dades minutals",
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    properties: [defs.property("30"), defs.property("31"), defs.property("32"), defs.property("33"), defs.property("34"), defs.property("35"), defs.property("36")],
                    refresh_interval: 15
                }, document.querySelector(".xmvqa .left .panel-10m"));

                timechart.init({
                    title: "Velocitat Vent",
                    service: defs.service(),
                    offering: defs.offering("10m"),
                    features: [defs.feature("02")],
                    properties: [defs.property("30")],
                    time_start: two_hours_ago.toISOString().substring(0, 19) + "Z",
                    time_end: now.toISOString().substring(0, 19) + "Z"
                }, document.querySelector(".xmvqa .left .timechart"));

                panel.init({
                    title: "Darrers valors 30-minutals",
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    feature: defs.feature("02"),
                    properties: [defs.property("30"), defs.property("31"), defs.property("32"), defs.property("33"), defs.property("34"), defs.property("35"), defs.property("36")],
                    refresh_interval: 120
                }, document.querySelector(".xmvqa .left .panel-30m"));

                var stations = ["01", "P4", "03", "P6", "P3", "P5", "10"];

                for (var i in stations) {
                    var station = stations[i];

                    bearing.init({
                        service: defs.service(),
                        offering: defs.offering("1m"),
                        feature: defs.feature(station),
                        property: defs.property("31"),
                        refresh_interval: 15
                    }, document.querySelector(".xmvqa .x" + station + " .bearing"));

                    panel.init({
                        title: "Dades minutals",
                        service: defs.service(),
                        offering: defs.offering("1m"),
                        feature: defs.feature(station),
                        properties: [defs.property("30"), defs.property("31"), defs.property("32"), defs.property("33"), defs.property("34"), defs.property("35"), defs.property("36")],
                        refresh_interval: 15
                    }, document.querySelector(".xmvqa .x" + station + " .panel"));
                }

            });

            break;

        case "Torre Control":

            require(['widget/map', 'widget/bearing', 'widget/panel'], function(map, bearing, panel) {

                map.init({
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    features: [defs.feature("P4")],
                    maxInitialZoom: 12
                }, document.querySelector(".torrecontrol .p4 .map"));

                bearing.init({
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("P4"),
                    property: defs.property("31"),
                    refresh_interval: 15
                }, document.querySelector(".torrecontrol .p4 .bearing"));

                panel.init({
                    title: "Dades minutals",
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("P4"),
                    properties: [defs.property("31"), defs.property("30")],
                    refresh_interval: 15
                }, document.querySelector(".torrecontrol .p4 .panel-10m"));

                panel.init({
                    title: "Dades 30-minutals",
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    feature: defs.feature("P4"),
                    properties: [defs.property("31"), defs.property("30")],
                    refresh_interval: 120
                }, document.querySelector(".torrecontrol .p4 .panel-30m"));

                map.init({
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    features: [defs.feature("02")],
                    maxInitialZoom: 12
                }, document.querySelector(".torrecontrol .x02 .map"));

                bearing.init({
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    property: defs.property("31"),
                    refresh_interval: 120
                }, document.querySelector(".torrecontrol .x02 .bearing"));

                panel.init({
                    title: "Dades minutals",
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("02"),
                    properties: [defs.property("31"), defs.property("30")],
                    refresh_interval: 15
                }, document.querySelector(".torrecontrol .x02 .panel-10m"));

                panel.init({
                    title: "Dades 30-minutals",
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    feature: defs.feature("02"),
                    properties: [defs.property("31"), defs.property("30")],
                    refresh_interval: 120
                }, document.querySelector(".torrecontrol .x02 .panel-30m"));

                map.init({
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    features: [defs.feature("03")],
                    maxInitialZoom: 12
                }, document.querySelector(".torrecontrol .x03 .map"));

                bearing.init({
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("03"),
                    property: defs.property("31"),
                    refresh_interval: 15
                }, document.querySelector(".torrecontrol .x03 .bearing"));

                panel.init({
                    title: "Dades minutals",
                    service: defs.service(),
                    offering: defs.offering("1m"),
                    feature: defs.feature("03"),
                    properties: [defs.property("31"), defs.property("30")],
                    refresh_interval: 15
                }, document.querySelector(".torrecontrol .x03 .panel-10m"));

                panel.init({
                    title: "Dades 30-minutals",
                    service: defs.service(),
                    offering: defs.offering("30m"),
                    feature: defs.feature("03"),
                    properties: [defs.property("31"), defs.property("30")],
                    refresh_interval: 120
                }, document.querySelector(".torrecontrol .x03 .panel-30m"));

            });

            break;

        case "Data Browser":

            require(['widget/panel'], function(panel) {

                var features = ["01", "02", "03", "10", "P1", "P3", "P4", "P5", "P6", "P7"];
                var featureNames = ["01 - Dispensari", "02 - Sirena", "03 - Adossat", "10 - ZAL2", "P1 - ESCU", "P3 - Unitat Mobil", "P4 - Dic Sud", "P5 - Dàrsena sud B", "P6 - Contradic", "P7 - Torre Control"];
                var offerings = ["1m", "10m", "30m"];
                var offeringNames = ["Minutals", "10 minutals", "30 minutals"];

                var tpl = $('#item-template').html();
                var html = "";
                for (var f in features) {
                    var res = tpl.replace(/{{id}}/g, features[f]);
                    res = res.replace(/{{title}}/g, featureNames[f]);
                    html += res;
                }
                $(".databrowser").html(html);

                $(".panel-collapse").on('show.bs.collapse', function() {
                    $(this).parent().removeClass('panel-default').addClass('panel-primary');
                    for (var o in offerings) {
                        var feature = this.id;
                        var offering = offerings[o];
                        var title = offeringNames[o];
                        var element = $(this).find(".x" + offering)[0];
                        if (!element.children.length) {
                            panel.init({
                                title: title,
                                service: defs.service(),
                                offering: defs.offering(offering),
                                feature: defs.feature(feature),
                                properties: [],
                                refresh_interval: 60
                            }, element);
                        }
                    }
                });

                $(".panel-collapse").on('hide.bs.collapse', function() {
                    $(this).parent().removeClass('panel-primary').addClass('panel-default');
                });

                $(".panel").hover(
                    function() {
                        $(this).removeClass('panel-default').addClass('panel-primary');
                    }, function() {
                        if (!$(this).find('.in').length && !$(this).find('.collapsing').length) {
                            $(this).removeClass('panel-primary').addClass('panel-default');
                        }
                    }
                );

            });

            break;
    }

});
