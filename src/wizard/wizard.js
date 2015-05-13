/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define('wizard', ["builder"], function(builder) {
    "use strict";
    
    function init(renderTo) {
        if (!renderTo) {
            renderTo = document.body;
        }
        
        var config = {
        	"name": getParameterByName("name")
        };

        if (config.name) {
        	//Open builder of the selected widget
            builder.init(config, renderTo);
        } else {
            //No widget name specified. Showing chooser
            chooser(renderTo);
        }

    }
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function chooser(renderTo) {
        var widgets = ["bearing", "gauge", "jqgrid", "map", "panel", "progressbar", "table", "thermometer", "timechart", "windrose"];
        var contents = '<h1>Widget<br/><small>Wizard</small></h1>';

        for (var i in widgets) {
            var widget = widgets[i];
            contents += "<a class='big-button' id='" + widget + "' href='?name=" + widget + "' target='builder'> <div class='flaticon-" + widget + "'></div><b>NEW </b>" + widget + "</a>";
        }

        var iframe = '<div id="factory-right"><iframe name="builder" frameBorder="0"><p>Your browser does not support iframes.</p></iframe></div>';

        renderTo.innerHTML = '<div id="factory">' + contents + '</div>' + iframe;

    }

    init();

});

require(["wizard"]);