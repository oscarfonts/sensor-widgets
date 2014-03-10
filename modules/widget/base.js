/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(["require"], function(require) {
	return {
		setDefaults: function(object, defaults) {
			for (var key in defaults) {
				if (!object.hasOwnProperty(key)) {
					object[key] = defaults[key];
				}
			}
			return object;
		},
		loadCss: function(url) {
		    var link = document.createElement("link");
		    link.type = "text/css";
		    link.rel = "stylesheet";
		    link.href = require.toUrl(url);
		    document.getElementsByTagName("head")[0].appendChild(link);
		}
	};
});
