/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define('wizard', ['i18n', 'SensorWidget', 'SOS', 'jquery', 'moment', 'daterangepicker', 'jquery-ui', 'bootstrap'], function(i18n, SensorWidget, SOS, $, moment) {
    "use strict";

    var bundle = {
      "Sensor Widget Wizard": {
        "es": "Wizard Sensor Widgets",
        "ca": "Wizard Sensor Widgets"
      },
      "Widget Configuration Form": {
        "es": "Formulario de configuración",
        "ca": "Formulari de configuració"
      },
      "Widget View": {
        "es": "Vista del Widget",
        "ca": "Vista del Widget"
      },
      "Take Away": {
        "es": "Para llevar",
        "ca": "Emporteu-vos-el"
      }
    };
    i18n.addTranslations(bundle);
    i18n.translateDocTree();

    var langMenu = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+i18n.langs()[i18n.getLang()]+' <span class="caret"></span></a>';
    langMenu += '<ul class="dropdown-menu">';
    for (var key in i18n.langs()) {
        if (key != i18n.getLang()) {
           langMenu += '<li><a href="?lang='+key+'">'+i18n.langs()[key]+'</a></li>';
        }
    }
    langMenu += '</ul>';
    document.getElementById('lang-selector').innerHTML = langMenu;

    menu();

    $(".panel").draggable({
        handle: ".panel-heading"
    });

    $(".width-resizable-panel").resizable({
        handles: 'e, w'
    });
    $("#widget-container").resizable();

    var renderTo = document.getElementById("widget-view");

    function menu() {
        var widgets = ["bearing", "gauge", "jqgrid", "map", "panel", "progressbar", "table", "thermometer", "timechart", "windrose"];
        var styles = ["default", "primary", "success", "info", "warning", "danger"];
        var html = "";
        for (var i in widgets) {
            var widget = widgets[i];
            var style = styles[i%styles.length];
            html += '<a role="button" class="menu-btn btn btn-'+style+' btn-lg" id="'+widget+'"><div class="flaticon-'+widget+'"></div>'+capitalize(widget)+'&nbsp;&nbsp;»</a>';
        }
        document.getElementById("main-menu").innerHTML = html;
        $(".menu-btn").click(function() {
            form(this.id);
        });
    }

    function htmlDecode(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function form(name) {
        $("#widget-form-title").html(i18n.t("{name} Widget Configuration", {name: capitalize(name)}));
        new SensorWidget(name).inspect(function(inputs, optionalInputs, preferredSizes) {
            var contents = '<fieldset><legend>' + i18n.t("Mandatory inputs") + '</legend>';
            var input, select, label, options;

            for (var i in inputs) {
                input = inputs[i];
                select = "";
                label = capitalize(input);
                options = "";

                switch (input) {
                    case "service":
                    case "offering":
                    case "feature":
                    case "property":
                        select = '<select class="form-control" id="' + input + '"></select>';
                        break;
                    case "features":
                    case "properties":
                        select = '<select class="form-control" multiple id="' + input + '"></select>';
                        label += " " + i18n.t("(multiselect)");
                        break;
                    case "refresh_interval":
                        var intervals = [5, 10, 30, 60, 120];
                        for (var j in intervals) {
                            var value = intervals[j];
                            options += '<option id="' + value + '">' + value + '</option>';
                        }
                        select = '<select class="form-control" id="' + input + '">' + options + '</select>';
                        break;
                    case "time_start":
                        if ($.inArray("time_end", inputs)) {
                            label = i18n.t("Time Range") + " (UTC)";
                            select = '<input class="form-control" type="text" id="time_range" disabled />';
                        }
                        break;
                    case "time_end":
                        break;
                    default:
                        select = '<input class="form-control" type="text" value="" id="' + input + '"/>';
                }

                if (select) {
                    contents += '<div class="form-group">' + '<label class="col-lg-4 control-label" for="' + input + '">' + label + '</label><div class="col-lg-8">' + select + '</div></div>';
                }
            }

            contents += '</fieldset>';

            contents += '<fieldset><legend>' + i18n.t("Optional inputs") + '</legend>';
            for (i in optionalInputs) {
                input = optionalInputs[i];
                select = "";
                label = capitalize(input);
                options = "";
                switch(input) {
                    case "footnote":
                        select = '<textarea class="form-control" value="" id="' + input + '"></textarea>';
                        break;
                    case "base_map":
                        for (var key in inputs.base_maps) {
                            options += '<option id="' + key + '">' + key + '</option>';
                        }
                        select = '<select class="form-control" id="' + input + '">' + options + '</select>';
                        break;
                    default:
                        select = '<textarea class="form-control" value="" id="' + input + '"></textarea>';
                }
                contents += '<div class="form-group">' + '<label class="col-lg-4 control-label" for="' + input + '">' + label + '</label><div class="col-lg-8">' + select + '</div></div>';
            }
            contents += '</fieldset>';

            contents += '<fieldset><legend>' + i18n.t("Widget dimensions") + '</legend>';
            input = "sizes";
            label = i18n.t("Initial Size");

            for (i in preferredSizes) {
                var size = preferredSizes[i];
                options += '<option id="size" value="' + i + '">' + size.w + " x " + size.h + ' px</option>';
            }
            var control = '<select class="form-control" id="sizes">' + options + '</select>';
            contents += '<div class="form-group">' + '<label class="col-lg-4 control-label" for="' + input + '">' + label + '</label><div class="col-lg-8">' + control + '</div></div>';
            contents += '</fieldset>';

            contents += '<input type="button" name="build" class="btn btn-primary pull-right" value="' + i18n.t("Create Widget") + '&nbsp;&nbsp;»"/>';

            $("#widget-form").html(contents);

            $('[name="build"]').data({
                name: name,
                inputs: inputs,
                optionalInputs: optionalInputs,
                preferredSizes: preferredSizes
            }).click(loadWidget);

            // Setup the SOS parameters: service, offering, feature(s) and property(ies)
            setService(["http://demo.geomati.co/sos/json", "http://sensors.portdebarcelona.cat/sos/json", "/52n-sos/sos/json"]);

            $('#service').change(function() {
                errorHandler();
                var service = $('#service').find('option:selected').attr("id");
                setOfferings(service);
            });

            $('#offering').change(function() {
                var procedure = $('#offering').find('option:selected').data("procedure");
                setFeatures(procedure);
                setProperties(procedure);
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
        });
    }

    function setService(urls) {
        var service = $('#service');
        if (urls && service) {
            service.append($('<option>').append(i18n.t("Select a Service...")));
            for (var i in urls) {
                var url = urls[i];
                service.append($('<option>').attr('id', url).append(url));
            }
        }
    }

    function setOfferings(url) {
        clearOptions('#offering', '#property', '#properties', '#feature', '#features');

        if (url) {
            $('#offering').append($('<option>').append(i18n.t("Select an Offering...")));
        } else {
            return;
        }

        SOS.setUrl(url);
        SOS.getCapabilities(function(offerings) {
            for (var i in offerings) {
                var offering = offerings[i];

                $("#offering").append($('<option>').attr('id', offering.identifier).data('procedure', offering.procedure[0]).append(offering.name));
            }
        }, errorHandler);
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

        }, errorHandler);
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

        }, errorHandler);
    }

    function setDateRange() {
        var control = $('#time_range');
        if (control.length) {
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
                var from, to;
                for (var i = 1; i < availabilities.length; i++) {
                    from = availabilities[i].phenomenonTime[0];
                    to = availabilities[i].phenomenonTime[1];
                    if (from < abs_from) {
                        abs_from = from;
                    }
                    if (to > abs_to) {
                        abs_to = to;
                    }
                }

                moment.locale(i18n.getLang());

                var ranges = [];
                ranges[i18n.t('Today')] = [moment().startOf('day'), moment()];
                ranges[i18n.t('Last hour')] = [moment().subtract(1, 'hour'), moment()];
                for(var n in [3, 6, 12, 24]) {
                    ranges[i18n.t('Last {n} hours', {n: n})] = [moment().subtract(n, 'hours'), moment()];
                }

                var options = {
                    timePicker: true,
                    format: i18n.t('MMM D, YYYY H:mm'),
                    timePickerIncrement: 5,
                    timePicker12Hour: false,
                    timePickerSeconds: false,
                    timeZone: '+00:00',
                    minDate: moment.utc(abs_from),
                    maxDate: moment.utc(abs_to),
                    dateLimit: {
                        days: 7
                    },
                    ranges: ranges,
                    locale: {
                        applyLabel: i18n.t('Apply'),
                        cancelLabel: i18n.t('Cancel'),
                        fromLabel: i18n.t('From'),
                        toLabel: i18n.t('To'),
                        weekLabel: i18n.t('W'),
                        customRangeLabel: i18n.t('Custom Range')
                    }
                };
                var picker;
                if (control.prop('disabled')) {
                    control.daterangepicker(options);
                    picker = control.data('daterangepicker');
                    control.prop('disabled', false);
                    picker.setStartDate(moment.max(moment.utc(abs_from), moment.utc(abs_to).subtract(1, 'day')));
                    picker.setEndDate(moment.utc(abs_to));
                } else {
                    picker = control.data('daterangepicker');
                    picker.setOptions(options);
                    var timeZoneOffset = new Date().getTimezoneOffset();
                    from = picker.startDate.subtract(timeZoneOffset, 'minutes');
                    to = picker.endDate.subtract(timeZoneOffset, 'minutes');
                    picker.setStartDate(moment.max(moment.utc(abs_from), from));
                    picker.setEndDate(moment.min(moment.utc(abs_to), to));
                }

            }, errorHandler);
        }
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
        var params = $('[name="build"]').data();
        var config = {};

        var getId = function() {
            return this.id;
        };

        var name, el, value;

        for (var i in params.inputs) {
            name = params.inputs[i];
            el = $('#'+name);
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
                case "time_start":
                    value = $('#time_range').data('daterangepicker').startDate.utc().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
                    break;
                case "time_end":
                    value = $('#time_range').data('daterangepicker').endDate.utc().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
                    break;
                default:
                    value = el.val();
            }
            if (value) {
            	config[name] = value;
            }
        }

        for (i in params.optionalInputs) {
            name = params.optionalInputs[i];
            el = $('#'+name);
            value = el.val();
            if (value) {
            	config[name] = value;
            }
        }

        var preferredSize = params.preferredSizes[$("#sizes").val()];

        // set preferred size to the dialog to start with
        var widgetContainer = $("#widget-container");
        widgetContainer.draggable();

        widgetContainer.resizable("destroy");
        $("#widget-container").width(preferredSize.w).height(preferredSize.h+39);

        var instance = new SensorWidget(params.name, config, renderTo);

        widgetContainer.resizable({
            helper: "ui-resizable-helper",
            resize: function( event, ui ) {
            	//refresh embed code snippet (we use the iframe tag with dialog's current width and height)
                document.getElementById('embed').innerHTML = htmlDecode(instance.iframe(ui.size.width, ui.size.height-39));
            }
        });

        //refresh code snippets for the first time
        document.getElementById('code').innerHTML = instance.javascript();
        document.getElementById('embed').innerHTML = htmlDecode(instance.iframe(preferredSize.w, preferredSize.h));
        document.getElementById('link').innerHTML = '<a href="'+instance.url()+'" target="_blank">'+instance.url()+'</a>';
    }

    function errorHandler(message, url, request) {
        var text = "";
        if (url){
            text = "[" + url + "] ";
        }
        if (request && request.request) {
            text += request.request + ": ";
        }
        if (message) {
            text += message;
        }
        renderTo.innerHTML = '<div class="text-danger">' + text + '</div>';
    }

    function capitalize(string) {
        return i18n.t(string.toLowerCase().replace(/_/g, " ").replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        }));
    }

});

require(["wizard"]);