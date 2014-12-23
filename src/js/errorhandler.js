/**
 * @author Martí Pericay <marti@pericay.com>
 */
define(['jquery'], function($) {
	    "use strict";

	    return { 
	        throwError: function(msg) {
	        	if($("#factoryError").length > 0) $("#factoryError").html(msg).show();
	        	else alert(msg);
	        }
	    };

});