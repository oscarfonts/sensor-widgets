(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36"],{

/***/ "./src/js/SOS.js":
/*!***********************!*\
  !*** ./src/js/SOS.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XML */ "./src/js/XML.js");
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    _url: null,

    setUrl: function(url) {
        this._url = url;
    },

    getCapabilities: function(callback, errorHandler) {
        var request = {
            request: "GetCapabilities",
            sections: ["Contents"]
        };

        this._send(request, function(response) {
            callback(response.contents);
        }, errorHandler);
    },

    describeSensor: function(procedure, callback, errorHandler) {
        var request = {
            request: "DescribeSensor",
            procedure: procedure,
            procedureDescriptionFormat: "http://www.opengis.net/sensorML/1.0.1"
        };

        this._send(request, function(response) {
            // Convert the SensorML description to a JSON object
            var description = response.procedureDescription.hasOwnProperty("description") ?
                    response.procedureDescription.description : response.procedureDescription;
            var json = _XML__WEBPACK_IMPORTED_MODULE_0__["default"].read(description, true);
            callback(json.SensorML.member);
        }, errorHandler);
    },

    getFeatureOfInterest: function(procedure, callback, errorHandler) {
        var request = {
            request: "GetFeatureOfInterest",
            procedure: procedure
        };

        this._send(request, function(response) {
            callback(response.featureOfInterest);
        }, errorHandler);
    },

    getDataAvailability: function(procedure, offering, features, properties, callback, errorHandler) {
        var request = {
            request: "GetDataAvailability"
        };
        if (procedure) {
            request.procedure = procedure;
        }
        if (offering) {
            request.offering = offering;
        }
        if (features && features.length) {
            request.featureOfInterest = features;
        }
        if (properties && properties.length) {
            request.observedProperty = properties;
        }

        this._send(request, function(response) {
            callback(response.dataAvailability);
        }, errorHandler);
    },

    getObservation: function(offering, features, properties, time, callback, errorHandler) {
        var request = {
            "request": "GetObservation"
        };

        if (offering) {
            request.offering = offering;
        }

        if (features && features.length) {
            request.featureOfInterest = features;
        }

        if (properties && properties.length) {
            request.observedProperty = properties;
        }

        if (time) {
            var operation;
            if (time.length && time.length == 2) {
                // Time Range
                operation = "during";
            } else {
                // Time Instant
                operation = "equals";
            }
            var filter = {};
            filter[operation] = {
                "ref": "om:resultTime",
                "value": time
            };
            request.temporalFilter = [filter];
        }

        this._send(request, function(response) {
            callback(response.observations);
        }, errorHandler);
    },

    _send: function(request, onSuccess, onError) {
        request.service = "SOS";
        request.version = "2.0.0";

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var response = xhr.responseText;
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    // OK, not JSON
                }
                if (xhr.status == 200) {
                    onSuccess.call(this, response);
                } else {
                    var e = {
                        status: xhr.statusText,
                        url: this._url,
                        request: request,
                        response: response
                    };
                    console.log(e);
                    if (onError) {
                        onError.call(this, e.status, e.url, e.request, e.response);
                    }
                }
            }
        }.bind(this);

        xhr.open("POST", this._url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(JSON.stringify(request));
    }
});

/***/ }),

/***/ "./src/js/XML.js":
/*!***********************!*\
  !*** ./src/js/XML.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */
/* harmony default export */ __webpack_exports__["default"] = ({
    read: function(xml, clean) {
        var X = {
            at: (clean ? "" : "@"),

            toObj: function(xml) {
                var o = {};
                if (xml.nodeType == 1) { // element node
                    if (xml.attributes.length) { // element with attributes
                        for (var i = 0; i < xml.attributes.length; i++) {
                            var name = xml.attributes[i].name;
                            var value = xml.attributes[i].value;
                            var is_ns = name.lastIndexOf("xmlns:", 0) === 0;
                            if (!(clean && is_ns)) { // Hide xmlns attributes
                                o[X.at + name] = (value || "").toString();
                            }
                        }
                    }
                    if (xml.firstChild) { // element has child nodes
                        var textChild = 0,
                            cdataChild = 0,
                            hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType == 1) {
                                hasElementChild = true;
                            } else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                                textChild++;
                                // non-whitespace text
                            } else if (n.nodeType == 4) {
                                cdataChild++;
                                // cdata section node
                            }
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) {
                                // structured element with evtl.
                                // a single text or/and cdata node
                                X.removeWhite(xml);
                                for (n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType == 3) { // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    } else if (n.nodeType == 4) { // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    } else if (o[n.nodeName]) {
                                        // multiple occurence of element
                                        if (o[n.nodeName] instanceof Array) {
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        } else {
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        }
                                    } else { // first occurence of element
                                        o[n.nodeName] = X.toObj(n);
                                    }
                                }
                            } else { // mixed content
                                if (!xml.attributes.length) {
                                    o = X.escape(X.innerXml(xml));
                                } else {
                                    o["#text"] = X.escape(X.innerXml(xml));
                                }
                            }
                        } else if (textChild) { // pure text
                            if (!xml.attributes.length) {
                                o = X.escape(X.innerXml(xml));
                            } else {
                                o["#text"] = X.escape(X.innerXml(xml));
                            }
                        } else if (cdataChild) { // cdata
                            if (cdataChild > 1) {
                                o = X.escape(X.innerXml(xml));
                            } else {
                                for (n = xml.firstChild; n; n = n.nextSibling) {
                                    o["#cdata"] = X.escape(n.nodeValue);
                                }
                            }
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) {
                        o = null;
                    }
                } else if (xml.nodeType == 9) { // document.node
                    o = X.toObj(xml.documentElement);
                } else if (xml.nodeType == 8) {
                    return xml.data;
                    // A comment
                } else {
                    console.error("unhandled node type: " + xml.nodeType);
                }

                return o;
            },

            innerXml: function(node) {
                var s = "";
                if ("innerHTML" in node) {
                    s = node.innerHTML;
                } else {
                    var asXml = function(n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++) {
                                var name = n.attributes[i].name;
                                var value = n.attributes[i].value || "";
                                s += " " + name + "=\"" + value.toString() + "\"";
                            }
                            if (n.firstChild) {
                                s += ">";
                                for (var c = n.firstChild; c; c = c.nextSibling) {
                                    s += asXml(c);
                                }
                                s += "</" + n.nodeName + ">";
                            } else {
                                s += "/>";
                            }
                        } else if (n.nodeType == 3) {
                            s += n.nodeValue;
                        } else if (n.nodeType == 4) {
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        }
                        return s;
                    };

                    for (var c = node.firstChild; c; c = c.nextSibling) {
                        s += asXml(c);
                    }
                }
                return s;
            },

            escape: function(txt) {
                return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
            },

            removeWhite: function(e) {
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) { // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                            // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        } else {
                            n = n.nextSibling;
                        }
                    } else if (n.nodeType == 1) { // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    } else { // any other node
                        n = n.nextSibling;
                    }
                }
                return e;
            }
        };

        // Strip namespaces from XML tags
        if (clean) {
            xml = xml.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, "<$1$3>");
        }

        // Convert to an XML DOM Document
        xml = (new DOMParser()).parseFromString(xml, "text/xml");

        // Start from document's root element
        if (xml.nodeType == 9) {
            xml = xml.documentElement;
        }

        var ret = {};
        ret[xml.nodeName] = X.toObj(X.removeWhite(xml));
        return ret;
    },

    write: function(object) {
        var toXml = function(v, name, ind) {
            var xml = "";
            if (v instanceof Array) {
                for (var i = 0, n = v.length; i < n; i++) {
                    xml += ind + toXml(v[i], name, ind + "\t") + "\n";
                }
            } else if (typeof(v) == "object") {
                var hasChild = false;
                xml += ind + "<" + name;
                for (var m in v) {
                    if (m.charAt(0) == "@") {
                        xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                    } else {
                        hasChild = true;
                    }
                }
                xml += hasChild ? ">" : "/>";
                if (hasChild) {
                    for (m in v) {
                        if (m == "#text") {
                            xml += v[m];
                        } else if (m == "#cdata") {
                            xml += "<![CDATA[" + v[m] + "]]>";
                        } else if (m.charAt(0) != "@") {
                            xml += toXml(v[m], m, ind + "\t");
                        }
                    }
                    xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
                }
            } else {
                xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
            }
            return xml;
        };

        var xml = "";
        for (var i in object) {
            xml += toXml(object[i], i, "");
        }
        return xml;
    }
});

