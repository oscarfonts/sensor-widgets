/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define('wizard', ['SensorWidget', 'SOS', 'jquery', 'moment', 'errorhandler' ,'jquery-ui', 'daterangepicker', 'bootstrap'], function(SensorWidget, SOS, $, moment, errorhandler) {
    "use strict";

    menu();

    var sw = SensorWidget('bearing', {
      "service": "http://sensors.portdebarcelona.cat/sos/json",
      "offering": "http://sensors.portdebarcelona.cat/def/weather/offerings#1m",
      "feature": "http://sensors.portdebarcelona.cat/def/weather/features#02",
      "property": "http://sensors.portdebarcelona.cat/def/weather/properties#31",
      "refresh_interval": 15,
      "footnote": "A sample footnote for bearing widget"
    },
    document.getElementById('widget-preview'));

    document.getElementById('code').innerHTML = sw.javascript();
    document.getElementById('embed').innerHTML = htmlDecode(sw.iframe());
    document.getElementById('link').innerHTML = '<a href="'+sw.url()+'" target="_blank">'+sw.url()+'</a>';

    /*
    var name = getParameterByName("name");

    if (name) { // Open builder for the selected widget
        getBuilder({name: name}, document.body);
    } else {
        // No widget name specified. Show a list of widgets
        showList(document.body);
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    */

    function menu() {
        var widgets = ["bearing", "gauge", "jqgrid", "map", "panel", "progressbar", "table", "thermometer", "timechart", "windrose"];
        var styles = ["default", "primary", "success", "info", "warning", "danger"];
        var html = "";
        for (var i in widgets) {
            var widget = widgets[i];
            var style = styles[i%styles.length];
            html += '<a role="button" class="btn btn-'+style+' btn-lg" href="#'+widget+'"><div class="flaticon-'+widget+'"></div>'+capitalize(widget)+'&nbsp;&nbsp;»</a>';
        }
        document.getElementById("main-menu").innerHTML = html;
    }

    function htmlDecode(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function getBuilder(config, renderTo) {
        require(["widget/" + config.name], function(widget) {
            renderBuilder(widget, config, renderTo);
        }, function() {
            errorhandler.throwWidgetError("Widget '" + config.name + "' cannot be found.");
        });
    }

    function renderBuilder(widget, config, renderTo) {

    	var contents = '<h1>' + capitalize(config.name) + ' Widget<br/><small>Builder</small></h1>';

        for (var i in widget.inputs) {
            var input = widget.inputs[i];
            var select = "";
            var label = capitalize(input);
            var options = "";

            switch (input) {
                case "service":
                case "offering":
                case "feature":
                case "property":
                    select = '<select id="' + input + '"></select>';
                    break;
                case "features":
                case "properties":
                    select = '<select multiple id="' + input + '"></select>';
                    label += " (multiselect)";
                    break;
                case "refresh_interval":
                    var intervals = [5, 10, 30, 60, 120];
                    for (var j in intervals) {
                        var value = intervals[j];
                        options += '<option id="' + value + '">' + value + '</option>';
                    }
                    select = '<select id="' + input + '">' + options + '</select>';
                    break;
                case "time_start":
                    if ($.inArray("time_end", widget.inputs)) {
                        label = "Time Range";
                        select = '<span id="time_range"><span class="sublabel">From: </span><input type="text" id="time_start" value=""/><br/>';
                        select += '<span class="sublabel">To: </span><input type="text" id="time_end" value=""/></span>';
                    }
                    break;
                case "time_end":
                    break;
                case "footnote":
                    select = '<textarea value="" id="' + input + '"></textarea>';
                    break;
                case "baseMap":
                    for (var key in widget.baseMaps) {
	                    options += '<option id="' + key + '">' + key + '</option>';
	                }
		            select = '<select id="' + input + '">' + options + '</select>';
                    break;
                default:
                    select = '<input type="text" value="" id="' + input + '"/>';
            }

            if (select) {
                contents += '<div class="select">' + '<label for="' + input + '">' + label + ':</label>' + select + '</div>';
            }
        }

        contents += '<button name="build">Build</button>';

        contents += "<div id='builderError' class='error'></div>";

        //modal div
        contents += '<div id="codediv">' +
        	'<h3>Get the link</h3><h4>Get the link and send it or post it</h4><textarea id="linkinput" class="codeinput" readonly="true"></textarea><br/>' +
        	'<h3>Embed it</h3><h4>Resize the widget, copy this HTML code and paste it on your webpage</h4><textarea id="embedinput" class="codeinput" readonly="true"></textarea><br/>' +
        	'<h3>Use Javascript</h3><h4>Add the widget to your app using Javascript</h4><textarea id="jsinput" class="codeinput" readonly="true"></textarea></div>';

        renderTo.innerHTML = '<div id="editor">' + contents +
        	'</div>' + '<div id="preview"><h1 id="header">' +
        	'<img src="../img/logo.svg"/>Widget<br/><small>Preview</small></h1><button id="share" title="Take this widget to your webpage!">Share it</button>' + '<div id="widget-container"></div></div>';

        $("[name=build]").button();

        $("#widget-container").resizable({
            helper: "ui-resizable-helper"
        }).draggable({
            opacity: 0.35
        });

        $("#widget-container").append('<div id="widget"></div>');

        $('[name="build"]').data({
            name: config.name,
            inputs: widget.inputs,
            preferredSizes: widget.preferredSizes
        }).click(loadWidget);

        // Setup the SOS parameters: service, offering, feature(s) and property(ies)
        setService(["http://demo.geomati.co/sos/json", "http://sensors.portdebarcelona.cat/sos/json", "/52n-sos/sos/json"]);

        $('#service').change(function() {
        	errorhandler.hideError();
            var service = $('#service').find('option:selected').attr("id");
            setOfferings(service);
            setDateRange();

        });

        $('#offering').change(function() {
            var procedure = $('#offering').find('option:selected').data("procedure");
            setFeatures(procedure);
            setProperties(procedure);
            setDateRange();
        });

        $('#feature').change(function() {
            setDateRange();
        });

        $('#features').change(function() {
            setDateRange();
        });

        $('#property').change(function() {
            setDateRange();
        });

        $('#properties').change(function() {
            setDateRange();
        });

        var timeRange = $('#time_range');
        if (timeRange.length) {
            timeRange.dateRangePicker({
                separator: ' to ',
                language: 'en',
                startOfWeek: 'monday',
                format: 'YYYY-MM-DD[T]HH:mm:ssZ',
                //startDate: X, // TODO getDataAvailability
                endDate: moment.utc(), // TODO getDataAvailability
                autoClose: true,
                showShortcuts: false,
                shortcuts: null,
                time: {
                    enabled: true
                },
                getValue: function() {
                    var timeStart = $('#time_start').val();
                    var timeEnd = $('#time_end').val();
                    if (timeStart && timeEnd) {
                        return timeStart + ' to ' + timeEnd;
                    } else {
                        return '';
                    }
                },
                setValue: function(s, date1, date2) {
                    $('#time_start').val(moment(date1).utc().format());
                    $('#time_end').val(moment(date2).utc().format());
                }
            });
        }
    }

    function setService(urls) {
        var service = $('#service');
        if (urls && service) {
            service.append($('<option>').append("Select a Service..."));
            for (var i in urls) {
                var url = urls[i];
                service.append($('<option>').attr('id', url).append(url));
            }
        }
    }

    function setOfferings(url) {
        clearOptions('#offering', '#property', '#properties', '#feature', '#features');

        if (url) {
            $('#offering').append($('<option>').append("Select an Offering..."));
        } else {
            return;
        }

        SOS.setUrl(url);
        SOS.getCapabilities(function(offerings) {
            for (var i in offerings) {
                var offering = offerings[i];

                $("#offering").append($('<option>').attr('id', offering.identifier).data('procedure', offering.procedure[0]).append(offering.name));
            }
        });
    }

    function setProperties(procedure) {
        clearOptions('#property', '#properties');

        if (!procedure) {
            return;
        }

        SOS.describeSensor(procedure, function(description) {
            var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;

            properties = properties instanceof Array ? properties : [properties];

            for (var i in properties) {
                var property = properties[i];
                var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];

                for (var j in types) {
                    var type = types[j];
                    if (property.hasOwnProperty(type)) {
                        property.type = type;
                        property.id = property[type].definition;
                        property.description = property.name + " (" + type;
                        if (type == "Quantity" && property[type].hasOwnProperty("uom")) {
                            property.description += " [" + property[type].uom.code + "]";
                        }
                        property.description += ")";
                    }
                }
                $("#property, #properties").append($('<option>').attr('id', property.id).append(property.description));

            }

        });
    }

    function setFeatures(procedure) {
        clearOptions('#feature', '#features');

        if (!procedure) {
            return;
        }

        SOS.getFeatureOfInterest(procedure, function(features) {
            for (var i in features) {
                var feature = features[i];
                var id = feature.identifier.value;
                var name = feature.name.value;

                $("#feature, #features").append($('<option>').attr('id', id).append(name));
            }

        });
    }

    function setDateRange() {
        var procedure = $('#offering').find('option:selected').data("procedure");
        var feature = $('#feature').find('option:selected').attr("id");
        var property = $('#property').find('option:selected').attr("id");
        var features = feature ? feature : $('#features').find('option:selected').map(function() {
            return this.id;
        }).get();
        var properties = property ? property : $('#properties').find('option:selected').map(function() {
            return this.id;
        }).get();

        SOS.getDataAvailability(procedure, features, properties, function(availabilities) {
            var abs_from = availabilities[0].phenomenonTime[0];
            var abs_to = availabilities[0].phenomenonTime[1];
            for (var i = 1; i < availabilities.length; i++) {
                var from = availabilities[i].phenomenonTime[0];
                var to = availabilities[i].phenomenonTime[1];
                if (from < abs_from) {
                    abs_from = from;
                }
                if (to > abs_to) {
                    abs_to = to;
                }
            }
            $("#time_start").val(moment(abs_from).utc().format());
            $("#time_end").val(moment(abs_to).utc().format());
        });
    }

    function clearOptions() {
        for (var i = 0; i < arguments.length; i++) {
            if ($(arguments[i])) {
                $(arguments[i]).find('option').remove();
            }
        }
        $("#time_start").val("");
        $("#time_end").val("");
    }

    function loadWidget() {
        var widget = $('[name="build"]').data();
        var config = {};

        var getId = function() {
            return this.id;
        };

        for (var i in widget.inputs) {
            var name = widget.inputs[i];
            var el = $('#'+name);
            var value;
            switch (name) {
                case "service":
                case "offering":
                case "feature":
                case "property":
                    value = el.find('option:selected').attr("id");
                    break;
                case "features":
                case "properties":
                    value = el.find('option:selected').map(getId).get();
                    break;
                default:
                    value = el.val();
            }
            if (value) {
            	config[name] = value;
            }
        }

        // we will use only first preferred size, though we could have an array and draw a combo
        var preferredSize = widget.preferredSizes[0];

        // set preferred size to the dialog to start with
        var widgetContainer = $("#widget-container");
        widgetContainer.resizable("destroy");

        widgetContainer.width(preferredSize.w).height(preferredSize.h);

        var instance = new SensorWidget(widget.name, config, document.getElementById("widget"));

        widgetContainer.resizable({
            helper: "ui-resizable-helper",
            resize: function( event, ui ) {
            	//refresh embed code snippet (we use the iframe tag with dialog's current width and height)
                $("#embedinput").val(instance.iframe(ui.size.width, ui.size.height));
            }
        });

        //refresh code snippets for the first time
        $("#embedinput").val(instance.iframe(preferredSize.w,preferredSize.h));
        $("#linkinput").val(instance.url());
        $("#jsinput").val(instance.javascript());
        $(".codeinput").on("click", function() {this.focus();this.select();});
        var opt = {
            autoOpen: false,
            height: 500,
            width: 750,
            modal: true,
            title: "Share this widget"
        };

        $("#share").button().show().click(function() {
            $("#codediv").dialog(opt).dialog("open");
        });
    }

    function capitalize(string) {
        return string.toLowerCase().replace("_", " ").replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        });
    }

});

require(["wizard"]);