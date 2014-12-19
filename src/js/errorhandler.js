/**
 * @author Martí Pericay <marti@pericay.com>
 */
define(['jquery'], function($) {
	    "use strict";

	    return { 
	        throwError: function(msg) {
	        	$("#factoryError").html(msg).show();
	        }
	    };

});