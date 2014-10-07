/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'css!widget/progressbar.css', 'locale-date'], function(data_access, drawing, ld) {

    var inputs = ["service", "offering", "feature", "property", "min_value", "max_value", "refresh_interval"];

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
        '</div>'
    ].join('');

    return {
        inputs: inputs,

        init: function(config, el) {

            // Render template
            el.innerHTML = template;
            el.querySelector(".min").innerHTML = config.min_value;
            el.querySelector(".max").innerHTML = config.max_value;

            // Setup SOS data access
            var data = data_access(config, update);
            setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            // Update view
            function update(date, value, feature, property) {
                el.querySelector(".date").innerHTML = ld.display(date);
                el.querySelector(".value").innerHTML = value;
                el.querySelector(".feature").innerHTML = feature;
                el.querySelector(".property").innerHTML = property;

                var width = 100 * (value - config.min_value) / (config.max_value - config.min_value);
                el.querySelector(".bar").style = "width: " + width + "%";
            }
        }
    };
});
