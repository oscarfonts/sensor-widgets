/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'common', 'jqgrid', 'css!widget/jqgrid.css'], function(SOS, common) {

    var inputs = ["title", "service", "offering", "features", "properties", "time_start", "time_end"];
    var propertyNames = null;

    return {
        inputs: inputs,
        init: function(config, renderTo) {
            SOS.setUrl(config.service);
            read();

            function read() {
                var features = isArray(config.features) ? config.features : JSON.parse(config.features);
                var properties = isArray(config.properties) ? config.properties : JSON.parse(config.properties);
                var time_range = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : null;
                SOS.getObservation(config.offering, features, properties, time_range, draw);
            }

            function isArray(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }

            function draw(observations) {
                function d(n) {
                    return n < 10 ? "0" + n : "" + n;
                }

                // Get tabular data from observations
                var rows = [];
                for (var i in observations) {
                    var obs = observations[i];
                    var time = new Date(obs.resultTime);

                    var result = obs.result;

                    rows.push({
                        time: time,
                        feature: obs.featureOfInterest.name.value,
                        property: obs.observableProperty,
                        value: result.hasOwnProperty("value") ? result.value : result,
                        uom: result.hasOwnProperty("uom") ? result.uom : "(N/A)"
                    });
                }

                if (propertyNames) {
                    createGrid(rows);
                } else if (observations.length) {
                    getPropertyNames(observations[0].procedure, rows);
                }
            }

            function getPropertyNames(procedure, rows) {
                SOS.describeSensor(procedure, function(description) {
                    var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
                    properties = properties instanceof Array ? properties : [properties];
                    var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];
                    propertyNames = [];

                    for (var i in properties) {
                        var property = properties[i];
                        for (var j in types) {
                            var type = types[j];
                            if (property.hasOwnProperty(type)) {
                                property.id = property[type].definition;
                            }
                        }
                        propertyNames[property.id] = property.name;
                    }
                    createGrid(rows);
                });
            }

            function createGrid(rows) {
                for (var i in rows) {
                    var row = rows[i];
                    if (propertyNames[row.property]) {
                        row.property = propertyNames[row.property];
                    }
                }

                // jqGrid table
                var title = config.title ? "<h3>" + config.title + "</h3>" : "";
                var table = "<table id='grid'></table>";
                var pager = '<div id="pager"></div>';
                renderTo.innerHTML = title + table + pager;

                jQuery("#grid").jqGrid({
                    datatype: "local",
                    height: 'auto',
                    width: '100%',
                    caption: "Results",
                    data: rows,
                    pager: '#pager',
                    rowNum: 12,
                    sortname: 'time',
                    autowidth: true,
                    colNames: ['Time', 'Feature', 'Property', 'Value', 'Unit'],
                    colModel: [{
                        name: 'time',
                        index: 'time',
                        width: '160',
                        formatter: function(cellvalue, options, rowObject) {
                            var new_formatted_cellvalue = common.date.display(cellvalue);
                            return new_formatted_cellvalue;
                        }
                    }, {
                        name: 'feature',
                        index: 'feature',
                        width: '150'
                    }, {
                        name: 'property',
                        index: 'property',
                        width: '150'
                    }, {
                        name: 'value',
                        index: 'value',
                        width: '80',
                        align: "right"
                    }, {
                        name: 'uom',
                        index: 'uom',
                        width: '60'
                    }]
                });

                $("#grid").setGridWidth($(window).width() - 2);

                $(window).bind('resize', function() {
                    $("#grid").setGridWidth($(window).width() - 2);
                });
            }
        }
    };

});
