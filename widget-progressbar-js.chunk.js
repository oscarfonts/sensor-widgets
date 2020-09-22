(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-progressbar-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/js/widget/progressbar.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/js/widget/progressbar.css ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".progressbar.widget .progress {\n    height: 85px;\n    width: 90%;\n    margin: 0 auto;\n    padding-left: 12px;\n    padding-right: 12px;\n}\n\n.progressbar.widget .background-bar {\n    text-align: left;\n    margin-top: 30px;\n    background: #e9e5e2;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#e1ddd9), to(#e9e5e2));\n    background-image: -webkit-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: -moz-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: -ms-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: -o-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: linear-gradient(top, #e1ddd9, #e9e5e2);\n    height: 20px;\n    border-radius: 10px;\n    -moz-box-shadow: 0 1px 0 #bebbb9 inset, 0 1px 0 #fcfcfc;\n    -webkit-box-shadow: 0 1px 0 #bebbb9 inset, 0 1px 0 #fcfcfc;\n    box-shadow: 0 1px 0 #bebbb9 inset, 0 1px 0 #fcfcfc;\n}\n.progressbar.widget .bar {\n    width: 10px;\n    height: 18px;\n    position: absolute;\n    border-radius: 10px;\n    -moz-box-shadow: 0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;\n    -webkit-box-shadow: 0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;\n    box-shadow: 0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;\n}\n.progressbar.widget .min {\n    position: relative;\n    top: -20px;\n    float: left;\n    width: 0;\n}\n.progressbar.widget .max {\n    position: relative;\n    top: -20px;\n    float: right;\n}\n.progressbar.widget .value {\n    position: relative;\n    top: 25px;\n    text-align: right;\n}\n.progressbar.widget .pink {\n    background-color: #f674a4;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#f674a4), to(#e06995));\n    background-image: -webkit-linear-gradient(top, #f674a4, #e06995);\n    background-image: -moz-linear-gradient(top, #f674a4, #e06995);\n    background-image: -ms-linear-gradient(top, #f674a4, #e06995);\n    background-image: -o-linear-gradient(top, #f674a4, #e06995);\n    background-image: linear-gradient(top, #f674a4, #e06995);\n}\n.progressbar.widget .yellow {\n    background-color: #f0bb4b;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#f0bb4b), to(#d9aa44));\n    background-image: -webkit-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: -moz-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: -ms-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: -o-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: linear-gradient(top, #f0bb4b, #d9aa44);\n}\n.progressbar.widget .green {\n    background-color: #a1ce5b;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#a1ce5b), to(#91ba52));\n    background-image: -webkit-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: -moz-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: -ms-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: -o-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: linear-gradient(top, #a1ce5b, #91ba52);\n}\n.progressbar.widget .blue {\n    background-color: #66b3cc;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#66b3cc), to(#5da3ba));\n    background-image: -webkit-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: -moz-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: -ms-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: -o-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: linear-gradient(top, #66b3cc, #5da3ba);\n}\n", "",{"version":3,"sources":["webpack://src/js/widget/progressbar.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,UAAU;IACV,cAAc;IACd,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;IAChB,mBAAmB;IACnB,6FAA6F;IAC7F,gEAAgE;IAChE,6DAA6D;IAC7D,4DAA4D;IAC5D,2DAA2D;IAC3D,wDAAwD;IACxD,YAAY;IACZ,mBAAmB;IACnB,uDAAuD;IACvD,0DAA0D;IAC1D,kDAAkD;AACtD;AACA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,uDAAuD;IACvD,0DAA0D;IAC1D,kDAAkD;AACtD;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,QAAQ;AACZ;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,YAAY;AAChB;AACA;IACI,kBAAkB;IAClB,SAAS;IACT,iBAAiB;AACrB;AACA;IACI,yBAAyB;IACzB,6FAA6F;IAC7F,gEAAgE;IAChE,6DAA6D;IAC7D,4DAA4D;IAC5D,2DAA2D;IAC3D,wDAAwD;AAC5D;AACA;IACI,yBAAyB;IACzB,6FAA6F;IAC7F,gEAAgE;IAChE,6DAA6D;IAC7D,4DAA4D;IAC5D,2DAA2D;IAC3D,wDAAwD;AAC5D;AACA;IACI,yBAAyB;IACzB,6FAA6F;IAC7F,gEAAgE;IAChE,6DAA6D;IAC7D,4DAA4D;IAC5D,2DAA2D;IAC3D,wDAAwD;AAC5D;AACA;IACI,yBAAyB;IACzB,6FAA6F;IAC7F,gEAAgE;IAChE,6DAA6D;IAC7D,4DAA4D;IAC5D,2DAA2D;IAC3D,wDAAwD;AAC5D","sourcesContent":[".progressbar.widget .progress {\n    height: 85px;\n    width: 90%;\n    margin: 0 auto;\n    padding-left: 12px;\n    padding-right: 12px;\n}\n\n.progressbar.widget .background-bar {\n    text-align: left;\n    margin-top: 30px;\n    background: #e9e5e2;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#e1ddd9), to(#e9e5e2));\n    background-image: -webkit-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: -moz-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: -ms-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: -o-linear-gradient(top, #e1ddd9, #e9e5e2);\n    background-image: linear-gradient(top, #e1ddd9, #e9e5e2);\n    height: 20px;\n    border-radius: 10px;\n    -moz-box-shadow: 0 1px 0 #bebbb9 inset, 0 1px 0 #fcfcfc;\n    -webkit-box-shadow: 0 1px 0 #bebbb9 inset, 0 1px 0 #fcfcfc;\n    box-shadow: 0 1px 0 #bebbb9 inset, 0 1px 0 #fcfcfc;\n}\n.progressbar.widget .bar {\n    width: 10px;\n    height: 18px;\n    position: absolute;\n    border-radius: 10px;\n    -moz-box-shadow: 0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;\n    -webkit-box-shadow: 0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;\n    box-shadow: 0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;\n}\n.progressbar.widget .min {\n    position: relative;\n    top: -20px;\n    float: left;\n    width: 0;\n}\n.progressbar.widget .max {\n    position: relative;\n    top: -20px;\n    float: right;\n}\n.progressbar.widget .value {\n    position: relative;\n    top: 25px;\n    text-align: right;\n}\n.progressbar.widget .pink {\n    background-color: #f674a4;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#f674a4), to(#e06995));\n    background-image: -webkit-linear-gradient(top, #f674a4, #e06995);\n    background-image: -moz-linear-gradient(top, #f674a4, #e06995);\n    background-image: -ms-linear-gradient(top, #f674a4, #e06995);\n    background-image: -o-linear-gradient(top, #f674a4, #e06995);\n    background-image: linear-gradient(top, #f674a4, #e06995);\n}\n.progressbar.widget .yellow {\n    background-color: #f0bb4b;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#f0bb4b), to(#d9aa44));\n    background-image: -webkit-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: -moz-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: -ms-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: -o-linear-gradient(top, #f0bb4b, #d9aa44);\n    background-image: linear-gradient(top, #f0bb4b, #d9aa44);\n}\n.progressbar.widget .green {\n    background-color: #a1ce5b;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#a1ce5b), to(#91ba52));\n    background-image: -webkit-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: -moz-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: -ms-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: -o-linear-gradient(top, #a1ce5b, #91ba52);\n    background-image: linear-gradient(top, #a1ce5b, #91ba52);\n}\n.progressbar.widget .blue {\n    background-color: #66b3cc;\n    background-image: -webkit-gradient(linear, left top, left bottom, from(#66b3cc), to(#5da3ba));\n    background-image: -webkit-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: -moz-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: -ms-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: -o-linear-gradient(top, #66b3cc, #5da3ba);\n    background-image: linear-gradient(top, #66b3cc, #5da3ba);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


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

/***/ "./src/js/widget/progressbar.css":
/*!***************************************!*\
  !*** ./src/js/widget/progressbar.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./progressbar.css */ "./node_modules/css-loader/dist/cjs.js!./src/js/widget/progressbar.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/js/widget/progressbar.js":
/*!**************************************!*\
  !*** ./src/js/widget/progressbar.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _progressbar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progressbar.css */ "./src/js/widget/progressbar.css");
/* harmony import */ var _progressbar_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_progressbar_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locale-date */ "./src/js/locale-date.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* eslint-disable no-param-reassign */






const template = [
  '<div class="progressbar widget">',
  '<h1 class="feature"></h1>',
  '<h3 class="property"></h3>',
  '<div class="progress">',
  '<div class="min">0</div>',
  '<div class="max">100</div>',
  '<div class="background-bar">',
  '<span class="green bar">',
  '<div class="value"></div>',
  '</span>',
  '</div>',
  '</div>',
  '<h3 class="date"></h3>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].inputs.concat(['feature', 'property', 'refresh_interval', 'min_value', 'max_value']),
  optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].optional_inputs,
  preferredSizes: [{ w: 500, h: 220 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    el.querySelector('.min').innerHTML = config.min_value;
    el.querySelector('.max').innerHTML = config.max_value;

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].init(config, el);

    // Update view
    function redraw(data) {
      const measure = data[0];
      el.querySelector('.date').innerHTML = _locale_date__WEBPACK_IMPORTED_MODULE_2__["default"].display(measure.time);
      el.querySelector('.value').innerHTML = `${measure.value} ${measure.uom}`;
      el.querySelector('.feature').innerHTML = measure.feature;
      el.querySelector('.property').innerHTML = measure.property;

      const fullspan = el.querySelector('.background-bar').offsetWidth;
      const proportion = (measure.value - config.min_value) / (config.max_value - config.min_value);
      const width = fullspan * proportion;

      el.querySelector('.bar').style.width = `${width}px`;
    }

    // Setup SOS data access
    const data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_1__["default"])(config, redraw, errorHandler);
    const refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
    data.read();

    return {
      destroy() {
        clearInterval(refreshIntervalId);
      },
    };
  },
});


/***/ })

}]);
//# sourceMappingURL=widget-progressbar-js.chunk.js.map