/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'css!widget/progressbar.css', 'locale-date', 'widget-common'], function(data_access, drawing, ld, common) {
    "use strict";

    var inputs = ["service", "offering", "feature", "property", "min_value", "max_value", "refresh_interval", "footnote", "css"];
    var preferredSizes = Array({ 'w': 500, 'h': 220});

    var template = [
        '<div class="progressbar widget">',
            '<h1 class="feature"></h1>',
            '<h3 class="property"></h3>',
            '<div class="progress">',
                '<div class="min">0</div>',
                '<div class="max">100</div>',
                '<div class="background-bar">',
                    '<span class="green bar">',
                        '<div class="value"></div>',
                    '</span>',
                '</div>',
            '</div>',
            '<h3 class="date"></h3>',
            '<div><span class="footnote"></span></div>',
        '</div>'
    ].join('');

    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {
        	
            //load widget common features
        	common.init(config);
        	
            // Render template
            el.innerHTML = template;
            el.querySelector(".min").innerHTML = config.min_value;
            el.querySelector(".max").innerHTML = config.max_value;
            
            if(config.footnote != undefined) el.querySelector(".footnote").innerHTML = config.footnote;

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

                var fullspan = el.querySelector(".background-bar").offsetWidth;
                var proportion = (measure.value - config.min_value) / (config.max_value - config.min_value);
                var width = fullspan * proportion;

                el.querySelector(".bar").style.width = width + "px";
            }
        }
    };
});
