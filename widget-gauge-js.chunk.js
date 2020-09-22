(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-gauge-js"],{

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

/***/ "./src/js/widget/gauge.js":
/*!********************************!*\
  !*** ./src/js/widget/gauge.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _gauge_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gauge.svg */ "./src/js/widget/gauge.svg");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* eslint-disable no-param-reassign */




const template = [
  '<div class="gauge widget">',
  _gauge_svg__WEBPACK_IMPORTED_MODULE_1__["default"],
  '<div><span class="footnote"></span></div>',
  '</div>'].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].inputs.concat(['feature', 'property', 'refresh_interval']),
  optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].optional_inputs,
  preferredSizes: [{ w: 300, h: 300 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    const arrow = el.querySelector('.arrow');
    const title = el.querySelector('.title');
    const value = el.querySelector('.value');

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].init(config, el);

    // Update view
    function redraw(data) {
      const measure = data[0];
      title.innerHTML = measure.property;
      value.innerHTML = `${measure.value} %`;
      arrow.setAttribute('transform', `rotate(${2.7 * measure.value}, 365.396, 495)`);
    }

    // Setup SOS data access
    const data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_0__["default"])(config, redraw, errorHandler);
    const refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
    data.read();

    return {
      destroy() {
        clearInterval(refreshIntervalId);
      },
    };
  },
});


/***/ }),

