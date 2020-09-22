(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-thermometer-js"],{

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

/***/ "./src/js/widget/thermometer.js":
/*!**************************************!*\
  !*** ./src/js/widget/thermometer.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../i18n */ "./src/js/i18n.js");
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _thermometer_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./thermometer.svg */ "./src/js/widget/thermometer.svg");
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../locale-date */ "./src/js/locale-date.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* eslint-disable no-param-reassign */






const template = [
  '<div class="thermometer widget">',
  '<h1 class="feature"></h1>',
  _thermometer_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
  '<div class="data">',
  '<h2><span class="property"></span>: <span class="value"></span> ', _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Cel'), '</h2>',
  '<h3>', _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Request time'), ': <span class="request_time"></span></h3>',
  '<h3>', _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Result time'), ': <span class="result_time"></span></h3>',
  '</div>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

const dy = 3.342574;
const yMax = 206.34359 + 267.40595;
const tMin = -24;

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_4__["default"].inputs.concat(['feature', 'property', 'refresh_interval']),
  optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_4__["default"].optional_inputs,
  preferredSizes: [{ w: 300, h: 540 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    const elem = el.querySelector('.svg-temp');
    const clip = (elem.firstElementChild || elem.firstChild);

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_4__["default"].init(config, el);

    // Update view
    function redraw(data) {
      const measure = data[0];
      if (measure) {
        el.querySelector('.feature').innerHTML = measure.feature;
        el.querySelector('.property').innerHTML = measure.property;
        el.querySelector('.value').innerHTML = measure.value;
        el.querySelector('.request_time').innerHTML = _locale_date__WEBPACK_IMPORTED_MODULE_3__["default"].display(new Date());
        el.querySelector('.result_time').innerHTML = _locale_date__WEBPACK_IMPORTED_MODULE_3__["default"].display(measure.time);

        const h = dy * (measure.value - tMin);
        const yMin = yMax - h;
        clip.setAttribute('height', h.toString());
        clip.setAttribute('y', yMin.toString());
      } else {
        el.querySelector('.value').innerHTML = _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('(no data)');
      }
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


/***/ }),

/***/ "./src/js/widget/thermometer.svg":
/*!***************************************!*\
  !*** ./src/js/widget/thermometer.svg ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n\n<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\" version=\"1.1\" width=\"75.789711\" height=\"333.77173\" id=\"svg4142\" inkscape:version=\"0.48.3.1 r9886\" sodipodi:docname=\"thermometer.svg\">\n    <sodipodi:namedview pagecolor=\"#ffffff\" bordercolor=\"#666666\" borderopacity=\"1\" objecttolerance=\"10\" gridtolerance=\"10\" guidetolerance=\"10\" inkscape:pageopacity=\"0\" inkscape:pageshadow=\"2\" inkscape:window-width=\"1108\" inkscape:window-height=\"806\" id=\"namedview124\" showgrid=\"false\" inkscape:zoom=\"1.4141401\" inkscape:cx=\"93.925888\" inkscape:cy=\"187.87336\" inkscape:window-x=\"700\" inkscape:window-y=\"134\" inkscape:window-maximized=\"0\" inkscape:current-layer=\"g6250\" />\n    <defs id=\"defs4144\">\n        <linearGradient id=\"THlinearGradient4266\">\n            <stop id=\"stop4379\" style=\"stop-color:#7d7d7d;stop-opacity:1\" offset=\"0\" />\n            <stop id=\"stop4381\" style=\"stop-color:#c4c4c4;stop-opacity:1\" offset=\"1\" />\n        </linearGradient>\n        <linearGradient x1=\"438.19788\" y1=\"341.11096\" x2=\"441.19788\" y2=\"341.11096\" id=\"THlinearGradient4340\" xlink:href=\"#THlinearGradient4266\" gradientUnits=\"userSpaceOnUse\" />\n        <linearGradient id=\"THlinearGradient4246\">\n            <stop id=\"stop4385\" style=\"stop-color:#ff0909;stop-opacity:1\" offset=\"0\" />\n            <stop id=\"stop4387\" style=\"stop-color:#00338a;stop-opacity:1\" offset=\"1\" />\n        </linearGradient>\n        <linearGradient x1=\"450\" y1=\"197.2\" x2=\"450\" y2=\"476.39999\" id=\"THlinearGradient4288\" xlink:href=\"#THlinearGradient4246\" gradientUnits=\"userSpaceOnUse\" />\n        <linearGradient id=\"THlinearGradient0001\">\n            <stop id=\"stop4391\" style=\"stop-color:#003dc7;stop-opacity:1\" offset=\"0\" />\n            <stop id=\"stop4393\" style=\"stop-color:#00338a;stop-opacity:1\" offset=\"1\" />\n        </linearGradient>\n        <radialGradient cx=\"92.899834\" cy=\"496.64462\" r=\"16.394089\" fx=\"92.899834\" fy=\"496.64462\" id=\"THradialGradient4252\" xlink:href=\"#THlinearGradient0001\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(0.88150756,0,0,0.56269906,11.007928,217.18317)\" />\n        <linearGradient id=\"THlinearGradient4400\">\n            <stop id=\"stop4397\" style=\"stop-color:#909090;stop-opacity:1\" offset=\"0\" />\n            <stop id=\"stop4399\" style=\"stop-color:#4d4d4d;stop-opacity:1\" offset=\"1\" />\n        </linearGradient>\n        <radialGradient cx=\"92.899834\" cy=\"496.64462\" r=\"16.394089\" fx=\"92.899834\" fy=\"496.64462\" id=\"radialGradient6445\" xlink:href=\"#THlinearGradient0001\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(0.88150756,0,0,0.56269906,11.007928,217.18317)\" />\n        <linearGradient x1=\"450\" y1=\"197.2\" x2=\"450\" y2=\"476.39999\" id=\"linearGradient6447\" xlink:href=\"#THlinearGradient4246\" gradientUnits=\"userSpaceOnUse\" />\n        <linearGradient x1=\"192.89532\" y1=\"483.55652\" x2=\"195.70879\" y2=\"483.55652\" id=\"linearGradient6449\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"334.41422\" x2=\"292.18582\" y2=\"334.41422\" id=\"linearGradient6451\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"344.93784\" x2=\"292.18582\" y2=\"344.93784\" id=\"linearGradient6453\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"355.46143\" x2=\"292.18582\" y2=\"355.46143\" id=\"linearGradient6455\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"546.40179\" x2=\"195.70879\" y2=\"546.40179\" id=\"linearGradient6457\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"376.50858\" x2=\"292.18582\" y2=\"376.50858\" id=\"linearGradient6459\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"387.03217\" x2=\"292.18582\" y2=\"387.03217\" id=\"linearGradient6461\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"397.55576\" x2=\"292.18582\" y2=\"397.55576\" id=\"linearGradient6463\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"609.24713\" x2=\"195.70879\" y2=\"609.24713\" id=\"linearGradient6465\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"418.60294\" x2=\"292.18582\" y2=\"418.60294\" id=\"linearGradient6467\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"429.12656\" x2=\"292.18582\" y2=\"429.12656\" id=\"linearGradient6469\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"439.65015\" x2=\"292.18582\" y2=\"439.65015\" id=\"linearGradient6471\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"672.09241\" x2=\"195.70879\" y2=\"672.09241\" id=\"linearGradient6473\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"460.69733\" x2=\"292.18582\" y2=\"460.69733\" id=\"linearGradient6475\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"471.22089\" x2=\"292.18582\" y2=\"471.22089\" id=\"linearGradient6477\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"481.74451\" x2=\"292.18582\" y2=\"481.74451\" id=\"linearGradient6479\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"734.93768\" x2=\"195.70879\" y2=\"734.93768\" id=\"linearGradient6481\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"502.79166\" x2=\"292.18582\" y2=\"502.79166\" id=\"linearGradient6483\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"513.31531\" x2=\"292.18582\" y2=\"513.31531\" id=\"linearGradient6485\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"523.83887\" x2=\"292.18582\" y2=\"523.83887\" id=\"linearGradient6487\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"797.78302\" x2=\"195.70879\" y2=\"797.78302\" id=\"linearGradient6489\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"544.88605\" x2=\"292.18582\" y2=\"544.88605\" id=\"linearGradient6491\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"555.40961\" x2=\"292.18582\" y2=\"555.40961\" id=\"linearGradient6493\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"565.93323\" x2=\"292.18582\" y2=\"565.93323\" id=\"linearGradient6495\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"860.6283\" x2=\"195.70879\" y2=\"860.6283\" id=\"linearGradient6497\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"586.98041\" x2=\"292.18582\" y2=\"586.98041\" id=\"linearGradient6499\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"597.50397\" x2=\"292.18582\" y2=\"597.50397\" id=\"linearGradient6501\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"608.02759\" x2=\"292.18582\" y2=\"608.02759\" id=\"linearGradient6503\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"923.47363\" x2=\"195.70879\" y2=\"923.47363\" id=\"linearGradient6505\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"629.07477\" x2=\"292.18582\" y2=\"629.07477\" id=\"linearGradient6507\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"639.59839\" x2=\"292.18582\" y2=\"639.59839\" id=\"linearGradient6509\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"650.12195\" x2=\"292.18582\" y2=\"650.12195\" id=\"linearGradient6511\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"986.31891\" x2=\"195.70879\" y2=\"986.31891\" id=\"linearGradient6513\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"671.16913\" x2=\"292.18582\" y2=\"671.16913\" id=\"linearGradient6515\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"681.69269\" x2=\"292.18582\" y2=\"681.69269\" id=\"linearGradient6517\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"692.21631\" x2=\"292.18582\" y2=\"692.21631\" id=\"linearGradient6519\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"1049.1642\" x2=\"195.70879\" y2=\"1049.1642\" id=\"linearGradient6521\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"290.30136\" y1=\"713.26349\" x2=\"292.18582\" y2=\"713.26349\" id=\"linearGradient6523\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"723.78705\" x2=\"292.18582\" y2=\"723.78705\" id=\"linearGradient6525\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"290.30136\" y1=\"734.31067\" x2=\"292.18582\" y2=\"734.31067\" id=\"linearGradient6527\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(1.5740837,0.63529023)\" />\n        <linearGradient x1=\"192.89532\" y1=\"1112.0095\" x2=\"195.70879\" y2=\"1112.0095\" id=\"linearGradient6529\" xlink:href=\"#THlinearGradient4400\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"scale(2.3500476,0.42552329)\" />\n        <linearGradient x1=\"438.19788\" y1=\"341.11096\" x2=\"441.19788\" y2=\"341.11096\" id=\"linearGradient6531\" xlink:href=\"#THlinearGradient4266\" gradientUnits=\"userSpaceOnUse\" />\n        <clipPath id=\"temp\" class=\"svg-temp\">\n            <rect x=\"439.7786\" y=\"393.5278\" width=\"20.24066\" height=\"80.2218\" />\n        </clipPath>\n    </defs>\n    <metadata id=\"metadata4147\">\n        <rdf:RDF>\n            <cc:Work rdf:about=\"\">\n                <dc:format>image/svg+xml</dc:format>\n                <dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\" />\n                <dc:title />\n            </cc:Work>\n        </rdf:RDF>\n    </metadata>\n    <g transform=\"translate(-423.14169,-184.57523)\" id=\"layer1\" />\n    <g transform=\"translate(-423.14169,-184.57523)\" id=\"g6250\" style=\"\">\n        <path d=\"m 102.94692,483.35783 a 16.394089,16.814449 0 1 1 -19.997154,-0.0766\" transform=\"translate(356.88671,-5.3629009)\" id=\"path6252\" style=\"fill:url(#radialGradient6445);fill-opacity:1;stroke:#6e6e6e;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <path d=\"m 439.63455,478.2371 20.24066,0.12296 0,-275.96832 c 0,0 0,-7.56651 -10.08867,-7.56651 -10.08867,0 -10.08867,7.56651 -10.08867,7.56651 z\" id=\"path6254\" style=\"fill:#d6e6ec;fill-opacity:1;stroke:none\" />\n        <path d=\"m 439.7786,478.66217 20.24066,0 -0.0387,-5.2259 -20.28271,0 z\" id=\"path6256\" style=\"fill:#00338a;fill-opacity:1;stroke:none\" />\n        <path d=\"m 439.7786,473.74954 20.24066,0 -0.0387,-267.40595 -20.28271,0 z\" id=\"temperature\" style=\"fill:url(#linearGradient6447);fill-opacity:1;stroke:none;clip-path: url(#temp);\">\n            <title id=\"title3101\">temperature</title>\n        </path>\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"205.82706\" id=\"rect6260\" style=\"fill:url(#linearGradient6449);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"212.51259\" id=\"rect6262\" style=\"fill:url(#linearGradient6451);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"219.19814\" id=\"rect6264\" style=\"fill:url(#linearGradient6453);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"225.88367\" id=\"rect6266\" style=\"fill:url(#linearGradient6455);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"232.5692\" id=\"rect6268\" style=\"fill:url(#linearGradient6457);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"239.25473\" id=\"rect6270\" style=\"fill:url(#linearGradient6459);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"245.94026\" id=\"rect6272\" style=\"fill:url(#linearGradient6461);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"252.62579\" id=\"rect6274\" style=\"fill:url(#linearGradient6463);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"259.31134\" id=\"rect6276\" style=\"fill:url(#linearGradient6465);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"265.99686\" id=\"rect6278\" style=\"fill:url(#linearGradient6467);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"272.6824\" id=\"rect6280\" style=\"fill:url(#linearGradient6469);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"279.36795\" id=\"rect6282\" style=\"fill:url(#linearGradient6471);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"286.05347\" id=\"rect6284\" style=\"fill:url(#linearGradient6473);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"292.73901\" id=\"rect6286\" style=\"fill:url(#linearGradient6475);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"299.42453\" id=\"rect6288\" style=\"fill:url(#linearGradient6477);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"306.11008\" id=\"rect6290\" style=\"fill:url(#linearGradient6479);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"312.79559\" id=\"rect6292\" style=\"fill:url(#linearGradient6481);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"319.48114\" id=\"rect6294\" style=\"fill:url(#linearGradient6483);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"326.16669\" id=\"rect6296\" style=\"fill:url(#linearGradient6485);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"332.8522\" id=\"rect6298\" style=\"fill:url(#linearGradient6487);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"339.53775\" id=\"rect6300\" style=\"fill:url(#linearGradient6489);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"346.22327\" id=\"rect6302\" style=\"fill:url(#linearGradient6491);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"352.90881\" id=\"rect6304\" style=\"fill:url(#linearGradient6493);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"359.59436\" id=\"rect6306\" style=\"fill:url(#linearGradient6495);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"366.27988\" id=\"rect6308\" style=\"fill:url(#linearGradient6497);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"372.96542\" id=\"rect6310\" style=\"fill:url(#linearGradient6499);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"379.65094\" id=\"rect6312\" style=\"fill:url(#linearGradient6501);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"386.33649\" id=\"rect6314\" style=\"fill:url(#linearGradient6503);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"393.02203\" id=\"rect6316\" style=\"fill:url(#linearGradient6505);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"399.70755\" id=\"rect6318\" style=\"fill:url(#linearGradient6507);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"406.3931\" id=\"rect6320\" style=\"fill:url(#linearGradient6509);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"413.07861\" id=\"rect6322\" style=\"fill:url(#linearGradient6511);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"419.76416\" id=\"rect6324\" style=\"fill:url(#linearGradient6513);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"426.44968\" id=\"rect6326\" style=\"fill:url(#linearGradient6515);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"433.13522\" id=\"rect6328\" style=\"fill:url(#linearGradient6517);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"439.82077\" id=\"rect6330\" style=\"fill:url(#linearGradient6519);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"446.50629\" id=\"rect6332\" style=\"fill:url(#linearGradient6521);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"453.19183\" id=\"rect6334\" style=\"fill:url(#linearGradient6523);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"459.87735\" id=\"rect6336\" style=\"fill:url(#linearGradient6525);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"2.841325\" height=\"1.07219\" ry=\"0\" x=\"457.02112\" y=\"466.5629\" id=\"rect6338\" style=\"fill:url(#linearGradient6527);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <rect width=\"6.4867501\" height=\"1.07219\" ry=\"0\" x=\"453.3757\" y=\"473.24844\" id=\"rect6340\" style=\"fill:url(#linearGradient6529);fill-opacity:1;stroke:#030303;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <text x=\"464.82135\" y=\"478.64722\" id=\"text6342\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">-24.0</text>\n        <text x=\"464.82135\" y=\"451.90509\" id=\"text6344\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">-16.0</text>\n        <text x=\"464.82135\" y=\"425.16296\" id=\"text6346\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">-8.0</text>\n        <text x=\"464.82135\" y=\"398.42081\" id=\"text6348\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">0.0</text>\n        <text x=\"464.82135\" y=\"371.67868\" id=\"text6350\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">8.0</text>\n        <text x=\"464.82135\" y=\"344.93655\" id=\"text6352\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">16.0</text>\n        <text x=\"464.82135\" y=\"318.1944\" id=\"text6354\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">24.0</text>\n        <text x=\"464.82135\" y=\"291.45227\" id=\"text6356\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">32.0</text>\n        <text x=\"464.82135\" y=\"264.71014\" id=\"text6358\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">40.0</text>\n        <text x=\"464.82135\" y=\"237.96799\" id=\"text6360\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">48.0</text>\n        <text x=\"464.82135\" y=\"211.22586\" id=\"text6362\" style=\"font-size:10.7975893px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:Arial;-inkscape-font-specification:Arial\">56.0</text>\n        <path d=\"m 439.69787,202.39174 c 0,0 0,-7.56651 10.08867,-7.56651 10.08867,0 10.08867,7.56651 10.08867,7.56651 l -0.0774,275.82761\" id=\"path6364\" style=\"fill:none;stroke:#6e6e6e;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n        <path d=\"M 439.7753,477.8943 439.6979,202.39174\" id=\"path6366\" style=\"fill:none;stroke:url(#linearGradient6531);stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n    </g>\n</svg>\n");

/***/ })

}]);
//# sourceMappingURL=widget-thermometer-js.chunk.js.map