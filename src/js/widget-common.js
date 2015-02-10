/**
 * @author Martí Pericay <marti@pericay.com>
 */

 define(function($) {
	    "use strict";
	    
	    function loadCSS(fileName) {
        	var file = document.createElement("link");
        	file.setAttribute("rel", "stylesheet");
        	file.setAttribute("type", "text/css");
        	file.setAttribute("href", fileName);   	 
        	if (typeof file!="undefined") document.getElementsByTagName("head")[0].appendChild(file);
        };

	    return { 
	        init: function(config) {
	        	if(config.css != undefined) loadCSS(config.css);
	        }
	    };

});