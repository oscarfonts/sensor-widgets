/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'text!widget/gauge.svg'], function(data_access, drawing) {

    var inputs = ["service", "offering", "feature", "property", "refresh_interval"];

    var template = [
        '<div class="gauge widget">',
            drawing,
        '</div>'].join('');

    return {
        inputs: inputs,

        init: function(config, el) {

            // Render template
            el.innerHTML = template;
            var arrow = document.getElementById("arrow"); // TODO use classes, not ID's

            // Setup SOS data access
            var data = data_access(config, update);
            setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            // Update view
            function update(date, value, feature, property) {
                document.getElementById("title").innerHTML = property; // TODO use classes, not ID's
                document.getElementById("value").innerHTML = value + " %"; // TODO use classes, not ID's
                arrow.setAttribute("transform", "rotate(" + 2.7 * value + ", 365.396, 495)");
            }
        }
    };
});
