/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'text!widget/bearing.svg', 'locale-date', 'widget-common'], function(data_access, drawing, ld, common) {
    "use strict";

    var inputs = ["service", "offering", "feature", "property", "refresh_interval", "footnote", "css"];
    
    var preferredSizes = Array({ 'w': 570, 'h': 380}, {'w': 280, 'h': 540 });

    var template = [
        '<div class="bearing widget">',
            '<h1 class="feature"></h1>',
            drawing,
            '<div class="data">',
            '<div class="error" style="display:none;text-align:center;">(no data)</div>',
            '<h2><span class="property"></span>:<br/><span class="value"></span> deg</h2>',
            '<h3>Request time:<br/><span class="request_time"></span></h3>',
            '<h3>Result time:<br/><span class="result_time"></span></h3>',
            '</div>',
            '<div><span class="footnote"></span></div>',
        '</div>'].join('');
    
    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {
        	
            //load widget common features
        	common.init(config);
        	
        	// Render template
            el.innerHTML = template;
            var arrow = el.querySelector(".arrow");
            var shadow = el.querySelector(".shadow");
            arrow.style.visibility = shadow.style.visibility = 'hidden';
            if(config.footnote != undefined) el.querySelector(".footnote").innerHTML = config.footnote;

            // Setup SOS data access
            var data = data_access(config, redraw);
            setInterval(data.read, config.refresh_interval * 1000);
            data.read();


            // Update view
            function redraw(data) {
                var measure = data[0];
                el.querySelector(".error").style.display = 'none';
                el.querySelector(".request_time").innerHTML = ld.display(new Date());
                el.querySelector(".result_time").innerHTML = ld.display(measure.time);
                el.querySelector(".value").innerHTML = measure.value;
                el.querySelector(".feature").innerHTML = measure.feature;
                el.querySelector(".property").innerHTML = measure.property;
                arrow.setAttribute("transform", "rotate(" + measure.value + ", 256, 256)");
                shadow.setAttribute("transform", "translate(5, 5) rotate(" + measure.value + ", 256, 256)");
                arrow.style.visibility = shadow.style.visibility = 'visible';
            }
        }
    };
});
