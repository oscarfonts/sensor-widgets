/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'jquery', 'jquery-ui', 'daterangepicker', 'css!widget/builder.css','css!/css/daterangepicker.css'], function(SOS, $) {

	var inputs = ["name"];

	function draw(widget, config, renderTo) {
		var contents = '<h1>' + capitalize(config.name) + ' Widget<br/><small>Builder</small></h1>';

		for (var i in widget.inputs) {
			var input = widget.inputs[i];
			var select = "";
			var label = capitalize(input);

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
					var options = "", intervals = [5, 10, 30, 60, 120];
					for (i in intervals) {
						var value = intervals[i];
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
				default:
					select = '<input type="text" value="" id="' + input + '"/>';
			}

			if (select) {
				contents += '<div class="select">' + '<label for="' + input + '">' + label + ':</label>' + select + '</div>';
			}
		}

		contents += '<button name="build">Create Widget</button>';

		renderTo.innerHTML = '<div id="editor">' + contents + '</div>' + '<div id="preview"><h1 id="header"><img src="/img/logo.svg"/>Widget<br/><small>Preview</small></h1>' + '<div id="widget"></div></div>';

		$("#widget").resizable({
			helper: "ui-resizable-helper"
		});

		$("#widget").draggable({
			opacity: 0.35
		});

		$('[name="build"]').data({
			name: config.name,
			inputs: widget.inputs
		}).click(loadWidget);

		// Setup the SOS parameters: service, offering, feature(s) and property(ies)
		setService(["http://localhost:8080/52n-sos/sos/json", "http://sensorweb.demo.52north.org/52n-sos-webapp/sos/json", "http://172.17.4.37:8080/52n-sos/sos/json"]);

		$('#service').change(function() {
			setOfferings($('#service option:selected').attr("id"));
		});

		$('#offering').change(function() {
			setFeatures($('#offering option:selected, #offerings option:selected').data("procedure"));
			setProperties($('#offering option:selected, #offerings option:selected').data("procedure"));
			setTimeRange();
		});

		$('#time_range').dateRangePicker({
			separator: ' to ',
			language: 'en',
			startOfWeek: 'monday',
			format: 'YYYY-MM-DD[T]HH:mm:ssZ',
			//startDate: X, // TODO getDataAvailability
			endDate: moment.utc(), // TODO getDataAvailability
			autoClose: true,
			showShortcuts: false,
			shortcuts: null,
			/* This is buggy
			customShortcuts: [{
				name: 'Last 10 minutes',
				dates: function() {
					var end = new Date();
					var start = moment().subtract('minutes', 10).toDate();
					return [start, end];
				}
			},{
				name: 'Last hour',
				dates: function() {
					var end = new Date();
					var start = moment().subtract('hours', 1).toDate();
					return [start, end];
				}
			},{
				name: 'Today',
				dates: function() {
					var end = new Date();
					var start = moment().startOf('day').toDate();
					return [start, end];
				}
			}],
			*/
			time: {
				enabled: true
			},
			getValue: function() {
				if ($('#time_start').val() && $('#time_end').val())
					return $('#time_start').val() + ' to ' + $('#time_end').val();
				else
					return '';
			},
			setValue: function(s, date1, date2) {
				$('#time_start').val(moment(date1).utc().format());
				$('#time_end').val(moment(date2).utc().format());
			}
		});
	}

	function setService(urls) {
		if (urls && $('#service')) {
			$('#service').append($('<option>').append("Select a Service..."));
			for (i in urls) {
				url = urls[i];
				$('#service').append($('<option>').attr('id', url).append(url));
			}
		} else {
			return;
		}
	}

	function setOfferings(url) {
		clearOptions('#offering', '#property', '#properties', '#feature', '#features');
		featureNames = {};
		propertyNames = {};

		if (url) {
			$('#offering').append($('<option>').append("Select an Offering..."));
		} else {
			return;
		}

		SOS.setUrl(url);
		SOS.getCapabilities(function(offerings) {
			for (i in offerings) {
				var offering = offerings[i];

				$("#offering").append($('<option>').attr('id', offering.identifier).data('procedure', offering.procedure[0]).append(offering.name));
			}
		});
	};

	function setProperties(procedure) {
		clearOptions('#property', '#properties');
		propertyNames = {};

		if (!procedure) {
			return;
		}

		SOS.describeSensor(procedure, function(description) {
			var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;

			properties = properties instanceof Array ? properties : [properties];

			for (i in properties) {
				var property = properties[i];
				var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];

				for (i in types) {
					var type = types[i];
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

				propertyNames[property.id] = property.description;

				$("#property, #properties").append($('<option>').attr('id', property.id).append(property.description));

			}

		});
	};

	function setFeatures(procedure) {
		clearOptions('#feature', '#features');
		featureNames = {};

		if (!procedure) {
			return;
		}

		SOS.getFeatureOfInterest(procedure, function(features) {
			var properties;
			for (i in features) {
				var feature = features[i];
				var id = feature.identifier.value;
				var name = feature.name.value;

				featureNames[id] = name;

				$("#feature, #features").append($('<option>').attr('id', id).append(name));
			}

		});
	};

	function setTimeRange() {
		$('#time_start').prop('disabled', false);
		$('#time_start').prop('readonly', true);
		$('#time_end').prop('disabled', false);
		$('#time_end').prop('readonly', true); 
	};

	function clearOptions() {
		for (var i = 0; i < arguments.length; i++) {
			if ($(arguments[i])) {
				$(arguments[i]).find('option').remove();
			}
		}
		$('#time_start').prop('disabled', true);
		$('#time_end').prop('disabled', true);
	}

	function loadWidget() {
		var widget = $('[name="build"]').data();
		var params = [];
		params.push("name=" + widget.name);
		for (var i in widget.inputs) {
			var name = widget.inputs[i];
			var value;
			switch (name) {
				case "service":
				case "offering":
				case "feature":
				case "property":
					value = $('#' + name + ' option:selected').attr("id");
					break;
				case "features":
				case "properties":
					value = $('#' + name + ' option:selected').map(function() {
						return this.id;
					}).get();
					value = JSON.stringify(value);
					// Serialize array as single value
					break;
				default:
					value = $("#" + name).val();
			}
			if (value) {
				params.push(name + "=" + encodeURIComponent(value));
			}
		}
		var url = "?" + params.join("&");
		var iframe = '<iframe id="iframe" src="' + url + '" width="100%" height="100%" frameBorder="0"><p>Your browser does not support iframes.</p></iframe>';

		$("#widget").resizable("destroy");
		$("#widget").html(iframe);
		$("#widget").resizable({
			helper: "ui-resizable-helper"
		});
	}

	function capitalize(string) {
		return string.toLowerCase().replace("_", " ").replace(/(?:^|\s)\S/g, function(a) {
			return a.toUpperCase();
		});
	}

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			// TODO: Refactor. This may live better in factory.
			require(["widget/" + config.name], function(widget) {
				draw(widget, config, renderTo);
			}, function(error) {
				console.error("Widget '" + config.name + "' cannot be found.");
			});
		}
	};

});
