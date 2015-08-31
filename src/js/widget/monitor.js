/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['i18n', 'sos-data-access', 'widget-common', 'moment'], function(i18n, data_access, common, moment) {
    "use strict";

    moment.locale(i18n.getLang());

    var template = [
        '<div class="monitor widget">',
            '<div class="table-responsive">' + i18n.t("Loading...") + '</div>',
        '</div>',
        '<div><span class="footnote"></span></div>'].join('');

    return {
        inputs: common.inputs,
        optional_inputs: common.optional_inputs,
        preferredSizes: [{w: 800, h: 600}, {w: 1024, h: 768}, {w: 1280, h: 1024}],

        init: function(config, el, errorHandler) {
            // Render template
            el.innerHTML = template;

            //load widget common features
            common.init(config, el);

            config.features = undefined;
            config.properties = undefined;

            // Setup SOS data access
            var data = data_access(config, redraw, errorHandler);
            data.read();

            // Update view
            function redraw(data) {
                var table = {};
                var features = [];
                for (var i in data) {
                    var measure = data[i];
                    if (!table[measure.property]) {
                        table[measure.property] = [];
                    }
                    table[measure.property][measure.feature] = measure;
                    if(features.indexOf(measure.feature) == -1) {
                        features.push(measure.feature);
                    }
                }

                var html = '<table class="table table-striped table-condensed table-hover table-bordered">';
                html += '<thead>';
                html += '<tr><th></th>';
                for (var c in features) {
                    html += '<th>' + features[c] + '</th>';
                }
                html += '</tr></thead>';
                for (var p in table) {
                    html += '<tr><th>' + p + '</th>';
                    for (var f in features) {
                        f = features[f];
                        if (table[p][f]) {
                            html += '<td>';
                            var m = table[p][f];
                            var cell = '<div><span class="value">' + m.value + '</span> <span class="uom">' + m.uom + '</span></div>' +
                                       '<div><span class="result_time">' + moment(m.time).fromNow() + '</span></div>';
                            html += cell;
                        } else {
                            html += '<td class="nodata">';
                            html += "(N/A)";
                        }
                        html += '</td>';
                    }
                    html += '</tr>';
                }
                el.querySelector(".table-responsive").innerHTML = html;
            }
        }
    };
});
