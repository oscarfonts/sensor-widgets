/**
 * @author Martí Pericay <marti@pericay.com>
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define([], function() {
    "use strict";

    function showBuilderError(msg) {
        var el = document.getElementById("builderError");
        if (el) {
            el.innerHTML = msg;
        }
        else console.error(msg);
    }

    function hideBuilderError() {
        var el = document.getElementById("builderError");
        if (el) {
            el.innerHTML = "";
        }
    }

    function showGeneralError(msg, el) {
        if(!el) el = document.body;
        var div = document.createElement("div");
        div.className = 'text-danger error';
        el.appendChild(div);
        div.innerHTML = "Error: " + msg;
    }

    return {
        throwError: function(msg) {
            showBuilderError(msg);
        },
        hideError: function() {
            hideBuilderError();
        },
        throwWidgetError: function(msg, el) {
            showGeneralError(msg, el);
        }
    };
});
