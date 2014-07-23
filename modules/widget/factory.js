/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(function() {

	function init(config, renderTo) {
		if (!renderTo) {
			renderTo = document.body;
		}

		if (config && config.name) {
			if (!config.service) {
				config.service = '/52n-sos/sos/json';
			}
			require(["widget/" + config.name], function(widget) {
				if (checkConfig(widget.inputs, config)) {
					console.info("Creating " + config.name + " widget from given parameters.");
					widget.init(config, renderTo);
				} else {
					console.warn("Widget '" + config.name + "' exists, but some mandatory parameters missing. Starting builder.");
					builder(config, renderTo);
				}
			}, function(error) {
				console.error("Widget '" + config.name + "' cannot be found. Showing chooser.");
				chooser(renderTo);
			});
		} else {
			console.info("No widget name specified. Showing chooser.");
			chooser(renderTo);
		}

	}

	function chooser(renderTo) {
		var widgets = ["timechart", "table", "table-plain", "panel", "gauge", "progressbar", "bearing", "windrose", "thermometer", "map"];
		var contents = '<h1>Widget<br/><small>Factory</small></h1>';

		for (var i in widgets) {
			var widget = widgets[i];
			contents += "<a class='big-button' id='" + widget + "' href='?name=" + widget + "' target='builder'> <div class='flaticon-" + widget + "'></div><b>NEW </b>" + widget + "</a>";
		}

		var iframe = '<div id="factory-right"><iframe name="builder" frameBorder="0"><p>Your browser does not support iframes.</p></iframe></div>';

		renderTo.innerHTML = '<div id="factory">' + contents + '</div>' + iframe;

		function clicked(e) {
			var name = "";
			builder({
				name: name
			}, renderTo);
		}
	}

	function builder(config, renderTo) {
		require(["widget/builder"], function(builder) {
			if (checkConfig(builder.inputs, config)) {
				builder.init(config, renderTo);
			} else {
				console.error("Some mandatory parameters missing for builder. Back to chooser.");
				chooser(renderTo);
			}
		});
	}

	function getParams() {
		function str2obj(search) {
			var obj = {};
			var arr = search.split("&");
			for (var i = 0; i < arr.length; i++) {
				var keyval = arr[i].split("=");
				obj[keyval[0]] = decodeURIComponent(keyval[1]);
			}
			return obj;
		}

		var search = window.location.search.substr(1);
		return search != null && search != "" ? str2obj(search) : null;
	}

	function checkConfig(inputs, config) {
		var missing = [];
		for (i in inputs) {
			var input = inputs[i];
			if (!config.hasOwnProperty(input)) {
				missing.push(input);
			}
		}
		if (missing.length) {
			console.warn("The following parameters are mandatory: " + missing.join(", "));
		}
		return !missing.length;
	}

	init(getParams());

});
