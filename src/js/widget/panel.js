/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['../i18n', '../sos-data-access', '../locale-date', '../widget-common'], function(i18n, data_access, ld, common) {
    "use strict";

    var template = [
        '<div class="panel widget">',
            '<h2></h2>',
            '<h3>', i18n.t("Loading..."), '</h3>',
            '<dl class="dl-horizontal"></dl>',
            '<div><span class="footnote"></span></div>',
        '</div>'
    ].join('');

    return {
        inputs: common.inputs.concat(["feature", "properties", "refresh_interval"]),
        optional_inputs: ["title"].concat(common.optional_inputs),
        preferredSizes: [{w: 400, h: 400}],

        init: function(config, el, errorHandler) {
            // Render template
            el.innerHTML = template;
            var title = el.querySelector("h2");
            var subtitle = el.querySelector("h3");
            var panel = el.querySelector("dl");

            //load widget common features
            common.init(config, el);

            // Setup SOS data access
            var data = data_access(config, redraw, errorHandler);
            var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
            data.read();

            // Update view
            function redraw(data) {
                if (!data.length) {
                    title.innerHTML = config.title || "";
                    subtitle.innerHTML = i18n.t("(no data)");
                    return;
                }

                // Get the most recent measure time as the reference one
                var mostRecentTime = new Date(Math.max.apply(Math,data.map(function(o){return o.time;})));

                // Sort by property
                data.sort(function(a, b) {
                    return a.property.localeCompare(b.property);
                });

                title.innerHTML = config.title || i18n.t("Last measures from") + " " + data[0].feature;
                subtitle.innerHTML = ld.display(mostRecentTime);
                var html = "";
                for (var i in data) {
                    var measure = data[i];
                    html += "<dt>" + measure.property + "</dt>";
                    if (measure.time.getTime() == mostRecentTime.getTime()) {
                        html += "<dd>" + measure.value + " " + measure.uom + "</dd>";
                    } else { // Outdated! Display distinctly and with corresponding date
                        html += "<dd class='outdated'>" + measure.value + " " + measure.uom + "* <span>*(" + ld.display(measure.time) + ")</span></dd>";
                    }
                }
                panel.innerHTML = html;

            }

            return {
                destroy: function() {
                    clearInterval(refreshIntervalId);
                }
            };
        }
    };
});
