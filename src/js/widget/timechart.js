/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'locale-date', 'flot-resize', 'flot-time', 'flot-tooltip', 'flot-navigate'], function(data_access, ld) {
    "use strict";

    var inputs = ["title", "service", "offering", "features", "properties", "time_start", "time_end"];
    var preferredSizes = Array({ 'w': 600, 'h': 400});

    var template = [
        '<div class="timechart widget">',
            '<h3 style="position:absolute;width:100%"></h3>',
            '<div class="graph" style="height:100%"></div>',
        '</div>'
    ].join('');


    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {

            // Render template
            el.innerHTML = template;
            el.querySelector("h3").innerHTML = config.title;
            var graph = el.querySelector(".graph");

            // Setup SOS data access
            var data = data_access(config, redraw);
            data.read();

            function redraw(data) {
                var series = {};
                for (var i in data) {
                    var measure = data[i];
                    var label = measure.property + " (" + measure.feature + ")";
                    if (!series[label]) {
                        series[label] = {
                            data: [],
                            label: label
                        };
                    }
                    series[label].data.push([measure.time.getTime(), measure.value]);
                }

                var sortFunction = function(a, b) {
                    return b[0] - a[0];
                };

                // Sort data by time, convert to array
                var arr = [];
                for (var k in series) {
                    series[k].data.sort(sortFunction);
                    arr.push(series[k]);
                }

                var options = {
                    xaxis: {
                        mode: "time",
                        timezone: ld.utc() ? "UTC" : "browser"
                    },
                    yaxis: {
                        zoomRange: false,
                        panRange: false
                    },
                    grid: {
                        hoverable: true
                    },
                    series: {
                        lines: {
                            show: true
                        },
                        points: {
                            show: true
                        }
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "[%x] %s: %y.2 " + data[0].uom
                    },
                    zoom: {
                        interactive: true
                    },
                    pan: {
                        interactive: true
                    }
                };

                $.plot(graph, arr, options);

            }
        }
    };

});
