(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-panel-js"],{

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

/***/ "./src/js/widget/panel.js":
/*!********************************!*\
  !*** ./src/js/widget/panel.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../i18n */ "./src/js/i18n.js");
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locale-date */ "./src/js/locale-date.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* eslint-disable no-param-reassign */





const template = [
  '<div class="panel widget">',
  '<h2></h2>',
  '<h3>', _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Loading...'), '</h3>',
  '<dl class="dl-horizontal"></dl>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].inputs.concat(['feature', 'properties', 'refresh_interval']),
  optional_inputs: ['title'].concat(_widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].optional_inputs),
  preferredSizes: [{ w: 400, h: 400 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    const title = el.querySelector('h2');
    const subtitle = el.querySelector('h3');
    const panel = el.querySelector('dl');

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].init(config, el);

    // Update view
    function redraw(data) {
      if (!data.length) {
        title.innerHTML = config.title || '';
        subtitle.innerHTML = _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('(no data)');
        return;
      }

      // Get the most recent measure time as the reference one
      const mostRecentTime = new Date(Math.max(...data.map((o) => o.time)));

      // Sort by property
      data.sort((a, b) => a.property.localeCompare(b.property));

      title.innerHTML = config.title || `${_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('Last measures from')} ${data[0].feature}`;
      subtitle.innerHTML = _locale_date__WEBPACK_IMPORTED_MODULE_2__["default"].display(mostRecentTime);
      let html = '';
      Object.keys(data).forEach((i) => {
        const measure = data[i];
        html += `<dt>${measure.property}</dt>`;
        if (measure.time.getTime() === mostRecentTime.getTime()) {
          html += `<dd>${measure.value} ${measure.uom}</dd>`;
        } else { // Outdated! Display distinctly and with corresponding date
          html += `<dd class='outdated'>${measure.value} ${measure.uom}* <span>*(${_locale_date__WEBPACK_IMPORTED_MODULE_2__["default"].display(measure.time)})</span></dd>`;
        }
      });
      panel.innerHTML = html;
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
//# sourceMappingURL=widget-panel-js.chunk.js.map