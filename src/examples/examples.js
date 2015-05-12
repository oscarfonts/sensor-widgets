/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define('examples', ["SensorWidget", "main", "bootstrap"], function(SensorWidget) {
    "use strict";

    var quick_refresh = 15; // seconds
    var slow_refresh = 120; // seconds

    //var now = new Date();
    var now = new Date(2012, 5, 11, 3, 0, 0);
    var three_hours_ago = new Date(now.getTime() - 1000 * 60 * 60 * 3);
    var a_day_ago = new Date(now.getTime() - 1000 * 60 * 60 * 24);

    var defs = {
        service: function() {
            return "http://demo.geomati.co/sos/json";
            //return "http://sensors.portdebarcelona.cat/sos/json";
        },
        offering: function(p) {
            return "http://sensors.portdebarcelona.cat/def/weather/offerings#" + p;
        },
        feature: function(p) {
            return "http://sensors.portdebarcelona.cat/def/weather/features#" + p;
        },
        property: function(p) {
            return "http://sensors.portdebarcelona.cat/def/weather/properties#" + p;
        }
    };

    now = now.toISOString().substring(0, 19) + "Z";
    three_hours_ago = three_hours_ago.toISOString().substring(0, 19) + "Z";
    a_day_ago = a_day_ago.toISOString().substring(0, 19) + "Z";

    var widget_configurations = {
        'bearing': {
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("02"),
            property: defs.property("31"),
            refresh_interval: quick_refresh
        },
        'gauge': {
            service: defs.service(),
            offering: defs.offering("10m"),
            feature: defs.feature("02"),
            property: defs.property("33"),
            refresh_interval: slow_refresh
        },
        'jqgrid': {
            service: defs.service(),
            offering: defs.offering("30m"),
            title: "jqGrid Example",
            features: [
                defs.feature("02"),
                defs.feature("01")
            ],
            properties: [defs.property("32")],
            time_start: three_hours_ago,
            time_end: now
        },
        'map': {
            service: defs.service(),
            offering: defs.offering("30m"),
            features: [
                defs.feature("01"),
                defs.feature("02"),
                defs.feature("03"),
                defs.feature("P4"),
                defs.feature("10"),
                defs.feature("P5"),
                defs.feature("P6")
            ]
        },
        'panel': {
            title: "Last observations",
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("02"),
            properties: [
                defs.property("30"),
                defs.property("31"),
                defs.property("32"),
                defs.property("33"),
                defs.property("34"),
                defs.property("35"),
                defs.property("36")
            ],
            refresh_interval: quick_refresh
        },
        'progressbar': {
            service: defs.service(),
            offering: defs.offering("10m"),
            feature: defs.feature("01"),
            property: defs.property("34"),
            min_value: "900",
            max_value: "1100",
            refresh_interval: slow_refresh
        },
        'table': {
            title: "Data Table - last 3 hours",
            service: defs.service(),
            offering: defs.offering("30m"),
            feature: defs.feature("02"),
            properties: [
                defs.property("30"),
                defs.property("31"),
                defs.property("32"),
                defs.property("33"),
                defs.property("34"),
                defs.property("36")
            ],
            time_start: three_hours_ago,
            time_end: now
        },
        'thermometer': {
            service: defs.service(),
            offering: defs.offering("10m"),
            feature: defs.feature("P6"),
            property: defs.property("32"),
            refresh_interval: slow_refresh
        },
        'timechart': {
            service: defs.service(),
            offering: defs.offering("30m"),
            title: "Temperatures",
            features: [
                defs.feature("02"),
                defs.feature("01")
            ],
            properties: [defs.property("32")],
            time_start: a_day_ago,
            time_end: now
        },
        'windrose': {
            title: "Sirena Windrose",
            subtitle: "Last 3 hours of wind observations",
            service: defs.service(),
            offering: defs.offering("1m"),
            feature: defs.feature("02"),
            properties: [defs.property("30"), defs.property("31")],
            time_start: three_hours_ago,
            time_end: now,
            refresh_interval: slow_refresh
        }
    };

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.indent = function(spaces) {
        return this.replace(/^(?=.)/gm, new Array(spaces + 1).join(' '));
    };

    var widget_menu = "";
    var widget_list = "";
    for (var name in widget_configurations) {
        widget_menu += '<li><a href="#'+name+'">' + name.capitalize() + '</a></li>';
        /*jshint multistr: true */
        widget_list += ' \
            <div class="anchor" id="'+name+'"></div> \
            <h1><i class="flaticon-'+name+'"></i>&nbsp;&nbsp;'+name.capitalize()+'</h1> \
            <div class="row"> \
                <div class="col-md-6"> \
                    <div class="thumbnail widget-container" id="'+name+'-container"></div> \
                </div> \
                <div class="col-md-6"> \
                    <div id="'+name+'-inputs"></div> \
                    <pre id="'+name+'-code"></pre> \
                </div> \
            </div>';
    }

    document.getElementById("widget-menu").innerHTML = widget_menu;
    document.getElementById("widget-list").innerHTML = widget_list;

    var inspect = function(widget) {
        document.getElementById(this.name+'-inputs').innerHTML = "Widget Inputs:<ul><li>Mandatory: " + widget.inputs.join(", ") + "<li>Optional: " + widget.optional_inputs.join(", ") + "</ul>";
    };

    for (name in widget_configurations) {

        widget_configurations[name].footnote="A sample footnote for "+name+" widget";

        new SensorWidget(
            name,
            widget_configurations[name],
            document.getElementById(name+'-container')
        );

        require(['widget/'+name], inspect.bind({
            name: name
        }));

        var code_sample = name+".init(" + JSON.stringify(widget_configurations[name], null, 2) + ",\r\ndocument.getElementById('"+name+"-container'));\r\n";
        code_sample = "require(['widget/"+name+"'], function("+name+") {\r\n" + code_sample.indent(2) + "});";
        document.getElementById(name+'-code').innerHTML = code_sample;
    }

});

requirejs.config({
    baseUrl: '../js/'
});

requirejs(['examples']);