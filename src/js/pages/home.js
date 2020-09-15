/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import '../jQuery-globals';
import i18n from '../i18n';
import SensorWidget from '../SensorWidget';
import hljs from 'highlightjs';
import 'bootstrap';

"use strict";

var bundle = {
  "Toggle navigation": {
    "es": "Conmutar navegación",
    "ca": "Commuta la navegació"
  },
  "GitHub Repo": {
    "es": "Repo GitHub",
    "ca": "Repo GitHub"
  },
  "Examples ": {
    "es": "Ejemplos ",
    "ca": "Exemples "
  },
  "Usage in Javascript": {
    "es": "Uso en Javascript",
    "ca": "Ús des de Javascript"
  },
  "Complete Map Widget Example": {
    "es": "Ejemplo completo de Mapa",
    "ca": "Exemple complet de Mapa"
  },
  "Advanced Composition": {
    "es": "Composición avanzada",
    "ca": "Composició avançada"
  },
  "Timechart: sync and custom colors": {
    "es": "Timechart: sincronització i colors personalitzats",
    "ca": "Timechart: sincronización y colores personalizados"
  },
  "Low-level SOS access (experimental)": {
    "es": "Acceso de bajo nivel al SOS (experimental)",
    "ca": "Accés de baix nivell al SOS (experimental)"
  },
  "Documentation ": {
    "es": "Documentación ",
    "ca": "Documentació "
  },
  "Configurable graphical components for your ": {
    "es": "Componentes gráficos configurables para tus datos de sensores ",
    "ca": "Components gràfics configurables per a les teves dades de sensors "
  },
  " sensor data.": {
    "es": ".",
    "ca": "."
  },
  "100% Javascript. Extensible. MIT licensed.": {
    "es": "100% Javascript. Extensible. Licencia MIT.",
    "ca": "100% Javascript. Extensible. Llicència MIT."
  },
  "  Build your own  »": {
    "es": "  Crea tu widget  »",
    "ca": "  Crea el teu widget  »"
  }
};
i18n.addTranslations(bundle);
i18n.translateDocTree();
document.getElementById('wizard-link').href = "wizard?lang=" + i18n.getLang();

var langMenu = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+i18n.langs()[i18n.getLang()]+' <span class="caret"></span></a>';
langMenu += '<ul class="dropdown-menu">';
for (var key in i18n.langs()) {
    if (key != i18n.getLang()) {
       langMenu += '<li><a href="?lang='+key+'">'+i18n.langs()[key]+'</a></li>';
    }
}
langMenu += '</ul>';
document.getElementById('lang-selector').innerHTML = langMenu;

var quick_refresh = 15; // seconds
var slow_refresh = 120; // seconds

var now = new Date();
//var now = new Date(2012, 5, 11, 3, 0, 0);
var three_hours_ago = new Date(now.getTime() - 1000 * 60 * 60 * 3);
var a_day_ago = new Date(now.getTime() - 1000 * 60 * 60 * 24);