/***/ "./src/js/widget/gauge.svg":
/*!*********************************!*\
  !*** ./src/js/widget/gauge.svg ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n\n<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\" version=\"1.1\" viewBox=\"0 0 500 500\" id=\"svg3760\" inkscape:version=\"0.48.3.1 r9886\" sodipodi:docname=\"gauge.svg\">\n    <sodipodi:namedview pagecolor=\"#ffffff\" bordercolor=\"#666666\" borderopacity=\"1\" objecttolerance=\"10\" gridtolerance=\"10\" guidetolerance=\"10\" inkscape:pageopacity=\"0\" inkscape:pageshadow=\"2\" inkscape:window-width=\"1116\" inkscape:window-height=\"733\" id=\"namedview42\" showgrid=\"false\" showguides=\"true\" inkscape:guide-bbox=\"true\" fit-margin-top=\"0\" fit-margin-left=\"0\" fit-margin-right=\"0\" fit-margin-bottom=\"0\" inkscape:zoom=\"0.4609375\" inkscape:cx=\"255.9881\" inkscape:cy=\"255.98805\" inkscape:window-x=\"0\" inkscape:window-y=\"0\" inkscape:window-maximized=\"0\" inkscape:current-layer=\"g3773\" />\n    <defs id=\"defs3762\" />\n    <metadata id=\"metadata3765\">\n        <rdf:RDF>\n            <cc:Work rdf:about=\"\">\n                <dc:format>image/svg+xml</dc:format>\n                <dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n                <dc:title />\n            </cc:Work>\n        </rdf:RDF>\n    </metadata>\n    <g transform=\"translate(-110.0119,-251.01189)\" id=\"layer1\" />\n    <g transform=\"translate(-110.0119,-251.01189)\" id=\"g3773\">\n        <g id=\"g3019\" transform=\"matrix(1.0354153,0,0,1.0354153,-18.962017,-11.530602)\">\n            <path style=\"fill:#a6b6b7;fill-opacity:1;stroke:none\" id=\"path3775\" d=\"m 601,495 a 235,235 0 1 1 -470,0 235,235 0 1 1 470,0 z\" inkscape:connector-curvature=\"0\" />\n            <path style=\"fill:#008000;fill-opacity:1;stroke:none\" id=\"path3777\" d=\"M 133.89323,458.23797 A 235,235 0 0 1 556.11902,356.87051 L 366,495 z\" inkscape:connector-curvature=\"0\" />\n            <path style=\"fill:#d48000;fill-opacity:1;stroke:none\" id=\"path3779\" d=\"m 556.11902,356.87051 a 235,235 0 0 1 33.3793,210.74836 L 366,495 z\" inkscape:connector-curvature=\"0\" />\n            <path style=\"fill:#d40000;fill-opacity:1;stroke:none\" id=\"path3781\" d=\"m 589.49832,567.61887 a 235,235 0 0 1 -57.32815,93.55114 L 366,495 z\" inkscape:connector-curvature=\"0\" />\n            <path style=\"fill:none;stroke:#000000;stroke-width:2.89738822;stroke-miterlimit:4;stroke-dasharray:none\" id=\"path3783\" d=\"m 606,495 a 240,240 0 1 1 -480,0 240,240 0 1 1 480,0 z\" inkscape:connector-curvature=\"0\" />\n            <path style=\"fill:#c6d0d1;fill-opacity:1;stroke:none\" id=\"path3785\" d=\"m 586,495 a 220,220 0 1 1 -440,0 220,220 0 1 1 440,0 z\" inkscape:connector-curvature=\"0\" />\n            <path style=\"fill:#ffffff;fill-opacity:1;stroke:none\" id=\"path3787\" d=\"m 576,495 a 210,210 0 1 1 -420,0 210,210 0 1 1 420,0 z\" inkscape:connector-curvature=\"0\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3789\" transform=\"matrix(-0.70710678,-0.70710678,0.70710678,-0.70710678,129.11923,1255.1398)\" y=\"495\" x=\"366\" ry=\"0\" height=\"24\" width=\"8\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3791\" transform=\"matrix(-0.52249856,-0.85264016,0.85264016,-0.52249856,-42.831844,1177.1331)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3793\" transform=\"matrix(-0.30901699,-0.95105652,0.95105652,-0.30901699,-190.77659,1062.8458)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3795\" transform=\"matrix(-0.0784591,-0.99691733,0.99691733,-0.0784591,-307.95377,917.17924)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3797\" transform=\"matrix(0.15643447,-0.98768834,0.98768834,0.15643447,-387.88816,748.18301)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3799\" transform=\"matrix(0.38268343,-0.92387953,0.92387953,0.38268343,-426.92794,567.04361)\" y=\"495\" x=\"366\" ry=\"0\" height=\"24\" width=\"8\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3801\" transform=\"matrix(0.58778525,-0.80901699,0.80901699,0.58778525,-420.66195,378.32965)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3803\" transform=\"matrix(0.76040597,-0.64944805,0.64944805,0.76040597,-371.69027,197.91068)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3805\" transform=\"matrix(0.89100652,-0.4539905,0.4539905,0.89100652,-281.9537,33.908904)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3807\" transform=\"matrix(0.97236992,-0.23344536,0.23344536,0.97236992,-156.41111,-104.6129)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3809\" transform=\"translate(-4,-210)\" y=\"495\" x=\"366\" ry=\"0\" height=\"24\" width=\"8\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3811\" transform=\"matrix(0.97236992,0.23344536,-0.23344536,0.97236992,172.74685,-276.42869)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3813\" transform=\"matrix(0.89100652,0.4539905,-0.4539905,0.89100652,358.1729,-300.2281)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3815\" transform=\"matrix(0.76040597,0.64944805,-0.64944805,0.76040597,544.03148,-280.08309)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3817\" transform=\"matrix(0.58778525,0.80901699,-0.80901699,0.58778525,720.05201,-217.10686)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3819\" transform=\"matrix(0.38268343,0.92387953,-0.92387953,0.38268343,875.7422,-116.62725)\" y=\"495\" x=\"366\" ry=\"0\" height=\"24\" width=\"8\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3821\" transform=\"matrix(0.15643447,0.98768834,-0.98768834,0.15643447,1004.7524,21.244393)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3823\" transform=\"matrix(-0.0784591,0.99691733,-0.99691733,-0.0784591,1097.6997,183.44808)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3825\" transform=\"matrix(-0.30901699,0.95105652,-0.95105652,-0.30901699,1150.2131,362.86818)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3827\" transform=\"matrix(-0.52249856,0.85264016,-0.85264016,-0.52249856,1159.3908,549.58991)\" y=\"495\" x=\"366\" ry=\"0\" height=\"12\" width=\"4\" />\n            <rect style=\"fill:#2e393a;fill-opacity:1;stroke:none\" id=\"rect3829\" transform=\"matrix(-0.70710678,0.70710678,-0.70710678,-0.70710678,1126.1398,731.88077)\" y=\"495\" x=\"366\" ry=\"0\" height=\"24\" width=\"8\" />\n            <text inkscape:label=\"#text3831\" style=\"font-size:16px;font-style:normal;font-weight:bold;text-align:center;line-height:125%;letter-spacing:0px;word-spacing:0px;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;display:inline;font-family:Bitstream Vera Sans;-inkscape-font-specification:Bitstream Vera Sans Bold\" class=\"title\" y=\"380\" x=\"366\" sodipodi:linespacing=\"125%\">GAUGE</text>\n            <text style=\"font-size:36px;font-style:normal;font-weight:normal;text-align:center;line-height:125%;letter-spacing:0px;word-spacing:0px;text-anchor:middle;fill:#000000;fill-opacity:1;stroke:none;display:inline;font-family:Bitstream Vera Sans;-inkscape-font-specification:Bitstream Vera Sans\" class=\"value\" y=\"660\" x=\"366\" sodipodi:linespacing=\"125%\">VALUE</text>\n            <text style=\"font-size:18px;font-style:normal;font-weight:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;display:inline;font-family:Bitstream Vera Sans;-inkscape-font-specification:Bitstream Vera Sans\" id=\"text3835\" y=\"630\" x=\"246\" sodipodi:linespacing=\"125%\">0</text>\n            <text style=\"font-size:18px;font-style:normal;font-weight:normal;text-align:end;line-height:125%;letter-spacing:0px;word-spacing:0px;text-anchor:end;fill:#000000;fill-opacity:1;stroke:none;display:inline;font-family:Bitstream Vera Sans;-inkscape-font-specification:Bitstream Vera Sans\" id=\"text3837\" y=\"630\" x=\"486\" sodipodi:linespacing=\"125%\">100</text>\n            <g class=\"arrow\">\n                <path style=\"fill:#cd3434;fill-opacity:0.6;stroke:#cd3333;stroke-width:2.41449022;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" id=\"path3841\" d=\"m 242.52797,619.26107 c 0.92327,-6.44041 11.02829,-21.52192 13.95508,-24.45426 20.59591,-20.63501 70.49056,-60.85029 80.54883,-79.98793 20.59591,-20.635 22.43071,-23.18707 43.02661,-43.82207 2.92679,-2.93236 9.35314,-21.65035 20.3268,-11.15672 10.97367,10.49362 -7.03958,18.4832 -9.96638,21.41556 -20.5959,20.63499 -22.4307,23.18706 -43.02661,43.82206 -20.47908,8.93956 -59.95291,59.3529 -80.54882,79.9879 -2.92679,2.93235 -17.5366,13.55327 -24.31551,14.19546 z\" inkscape:connector-curvature=\"0\" />\n                <path style=\"fill:#117ddd;fill-opacity:1;stroke:#5984a7;stroke-width:1.44869411;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" id=\"path3843\" d=\"m 385.60401,495 a 19.60401,19.60401 0 1 1 -39.20802,0 19.60401,19.60401 0 1 1 39.20802,0 z\" inkscape:connector-curvature=\"0\" />\n            </g>\n        </g>\n    </g>\n</svg>\n");

/***/ })

}]);
//# sourceMappingURL=widget-gauge-js.chunk.js.map