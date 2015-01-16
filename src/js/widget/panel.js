/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['sos-data-access', 'locale-date'], function(data_access, ld) {
    "use strict";

    var inputs = ["title", "service", "offering", "feature", "properties", "footnote"];
    var preferredSizes = Array({ 'w': 400, 'h': 400});

    var template = [
        '<div class="panel widget">',
            '<h2></h2>',
            '<h3>Loading...</h3>',
            '<dl class="dl-horizontal"></dl>',
            '<div><span class="footnote"></span></div>',
        '</div>'
    ].join('');

    return {
        inputs: inputs,
        preferredSizes: preferredSizes, 

        init: function(config, el) {

            // Render template
            el.innerHTML = template;
            el.querySelector("h2").innerHTML = config.title;
            if(config.footnote != undefined) el.querySelector(".footnote").innerHTML = config.footnote;
            var subtitle = el.querySelector("h3");
            var panel = el.querySelector("dl");

            // Setup SOS data access
            var data = data_access(config, redraw);
            data.read();

            // Update view
            function redraw(data) {
                if (!data.length) {
                    subtitle.innerHTML = "(no data)";
                    return;
                }

                // Sort by property
                data.sort(function(a, b) {
                    return a.property.localeCompare(b.property);
                });

                subtitle.innerHTML = ld.display(data[0].time);
                var html = "";
                for (var i in data) {
                    var measure = data[i];
                    html += "<dt>" + measure.property + "</dt>";
                    html += "<dd>" + measure.value + " " + measure.uom + "</dd>";
                }
                panel.innerHTML = html;
            }
        }
    };
});
