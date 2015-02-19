/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'locale-date', 'widget-common'], function(data_access, ld, common) {
    "use strict";

    var template = [
        '<div class="table widget">',
            '<h3></h3>',
            '<div class="table-responsive"></div>',
            '<div><span class="footnote"></span></div>',
        '</div>'
    ].join('');

    return {
        inputs: common.inputs.concat(["title", "feature", "properties", "time_start", "time_end"]),
        optional_inputs: common.optional_inputs,
        preferredSizes: [{w: 400, h: 400}],

        init: function(config, el) {
            // Render template
            el.innerHTML = template;
            el.querySelector("h3").innerHTML = config.title;
            var table = el.querySelector(".table-responsive");

            //load widget common features
            common.init(config, el);

            // Setup SOS data access
            var data = data_access(config, redraw);
            data.read();

            // Update view
            function redraw(data) {
                // Get tabular data from observations
                var measures = {};
                var properties = {};
                for (var i in data) {
                    var measure = data[i];

                    // Add value in a time-indexed "measures" object
                    var time = measure.time.getTime();
                    if (!measures[time]) {
                        measures[time] = {};
                    }
                    measures[time][measure.property] = measure.value;

                    // Add property to a "properties" object, including uom
                    if (!properties[measure.property]) {
                        properties[measure.property] = {
                            "name": measure.property,
                            "uom": measure.uom
                        };
                    }
                }

                createTable(measures, properties);
            }

            function createTable(measures, properties) {
                var html = '<table class="table table-striped table-condensed table-hover table-bordered">';
                html += '<thead>';
                html += '<tr>';
                html += '<th>Result Time</th>';

                var sortedNames = Object.keys(properties).sort();
                for (var i in sortedNames) {
                    var name = sortedNames[i];
                    var uom = properties[name].uom;
                    html += '<th>' + name + " (" + uom + ')</th>';
                }
                html += '</tr>';
                html += '</thead>';

                var times = Object.keys(measures);
                times.sort().reverse();
                for (i in times) {
                    var time = times[i];
                    var values = measures[time];
                    html += '<tr>';
                    html += '<th class="time">' + ld.display(new Date(parseInt(time))) + '</th>';
                    for (var j in sortedNames) {
                        html += '<td>' + values[sortedNames[j]] + '</td>';
                    }
                    html += '</tr>';
                }
                html += '</table>';
                table.innerHTML = html;
            }
        }
    };
});
