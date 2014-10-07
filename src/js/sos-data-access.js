/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
 define(['SOS'], function(SOS) {

	return function(config, update) {
        SOS.setUrl(config.service);

        function read() {
            SOS.getObservation(config.offering, [config.feature], [config.property], "latest", parse);
        }

        function parse(observations) {
            var observation = observations[0];
            var date = new Date(observation.resultTime);
            var value = observation.result.value;
            var feature = observation.featureOfInterest.name.value;
            describeProperty(observation.procedure, config.property, function(property) {
                update(date, value, feature, property.name);
            });
        }

        function describeProperty(procedure, property, callback) {
			// TODO cache property descriptions (id, name, UoM)
			SOS.describeSensor(procedure, function(description) {
                var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
                for (var i in properties) {
                    if (properties[i].Quantity.definition == property) {
                    	callback(properties[i]);
                    }
                }
            });
        }

        return {
            read: read
        };
	};
});
