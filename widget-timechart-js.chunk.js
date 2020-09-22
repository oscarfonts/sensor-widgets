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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


window.$ = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
window.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
/* harmony default export */ __webpack_exports__["default"] = (jquery__WEBPACK_IMPORTED_MODULE_0___default.a);


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
/* eslint-disable no-nested-ternary, camelcase */


const propertyNames = {};
const waitingDescribeResponse = {};
const propertyCallbackQueue = {};

/* harmony default export */ __webpack_exports__["default"] = ((config, redraw, errorHandler) => {
  _SOS__WEBPACK_IMPORTED_MODULE_0__["default"].setUrl(config.service);

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  function getPropertyName(procedure, id, callback, context) {
    if (!propertyNames[procedure]) {
      // Queue callback call
      if (!propertyCallbackQueue[procedure]) {
        propertyCallbackQueue[procedure] = [];
      }

      propertyCallbackQueue[procedure].push({
        callback,
        id,
        context,
      });

      if (!waitingDescribeResponse[procedure]) {
        waitingDescribeResponse[procedure] = true;
        // Trigger a DescribeSensor, cache all property names for this procedure
        _SOS__WEBPACK_IMPORTED_MODULE_0__["default"].describeSensor(procedure, (description) => {
          let properties = Object.prototype.hasOwnProperty.call(description, 'ProcessModel')
            ? description.ProcessModel.outputs.OutputList.output
            : description.System.outputs.OutputList.output;
          properties = properties instanceof Array ? properties : [properties];
          const types = ['Quantity', 'Count', 'Boolean', 'Category', 'Text', 'ObservableProperty'];

          const names = [];
          Object.values(properties).forEach((property) => {
            Object.values(types).forEach((type) => {
              if (Object.prototype.hasOwnProperty.call(property, type)) {
                // eslint-disable-next-line no-param-reassign
                property.id = property[type].definition;
              }
            });
            names[property.id] = property.name;
          });
          propertyNames[procedure] = names;

          // Clear propertyCallbackQueue
          while (propertyCallbackQueue[procedure].length) {
            const elem = propertyCallbackQueue[procedure].shift();
            elem.callback.call(undefined, propertyNames[procedure][elem.id], elem.context);
          }
        }, errorHandler);
      }
    } else {
      callback(propertyNames[procedure][id], context);
    }
  }

  function parse(observations) {
    if (!observations.length) {
      redraw([]);
    }

    // Get tabular data from observations
    const data = [];

    function addObservation(property, observation) {
      const foi = observation.featureOfInterest;
      data.push({
        time: new Date(observation.resultTime),
        value: Object.prototype.hasOwnProperty.call(observation.result, 'value') ? observation.result.value : observation.result,
        feature: foi.name ? foi.name.value : (foi.identifier ? foi.identifier.value : foi),
        property,
        uom: Object.prototype.hasOwnProperty.call(observation.result, 'uom') ? observation.result.uom : '(N/A)',
      });
      if (data.length === observations.length) {
        redraw(data);
      }
    }
    Object.values(observations).forEach((observation) => {
      getPropertyName(observation.procedure, observation.observableProperty,
        addObservation, observation);
    });
  }

  function read() {
    const {
      offering, feature, property, features, properties, time_start, time_end,
    } = config;
    const getFeatures = feature
      ? [feature]
      : isArray(features)
        ? features
        : features
          ? JSON.parse(features)
          : undefined;
    const getProperties = property
      ? [property]
      : isArray(properties)
        ? properties
        : properties
          ? JSON.parse(properties)
          : undefined;
    const time = (time_start && time_end) ? [time_start, time_end] : 'latest';
    _SOS__WEBPACK_IMPORTED_MODULE_0__["default"].getObservation(offering, getFeatures, getProperties, time, parse, errorHandler);
  }

  return {
    read,
  };
});


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
/* eslint-disable no-param-reassign */














const flotReq = __webpack_require__("./node_modules/flot/source sync recursive flot.*\\.js$");
flotReq.keys().forEach(flotReq);

// TODO readd legend
// TODO readd pan and zoom

const template = [
  '<div class="timechart widget">',
  '<h3 style="width:100%"></h3>',
  '<div class="graph" style="height:75%; width: 100%; max-height: 380px;"></div>',
  '<div class="legend" style="display: inline-block; float: right; margin-right: 15px; margin-left: 50px; margin-top: 10px"></div>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

const timechart = {
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].inputs.concat(['features', 'properties', 'time_start', 'time_end', 'title']),
  optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].optional_inputs,
  preferredSizes: [{ w: 650, h: 530 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    el.querySelector('h3').innerHTML = config.title;
    const graph = el.querySelector('.graph');

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].init(config, el);

    function redraw(data) {
      const series = {};
      Object.keys(data).forEach((i) => {
        const measure = data[i];
        const label = `${measure.property} (${measure.feature})`;
        if (!series[label]) {
          series[label] = {
            data: [],
            label,
          };
        }
        series[label].data.push([measure.time.getTime() / 1000, measure.value]);
      });

      // Sort data by time, convert to array
      const arr = [];
      Object.keys(series).forEach((k) => {
        series[k].data.sort((a, b) => b[0] - a[0]);
        arr.push(series[k]);
      });

      const options = {
        xaxis: {
          mode: 'time',
          timezone: _locale_date__WEBPACK_IMPORTED_MODULE_1__["default"].utc() ? 'UTC' : 'browser',
        },
        yaxis: {
          zoomRange: false,
          panRange: false,
        },
        grid: {
          hoverable: true,
        },
        legend: {
          container: el.querySelector('.legend'),
        },
        series: {
          lines: {
            show: true,
          },
          points: {
            show: true,
          },
        },
        tooltip: true,
        tooltipOpts: {
          content: data.length ? `[%x] %s: %y.2 ${data[0].uom}` : '',
        },
        zoom: {
          interactive: true,
        },
        pan: {
          interactive: true,
        },
      };

      if (config.colors) {
        options.colors = config.colors;
      }

      const plot = _jQuery_globals__WEBPACK_IMPORTED_MODULE_3__["default"].plot(graph, arr, options);

      if (config.callback) {
        config.callback(plot, graph);
      }
    }

    // Setup SOS data access
    const data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_0__["default"])(config, redraw, errorHandler);
    data.read();
  },
};

/* harmony default export */ __webpack_exports__["default"] = (timechart);


/***/ })

}]);
//# sourceMappingURL=widget-timechart-js.chunk.js.map