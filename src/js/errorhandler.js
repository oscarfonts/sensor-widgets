/**
 * @author Martí Pericay <marti@pericay.com>
 */
define(['jquery'], function($) {
	    "use strict";
	    
	    function showBuilderError(msg) {
        	if($("#builderError").length > 0) $("#builderError").html(msg).show();
        	else console.error(msg);
	    }
	    
	    function hideBuilderError() {
	    	$("#builderError").hide();
	    }
	    
	    function showGeneralError(msg) {
		    var div = $("<div class='error'></div>").appendTo('body');
	    	div.html("Error: " + msg);
	    }

	    return { 
	        throwError: function(msg) {
	        	showBuilderError(msg);
	        },
	        hideError: function() {
	        	hideBuilderError();
	        },
	        throwWidgetError: function(msg) {
	        	showGeneralError(msg);
	        }
	    };

});