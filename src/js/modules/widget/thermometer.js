/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'text!svg/thermometer.svg', 'widget/common'], function(SOS, drawing, common) {

    var inputs = ["service", "offering", "feature", "property", "refresh_interval"];
    var dy = 3.342574;
    var y_max = 206.34359 + 267.40595;
    var t_min = -24;
    var t_max = 56;

    return {
        inputs: inputs,
        init: function(config, renderTo) {
            var contents = '<div class="widget">';
            contents += '<h1 class="feature_name"></h1>';
            contents += drawing;
            contents += '<h2><span class="property_name"></span>: <span class="result_value"></span> Cel</h2>';
            contents += '<h3>Request time: <span class="request_time"></span></h3>';
            contents += '<h3>Result time: <span class="result_time"></span></h3>';
            contents += '</div>';
            renderTo.innerHTML = contents;

            var clip = renderTo.querySelector(".svg-temp").firstChild;

            SOS.setUrl(config.service);
            setInterval(read, config.refresh_interval * 1000);
            read();

            function read() {
                SOS.getObservation(config.offering, [config.feature], [config.property], "latest", draw);
            }

            function draw(observations) {
                if (observations.length == 1 && // Single observation
                    observations[0].result.uom == 'Cel' && // UoM is celsius
                    typeof observations[0].result.value == 'number') { // Value is numeric

                    var obs = observations[0];
                    var foi_name = obs.featureOfInterest.name.value;
                    var date = new Date(obs.resultTime);
                    var value = obs.result.value;
                    var procedure = obs.procedure;

                    var h = dy * (value - t_min);
                    var y_min = y_max - h;

                    renderTo.querySelector(".feature_name").innerHTML = foi_name;
                    renderTo.querySelector(".request_time").innerHTML = common.date.display(new Date());
                    renderTo.querySelector(".result_time").innerHTML = common.date.display(date);
                    renderTo.querySelector(".result_value").innerHTML = value;
                    clip.setAttribute("height", h);
                    clip.setAttribute("y", y_min);

                    SOS.describeSensor(obs.procedure, function(description) {
                        var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
                        for (var i in properties) {
                            var property = properties[i];
                            if (property.Quantity.definition == config.property) {
                                renderTo.querySelector(".property_name").innerHTML = property.name;
                            }
                        }
                    });
                } else {
                    console.error("Thermometer Widget Error - Got an invalid observation from the SOS service");
                }
            }
        }
    };
});
