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

/***/ "./src/js/widget/windrose.js":
/*!***********************************!*\
  !*** ./src/js/widget/windrose.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sos-data-access */ "./src/js/sos-data-access.js");
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! highcharts/highcharts-more */ "./node_modules/highcharts/highcharts-more.js");
/* harmony import */ var highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_3__);
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */





highcharts_highcharts_more__WEBPACK_IMPORTED_MODULE_3___default()(highcharts__WEBPACK_IMPORTED_MODULE_2___default.a)

var labels = ["&gt; 10 m/s", "8-10 m/s", "6-8 m/s", "4-6 m/s", "2-4 m/s", "0-2 m/s"];

/* harmony default export */ __webpack_exports__["default"] = ({
    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_1__["default"].inputs.concat(["feature", "properties", "time_start", "time_end", "refresh_interval", "title"]),
    optional_inputs: ["subtitle"].concat(_widget_common__WEBPACK_IMPORTED_MODULE_1__["default"].optional_inputs),
    preferredSizes: [{w: 620, h: 450}],

    init: function(config, el, errorHandler) {
        // Main div
        var main_div = document.createElement("div");
        main_div.className = "windrose widget";

        // Chart div
        var chart = document.createElement("div");
        main_div.appendChild(chart);

        // Add footnote element
        var footnote_div = document.createElement("div");
        var footnote_span = document.createElement("span");
        footnote_span.className = "footnote";
        footnote_div.appendChild(footnote_span);
        main_div.appendChild(footnote_div);

        el.appendChild(main_div);

        //load widget common features
        _widget_common__WEBPACK_IMPORTED_MODULE_1__["default"].init(config, el, errorHandler);

        // Setup SOS data access
        var data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_0__["default"])(config, redraw);
        var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
        data.read();

        function redraw(data) {
            var arr = [];
            for (var i in data) {
                var measure = data[i];

                // Build a sparse array where index is timestamp, and member is a 2-element array
                // First element is wind speed, second element is wind direction
                var timestamp = measure.time.getTime();
                var magnitude = measure.uom == "º" ? 1 : 0;

                if (!arr[timestamp]) {
                    arr[timestamp] = [];
                }
                arr[timestamp][magnitude] = measure.value;
            }

            // Build a matrix where first index is speed range, and second is direction
            var slots = [];
            while (slots.length < 6) {
                var dirs = [];
                while (dirs.push(null) < 16);
                slots.push(dirs);
            }

            // Sum the number of observations for each speed+direction slot
            var n = 0;
            for (i in arr) {
                var values = arr[i];
                if (values.length == 2) {
                    var speed = 5 - Math.min(Math.floor(values[0] / 2), 5); // Speed slot - from 0 to 5
                    var direction = Math.round(values[1] / 22.5) % 16; // Direction slot - from 0 to 15
                    if (!slots[speed][direction]) {
                        slots[speed][direction] = 1;
                    } else {
                        slots[speed][direction]++;
                    }
                    n++;
                }
            }

            // Convert from sample count to percentage
            // Generate legend
            var series = [];
            for (i in slots) {
                var total = 0;
                for (var j in slots[i]) {
                    slots[i][j] = slots[i][j] * 100 / n;
                    total += slots[i][j];
                }
                series.push({
                    name: labels[i] + " (" + Math.round(total) + "%)",
                    data: slots[i]
                });
            }

            // Finally, generate the chart
            new highcharts__WEBPACK_IMPORTED_MODULE_2___default.a.Chart({
                chart: {
                    type: 'column',
                    polar: true,
                    renderTo: chart
                },
                title: {
                    text: config.title
                },
                subtitle: {
                    text: config.subtitle
                },
                pane: {
                    size: '85%'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 100,
                    layout: 'vertical'
                },
                xAxis: {
                    tickmarkPlacement: 'on',
                    categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
                },
                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<span style="color:' + this.series.color + '">\u25CF</span> ' + this.series.name + ': <b>' + highcharts__WEBPACK_IMPORTED_MODULE_2___default.a.numberFormat(this.y, 1) + ' %</b><br/>';
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        shadow: false,
                        groupPadding: 0,
                        pointPlacement: 'on'
                    }
                },
                colors: ['#BD0BC9', '#C9170B', '#C9760B', '#BDC90B', '#0BC917', '#0BBDC9'],
                series: series
            });

        }

        return {
            destroy: function() {
                clearInterval(refreshIntervalId);
            }
        };
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc29zLWRhdGEtYWNjZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQvd2luZHJvc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDd0I7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLElBQUksNENBQUc7O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNENBQUc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwR0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDNkM7QUFDUDs7QUFFSDtBQUNjO0FBQ2pELGlFQUFPLENBQUMsaURBQVU7O0FBRWxCLG1CQUFtQjs7QUFFSjtBQUNmLFlBQVksc0RBQU07QUFDbEIseUNBQXlDLHNEQUFNO0FBQy9DLHNCQUFzQixlQUFlOztBQUVyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsUUFBUSxzREFBTTs7QUFFZDtBQUNBLG1CQUFtQixnRUFBVztBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLGdCQUFnQixpREFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLDZIQUE2SCxpREFBVTtBQUN2STtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUMiLCJmaWxlIjoid2lkZ2V0LXdpbmRyb3NlLWpzLmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIE9zY2FyIEZvbnRzIDxvc2Nhci5mb250c0BnZW9tYXRpLmNvPlxuICovXG5pbXBvcnQgU09TIGZyb20gJy4vU09TJztcblxudmFyIHByb3BlcnR5TmFtZXMgPSB7fTtcbnZhciB3YWl0aW5nRGVzY3JpYmVSZXNwb25zZSA9IHt9O1xudmFyIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZSA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25maWcsIHJlZHJhdywgZXJyb3JIYW5kbGVyKSB7XG4gICAgU09TLnNldFVybChjb25maWcuc2VydmljZSk7XG5cbiAgICBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICB2YXIgb2ZmZXJpbmcgPSBjb25maWcub2ZmZXJpbmc7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IGNvbmZpZy5mZWF0dXJlID8gW2NvbmZpZy5mZWF0dXJlXSA6IGlzQXJyYXkoY29uZmlnLmZlYXR1cmVzKSA/IGNvbmZpZy5mZWF0dXJlcyA6IGNvbmZpZy5mZWF0dXJlcyA/IEpTT04ucGFyc2UoY29uZmlnLmZlYXR1cmVzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBjb25maWcucHJvcGVydHkgPyBbY29uZmlnLnByb3BlcnR5XSA6IGlzQXJyYXkoY29uZmlnLnByb3BlcnRpZXMpID8gY29uZmlnLnByb3BlcnRpZXMgOiBjb25maWcucHJvcGVydGllcyA/IEpTT04ucGFyc2UoY29uZmlnLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkO1xuICAgICAgICB2YXIgdGltZSA9IChjb25maWcudGltZV9zdGFydCAmJiBjb25maWcudGltZV9lbmQpID8gW2NvbmZpZy50aW1lX3N0YXJ0LCBjb25maWcudGltZV9lbmRdIDogXCJsYXRlc3RcIjtcbiAgICAgICAgU09TLmdldE9ic2VydmF0aW9uKG9mZmVyaW5nLCBmZWF0dXJlcywgcHJvcGVydGllcywgdGltZSwgcGFyc2UsIGVycm9ySGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlKG9ic2VydmF0aW9ucykge1xuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlZHJhdyhbXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdGFidWxhciBkYXRhIGZyb20gb2JzZXJ2YXRpb25zXG4gICAgICAgIHZhciBkYXRhID0gW107XG4gICAgICAgIGZvciAodmFyIGkgaW4gb2JzZXJ2YXRpb25zKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YXRpb24gPSBvYnNlcnZhdGlvbnNbaV07XG4gICAgICAgICAgICBnZXRQcm9wZXJ0eU5hbWUob2JzZXJ2YXRpb24ucHJvY2VkdXJlLCBvYnNlcnZhdGlvbi5vYnNlcnZhYmxlUHJvcGVydHksIGFkZE9ic2VydmF0aW9uLCBvYnNlcnZhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRPYnNlcnZhdGlvbihwcm9wZXJ0eSwgb2JzZXJ2YXRpb24pIHtcbiAgICAgICAgICAgIHZhciBmb2kgPSBvYnNlcnZhdGlvbi5mZWF0dXJlT2ZJbnRlcmVzdDtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUob2JzZXJ2YXRpb24ucmVzdWx0VGltZSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IG9ic2VydmF0aW9uLnJlc3VsdC5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpID8gb2JzZXJ2YXRpb24ucmVzdWx0LnZhbHVlIDogb2JzZXJ2YXRpb24ucmVzdWx0LFxuICAgICAgICAgICAgICAgIGZlYXR1cmU6IGZvaS5uYW1lID8gZm9pLm5hbWUudmFsdWUgOiAoZm9pLmlkZW50aWZpZXIgPyBmb2kuaWRlbnRpZmllci52YWx1ZSA6IGZvaSksXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIHVvbTogb2JzZXJ2YXRpb24ucmVzdWx0Lmhhc093blByb3BlcnR5KFwidW9tXCIpID8gb2JzZXJ2YXRpb24ucmVzdWx0LnVvbSA6IFwiKE4vQSlcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gb2JzZXJ2YXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlZHJhdyhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BlcnR5TmFtZShwcm9jZWR1cmUsIGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICBpZiAoIXByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXSkge1xuICAgICAgICAgICAgLy8gUXVldWUgY2FsbGJhY2sgY2FsbFxuICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXSkge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdLnB1c2goe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghd2FpdGluZ0Rlc2NyaWJlUmVzcG9uc2VbcHJvY2VkdXJlXSkge1xuICAgICAgICAgICAgICAgIHdhaXRpbmdEZXNjcmliZVJlc3BvbnNlW3Byb2NlZHVyZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgYSBEZXNjcmliZVNlbnNvciwgY2FjaGUgYWxsIHByb3BlcnR5IG5hbWVzIGZvciB0aGlzIHByb2NlZHVyZVxuICAgICAgICAgICAgICAgIFNPUy5kZXNjcmliZVNlbnNvcihwcm9jZWR1cmUsIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gZGVzY3JpcHRpb24uaGFzT3duUHJvcGVydHkoXCJQcm9jZXNzTW9kZWxcIikgPyBkZXNjcmlwdGlvbi5Qcm9jZXNzTW9kZWwub3V0cHV0cy5PdXRwdXRMaXN0Lm91dHB1dCA6IGRlc2NyaXB0aW9uLlN5c3RlbS5vdXRwdXRzLk91dHB1dExpc3Qub3V0cHV0O1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyBpbnN0YW5jZW9mIEFycmF5ID8gcHJvcGVydGllcyA6IFtwcm9wZXJ0aWVzXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGVzID0gW1wiUXVhbnRpdHlcIiwgXCJDb3VudFwiLCBcIkJvb2xlYW5cIiwgXCJDYXRlZ29yeVwiLCBcIlRleHRcIiwgXCJPYnNlcnZhYmxlUHJvcGVydHlcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogaW4gdHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eS5pZCA9IHByb3BlcnR5W3R5cGVdLmRlZmluaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNbcHJvcGVydHkuaWRdID0gcHJvcGVydHkubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWVzW3Byb2NlZHVyZV0gPSBuYW1lcztcblxuICAgICAgICAgICAgICAgICAgICAvLyBDbGVhciBwcm9wZXJ0eUNhbGxiYWNrUXVldWVcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jYWxsYmFjay5jYWxsKHVuZGVmaW5lZCwgcHJvcGVydHlOYW1lc1twcm9jZWR1cmVdW2VsZW0uaWRdLCBlbGVtLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXVtpZF0sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVhZDogcmVhZFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBAYXV0aG9yIE9zY2FyIEZvbnRzIDxvc2Nhci5mb250c0BnZW9tYXRpLmNvPlxuICovXG5pbXBvcnQgZGF0YV9hY2Nlc3MgZnJvbSAnLi4vc29zLWRhdGEtYWNjZXNzJztcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vd2lkZ2V0LWNvbW1vbic7XG5cbmltcG9ydCBIaWdoY2hhcnRzIGZyb20gJ2hpZ2hjaGFydHMnXG5pbXBvcnQgYWRkTW9yZSBmcm9tIFwiaGlnaGNoYXJ0cy9oaWdoY2hhcnRzLW1vcmVcIjtcbmFkZE1vcmUoSGlnaGNoYXJ0cylcblxudmFyIGxhYmVscyA9IFtcIiZndDsgMTAgbS9zXCIsIFwiOC0xMCBtL3NcIiwgXCI2LTggbS9zXCIsIFwiNC02IG0vc1wiLCBcIjItNCBtL3NcIiwgXCIwLTIgbS9zXCJdO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5wdXRzOiBjb21tb24uaW5wdXRzLmNvbmNhdChbXCJmZWF0dXJlXCIsIFwicHJvcGVydGllc1wiLCBcInRpbWVfc3RhcnRcIiwgXCJ0aW1lX2VuZFwiLCBcInJlZnJlc2hfaW50ZXJ2YWxcIiwgXCJ0aXRsZVwiXSksXG4gICAgb3B0aW9uYWxfaW5wdXRzOiBbXCJzdWJ0aXRsZVwiXS5jb25jYXQoY29tbW9uLm9wdGlvbmFsX2lucHV0cyksXG4gICAgcHJlZmVycmVkU2l6ZXM6IFt7dzogNjIwLCBoOiA0NTB9XSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgZWwsIGVycm9ySGFuZGxlcikge1xuICAgICAgICAvLyBNYWluIGRpdlxuICAgICAgICB2YXIgbWFpbl9kaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBtYWluX2Rpdi5jbGFzc05hbWUgPSBcIndpbmRyb3NlIHdpZGdldFwiO1xuXG4gICAgICAgIC8vIENoYXJ0IGRpdlxuICAgICAgICB2YXIgY2hhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBtYWluX2Rpdi5hcHBlbmRDaGlsZChjaGFydCk7XG5cbiAgICAgICAgLy8gQWRkIGZvb3Rub3RlIGVsZW1lbnRcbiAgICAgICAgdmFyIGZvb3Rub3RlX2RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBmb290bm90ZV9zcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGZvb3Rub3RlX3NwYW4uY2xhc3NOYW1lID0gXCJmb290bm90ZVwiO1xuICAgICAgICBmb290bm90ZV9kaXYuYXBwZW5kQ2hpbGQoZm9vdG5vdGVfc3Bhbik7XG4gICAgICAgIG1haW5fZGl2LmFwcGVuZENoaWxkKGZvb3Rub3RlX2Rpdik7XG5cbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQobWFpbl9kaXYpO1xuXG4gICAgICAgIC8vbG9hZCB3aWRnZXQgY29tbW9uIGZlYXR1cmVzXG4gICAgICAgIGNvbW1vbi5pbml0KGNvbmZpZywgZWwsIGVycm9ySGFuZGxlcik7XG5cbiAgICAgICAgLy8gU2V0dXAgU09TIGRhdGEgYWNjZXNzXG4gICAgICAgIHZhciBkYXRhID0gZGF0YV9hY2Nlc3MoY29uZmlnLCByZWRyYXcpO1xuICAgICAgICB2YXIgcmVmcmVzaEludGVydmFsSWQgPSBzZXRJbnRlcnZhbChkYXRhLnJlYWQsIGNvbmZpZy5yZWZyZXNoX2ludGVydmFsICogMTAwMCk7XG4gICAgICAgIGRhdGEucmVhZCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlZHJhdyhkYXRhKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWVhc3VyZSA9IGRhdGFbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBhIHNwYXJzZSBhcnJheSB3aGVyZSBpbmRleCBpcyB0aW1lc3RhbXAsIGFuZCBtZW1iZXIgaXMgYSAyLWVsZW1lbnQgYXJyYXlcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCBlbGVtZW50IGlzIHdpbmQgc3BlZWQsIHNlY29uZCBlbGVtZW50IGlzIHdpbmQgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzdGFtcCA9IG1lYXN1cmUudGltZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgdmFyIG1hZ25pdHVkZSA9IG1lYXN1cmUudW9tID09IFwiwrpcIiA/IDEgOiAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhcnJbdGltZXN0YW1wXSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJbdGltZXN0YW1wXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcnJbdGltZXN0YW1wXVttYWduaXR1ZGVdID0gbWVhc3VyZS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQnVpbGQgYSBtYXRyaXggd2hlcmUgZmlyc3QgaW5kZXggaXMgc3BlZWQgcmFuZ2UsIGFuZCBzZWNvbmQgaXMgZGlyZWN0aW9uXG4gICAgICAgICAgICB2YXIgc2xvdHMgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChzbG90cy5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpcnMgPSBbXTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZGlycy5wdXNoKG51bGwpIDwgMTYpO1xuICAgICAgICAgICAgICAgIHNsb3RzLnB1c2goZGlycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN1bSB0aGUgbnVtYmVyIG9mIG9ic2VydmF0aW9ucyBmb3IgZWFjaCBzcGVlZCtkaXJlY3Rpb24gc2xvdFxuICAgICAgICAgICAgdmFyIG4gPSAwO1xuICAgICAgICAgICAgZm9yIChpIGluIGFycikge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBhcnJbaV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSA1IC0gTWF0aC5taW4oTWF0aC5mbG9vcih2YWx1ZXNbMF0gLyAyKSwgNSk7IC8vIFNwZWVkIHNsb3QgLSBmcm9tIDAgdG8gNVxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5yb3VuZCh2YWx1ZXNbMV0gLyAyMi41KSAlIDE2OyAvLyBEaXJlY3Rpb24gc2xvdCAtIGZyb20gMCB0byAxNVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNsb3RzW3NwZWVkXVtkaXJlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90c1tzcGVlZF1bZGlyZWN0aW9uXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90c1tzcGVlZF1bZGlyZWN0aW9uXSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgZnJvbSBzYW1wbGUgY291bnQgdG8gcGVyY2VudGFnZVxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgbGVnZW5kXG4gICAgICAgICAgICB2YXIgc2VyaWVzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgaW4gc2xvdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWwgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogaW4gc2xvdHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2xvdHNbaV1bal0gPSBzbG90c1tpXVtqXSAqIDEwMCAvIG47XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsICs9IHNsb3RzW2ldW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXJpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGxhYmVsc1tpXSArIFwiIChcIiArIE1hdGgucm91bmQodG90YWwpICsgXCIlKVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBzbG90c1tpXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaW5hbGx5LCBnZW5lcmF0ZSB0aGUgY2hhcnRcbiAgICAgICAgICAgIG5ldyBIaWdoY2hhcnRzLkNoYXJ0KHtcbiAgICAgICAgICAgICAgICBjaGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgcG9sYXI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclRvOiBjaGFydFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogY29uZmlnLnRpdGxlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZToge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjb25maWcuc3VidGl0bGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogJzg1JSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgICAgICBhbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIHk6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiAndmVydGljYWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4QXhpczoge1xuICAgICAgICAgICAgICAgICAgICB0aWNrbWFya1BsYWNlbWVudDogJ29uJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllczogWydOJywgJ05ORScsICdORScsICdFTkUnLCAnRScsICdFU0UnLCAnU0UnLCAnU1NFJywgJ1MnLCAnU1NXJywgJ1NXJywgJ1dTVycsICdXJywgJ1dOVycsICdOVycsICdOTlcnXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeUF4aXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBlbmRPblRpY2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzaG93TGFzdExhYmVsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgKyAnICUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxzcGFuIHN0eWxlPVwiY29sb3I6JyArIHRoaXMuc2VyaWVzLmNvbG9yICsgJ1wiPlxcdTI1Q0Y8L3NwYW4+ICcgKyB0aGlzLnNlcmllcy5uYW1lICsgJzogPGI+JyArIEhpZ2hjaGFydHMubnVtYmVyRm9ybWF0KHRoaXMueSwgMSkgKyAnICU8L2I+PGJyLz4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwbG90T3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBzZXJpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNraW5nOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFBsYWNlbWVudDogJ29uJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnI0JEMEJDOScsICcjQzkxNzBCJywgJyNDOTc2MEInLCAnI0JEQzkwQicsICcjMEJDOTE3JywgJyMwQkJEQzknXSxcbiAgICAgICAgICAgICAgICBzZXJpZXM6IHNlcmllc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlZnJlc2hJbnRlcnZhbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==