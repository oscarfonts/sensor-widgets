/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
import i18n from '../i18n';
import data_access from '../sos-data-access';
import drawing from './thermometer.svg';
import ld from '../locale-date';
import common from '../widget-common';

var template = [
    '<div class="thermometer widget">',
        '<h1 class="feature"></h1>',
        drawing,
        '<div class="data">',
        '<h2><span class="property"></span>: <span class="value"></span> ', i18n.t("Cel"), '</h2>',
        '<h3>', i18n.t("Request time"), ': <span class="request_time"></span></h3>',
        '<h3>', i18n.t("Result time"), ': <span class="result_time"></span></h3>',
        '</div>',
        '<div><span class="footnote"></span></div>',
    '</div>'
].join('');

var dy = 3.342574;
var y_max = 206.34359 + 267.40595;
var t_min = -24;

export default {
    inputs: common.inputs.concat(["feature", "property", "refresh_interval"]),
    optional_inputs: common.optional_inputs,
    preferredSizes: [{w: 300, h: 540}],

    init: function(config, el, errorHandler) {
        // Render template
        el.innerHTML = template;
        var elem = el.querySelector(".svg-temp");
        var clip = (elem.firstElementChild||elem.firstChild);

        //load widget common features
        common.init(config, el);

        // Setup SOS data access
        var data = data_access(config, redraw, errorHandler);
        var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
        data.read();

        // Update view
        function redraw(data) {
            var measure = data[0];
            if (measure) {
                el.querySelector(".feature").innerHTML = measure.feature;
                el.querySelector(".property").innerHTML = measure.property;
                el.querySelector(".value").innerHTML = measure.value;
                el.querySelector(".request_time").innerHTML = ld.display(new Date());
                el.querySelector(".result_time").innerHTML = ld.display(measure.time);

                var h = dy * (measure.value - t_min);
                var y_min = y_max - h;
                clip.setAttribute("height", h.toString());
                clip.setAttribute("y", y_min.toString());
            } else {
                el.querySelector(".value").innerHTML = i18n.t("(no data)");
            }
        }

        return {
            destroy: function() {
                clearInterval(refreshIntervalId);
            }
        };
    }
};
