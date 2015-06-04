/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'widget-common', 'highcharts-more'], function(data_access, common) {
    "use strict";

    var labels = ["&gt; 10 m/s", "8-10 m/s", "6-8 m/s", "4-6 m/s", "2-4 m/s", "0-2 m/s"];

    return {
        inputs: common.inputs.concat(["title", "feature", "properties", "refresh_interval", "time_start", "time_end"]),
        optional_inputs: common.optional_inputs.concat(["subtitle"]),
        preferredSizes: [{w: 620, h: 450}],

        init: function(config, el) {
            // Main div
            var main_div = document.createElement("div");
            main_div.className = "windrose widget";

            // Chart div
            var chart = document.createElement("div"); 
            main_div.appendChild(chart);

            // Add footnote element
            var footnote_div = document.createElement("div");
            var footnote_span = document.createElement("span");
            footnote_span.className = "footnote";
            footnote_div.appendChild(footnote_span);
            main_div.appendChild(footnote_div);

            el.appendChild(main_div);

            //load widget common features
            common.init(config, el);
        	
            // Setup SOS data access
            var data = data_access(config, redraw);
            var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            function redraw(data) {
                var arr = [];
                for (var i in data) {
                    var measure = data[i];

                    // Build a sparse array where index is timestamp, and member is a 2-element array
                    // First element is wind speed, second element is wind direction
                    var timestamp = measure.time.getTime();
                    var magnitude = measure.uom == "deg" ? 1 : 0;

                    if (!arr[timestamp]) {
                        arr[timestamp] = [];
                    }
                    arr[timestamp][magnitude] = measure.value;
                }

                // Build a matrix where first index is speed range, and second is direction
                var slots = [];
                while (slots.length < 6) {
                    var dirs = [];
                    while (dirs.push(null) < 16);
                    slots.push(dirs);
                }

                // Sum the number of observations for each speed+direction slot
                var n = 0;
                for (i in arr) {
                    var values = arr[i];
                    if (values.length == 2) {
                        var speed = 5 - Math.min(Math.floor(values[0] / 2), 5); // Speed slot - from 0 to 5
                        var direction = Math.round(values[1] / 22.5) % 16; // Direction slot - from 0 to 15
                        if (!slots[speed][direction]) {
                            slots[speed][direction] = 1;
                        } else {
                            slots[speed][direction]++;
                        }
                        n++;
                    }
                }

                // Convert from sample count to percentage
                // Generate legend
                var series = [];
                for (i in slots) {
                    var total = 0;
                    for (var j in slots[i]) {
                        slots[i][j] = slots[i][j] * 100 / n;
                        total += slots[i][j];
                    }
                    series.push({
                        name: labels[i] + " (" + Math.round(total) + "%)",
                        data: slots[i]
                    });
                }

                // Finally, generate the chart
                new Highcharts.Chart({
                    chart: {
                        type: 'column',
                        polar: true,
                        renderTo: chart
                    },
                    title: {
                        text: config.title
                    },
                    subtitle: {
                        text: config.subtitle
                    },
                    pane: {
                        size: '85%'
                    },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        y: 100,
                        layout: 'vertical'
                    },
                    xAxis: {
                        tickmarkPlacement: 'on',
                        categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
                    },
                    yAxis: {
                        min: 0,
                        endOnTick: false,
                        showLastLabel: true,
                        labels: {
                            formatter: function() {
                                return this.value + ' %';
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            return '<span style="color:' + this.series.color + '">\u25CF</span> ' + this.series.name + ': <b>' + Highcharts.numberFormat(this.y, 1) + ' %</b><br/>';
                        }
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            shadow: false,
                            groupPadding: 0,
                            pointPlacement: 'on'
                        }
                    },
                    colors: ['#BD0BC9', '#C9170B', '#C9760B', '#BDC90B', '#0BC917', '#0BBDC9'],
                    series: series
                });

            }

            return {
                destroy: function() {
                    clearInterval(refreshIntervalId);
                }
            }
        }
    };
});
