(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-windrose-js"],{

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

/***/ "./src/js/widget/windrose.js":
/*!***********************************!*\
  !*** ./src/js/widget/windrose.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts/highcharts-more */ "./node_modules/highcharts/highcharts-more.js");
/* harmony import */ var highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* eslint-disable no-param-reassign */





highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_1___default()(highcharts__WEBPACK_IMPORTED_MODULE_0___default.a);

const labels = ['&gt; 10 m/s', '8-10 m/s', '6-8 m/s', '4-6 m/s', '2-4 m/s', '0-2 m/s'];

/* harmony default export */ __webpack_exports__["default"] = ({
  inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].inputs.concat(['feature', 'properties', 'time_start', 'time_end', 'refresh_interval', 'title']),
  optional_inputs: ['subtitle'].concat(_widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].optional_inputs),
  preferredSizes: [{ w: 620, h: 450 }],

  init(config, el, errorHandler) {
    // Main div
    const mainDiv = document.createElement('div');
    mainDiv.className = 'windrose widget';

    // Chart div
    const chart = document.createElement('div');
    mainDiv.appendChild(chart);

    // Add footnote element
    const footnoteDiv = document.createElement('div');
    const footnoteSpan = document.createElement('span');
    footnoteSpan.className = 'footnote';
    footnoteDiv.appendChild(footnoteSpan);
    mainDiv.appendChild(footnoteDiv);

    el.appendChild(mainDiv);

    // load widget common features
    _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].init(config, el, errorHandler);

    function redraw(data) {
      const arr = [];
      Object.keys(data).forEach((i) => {
        const measure = data[i];

        // Build a sparse array where index is timestamp, and member is a 2-element array
        // First element is wind speed, second element is wind direction
        const timestamp = measure.time.getTime();
        const magnitude = measure.uom === 'º' ? 1 : 0;

        if (!arr[timestamp]) {
          arr[timestamp] = [];
        }
        arr[timestamp][magnitude] = measure.value;
      });

      // Build a matrix where first index is speed range, and second is direction
      const slots = [];
      while (slots.length < 6) {
        const dirs = [];
        while (dirs.push(null) < 16) {
          // do nothing
        }
        slots.push(dirs);
      }

      // Sum the number of observations for each speed+direction slot
      let n = 0;
      Object.keys(arr).forEach((i) => {
        const values = arr[i];
        if (values.length === 2) {
          const speed = 5 - Math.min(Math.floor(values[0] / 2), 5); // Speed slot - from 0 to 5
          const direction = Math.round(values[1] / 22.5) % 16; // Direction slot - from 0 to 15
          if (!slots[speed][direction]) {
            slots[speed][direction] = 1;
          } else {
            slots[speed][direction] += 1;
          }
          n += 1;
        }
      });

      // Convert from sample count to percentage
      // Generate legend
      const series = [];
      Object.keys(slots).forEach((i) => {
        let total = 0;
        Object.keys(slots[i]).forEach((j) => {
          slots[i][j] = (slots[i][j] * 100) / n;
          total += slots[i][j];
        });
        series.push({
          name: `${labels[i]} (${Math.round(total)}%)`,
          data: slots[i],
        });
      });

      // Finally, generate the chart
      // eslint-disable-next-line no-new
      new highcharts__WEBPACK_IMPORTED_MODULE_0___default.a.Chart({
        chart: {
          type: 'column',
          polar: true,
          renderTo: chart,
        },
        title: {
          text: config.title,
        },
        subtitle: {
          text: config.subtitle,
        },
        pane: {
          size: '85%',
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 100,
          layout: 'vertical',
        },
        xAxis: {
          tickmarkPlacement: 'on',
          categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
        },
        yAxis: {
          min: 0,
          endOnTick: false,
          showLastLabel: true,
          labels: {
            formatter() {
              return `${this.value} %`;
            },
          },
        },
        tooltip: {
          formatter() {
            return `<span style="color:${this.series.color}">\u25CF</span> ${this.series.name}: <b>${highcharts__WEBPACK_IMPORTED_MODULE_0___default.a.numberFormat(this.y, 1)} %</b><br/>`;
          },
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on',
          },
        },
        colors: ['#BD0BC9', '#C9170B', '#C9760B', '#BDC90B', '#0BC917', '#0BBDC9'],
        series,
      });
    }

    // Setup SOS data access
    const data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_2__["default"])(config, redraw);
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
//# sourceMappingURL=widget-windrose-js.chunk.js.map