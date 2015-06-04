/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'text!widget/gauge.svg', 'widget-common'], function(data_access, drawing, common) {
    "use strict";

    var template = [
        '<div class="gauge widget">',
            drawing,
            '<div><span class="footnote"></span></div>',
        '</div>'].join('');

    return {
        inputs: common.inputs.concat(["feature", "property", "refresh_interval"]),
        optional_inputs: common.optional_inputs,
        preferredSizes: [{w: 300, h: 300}],

        init: function(config, el) {
            // Render template
            el.innerHTML = template;
            var arrow = el.querySelector(".arrow");
            var title = el.querySelector(".title");
            var value = el.querySelector(".value");

            //load widget common features
            common.init(config, el);

            // Setup SOS data access
            var data = data_access(config, redraw);
            var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            // Update view
            function redraw(data) {
                var measure = data[0];
                title.innerHTML = measure.property;
                value.innerHTML = measure.value + " %";
                arrow.setAttribute("transform", "rotate(" + 2.7 * measure.value + ", 365.396, 495)");
            }

            return {
                destroy: function() {
                    clearInterval(refreshIntervalId);
                }
            }

        }
    };
});
