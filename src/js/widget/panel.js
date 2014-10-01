/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'common'], function(SOS, common) {

    var inputs = ["title", "service", "offering", "feature", "properties", "refresh_interval"];

    return {
        inputs: inputs,
        init: function(config, renderTo) {

            SOS.setUrl(config.service);
            setInterval(read, config.refresh_interval * 1000);
            read();

            function read() {
                var title = "<h2>" + config.title + "</h2>";
                var content = "<h3>Loading...</h3>";
                renderTo.innerHTML = title + content;

                if (!config.properties | !config.properties.length) {
                    config.properties = null;
                } else {
                    config.properties = isArray(config.properties) ? config.properties : JSON.parse(config.properties);
                }
                SOS.getObservation(config.offering, [config.feature], config.properties, "latest", draw);
            }

            function isArray(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }

            function draw(observations) {
                var rows = [];
                for (var i in observations) {
                    var obs = observations[i];
                    var time = new Date(obs.resultTime);

                    var result = obs.result;

                    rows[obs.observableProperty] = {
                        time: time,
                        feature: obs.featureOfInterest.name.value,
                        property: obs.observableProperty,
                        value: result.hasOwnProperty("value") ? result.value : result,
                        uom: result.hasOwnProperty("uom") ? result.uom : "(N/A)"
                    };

                }

                if (observations.length) {
                    getPropertyNames(observations[0].procedure, rows);
                } else {
                    var title = "<h2>" + config.title + "</h2>";
                    var content = "<h3>(no data)</h3>";
                    renderTo.innerHTML = title + content;
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
                    if (!config.properties) {
                        config.properties = Object.keys(propertyNames);
                    }
                    createPanel(rows, propertyNames);
                });
            }

            function createPanel(rows, propertyNames) {
                var title = "<h2>" + config.title + "</h2>";
                title += "<h3>" + common.date.display(rows[Object.keys(rows)[0]].time) + "</h3>";

                var panel = '<dl class="dl-horizontal">';
                for (var i in config.properties) {
                    var row = rows[config.properties[i]];
                    if (row) {
                        panel += "<dt>" + propertyNames[row.property] + "</dt>";
                        panel += "<dd>" + row.value + " " + row.uom + "</dd>";
                    }
                }
                panel += "</dl>";
                renderTo.innerHTML = title + panel;
            }
        }
    };
});
