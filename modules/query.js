/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'jquery', 'daterangepicker'], function(SOS, $) {
	$(function() {
		var featureNames = {},
			propertyNames = {};

		setServices([
			"http://localhost:8080/52n-sos/sos/json",
			"http://sensorweb.demo.52north.org/52n-sos-webapp/sos/json",
			"http://172.17.4.37:8080/52n-sos/sos/json"
		]);

		$('#services').change(function() {
			setOfferings($('#services option:selected').attr("id"));
		});

		$('#offerings').change(function() {
			setProperties($('#offerings option:selected').data("procedure"));
			setFeatures($('#offerings option:selected').data("procedure"));
			setDateRange();
		});

		$('#features').change(loadData);

		$('#properties').change(loadData);
		
		$('#date_range').dateRangePicker({
			separator: ' to ',
			language: 'en',
			startOfWeek: 'monday',
			format: 'YYYY-MM-DD[T]HH:mm:ss[Z]',
			//startDate: X, // TODO getDataAvailability
			//endDate: X, // TODO getDataAvailability
			shortcuts: {
				'prev-days': [1,3,5],
				'prev' : ['week']
			},
			time: {
				enabled: true
			},
			getValue: function() {
				if ($('#date_from').val() && $('#date_to').val())
					return $('#date_from').val() + ' to ' + $('#date_to').val();
				else
					return '';
			},
			setValue: function(s, date1, date2) {
				$('#date_from').val(date1);
				$('#date_to').val(date2);
			}
		}).bind('datepicker-change', loadData);

		function loadData() {
			var offering = $('#offerings option:selected').attr("id");
			var features = $('#features option:selected').map(function() {
				return this.id;
			}).get();
			var properties = $('#properties option:selected').map(function() {
				return this.id;
			}).get();
			var dateFrom = $('#date_from').val();
			var dateTo = $('#date_to').val();
					
			setData(offering, features, properties, dateFrom, dateTo);
		}

		function setServices(urls) {
			clearOptions('#services', '#offerings', '#features', '#properties');
			featureNames = {};
			propertyNames = {};
			
			if(urls) {
				$('#services').append($('<option>').append("Select a Service..."));
			} else {
				return;
			}
			
			for (i in urls) {
				url = urls[i];
				$('#services').append($('<option>')
					.attr('id', url)
					.append(url)
				);					
			}
		};

		function setOfferings(url) {
			clearOptions('#offerings', '#properties', '#features');
			featureNames = {};
			propertyNames = {};

			if(url) {
				$('#offerings').append($('<option>').append("Select an Offering..."));
			} else {
				return;
			}

			SOS.setUrl(url);
			SOS.getCapabilities(function(offerings) {
				raw(offerings);

				for (i in offerings) {
					var offering = offerings[i];

					$("#offerings").append($('<option>')
		                .attr('id', offering.identifier)
		                .data('procedure', offering.procedure[0])
		                .append(offering.name)
		            );
				}
			});
		};

		function setProperties(procedure) {
			clearOptions('#properties');
			propertyNames = {};

			if (!procedure) {
				return;
			}

			SOS.describeSensor(procedure, function(description) {
				raw(description);

				var properties = description.hasOwnProperty("ProcessModel")
					 	? description.ProcessModel.outputs.OutputList.output
						: description.System.outputs.OutputList.output;

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
							if(type == "Quantity" && property[type].hasOwnProperty("uom")) {
								property.description += " [" + property[type].uom.code + "]";
							}
							property.description += ")";
						}
					}

					propertyNames[property.id] = property.description;

					$("#properties").append($('<option>')
		                .attr('id', property.id) 
		                .append(property.description)
		            );

				}

			});
		};

		function setFeatures(procedure) {
			clearOptions('#features');
			featureNames = {};

			if (!procedure) {
				return;
			}

			SOS.getFeatureOfInterest(procedure, function(features) {
				raw(features);

				var properties;
				for (i in features) {
					var feature = features[i];
					var id = feature.identifier.value;
					var name = feature.name.value;

					featureNames[id] = name;

					$("#features").append($('<option>')
		                .attr('id', id) 
		                .append(name)
		            );
				}

			});
		};
		
		function setDateRange() {
			$('#date_from').prop('disabled', false);
			$('#date_from').prop('readonly', true);
			$('#date_to').prop('disabled', false);
			$('#date_to').prop('readonly', true);
		};

		function setData(offering, features, properties, dateFrom, dateTo) {
			var dateRange = (dateFrom && dateTo) ? [dateFrom, dateTo] : null;
			
			SOS.getObservation(offering, features, properties, dateRange, function(observations) {
				raw(observations);

				function d(n) {
					return n < 10 ? "0" + n : "" + n;
				};

				var rows = [];
				for (i in observations) {
					var observation = observations[i];

					var phen_time = observation.phenomenonTime;
					var time = new Date(phen_time instanceof Array ? phen_time[0] : phen_time);
					time = time.getUTCFullYear() + "/" + d(time.getUTCMonth() + 1) + "/" + d(time.getUTCDate()) +
					 " " + d(time.getUTCHours()) + ":" + d(time.getUTCMinutes()) + ":" + d(time.getUTCSeconds());
					
					var result = observation.result;

					rows.push({
						feature: featureNames[observation.featureOfInterest.identifier["value"]],
						property: propertyNames[observation.observableProperty],
						time: time,
						value: result.hasOwnProperty("value") ? result.value : result,
						uom: result.hasOwnProperty("uom") ? result.uom : "(N/A)" 
					});
				}

				var sorted = rows.sort(function(r1, r2) {
					return (r1.time > r2.time) ? 1 : -1;
				});

				var tbl = "<table class='results'>"
						+ "<th>Feature</th><th>Property</th><th>Time</th><th>Value</th><th>UoM</th>";
			    $.each(sorted, function() {
			        var row = "";
			        $.each(this, function(key, value) {
			            row += "<td>"+value+"</td>";
			        });
			        tbl += "<tr>"+row+"</tr>";                 
			    });
				tbl += "</table>";
			    $("#table").html(tbl);
			});
		};

		function clearOptions() {
			for (var i = 0; i < arguments.length; i++) {
				$(arguments[i]).find('option').remove();
			}
			$('#date_from').prop('disabled', true);
			$('#date_to').prop('disabled', true);
			$("#table").html("");
		}
	
		function raw(json) {
			$("#raw").html(JSON.stringify(json, undefined, 2));
		}
		
	});
});
