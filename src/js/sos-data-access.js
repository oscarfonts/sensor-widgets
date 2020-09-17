/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import SOS from './SOS';

var propertyNames = {};
var waitingDescribeResponse = {};
var propertyCallbackQueue = {};

export default function(config, redraw, errorHandler) {
    SOS.setUrl(config.service);

    function read() {
        var offering = config.offering;
        var features = config.feature ? [config.feature] : isArray(config.features) ? config.features : config.features ? JSON.parse(config.features) : undefined;
        var properties = config.property ? [config.property] : isArray(config.properties) ? config.properties : config.properties ? JSON.parse(config.properties) : undefined;
        var time = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : "latest";
        SOS.getObservation(offering, features, properties, time, parse, errorHandler);
    }

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function parse(observations) {
        if (!observations.length) {
            redraw([]);
        }

        // Get tabular data from observations
        var data = [];
        for (var i in observations) {
            var observation = observations[i];
            getPropertyName(observation.procedure, observation.observableProperty, addObservation, observation);
        }

        function addObservation(property, observation) {
            var foi = observation.featureOfInterest;
            data.push({
                time: new Date(observation.resultTime),
                value: observation.result.hasOwnProperty("value") ? observation.result.value : observation.result,
                feature: foi.name ? foi.name.value : (foi.identifier ? foi.identifier.value : foi),
                property: property,
                uom: observation.result.hasOwnProperty("uom") ? observation.result.uom : "(N/A)"
            });
            if (data.length == observations.length) {
                redraw(data);
            }
        }
    }

    function getPropertyName(procedure, id, callback, context) {
        if (!propertyNames[procedure]) {
            // Queue callback call
            if (!propertyCallbackQueue[procedure]) {
                propertyCallbackQueue[procedure] = [];
            }

            propertyCallbackQueue[procedure].push({
                callback: callback,
                id: id,
                context: context
            });

            if (!waitingDescribeResponse[procedure]) {
                waitingDescribeResponse[procedure] = true;
                // Trigger a DescribeSensor, cache all property names for this procedure
                SOS.describeSensor(procedure, function(description) {
                    var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
                    properties = properties instanceof Array ? properties : [properties];
                    var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];

                    var names = [];
                    for (var i in properties) {
                        var property = properties[i];
                        for (var j in types) {
                            var type = types[j];
                            if (property.hasOwnProperty(type)) {
                                property.id = property[type].definition;
                            }
                        }
                        names[property.id] = property.name;
                    }
                    propertyNames[procedure] = names;

                    // Clear propertyCallbackQueue
                    while (propertyCallbackQueue[procedure].length) {
                        var elem = propertyCallbackQueue[procedure].shift();
                        elem.callback.call(undefined, propertyNames[procedure][elem.id], elem.context);
                    }
                }, errorHandler);
            }
        } else {
            callback(propertyNames[procedure][id], context);
        }
    }

    return {
        read: read
    };
};
