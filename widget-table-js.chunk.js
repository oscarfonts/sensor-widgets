(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-table-js"],{

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

/***/ "./src/js/widget/table.js":
/*!********************************!*\
  !*** ./src/js/widget/table.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locale-date */ "./src/js/locale-date.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* eslint-disable no-param-reassign */




const template = [
  '<div class="table widget">',
  '<h3></h3>',
  '<div class="table-responsive"></div>',
  '<div><span class="footnote"></span></div>',
  '</div>',
].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].inputs.concat(['feature', 'properties', 'time_start', 'time_end', 'title']),
  optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].optional_inputs,
  preferredSizes: [{ w: 400, h: 400 }],

  init(config, el, errorHandler) {
    // Render template
    el.innerHTML = template;
    el.querySelector('h3').innerHTML = config.title;
    const table = el.querySelector('.table-responsive');

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].init(config, el);

    // Update view
    function createTable(measures, properties) {
      let html = '<table class="table table-striped table-condensed table-hover table-bordered">';
      html += '<thead>';
      html += '<tr>';
      html += '<th>Result Time</th>';

      const sortedNames = Object.keys(properties).sort();
      Object.keys(sortedNames).forEach((i) => {
        const name = sortedNames[i];
        const { uom } = properties[name];
        html += `<th>${name} (${uom})</th>`;
      });
      html += '</tr>';
      html += '</thead>';

      const times = Object.keys(measures);
      times.sort().reverse();
      Object.keys(times).forEach((i) => {
        const time = times[i];
        const values = measures[time];
        html += '<tr>';
        html += `<th class="time">${_locale_date__WEBPACK_IMPORTED_MODULE_1__["default"].display(new Date(parseInt(time, 10)))}</th>`;
        Object.keys(sortedNames).forEach((j) => {
          html += `<td>${values[sortedNames[j]]}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      table.innerHTML = html;
    }

    function redraw(data) {
      // Get tabular data from observations
      const measures = {};
      const properties = {};
      Object.keys(data).forEach((i) => {
        const measure = data[i];

        // Add value in a time-indexed "measures" object
        const time = measure.time.getTime();
        if (!measures[time]) {
          measures[time] = {};
        }
        measures[time][measure.property] = measure.value;

        // Add property to a "properties" object, including uom
        if (!properties[measure.property]) {
          properties[measure.property] = {
            name: measure.property,
            uom: measure.uom,
          };
        }
      });

      createTable(measures, properties);
    }

    // Setup SOS data access
    const data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_0__["default"])(config, redraw, errorHandler);
    data.read();
  },
});


/***/ })

}]);
//# sourceMappingURL=widget-table-js.chunk.js.map