(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-timechart-js"],{

/***/ "./node_modules/flot/source sync recursive flot.*\\.js$":
/*!***************************************************!*\
  !*** ./node_modules/flot/source sync flot.*\.js$ ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./jquery.flot.axislabels.js": "./node_modules/flot/source/jquery.flot.axislabels.js",
	"./jquery.flot.browser.js": "./node_modules/flot/source/jquery.flot.browser.js",
	"./jquery.flot.categories.js": "./node_modules/flot/source/jquery.flot.categories.js",
	"./jquery.flot.composeImages.js": "./node_modules/flot/source/jquery.flot.composeImages.js",
	"./jquery.flot.crosshair.js": "./node_modules/flot/source/jquery.flot.crosshair.js",
	"./jquery.flot.drawSeries.js": "./node_modules/flot/source/jquery.flot.drawSeries.js",
	"./jquery.flot.errorbars.js": "./node_modules/flot/source/jquery.flot.errorbars.js",
	"./jquery.flot.fillbetween.js": "./node_modules/flot/source/jquery.flot.fillbetween.js",
	"./jquery.flot.flatdata.js": "./node_modules/flot/source/jquery.flot.flatdata.js",
	"./jquery.flot.hover.js": "./node_modules/flot/source/jquery.flot.hover.js",
	"./jquery.flot.image.js": "./node_modules/flot/source/jquery.flot.image.js",
	"./jquery.flot.js": "./node_modules/flot/source/jquery.flot.js",
	"./jquery.flot.legend.js": "./node_modules/flot/source/jquery.flot.legend.js",
	"./jquery.flot.logaxis.js": "./node_modules/flot/source/jquery.flot.logaxis.js",
	"./jquery.flot.navigate.js": "./node_modules/flot/source/jquery.flot.navigate.js",
	"./jquery.flot.pie.js": "./node_modules/flot/source/jquery.flot.pie.js",
	"./jquery.flot.resize.js": "./node_modules/flot/source/jquery.flot.resize.js",
	"./jquery.flot.saturated.js": "./node_modules/flot/source/jquery.flot.saturated.js",
	"./jquery.flot.selection.js": "./node_modules/flot/source/jquery.flot.selection.js",
	"./jquery.flot.stack.js": "./node_modules/flot/source/jquery.flot.stack.js",
	"./jquery.flot.symbol.js": "./node_modules/flot/source/jquery.flot.symbol.js",
	"./jquery.flot.threshold.js": "./node_modules/flot/source/jquery.flot.threshold.js",
	"./jquery.flot.time.js": "./node_modules/flot/source/jquery.flot.time.js",
	"./jquery.flot.touch.js": "./node_modules/flot/source/jquery.flot.touch.js",
	"./jquery.flot.touchNavigate.js": "./node_modules/flot/source/jquery.flot.touchNavigate.js",
	"./jquery.flot.uiConstants.js": "./node_modules/flot/source/jquery.flot.uiConstants.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/flot/source sync recursive flot.*\\.js$";

/***/ }),

/***/ "./src/js/jQuery-globals.js":
/*!**********************************!*\
  !*** ./src/js/jQuery-globals.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


window.$ = window.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a; // what a shit


/***/ }),

/***/ "./src/js/sos-data-access.js":
/*!***********************************!*\
  !*** ./src/js/sos-data-access.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SOS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SOS */ "./src/js/SOS.js");
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */


var propertyNames = {};
var waitingDescribeResponse = {};
var propertyCallbackQueue = {};

