/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'locale-date', 'widget-common', 'flot-resize', 'flot-time', 'flot-tooltip', 'flot-navigate'], function(data_access, ld, common) {
    "use strict";

    var inputs = ["title", "service", "offering", "features", "properties", "time_start", "time_end", "footnote", "css"];
    var preferredSizes = Array({ 'w': 650, 'h': 530});

    var template = [
        '<div class="timechart widget">',
            '<h3 style="width:100%"></h3>',
            '<div class="graph" style="height:75%; width: 100%; max-height: 380px;"></div>',
            '<div id="legend" style="display: inline-block; float: right; margin-right: 15px; margin-left: 50px; margin-top: 10px"></div>',
            '<div><span class="footnote"></span></div>',
        '</div>'
    ].join('');


    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {
        	
            //load widget common features
        	common.init(config);
        	
            // Render template
            el.innerHTML = template;
            el.querySelector("h3").innerHTML = config.title;
            if(config.footnote != undefined) el.querySelector(".footnote").innerHTML = config.footnote;
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
                    legend: {
                    	container: "#legend"
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
