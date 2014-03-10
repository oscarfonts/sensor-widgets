var LIB_PATH = "../lib/";

require.config({
	baseUrl: '/modules',
    paths: {
    	"factory": "widget/factory",
        "text": LIB_PATH + "text-2.0.10",
        "css":  LIB_PATH + "css",
        "jquery": LIB_PATH + "jquery-2.1.0.min",
        "moment": LIB_PATH + "moment-2.0.0.min",
        "daterangepicker": LIB_PATH + "daterangepicker-1.2"
    },
    shim: {
    	"daterangepicker": {
    		deps: ["jquery", "moment"]
    	}
    }
});
