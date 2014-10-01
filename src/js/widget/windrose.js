/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'highcharts-more'], function(SOS) {

    var inputs = ["title", "subtitle", "service", "offering", "feature", "properties", "refresh_interval", "time_start", "time_end"];
    var labels = ["&gt; 10 m/s", "8-10 m/s", "6-8 m/s", "4-6 m/s", "2-4 m/s", "0-2 m/s"];

    return {
        inputs: inputs,
        init: function(config, renderTo) {
            SOS.setUrl(config.service);
            setInterval(read, config.refresh_interval * 1000);
            read();

            function read() {
                var properties = isArray(config.properties) ? config.properties : JSON.parse(config.properties);
                var time_range = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : null;
                SOS.getObservation(config.offering, [config.feature], properties, time_range, parse);
            }

            function isArray(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }

            function parse(observations) {
                var arr = [];
                for (var i in observations) {
                    // Build a sparse array where index is timestamp, and member is a 2-element array
                    // First element is wind speed, second element is wind direction
                    var obs = observations[i];
                    var timestamp = new Date(obs.resultTime).getTime();
                    var magnitude = obs.result.uom == "deg" ? 1 : 0;
                    var value = obs.result.value;

                    if (!arr[timestamp]) {
                        arr[timestamp] = [];
                    }
                    arr[timestamp][magnitude] = value;
                }

                var data = [];
                while (data.length < 6) {
                    var dirs = [];
                    while (dirs.push(null) < 16);
                    data.push(dirs);
                }

                // Build a frequency matrix where rows are speed ranges and columns are direction ranges
                var n = 0;
                for (i in arr) {
                    var values = arr[i];
                    if (values.length == 2) {
                        var speed = 5 - Math.min(Math.floor(values[0] / 2), 5); // Speed slot from 0 to 5
                        var direction = Math.round(values[1] / 22.5) % 16; // Direction slot from 0 to 15
                        if (!data[speed][direction]) {
                            data[speed][direction] = 1;
                        } else {
                            data[speed][direction]++;
                        }
                        n++;
                    }
                }

                // Convert from number of samples to %
                for (i in data) {
                    for (var j in data[i]) {
                        data[i][j] = data[i][j] * 100 / n;
                    }
                }

                draw(data);
            }

            function draw(data) {
                var series = [];
                for (var i in labels) {
                    var total = 0;
                    for (var j in data[i]) {
                        total += data[i][j];
                    }
                    series.push({
                        name: labels[i] + " (" + Math.round(total) + "%)",
                        data: data[i]
                    });
                }

                new Highcharts.Chart({
                    chart: {
                        type: 'column',
                        polar: true,
                        renderTo: renderTo
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
        }
    };
});