var defs = {
    service: function() {
        return "https://demo.geomatico.es/52n-sos/service";
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
    'compass': {
        service: defs.service(),
        offering: defs.offering("1M"),
        feature: defs.feature("02"),
        property: defs.property("31"),
        refresh_interval: quick_refresh
    },
    'gauge': {
        service: defs.service(),
        offering: defs.offering("10M"),
        feature: defs.feature("02"),
        property: defs.property("33"),
        refresh_interval: slow_refresh
    },
    'jqgrid': {
        service: defs.service(),
        offering: defs.offering("30M"),
        title: i18n.t("jqGrid Example"),
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
        offering: defs.offering("30M"),
        features: [
            defs.feature("01"),
            defs.feature("02"),
            defs.feature("03"),
            defs.feature("P4"),
            defs.feature("10"),
            defs.feature("P5"),
            defs.feature("P6")
        ],
        properties: [],
        swap_axis: true
    },
    'panel': {
        title: i18n.t("Last observations"),
        service: defs.service(),
        offering: defs.offering("1M"),
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
        offering: defs.offering("10M"),
        feature: defs.feature("01"),
        property: defs.property("34"),
        min_value: "900",
        max_value: "1100",
        refresh_interval: slow_refresh
    },
    'status': {
        service: defs.service(),
        offering: defs.offering("30M")
    },
    'table': {
        title: i18n.t("Data Table - last 3 hours"),
        service: defs.service(),
        offering: defs.offering("30M"),
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
        offering: defs.offering("10M"),
        feature: defs.feature("01"),
        property: defs.property("32"),
        refresh_interval: slow_refresh
    },
    'timechart': {
        service: defs.service(),
        offering: defs.offering("30M"),
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
        title: i18n.t("Sirena Windrose"),
        subtitle: i18n.t("Last 3 hours of wind observations"),
        service: defs.service(),
        offering: defs.offering("1M"),
        feature: defs.feature("02"),
        properties: [defs.property("30"), defs.property("31")],
        time_start: three_hours_ago,
        time_end: now,
        refresh_interval: slow_refresh
    }
};

function capitalize(str) {
    return i18n.t(str.charAt(0).toUpperCase() + str.slice(1));
}

function htmlDecode(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

var widget_menu = "";
var widget_list = "";
for (var name in widget_configurations) {
    widget_menu += '<li><a href="#'+name+'">' + capitalize(name) + '</a></li>';
    /*jshint multistr: true */
    widget_list += [
        '<div class="anchor" id="'+name+'"></div>',
        '<h1><i class="flaticon-'+name+'"></i>&nbsp;&nbsp;'+capitalize(name)+'</h1>',
        '<div class="row">',
            '<div class="col-md-6">',
                '<div class="thumbnail widget-container" id="'+name+'-container"></div>',
            '</div>',
            '<div class="col-md-6">',
                '<div id="'+name+'-inputs"></div>',
                '<ul class="nav nav-tabs nav-justified">',
                    '<li class="active"><a href="#'+name+'-code" data-toggle="tab" aria-expanded="true">', i18n.t("Code"), '</a></li>',
                    '<li class=""><a href="#'+name+'-iframe" data-toggle="tab" aria-expanded="false">', i18n.t("Embed"), '</a></li>',
                    '<li class=""><a href="#'+name+'-url" data-toggle="tab" aria-expanded="false">', i18n.t("Link"), '</a></li>',
                '</ul>',
                '<div id="myTabContent" class="tab-content">',
                    '<div class="tab-pane fade active in" id="'+name+'-code"></div>',
                    '<div class="tab-pane fade" id="'+name+'-iframe"></div>',
                    '<div class="tab-pane fade" id="'+name+'-url"></div>',
                '</div>',
            '</div>',
        '</div>'].join('');
}

document.getElementById("widget-menu").innerHTML = widget_menu;
document.getElementById("widget-list").innerHTML = widget_list;

var renderInputs = function(inputs, optional, sizes) {
    var iface = "<h4><strong> " + i18n.t("{name} Configuration Parameters", {name: capitalize(this.name)}) + "</strong>:</h4><dl class='dl-horizontal'>";
    iface += "<dt>" + i18n.t("Mandatory") + ":</dt> <dd><span class='label label-primary'>" + inputs.join("</span> <span class='label label-primary'>") + "</span></dd>";
    iface += "<dt>" + i18n.t("Optional") + ":</dt> <dd><span class='label label-info'>" + optional.join("</span> <span class='label label-info'>") + "</span></dd>";
    iface += "<dt>" + i18n.t("Suggested Sizes") + ":</dt> <dd><span class='label label-default'>" + sizes.map(function(size) {
        return size.w + " x " + size.h + " px";
    }).join("</span> <span class='label label-default'>") + "</dd>";
    iface += "</dl>";
    document.getElementById(this.name+'-inputs').innerHTML = iface;
};

for (name in widget_configurations) {

    widget_configurations[name].footnote= i18n.t("A sample footnote for {name} widget", {name: capitalize(name)});

    var widget = new SensorWidget(
        name,
        widget_configurations[name],
        document.getElementById(name+'-container')
    );

    widget.inspect(
        renderInputs.bind({
            name: name
        })
    );

    document.getElementById(name+'-url').innerHTML = '<pre>' + '<a href="'+widget.url()+'" target="_blank">'+widget.url()+'</a>' + '</pre>';
    document.getElementById(name+'-iframe').innerHTML = '<pre class="html">' + htmlDecode(widget.iframe()) + '</pre>';
    hljs.highlightBlock(document.getElementById(name+'-iframe').firstChild);
    document.getElementById(name+'-code').innerHTML = '<pre class="javascript">' + widget.javascript() + '</pre>';
    hljs.highlightBlock(document.getElementById(name+'-code').firstChild);
}