/* harmony default export */ __webpack_exports__["default"] = (function(config, redraw, errorHandler) {
    _SOS__WEBPACK_IMPORTED_MODULE_0__["default"].setUrl(config.service);

    function read() {
        var offering = config.offering;
        var features = config.feature ? [config.feature] : isArray(config.features) ? config.features : config.features ? JSON.parse(config.features) : undefined;
        var properties = config.property ? [config.property] : isArray(config.properties) ? config.properties : config.properties ? JSON.parse(config.properties) : undefined;
        var time = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : "latest";
        _SOS__WEBPACK_IMPORTED_MODULE_0__["default"].getObservation(offering, features, properties, time, parse, errorHandler);
    }

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function parse(observations) {
        if (!observations.length) {
            redraw([]);
        }

        // Get tabular data from observations
        var data = [];
        for (var i in observations) {
            var observation = observations[i];
            getPropertyName(observation.procedure, observation.observableProperty, addObservation, observation);
        }

        function addObservation(property, observation) {
            var foi = observation.featureOfInterest;
            data.push({
                time: new Date(observation.resultTime),
                value: observation.result.hasOwnProperty("value") ? observation.result.value : observation.result,
                feature: foi.name ? foi.name.value : (foi.identifier ? foi.identifier.value : foi),
                property: property,
                uom: observation.result.hasOwnProperty("uom") ? observation.result.uom : "(N/A)"
            });
            if (data.length == observations.length) {
                redraw(data);
            }
        }
    }

    function getPropertyName(procedure, id, callback, context) {
        if (!propertyNames[procedure]) {
            // Queue callback call
            if (!propertyCallbackQueue[procedure]) {
                propertyCallbackQueue[procedure] = [];
            }

            propertyCallbackQueue[procedure].push({
                callback: callback,
                id: id,
                context: context
            });

            if (!waitingDescribeResponse[procedure]) {
                waitingDescribeResponse[procedure] = true;
                // Trigger a DescribeSensor, cache all property names for this procedure
                _SOS__WEBPACK_IMPORTED_MODULE_0__["default"].describeSensor(procedure, function(description) {
                    var properties = description.hasOwnProperty("ProcessModel") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;
                    properties = properties instanceof Array ? properties : [properties];
                    var types = ["Quantity", "Count", "Boolean", "Category", "Text", "ObservableProperty"];

                    var names = [];
                    for (var i in properties) {
                        var property = properties[i];
                        for (var j in types) {
                            var type = types[j];
                            if (property.hasOwnProperty(type)) {
                                property.id = property[type].definition;
                            }
                        }
                        names[property.id] = property.name;
                    }
                    propertyNames[procedure] = names;

                    // Clear propertyCallbackQueue
                    while (propertyCallbackQueue[procedure].length) {
                        var elem = propertyCallbackQueue[procedure].shift();
                        elem.callback.call(undefined, propertyNames[procedure][elem.id], elem.context);
                    }
                }, errorHandler);
            }
        } else {
            callback(propertyNames[procedure][id], context);
        }
    }

    return {
        read: read
    };
});;


/***/ }),

/***/ "./src/js/widget/timechart.js":
/*!************************************!*\
  !*** ./src/js/widget/timechart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locale-date */ "./src/js/locale-date.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* harmony import */ var _jQuery_globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jQuery-globals */ "./src/js/jQuery-globals.js");
/* harmony import */ var flot_lib_jquery_mousewheel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flot/lib/jquery.mousewheel */ "./node_modules/flot/lib/jquery.mousewheel.js");
/* harmony import */ var flot_lib_jquery_mousewheel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flot_lib_jquery_mousewheel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flot_source_jquery_canvaswrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flot/source/jquery.canvaswrapper */ "./node_modules/flot/source/jquery.canvaswrapper.js");
/* harmony import */ var flot_source_jquery_canvaswrapper__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flot_source_jquery_canvaswrapper__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flot_source_jquery_colorhelpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flot/source/jquery.colorhelpers */ "./node_modules/flot/source/jquery.colorhelpers.js");
/* harmony import */ var flot_source_jquery_colorhelpers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flot_source_jquery_colorhelpers__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flot_source_jquery_flot__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flot/source/jquery.flot */ "./node_modules/flot/source/jquery.flot.js");
/* harmony import */ var flot_source_jquery_flot__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flot_source_jquery_flot__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flot_source_jquery_flot_uiConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flot/source/jquery.flot.uiConstants */ "./node_modules/flot/source/jquery.flot.uiConstants.js");
/* harmony import */ var flot_source_jquery_flot_uiConstants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flot_source_jquery_flot_uiConstants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flot_plugins_dist_source_misc_jquery_flot_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flot-plugins/dist/source/misc/jquery.flot.tooltip */ "./node_modules/flot-plugins/dist/source/misc/jquery.flot.tooltip.js");
/* harmony import */ var flot_plugins_dist_source_misc_jquery_flot_tooltip__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flot_plugins_dist_source_misc_jquery_flot_tooltip__WEBPACK_IMPORTED_MODULE_9__);
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */












