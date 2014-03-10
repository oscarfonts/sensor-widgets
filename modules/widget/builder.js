/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'css!widget/builder.css'], function(SOS) {
	
	var inputs = {
		name: [true, false]
	};
	
	function draw(widget, config, renderTo) {
			// TODO form creation
			// ------------------
			// if "service"
			//   render as text
			//   validate URL
			//   onChange = validate URL, re-load "offering", "features" and "properties" selectors
			// else if "offering", "features" or "properties"
			//   render as select
			//   load values from "service", or throw a critical error
			// else if starts with "time"
			//   render as calendar selector,
			//   validate date_end > date_start, if applicable
			// else
			//   render as text input,

			var inputs = widget.inputs,
				widget_name = config.name,
				contents = '<h1>"'+capitalize(widget_name)+'" Widget Builder</h1>';
			for (var name in inputs) {
				var mandatory = inputs[name][0],
					multiple = inputs[name][1] ? "multiple" : "",
					label = capitalize(name) + (multiple ? " (multiselect)" : "");
				
				contents += '<div class="select">'
						  + '<label for="'+name+'">'+label+':</label>'
				    	  + '<select '+multiple+' id="'+name+'"></select>'
						  + '</div>';
			}
			renderTo.innerHTML = '<div id="editor">' + contents + '</div><div id="widget"></div>';

			// TODO general behaviour
			// ----------------------
			//
			// on Form Change:
			//   if (all mandatory fields are informed) render wizard in "#widget" div
			//   else inform which mandatory fields are still missing (maybe in the same "#widget" div)
	}
	
	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	return {
		inputs: inputs,
		init: function(config, renderTo) {
			// TODO: Refactor. This may live better in factory.
			require(["widget/"+config.name], function(widget) {
				draw(widget, config, renderTo);
			},
			function(error) {
				console.error("Widget '"+config.name+"' cannot be found.");
			});
		}
	};
	
});
