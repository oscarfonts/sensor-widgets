/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'text!widget/gauge.svg'], function(data_access, drawing) {
    "use strict";

    var inputs = ["service", "offering", "feature", "property", "refresh_interval", "footnote"];
    
    var preferredSizes = Array({ 'w': 300, 'h': 300});

    var template = [
        '<div class="gauge widget">',
            drawing,
            '<div><span class="footnote"></span></div>',
        '</div>'].join('');

    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {

            // Render template
            el.innerHTML = template;
            var arrow = el.querySelector(".arrow");
            var title = el.querySelector(".title");
            var value = el.querySelector(".value");
            if(config.footnote != undefined) el.querySelector(".footnote").innerHTML = config.footnote;

            // Setup SOS data access
            var data = data_access(config, redraw);
            setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            // Update view
            function redraw(data) {
                var measure = data[0];
                title.innerHTML = measure.property;
                value.innerHTML = measure.value + " %";
                arrow.setAttribute("transform", "rotate(" + 2.7 * measure.value + ", 365.396, 495)");
            }
        }
    };
});