const flotReq = __webpack_require__("./node_modules/flot/source sync recursive flot.*\\.js$")
flotReq.keys().forEach(flotReq);



// TODO readd legend
// TODO readd pan and zoom


var template = [
    '<div class="timechart widget">',
        '<h3 style="width:100%"></h3>',
        '<div class="graph" style="height:75%; width: 100%; max-height: 380px;"></div>',
        '<div class="legend" style="display: inline-block; float: right; margin-right: 15px; margin-left: 50px; margin-top: 10px"></div>',
        '<div><span class="footnote"></span></div>',
    '</div>'
].join('');

let timechart = {
    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].inputs.concat(["features", "properties", "time_start", "time_end", "title"]),
    optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].optional_inputs,
    preferredSizes: [{w: 650, h: 530}],

    init: function(config, el, errorHandler) {
        // Render template
        el.innerHTML = template;
        el.querySelector("h3").innerHTML = config.title;
        var graph = el.querySelector(".graph");

        //load widget common features
        _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].init(config, el);

        // Setup SOS data access
        var data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_0__["default"])(config, redraw, errorHandler);
        data.read();

        function redraw(data) {
            var series = {};
            for (var i in data) {
                var measure = data[i];
                var label = measure.property + " (" + measure.feature + ")";
                if (!series[label]) {
                    series[label] = {
                        data: [],
                        label: label
                    };
                }
                series[label].data.push([measure.time.getTime() / 1000, measure.value]);
            }

            var sortFunction = function(a, b) {
                return b[0] - a[0];
            };

            // Sort data by time, convert to array
            var arr = [];
            for (var k in series) {
                series[k].data.sort(sortFunction);
                arr.push(series[k]);
            }

            var options = {
                xaxis: {
                    mode: "time",
                    timezone: _locale_date__WEBPACK_IMPORTED_MODULE_1__["default"].utc() ? "UTC" : "browser"
                },
                yaxis: {
                    zoomRange: false,
                    panRange: false
                },
                grid: {
                    hoverable: true
                },
                legend: {
                    container: el.querySelector(".legend")
                },
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                tooltip: true,
                tooltipOpts: {
                    content: data.length ? "[%x] %s: %y.2 " + data[0].uom : ""
                },
                zoom: {
                    interactive: true
                },
                pan: {
                    interactive: true
                }
            };

            if(config.colors) {
                options.colors = config.colors;
            }

            var plot = $.plot(graph, arr, options);

            if(config.callback) {
                config.callback(plot, graph);
            }

        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (timechart);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2Ugc3luYyBmbG90LipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2pRdWVyeS1nbG9iYWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zb3MtZGF0YS1hY2Nlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dpZGdldC90aW1lY2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RTs7Ozs7Ozs7Ozs7O0FDL0NBO0FBQUE7QUFBQTtBQUF1Qjs7QUFFdkIsMkJBQTJCLDZDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNGN0I7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUN3Qjs7QUFFeEI7QUFDQTtBQUNBOztBQUVlO0FBQ2YsSUFBSSw0Q0FBRzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0Q0FBRztBQUNYOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRDQUFHO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BHRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQzZDO0FBQ2I7QUFDTTs7QUFFWDs7QUFFUTtBQUNNO0FBQ0Q7QUFDUjtBQUNZOztBQUU1QyxnQkFBZ0IsNkVBQTBFO0FBQzFGOztBQUUyRDs7QUFFM0Q7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGFBQWEsbUJBQW1CO0FBQzlFLDBEQUEwRCxjQUFjLG9CQUFvQixtQkFBbUI7QUFDL0c7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxzREFBTTtBQUNsQixxQkFBcUIsc0RBQU07QUFDM0Isc0JBQXNCLGVBQWU7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHNEQUFNOztBQUVkO0FBQ0EsbUJBQW1CLGdFQUFXO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9EQUFFO0FBQ2hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWUsd0VBQVMsRUFBQyIsImZpbGUiOiJ3aWRnZXQtdGltZWNoYXJ0LWpzLmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2pxdWVyeS5mbG90LmF4aXNsYWJlbHMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5heGlzbGFiZWxzLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC5icm93c2VyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QuYnJvd3Nlci5qc1wiLFxuXHRcIi4vanF1ZXJ5LmZsb3QuY2F0ZWdvcmllcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL2Zsb3Qvc291cmNlL2pxdWVyeS5mbG90LmNhdGVnb3JpZXMuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmNvbXBvc2VJbWFnZXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5jb21wb3NlSW1hZ2VzLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC5jcm9zc2hhaXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5jcm9zc2hhaXIuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmRyYXdTZXJpZXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5kcmF3U2VyaWVzLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC5lcnJvcmJhcnMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5lcnJvcmJhcnMuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmZpbGxiZXR3ZWVuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QuZmlsbGJldHdlZW4uanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmZsYXRkYXRhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QuZmxhdGRhdGEuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmhvdmVyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QuaG92ZXIuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmltYWdlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QuaW1hZ2UuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LmxlZ2VuZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL2Zsb3Qvc291cmNlL2pxdWVyeS5mbG90LmxlZ2VuZC5qc1wiLFxuXHRcIi4vanF1ZXJ5LmZsb3QubG9nYXhpcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL2Zsb3Qvc291cmNlL2pxdWVyeS5mbG90LmxvZ2F4aXMuanNcIixcblx0XCIuL2pxdWVyeS5mbG90Lm5hdmlnYXRlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QubmF2aWdhdGUuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LnBpZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL2Zsb3Qvc291cmNlL2pxdWVyeS5mbG90LnBpZS5qc1wiLFxuXHRcIi4vanF1ZXJ5LmZsb3QucmVzaXplLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QucmVzaXplLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC5zYXR1cmF0ZWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5zYXR1cmF0ZWQuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LnNlbGVjdGlvbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL2Zsb3Qvc291cmNlL2pxdWVyeS5mbG90LnNlbGVjdGlvbi5qc1wiLFxuXHRcIi4vanF1ZXJ5LmZsb3Quc3RhY2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC5zdGFjay5qc1wiLFxuXHRcIi4vanF1ZXJ5LmZsb3Quc3ltYm9sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3Quc3ltYm9sLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC50aHJlc2hvbGQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC50aHJlc2hvbGQuanNcIixcblx0XCIuL2pxdWVyeS5mbG90LnRpbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC50aW1lLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC50b3VjaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL2Zsb3Qvc291cmNlL2pxdWVyeS5mbG90LnRvdWNoLmpzXCIsXG5cdFwiLi9qcXVlcnkuZmxvdC50b3VjaE5hdmlnYXRlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvZmxvdC9zb3VyY2UvanF1ZXJ5LmZsb3QudG91Y2hOYXZpZ2F0ZS5qc1wiLFxuXHRcIi4vanF1ZXJ5LmZsb3QudWlDb25zdGFudHMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9qcXVlcnkuZmxvdC51aUNvbnN0YW50cy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZSBzeW5jIHJlY3Vyc2l2ZSBmbG90LipcXFxcLmpzJFwiOyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbndpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9ICQ7IC8vIHdoYXQgYSBzaGl0XG4iLCIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCBTT1MgZnJvbSAnLi9TT1MnO1xuXG52YXIgcHJvcGVydHlOYW1lcyA9IHt9O1xudmFyIHdhaXRpbmdEZXNjcmliZVJlc3BvbnNlID0ge307XG52YXIgcHJvcGVydHlDYWxsYmFja1F1ZXVlID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbmZpZywgcmVkcmF3LCBlcnJvckhhbmRsZXIpIHtcbiAgICBTT1Muc2V0VXJsKGNvbmZpZy5zZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgIHZhciBvZmZlcmluZyA9IGNvbmZpZy5vZmZlcmluZztcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gY29uZmlnLmZlYXR1cmUgPyBbY29uZmlnLmZlYXR1cmVdIDogaXNBcnJheShjb25maWcuZmVhdHVyZXMpID8gY29uZmlnLmZlYXR1cmVzIDogY29uZmlnLmZlYXR1cmVzID8gSlNPTi5wYXJzZShjb25maWcuZmVhdHVyZXMpIDogdW5kZWZpbmVkO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IGNvbmZpZy5wcm9wZXJ0eSA/IFtjb25maWcucHJvcGVydHldIDogaXNBcnJheShjb25maWcucHJvcGVydGllcykgPyBjb25maWcucHJvcGVydGllcyA6IGNvbmZpZy5wcm9wZXJ0aWVzID8gSlNPTi5wYXJzZShjb25maWcucHJvcGVydGllcykgOiB1bmRlZmluZWQ7XG4gICAgICAgIHZhciB0aW1lID0gKGNvbmZpZy50aW1lX3N0YXJ0ICYmIGNvbmZpZy50aW1lX2VuZCkgPyBbY29uZmlnLnRpbWVfc3RhcnQsIGNvbmZpZy50aW1lX2VuZF0gOiBcImxhdGVzdFwiO1xuICAgICAgICBTT1MuZ2V0T2JzZXJ2YXRpb24ob2ZmZXJpbmcsIGZlYXR1cmVzLCBwcm9wZXJ0aWVzLCB0aW1lLCBwYXJzZSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2Uob2JzZXJ2YXRpb25zKSB7XG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVkcmF3KFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0YWJ1bGFyIGRhdGEgZnJvbSBvYnNlcnZhdGlvbnNcbiAgICAgICAgdmFyIGRhdGEgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvYnNlcnZhdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhdGlvbiA9IG9ic2VydmF0aW9uc1tpXTtcbiAgICAgICAgICAgIGdldFByb3BlcnR5TmFtZShvYnNlcnZhdGlvbi5wcm9jZWR1cmUsIG9ic2VydmF0aW9uLm9ic2VydmFibGVQcm9wZXJ0eSwgYWRkT2JzZXJ2YXRpb24sIG9ic2VydmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE9ic2VydmF0aW9uKHByb3BlcnR5LCBvYnNlcnZhdGlvbikge1xuICAgICAgICAgICAgdmFyIGZvaSA9IG9ic2VydmF0aW9uLmZlYXR1cmVPZkludGVyZXN0O1xuICAgICAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShvYnNlcnZhdGlvbi5yZXN1bHRUaW1lKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogb2JzZXJ2YXRpb24ucmVzdWx0Lmhhc093blByb3BlcnR5KFwidmFsdWVcIikgPyBvYnNlcnZhdGlvbi5yZXN1bHQudmFsdWUgOiBvYnNlcnZhdGlvbi5yZXN1bHQsXG4gICAgICAgICAgICAgICAgZmVhdHVyZTogZm9pLm5hbWUgPyBmb2kubmFtZS52YWx1ZSA6IChmb2kuaWRlbnRpZmllciA/IGZvaS5pZGVudGlmaWVyLnZhbHVlIDogZm9pKSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgdW9tOiBvYnNlcnZhdGlvbi5yZXN1bHQuaGFzT3duUHJvcGVydHkoXCJ1b21cIikgPyBvYnNlcnZhdGlvbi5yZXN1bHQudW9tIDogXCIoTi9BKVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSBvYnNlcnZhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVkcmF3KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVydHlOYW1lKHByb2NlZHVyZSwgaWQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lc1twcm9jZWR1cmVdKSB7XG4gICAgICAgICAgICAvLyBRdWV1ZSBjYWxsYmFjayBjYWxsXG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0gPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCF3YWl0aW5nRGVzY3JpYmVSZXNwb25zZVtwcm9jZWR1cmVdKSB7XG4gICAgICAgICAgICAgICAgd2FpdGluZ0Rlc2NyaWJlUmVzcG9uc2VbcHJvY2VkdXJlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBhIERlc2NyaWJlU2Vuc29yLCBjYWNoZSBhbGwgcHJvcGVydHkgbmFtZXMgZm9yIHRoaXMgcHJvY2VkdXJlXG4gICAgICAgICAgICAgICAgU09TLmRlc2NyaWJlU2Vuc29yKHByb2NlZHVyZSwgZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBkZXNjcmlwdGlvbi5oYXNPd25Qcm9wZXJ0eShcIlByb2Nlc3NNb2RlbFwiKSA/IGRlc2NyaXB0aW9uLlByb2Nlc3NNb2RlbC5vdXRwdXRzLk91dHB1dExpc3Qub3V0cHV0IDogZGVzY3JpcHRpb24uU3lzdGVtLm91dHB1dHMuT3V0cHV0TGlzdC5vdXRwdXQ7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIGluc3RhbmNlb2YgQXJyYXkgPyBwcm9wZXJ0aWVzIDogW3Byb3BlcnRpZXNdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZXMgPSBbXCJRdWFudGl0eVwiLCBcIkNvdW50XCIsIFwiQm9vbGVhblwiLCBcIkNhdGVnb3J5XCIsIFwiVGV4dFwiLCBcIk9ic2VydmFibGVQcm9wZXJ0eVwiXTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiB0eXBlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5Lmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5LmlkID0gcHJvcGVydHlbdHlwZV0uZGVmaW5pdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1twcm9wZXJ0eS5pZF0gPSBwcm9wZXJ0eS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXSA9IG5hbWVzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFyIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNhbGxiYWNrLmNhbGwodW5kZWZpbmVkLCBwcm9wZXJ0eU5hbWVzW3Byb2NlZHVyZV1bZWxlbS5pZF0sIGVsZW0uY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHlOYW1lc1twcm9jZWR1cmVdW2lkXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWFkOiByZWFkXG4gICAgfTtcbn07XG4iLCIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCBkYXRhX2FjY2VzcyBmcm9tICcuLi9zb3MtZGF0YS1hY2Nlc3MnO1xuaW1wb3J0IGxkIGZyb20gJy4uL2xvY2FsZS1kYXRlJztcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vd2lkZ2V0LWNvbW1vbic7XG5cbmltcG9ydCAnLi4valF1ZXJ5LWdsb2JhbHMnO1xuXG5pbXBvcnQgXCJmbG90L2xpYi9qcXVlcnkubW91c2V3aGVlbFwiXG5pbXBvcnQgXCJmbG90L3NvdXJjZS9qcXVlcnkuY2FudmFzd3JhcHBlclwiXG5pbXBvcnQgXCJmbG90L3NvdXJjZS9qcXVlcnkuY29sb3JoZWxwZXJzXCJcbmltcG9ydCBcImZsb3Qvc291cmNlL2pxdWVyeS5mbG90XCJcbmltcG9ydCBcImZsb3Qvc291cmNlL2pxdWVyeS5mbG90LnVpQ29uc3RhbnRzXCJcblxuY29uc3QgZmxvdFJlcSA9IHJlcXVpcmUuY29udGV4dChcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9mbG90L3NvdXJjZS9cIiwgdHJ1ZSwgL2Zsb3QuKlxcLmpzJC8pXG5mbG90UmVxLmtleXMoKS5mb3JFYWNoKGZsb3RSZXEpO1xuXG5pbXBvcnQgJ2Zsb3QtcGx1Z2lucy9kaXN0L3NvdXJjZS9taXNjL2pxdWVyeS5mbG90LnRvb2x0aXAnO1xuXG4vLyBUT0RPIHJlYWRkIGxlZ2VuZFxuLy8gVE9ETyByZWFkZCBwYW4gYW5kIHpvb21cblxuXG52YXIgdGVtcGxhdGUgPSBbXG4gICAgJzxkaXYgY2xhc3M9XCJ0aW1lY2hhcnQgd2lkZ2V0XCI+JyxcbiAgICAgICAgJzxoMyBzdHlsZT1cIndpZHRoOjEwMCVcIj48L2gzPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZ3JhcGhcIiBzdHlsZT1cImhlaWdodDo3NSU7IHdpZHRoOiAxMDAlOyBtYXgtaGVpZ2h0OiAzODBweDtcIj48L2Rpdj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cImxlZ2VuZFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBmbG9hdDogcmlnaHQ7IG1hcmdpbi1yaWdodDogMTVweDsgbWFyZ2luLWxlZnQ6IDUwcHg7IG1hcmdpbi10b3A6IDEwcHhcIj48L2Rpdj4nLFxuICAgICAgICAnPGRpdj48c3BhbiBjbGFzcz1cImZvb3Rub3RlXCI+PC9zcGFuPjwvZGl2PicsXG4gICAgJzwvZGl2Pidcbl0uam9pbignJyk7XG5cbmxldCB0aW1lY2hhcnQgPSB7XG4gICAgaW5wdXRzOiBjb21tb24uaW5wdXRzLmNvbmNhdChbXCJmZWF0dXJlc1wiLCBcInByb3BlcnRpZXNcIiwgXCJ0aW1lX3N0YXJ0XCIsIFwidGltZV9lbmRcIiwgXCJ0aXRsZVwiXSksXG4gICAgb3B0aW9uYWxfaW5wdXRzOiBjb21tb24ub3B0aW9uYWxfaW5wdXRzLFxuICAgIHByZWZlcnJlZFNpemVzOiBbe3c6IDY1MCwgaDogNTMwfV0sXG5cbiAgICBpbml0OiBmdW5jdGlvbihjb25maWcsIGVsLCBlcnJvckhhbmRsZXIpIHtcbiAgICAgICAgLy8gUmVuZGVyIHRlbXBsYXRlXG4gICAgICAgIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiaDNcIikuaW5uZXJIVE1MID0gY29uZmlnLnRpdGxlO1xuICAgICAgICB2YXIgZ3JhcGggPSBlbC5xdWVyeVNlbGVjdG9yKFwiLmdyYXBoXCIpO1xuXG4gICAgICAgIC8vbG9hZCB3aWRnZXQgY29tbW9uIGZlYXR1cmVzXG4gICAgICAgIGNvbW1vbi5pbml0KGNvbmZpZywgZWwpO1xuXG4gICAgICAgIC8vIFNldHVwIFNPUyBkYXRhIGFjY2Vzc1xuICAgICAgICB2YXIgZGF0YSA9IGRhdGFfYWNjZXNzKGNvbmZpZywgcmVkcmF3LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICBkYXRhLnJlYWQoKTtcblxuICAgICAgICBmdW5jdGlvbiByZWRyYXcoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHNlcmllcyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSBkYXRhW2ldO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IG1lYXN1cmUucHJvcGVydHkgKyBcIiAoXCIgKyBtZWFzdXJlLmZlYXR1cmUgKyBcIilcIjtcbiAgICAgICAgICAgICAgICBpZiAoIXNlcmllc1tsYWJlbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzW2xhYmVsXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlcmllc1tsYWJlbF0uZGF0YS5wdXNoKFttZWFzdXJlLnRpbWUuZ2V0VGltZSgpIC8gMTAwMCwgbWVhc3VyZS52YWx1ZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiWzBdIC0gYVswXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFNvcnQgZGF0YSBieSB0aW1lLCBjb252ZXJ0IHRvIGFycmF5XG4gICAgICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIHNlcmllcykge1xuICAgICAgICAgICAgICAgIHNlcmllc1trXS5kYXRhLnNvcnQoc29ydEZ1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChzZXJpZXNba10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcInRpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgdGltZXpvbmU6IGxkLnV0YygpID8gXCJVVENcIiA6IFwiYnJvd3NlclwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgICAgICAgICB6b29tUmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwYW5SYW5nZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiBlbC5xdWVyeVNlbGVjdG9yKFwiLmxlZ2VuZFwiKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2VyaWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvb2x0aXBPcHRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEubGVuZ3RoID8gXCJbJXhdICVzOiAleS4yIFwiICsgZGF0YVswXS51b20gOiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB6b29tOiB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aXZlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYW46IHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3RpdmU6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihjb25maWcuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb2xvcnMgPSBjb25maWcuY29sb3JzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGxvdCA9ICQucGxvdChncmFwaCwgYXJyLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgaWYoY29uZmlnLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmNhbGxiYWNrKHBsb3QsIGdyYXBoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGltZWNoYXJ0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==