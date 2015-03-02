/**
 * @author Martí Pericay <marti@pericay.com>
 */
define(['jquery'], function($) {
	    "use strict";

	    return { 
	        throwError: function(msg) {
	        	if($("#builderError").length > 0) $("#builderError").html(msg).show();
	        	else console.error(msg);
	        },
	        hideError: function() {
	        	$("#builderError").hide();
	        },
	        throwWidgetError: function(msg) {
	        	var div = $("<div class='error'></div>").appendTo('body');
	        	div.html("Error: " + msg);
	        }
	    };

});