/***/ }),

/***/ "./src/js/locale-date.js":
/*!*******************************!*\
  !*** ./src/js/locale-date.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "./src/js/i18n.js");
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */

var date = {
    utc: false,
    locale: navigator.language || navigator.browserLanguage
};

/* harmony default export */ __webpack_exports__["default"] = ({
    display: function(d) {
        if (!d) {
            return _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("(no date)");
        }
        if (date.utc) {
            return d.toLocaleString(date.locale, {
                timeZone: "UTC"
            }) + " UTC";
        } else {
            return d.toLocaleString(date.locale);
        }
    },
    locale: function(l) {
        if (l) {
            date.locale = l;
        }
        return date.locale;
    },
    utc: function(u) {
        if (typeof u !== 'undefined') {
            date.utc = u;
        }
        return date.utc;
    }
});


/***/ }),

/***/ "./src/js/widget-common.js":
/*!*********************************!*\
  !*** ./src/js/widget-common.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locale-date */ "./src/js/locale-date.js");
/**
 * @author Martí Pericay <marti@pericay.com>
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */


function loadCSS(url) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    if (typeof link != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(link);
    }
}

/* harmony default export */ __webpack_exports__["default"] = ({
    inputs: ["service", "offering"],
    optional_inputs: ["footnote", "custom_css_url", "display_utc_times"],

    init: function(config, el) {
        if (config.custom_css_url !== undefined) {
            loadCSS(config.custom_css_url);
        }
        if (config.footnote !== undefined && el.querySelector(".footnote")) {
            el.querySelector(".footnote").innerHTML = config.footnote;
        }
        if(config.display_utc_times) {
            _locale_date__WEBPACK_IMPORTED_MODULE_0__["default"].utc(true);
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvU09TLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9YTUwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xvY2FsZS1kYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQtY29tbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ3dCOztBQUVUO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUFHO0FBQzFCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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S0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2xDRjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0RBQUU7QUFDZDtBQUNBO0FBQ0EsQ0FBQyxFQUFDIiwiZmlsZSI6IndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzYuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCBYTUwgZnJvbSAnLi9YTUwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgX3VybDogbnVsbCxcblxuICAgIHNldFVybDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICB9LFxuXG4gICAgZ2V0Q2FwYWJpbGl0aWVzOiBmdW5jdGlvbihjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcmVxdWVzdDogXCJHZXRDYXBhYmlsaXRpZXNcIixcbiAgICAgICAgICAgIHNlY3Rpb25zOiBbXCJDb250ZW50c1wiXVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NlbmQocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmNvbnRlbnRzKTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgZGVzY3JpYmVTZW5zb3I6IGZ1bmN0aW9uKHByb2NlZHVyZSwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiRGVzY3JpYmVTZW5zb3JcIixcbiAgICAgICAgICAgIHByb2NlZHVyZTogcHJvY2VkdXJlLFxuICAgICAgICAgICAgcHJvY2VkdXJlRGVzY3JpcHRpb25Gb3JtYXQ6IFwiaHR0cDovL3d3dy5vcGVuZ2lzLm5ldC9zZW5zb3JNTC8xLjAuMVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2VuZChyZXF1ZXN0LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgU2Vuc29yTUwgZGVzY3JpcHRpb24gdG8gYSBKU09OIG9iamVjdFxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcmVzcG9uc2UucHJvY2VkdXJlRGVzY3JpcHRpb24uaGFzT3duUHJvcGVydHkoXCJkZXNjcmlwdGlvblwiKSA/XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2NlZHVyZURlc2NyaXB0aW9uLmRlc2NyaXB0aW9uIDogcmVzcG9uc2UucHJvY2VkdXJlRGVzY3JpcHRpb247XG4gICAgICAgICAgICB2YXIganNvbiA9IFhNTC5yZWFkKGRlc2NyaXB0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGpzb24uU2Vuc29yTUwubWVtYmVyKTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgZ2V0RmVhdHVyZU9mSW50ZXJlc3Q6IGZ1bmN0aW9uKHByb2NlZHVyZSwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiR2V0RmVhdHVyZU9mSW50ZXJlc3RcIixcbiAgICAgICAgICAgIHByb2NlZHVyZTogcHJvY2VkdXJlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2VuZChyZXF1ZXN0LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UuZmVhdHVyZU9mSW50ZXJlc3QpO1xuICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBnZXREYXRhQXZhaWxhYmlsaXR5OiBmdW5jdGlvbihwcm9jZWR1cmUsIG9mZmVyaW5nLCBmZWF0dXJlcywgcHJvcGVydGllcywgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiR2V0RGF0YUF2YWlsYWJpbGl0eVwiXG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9jZWR1cmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QucHJvY2VkdXJlID0gcHJvY2VkdXJlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZlcmluZykge1xuICAgICAgICAgICAgcmVxdWVzdC5vZmZlcmluZyA9IG9mZmVyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZWF0dXJlcyAmJiBmZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuZmVhdHVyZU9mSW50ZXJlc3QgPSBmZWF0dXJlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVxdWVzdC5vYnNlcnZlZFByb3BlcnR5ID0gcHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbmQocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmRhdGFBdmFpbGFiaWxpdHkpO1xuICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBnZXRPYnNlcnZhdGlvbjogZnVuY3Rpb24ob2ZmZXJpbmcsIGZlYXR1cmVzLCBwcm9wZXJ0aWVzLCB0aW1lLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgXCJyZXF1ZXN0XCI6IFwiR2V0T2JzZXJ2YXRpb25cIlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZlcmluZykge1xuICAgICAgICAgICAgcmVxdWVzdC5vZmZlcmluZyA9IG9mZmVyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZlYXR1cmVzICYmIGZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVxdWVzdC5mZWF0dXJlT2ZJbnRlcmVzdCA9IGZlYXR1cmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qub2JzZXJ2ZWRQcm9wZXJ0eSA9IHByb3BlcnRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgICAgdmFyIG9wZXJhdGlvbjtcbiAgICAgICAgICAgIGlmICh0aW1lLmxlbmd0aCAmJiB0aW1lLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gVGltZSBSYW5nZVxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IFwiZHVyaW5nXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRpbWUgSW5zdGFudFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IFwiZXF1YWxzXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZmlsdGVyID0ge307XG4gICAgICAgICAgICBmaWx0ZXJbb3BlcmF0aW9uXSA9IHtcbiAgICAgICAgICAgICAgICBcInJlZlwiOiBcIm9tOnJlc3VsdFRpbWVcIixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRpbWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0LnRlbXBvcmFsRmlsdGVyID0gW2ZpbHRlcl07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZW5kKHJlcXVlc3QsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5vYnNlcnZhdGlvbnMpO1xuICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBfc2VuZDogZnVuY3Rpb24ocmVxdWVzdCwgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgICAgIHJlcXVlc3Quc2VydmljZSA9IFwiU09TXCI7XG4gICAgICAgIHJlcXVlc3QudmVyc2lvbiA9IFwiMi4wLjBcIjtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPSywgbm90IEpTT05cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcy5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMuX3VybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yLmNhbGwodGhpcywgZS5zdGF0dXMsIGUudXJsLCBlLnJlcXVlc3QsIGUucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XG4gICAgfVxufTsiLCIvKiBUaGlzIHdvcmsgaXMgbGljZW5zZWQgdW5kZXIgQ3JlYXRpdmUgQ29tbW9ucyBHTlUgTEdQTCBMaWNlbnNlLlxuXG4gTGljZW5zZTogaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvTEdQTC8yLjEvXG4gVmVyc2lvbjogMC45XG4gQXV0aG9yOiAgU3RlZmFuIEdvZXNzbmVyLzIwMDZcbiBTZWU6ICAgICBodHRwOi8vZ29lc3NuZXIubmV0L2Rvd25sb2FkL3Byai9qc29ueG1sL1xuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVhZDogZnVuY3Rpb24oeG1sLCBjbGVhbikge1xuICAgICAgICB2YXIgWCA9IHtcbiAgICAgICAgICAgIGF0OiAoY2xlYW4gPyBcIlwiIDogXCJAXCIpLFxuXG4gICAgICAgICAgICB0b09iajogZnVuY3Rpb24oeG1sKSB7XG4gICAgICAgICAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoeG1sLm5vZGVUeXBlID09IDEpIHsgLy8gZWxlbWVudCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGlmICh4bWwuYXR0cmlidXRlcy5sZW5ndGgpIHsgLy8gZWxlbWVudCB3aXRoIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeG1sLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHhtbC5hdHRyaWJ1dGVzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0geG1sLmF0dHJpYnV0ZXNbaV0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzX25zID0gbmFtZS5sYXN0SW5kZXhPZihcInhtbG5zOlwiLCAwKSA9PT0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjbGVhbiAmJiBpc19ucykpIHsgLy8gSGlkZSB4bWxucyBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bWC5hdCArIG5hbWVdID0gKHZhbHVlIHx8IFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh4bWwuZmlyc3RDaGlsZCkgeyAvLyBlbGVtZW50IGhhcyBjaGlsZCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRDaGlsZCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2RhdGFDaGlsZCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudENoaWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0geG1sLmZpcnN0Q2hpbGQ7IG47IG4gPSBuLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ubm9kZVR5cGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50Q2hpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5ub2RlVHlwZSA9PSAzICYmIG4ubm9kZVZhbHVlLm1hdGNoKC9bXiBcXGZcXG5cXHJcXHRcXHZdLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENoaWxkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vbi13aGl0ZXNwYWNlIHRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZVR5cGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZGF0YUNoaWxkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNkYXRhIHNlY3Rpb24gbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dENoaWxkIDwgMiAmJiBjZGF0YUNoaWxkIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdHJ1Y3R1cmVkIGVsZW1lbnQgd2l0aCBldnRsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHNpbmdsZSB0ZXh0IG9yL2FuZCBjZGF0YSBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFgucmVtb3ZlV2hpdGUoeG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChuID0geG1sLmZpcnN0Q2hpbGQ7IG47IG4gPSBuLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5ub2RlVHlwZSA9PSAzKSB7IC8vIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bXCIjdGV4dFwiXSA9IFguZXNjYXBlKG4ubm9kZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5ub2RlVHlwZSA9PSA0KSB7IC8vIGNkYXRhIG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW1wiI2NkYXRhXCJdID0gWC5lc2NhcGUobi5ub2RlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvW24ubm9kZU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVsdGlwbGUgb2NjdXJlbmNlIG9mIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob1tuLm5vZGVOYW1lXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bbi5ub2RlTmFtZV1bb1tuLm5vZGVOYW1lXS5sZW5ndGhdID0gWC50b09iaihuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW24ubm9kZU5hbWVdID0gW29bbi5ub2RlTmFtZV0sIFgudG9PYmoobildO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGZpcnN0IG9jY3VyZW5jZSBvZiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tuLm5vZGVOYW1lXSA9IFgudG9PYmoobik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBtaXhlZCBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgheG1sLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gWC5lc2NhcGUoWC5pbm5lclhtbCh4bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bXCIjdGV4dFwiXSA9IFguZXNjYXBlKFguaW5uZXJYbWwoeG1sKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRleHRDaGlsZCkgeyAvLyBwdXJlIHRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXhtbC5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gWC5lc2NhcGUoWC5pbm5lclhtbCh4bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW1wiI3RleHRcIl0gPSBYLmVzY2FwZShYLmlubmVyWG1sKHhtbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2RhdGFDaGlsZCkgeyAvLyBjZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZGF0YUNoaWxkID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvID0gWC5lc2NhcGUoWC5pbm5lclhtbCh4bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSB4bWwuZmlyc3RDaGlsZDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bXCIjY2RhdGFcIl0gPSBYLmVzY2FwZShuLm5vZGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF4bWwuYXR0cmlidXRlcy5sZW5ndGggJiYgIXhtbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeG1sLm5vZGVUeXBlID09IDkpIHsgLy8gZG9jdW1lbnQubm9kZVxuICAgICAgICAgICAgICAgICAgICBvID0gWC50b09iaih4bWwuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhtbC5ub2RlVHlwZSA9PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4bWwuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBjb21tZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInVuaGFuZGxlZCBub2RlIHR5cGU6IFwiICsgeG1sLm5vZGVUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlubmVyWG1sOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChcImlubmVySFRNTFwiIGluIG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcyA9IG5vZGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhc1htbCA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLm5vZGVUeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiPFwiICsgbi5ub2RlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG4uYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IG4uYXR0cmlidXRlc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBuLmF0dHJpYnV0ZXNbaV0udmFsdWUgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiBcIiArIG5hbWUgKyBcIj1cXFwiXCIgKyB2YWx1ZS50b1N0cmluZygpICsgXCJcXFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIj5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IG4uZmlyc3RDaGlsZDsgYzsgYyA9IGMubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gYXNYbWwoYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIjwvXCIgKyBuLm5vZGVOYW1lICsgXCI+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIi8+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLm5vZGVUeXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IG4ubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLm5vZGVUeXBlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiPCFbQ0RBVEFbXCIgKyBuLm5vZGVWYWx1ZSArIFwiXV0+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gbm9kZS5maXJzdENoaWxkOyBjOyBjID0gYy5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBhc1htbChjKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVzY2FwZTogZnVuY3Rpb24odHh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR4dC5yZXBsYWNlKC9bXFxcXF0vZywgXCJcXFxcXFxcXFwiKS5yZXBsYWNlKC9bXFxcIl0vZywgJ1xcXFxcIicpLnJlcGxhY2UoL1tcXG5dL2csICdcXFxcbicpLnJlcGxhY2UoL1tcXHJdL2csICdcXFxccicpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlV2hpdGU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSBlLmZpcnN0Q2hpbGQ7IG47KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuLm5vZGVUeXBlID09IDMpIHsgLy8gdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW4ubm9kZVZhbHVlLm1hdGNoKC9bXiBcXGZcXG5cXHJcXHRcXHZdLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXJlIHdoaXRlc3BhY2UgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG54dCA9IG4ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5yZW1vdmVDaGlsZChuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gbnh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gbi5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLm5vZGVUeXBlID09IDEpIHsgLy8gZWxlbWVudCBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBYLnJlbW92ZVdoaXRlKG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IG4ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGFueSBvdGhlciBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gbi5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTdHJpcCBuYW1lc3BhY2VzIGZyb20gWE1MIHRhZ3NcbiAgICAgICAgaWYgKGNsZWFuKSB7XG4gICAgICAgICAgICB4bWwgPSB4bWwucmVwbGFjZSgvPChcXC8/KShbXjo+XFxzXSo6KT8oW14+XSspPi9nLCBcIjwkMSQzPlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnZlcnQgdG8gYW4gWE1MIERPTSBEb2N1bWVudFxuICAgICAgICB4bWwgPSAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoeG1sLCBcInRleHQveG1sXCIpO1xuXG4gICAgICAgIC8vIFN0YXJ0IGZyb20gZG9jdW1lbnQncyByb290IGVsZW1lbnRcbiAgICAgICAgaWYgKHhtbC5ub2RlVHlwZSA9PSA5KSB7XG4gICAgICAgICAgICB4bWwgPSB4bWwuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICByZXRbeG1sLm5vZGVOYW1lXSA9IFgudG9PYmooWC5yZW1vdmVXaGl0ZSh4bWwpKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgd3JpdGU6IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICB2YXIgdG9YbWwgPSBmdW5jdGlvbih2LCBuYW1lLCBpbmQpIHtcbiAgICAgICAgICAgIHZhciB4bWwgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gdi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgeG1sICs9IGluZCArIHRvWG1sKHZbaV0sIG5hbWUsIGluZCArIFwiXFx0XCIpICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZih2KSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhc0NoaWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgeG1sICs9IGluZCArIFwiPFwiICsgbmFtZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBtIGluIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0uY2hhckF0KDApID09IFwiQFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4bWwgKz0gXCIgXCIgKyBtLnN1YnN0cigxKSArIFwiPVxcXCJcIiArIHZbbV0udG9TdHJpbmcoKSArIFwiXFxcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ2hpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHhtbCArPSBoYXNDaGlsZCA/IFwiPlwiIDogXCIvPlwiO1xuICAgICAgICAgICAgICAgIGlmIChoYXNDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG0gaW4gdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0gPT0gXCIjdGV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sICs9IHZbbV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG0gPT0gXCIjY2RhdGFcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbCArPSBcIjwhW0NEQVRBW1wiICsgdlttXSArIFwiXV0+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG0uY2hhckF0KDApICE9IFwiQFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sICs9IHRvWG1sKHZbbV0sIG0sIGluZCArIFwiXFx0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHhtbCArPSAoeG1sLmNoYXJBdCh4bWwubGVuZ3RoIC0gMSkgPT0gXCJcXG5cIiA/IGluZCA6IFwiXCIpICsgXCI8L1wiICsgbmFtZSArIFwiPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeG1sICs9IGluZCArIFwiPFwiICsgbmFtZSArIFwiPlwiICsgdi50b1N0cmluZygpICsgXCI8L1wiICsgbmFtZSArIFwiPlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHhtbDtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgeG1sID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIHhtbCArPSB0b1htbChvYmplY3RbaV0sIGksIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4bWw7XG4gICAgfVxufTsiLCIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCBpMThuIGZyb20gJy4vaTE4bic7XG52YXIgZGF0ZSA9IHtcbiAgICB1dGM6IGZhbHNlLFxuICAgIGxvY2FsZTogbmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkaXNwbGF5OiBmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmICghZCkge1xuICAgICAgICAgICAgcmV0dXJuIGkxOG4udChcIihubyBkYXRlKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZS51dGMpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnRvTG9jYWxlU3RyaW5nKGRhdGUubG9jYWxlLCB7XG4gICAgICAgICAgICAgICAgdGltZVpvbmU6IFwiVVRDXCJcbiAgICAgICAgICAgIH0pICsgXCIgVVRDXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZC50b0xvY2FsZVN0cmluZyhkYXRlLmxvY2FsZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGxvY2FsZTogZnVuY3Rpb24obCkge1xuICAgICAgICBpZiAobCkge1xuICAgICAgICAgICAgZGF0ZS5sb2NhbGUgPSBsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlLmxvY2FsZTtcbiAgICB9LFxuICAgIHV0YzogZnVuY3Rpb24odSkge1xuICAgICAgICBpZiAodHlwZW9mIHUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBkYXRlLnV0YyA9IHU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGUudXRjO1xuICAgIH1cbn07XG4iLCIvKipcbiAqIEBhdXRob3IgTWFydMOtIFBlcmljYXkgPG1hcnRpQHBlcmljYXkuY29tPlxuICogQGF1dGhvciBPc2NhciBGb250cyA8b3NjYXIuZm9udHNAZ2VvbWF0aS5jbz5cbiAqL1xuaW1wb3J0IGxkIGZyb20gJy4vbG9jYWxlLWRhdGUnO1xuXG5mdW5jdGlvbiBsb2FkQ1NTKHVybCkge1xuICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvY3NzXCIpO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xuICAgIGlmICh0eXBlb2YgbGluayAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbnB1dHM6IFtcInNlcnZpY2VcIiwgXCJvZmZlcmluZ1wiXSxcbiAgICBvcHRpb25hbF9pbnB1dHM6IFtcImZvb3Rub3RlXCIsIFwiY3VzdG9tX2Nzc191cmxcIiwgXCJkaXNwbGF5X3V0Y190aW1lc1wiXSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgZWwpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5jdXN0b21fY3NzX3VybCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2FkQ1NTKGNvbmZpZy5jdXN0b21fY3NzX3VybCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5mb290bm90ZSAhPT0gdW5kZWZpbmVkICYmIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdG5vdGVcIikpIHtcbiAgICAgICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdG5vdGVcIikuaW5uZXJIVE1MID0gY29uZmlnLmZvb3Rub3RlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbmZpZy5kaXNwbGF5X3V0Y190aW1lcykge1xuICAgICAgICAgICAgbGQudXRjKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=