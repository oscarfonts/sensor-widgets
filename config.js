var LIB_PATH = "../lib/";

require.config({
	baseUrl: '/modules',
	paths: {
		"factory": "widget/factory",
		"text": LIB_PATH + "text-2.0.10",
		"css": LIB_PATH + "css",
		"jquery": LIB_PATH + "jquery-2.1.0.min",
		"jquery-ui": LIB_PATH + "jquery-ui-1.10.4.custom.min",
		"jqgrid": LIB_PATH + "jqGrid-4.6.0.min",
		"moment": LIB_PATH + "moment-2.0.0.min",
		"daterangepicker": LIB_PATH + "daterangepicker-1.2",
		"graph": LIB_PATH + "graph-1.3.2.min"
	},
	shim: {
		"daterangepicker": {
			deps: ["jquery", "moment"]
		},
		"jquery-ui": {
			deps: ["jquery", "css!/css/jquery-ui-1.10.4.custom.min.css"]
		},
		"jqgrid": {
			deps: ["jquery-ui", "css!/css/ui.jqgrid.css"]
		},
		"graph": {
			deps: ["css!/css/graph.css"]
		}
	}
});
