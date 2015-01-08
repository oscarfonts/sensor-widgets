/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'css!widget/progressbar.css', 'locale-date'], function(data_access, drawing, ld) {
    "use strict";

    var inputs = ["service", "offering", "feature", "property", "min_value", "max_value", "refresh_interval", "footnote"];
    var preferredSizes = Array({ 'w': 500, 'h': 220});

    var template = [
        '<div class="progressbar widget">',
            '<h1 class="feature"></h1>',
            '<h3 class="property"></h3>',
            '<div class="progress">',
                '<span class="blue bar">',
                    '<div class="value"></div>',
                '</span>',
                '<div class="min">0</div>',
                '<div class="max">100</div>',
            '</div>',
            '<h3 class="date"></h3>',
            '<div><span class="footnote"></span></div>',
        '</div>'
    ].join('');

    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {

            // Render template
            el.innerHTML = template;
            el.querySelector(".min").innerHTML = config.min_value;
            el.querySelector(".max").innerHTML = config.max_value;
            
            el.querySelector(".footnote").innerHTML = config.footnote;

            // Setup SOS data access
            var data = data_access(config, redraw);
            setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            // Update view
            function redraw(data) {
                var measure = data[0];
                el.querySelector(".date").innerHTML = ld.display(measure.time);
                el.querySelector(".value").innerHTML = measure.value;
                el.querySelector(".feature").innerHTML = measure.feature;
                el.querySelector(".property").innerHTML = measure.property;

                var width = 100 * (measure.value - config.min_value) / (config.max_value - config.min_value);
                el.querySelector(".bar").style = "width: " + width + "%";
            }
        }
    };
});
