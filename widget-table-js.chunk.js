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
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */




var template = [
    '<div class="table widget">',
        '<h3></h3>',
        '<div class="table-responsive"></div>',
        '<div><span class="footnote"></span></div>',
    '</div>'
].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].inputs.concat(["feature", "properties", "time_start", "time_end", "title"]),
    optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].optional_inputs,
    preferredSizes: [{w: 400, h: 400}],

    init: function(config, el, errorHandler) {
        // Render template
        el.innerHTML = template;
        el.querySelector("h3").innerHTML = config.title;
        var table = el.querySelector(".table-responsive");

        //load widget common features
        _widget_common__WEBPACK_IMPORTED_MODULE_2__["default"].init(config, el);

        // Setup SOS data access
        var data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_0__["default"])(config, redraw, errorHandler);
        data.read();

        // Update view
        function redraw(data) {
            // Get tabular data from observations
            var measures = {};
            var properties = {};
            for (var i in data) {
                var measure = data[i];

                // Add value in a time-indexed "measures" object
                var time = measure.time.getTime();
                if (!measures[time]) {
                    measures[time] = {};
                }
                measures[time][measure.property] = measure.value;

                // Add property to a "properties" object, including uom
                if (!properties[measure.property]) {
                    properties[measure.property] = {
                        "name": measure.property,
                        "uom": measure.uom
                    };
                }
            }

            createTable(measures, properties);
        }

        function createTable(measures, properties) {
            var html = '<table class="table table-striped table-condensed table-hover table-bordered">';
            html += '<thead>';
            html += '<tr>';
            html += '<th>Result Time</th>';

            var sortedNames = Object.keys(properties).sort();
            for (var i in sortedNames) {
                var name = sortedNames[i];
                var uom = properties[name].uom;
                html += '<th>' + name + " (" + uom + ')</th>';
            }
            html += '</tr>';
            html += '</thead>';

            var times = Object.keys(measures);
            times.sort().reverse();
            for (i in times) {
                var time = times[i];
                var values = measures[time];
                html += '<tr>';
                html += '<th class="time">' + _locale_date__WEBPACK_IMPORTED_MODULE_1__["default"].display(new Date(parseInt(time))) + '</th>';
                for (var j in sortedNames) {
                    html += '<td>' + values[sortedNames[j]] + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            table.innerHTML = html;
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc29zLWRhdGEtYWNjZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDd0I7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLElBQUksNENBQUc7O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNENBQUc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwR0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDNkM7QUFDYjtBQUNNOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLFlBQVksc0RBQU07QUFDbEIscUJBQXFCLHNEQUFNO0FBQzNCLHNCQUFzQixlQUFlOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxzREFBTTs7QUFFZDtBQUNBLG1CQUFtQixnRUFBVztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsb0RBQUU7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDIiwiZmlsZSI6IndpZGdldC10YWJsZS1qcy5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciBPc2NhciBGb250cyA8b3NjYXIuZm9udHNAZ2VvbWF0aS5jbz5cbiAqL1xuaW1wb3J0IFNPUyBmcm9tICcuL1NPUyc7XG5cbnZhciBwcm9wZXJ0eU5hbWVzID0ge307XG52YXIgd2FpdGluZ0Rlc2NyaWJlUmVzcG9uc2UgPSB7fTtcbnZhciBwcm9wZXJ0eUNhbGxiYWNrUXVldWUgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uZmlnLCByZWRyYXcsIGVycm9ySGFuZGxlcikge1xuICAgIFNPUy5zZXRVcmwoY29uZmlnLnNlcnZpY2UpO1xuXG4gICAgZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgdmFyIG9mZmVyaW5nID0gY29uZmlnLm9mZmVyaW5nO1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSBjb25maWcuZmVhdHVyZSA/IFtjb25maWcuZmVhdHVyZV0gOiBpc0FycmF5KGNvbmZpZy5mZWF0dXJlcykgPyBjb25maWcuZmVhdHVyZXMgOiBjb25maWcuZmVhdHVyZXMgPyBKU09OLnBhcnNlKGNvbmZpZy5mZWF0dXJlcykgOiB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gY29uZmlnLnByb3BlcnR5ID8gW2NvbmZpZy5wcm9wZXJ0eV0gOiBpc0FycmF5KGNvbmZpZy5wcm9wZXJ0aWVzKSA/IGNvbmZpZy5wcm9wZXJ0aWVzIDogY29uZmlnLnByb3BlcnRpZXMgPyBKU09OLnBhcnNlKGNvbmZpZy5wcm9wZXJ0aWVzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHRpbWUgPSAoY29uZmlnLnRpbWVfc3RhcnQgJiYgY29uZmlnLnRpbWVfZW5kKSA/IFtjb25maWcudGltZV9zdGFydCwgY29uZmlnLnRpbWVfZW5kXSA6IFwibGF0ZXN0XCI7XG4gICAgICAgIFNPUy5nZXRPYnNlcnZhdGlvbihvZmZlcmluZywgZmVhdHVyZXMsIHByb3BlcnRpZXMsIHRpbWUsIHBhcnNlLCBlcnJvckhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZShvYnNlcnZhdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWRyYXcoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRhYnVsYXIgZGF0YSBmcm9tIG9ic2VydmF0aW9uc1xuICAgICAgICB2YXIgZGF0YSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpIGluIG9ic2VydmF0aW9ucykge1xuICAgICAgICAgICAgdmFyIG9ic2VydmF0aW9uID0gb2JzZXJ2YXRpb25zW2ldO1xuICAgICAgICAgICAgZ2V0UHJvcGVydHlOYW1lKG9ic2VydmF0aW9uLnByb2NlZHVyZSwgb2JzZXJ2YXRpb24ub2JzZXJ2YWJsZVByb3BlcnR5LCBhZGRPYnNlcnZhdGlvbiwgb2JzZXJ2YXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkT2JzZXJ2YXRpb24ocHJvcGVydHksIG9ic2VydmF0aW9uKSB7XG4gICAgICAgICAgICB2YXIgZm9pID0gb2JzZXJ2YXRpb24uZmVhdHVyZU9mSW50ZXJlc3Q7XG4gICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKG9ic2VydmF0aW9uLnJlc3VsdFRpbWUpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBvYnNlcnZhdGlvbi5yZXN1bHQuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSA/IG9ic2VydmF0aW9uLnJlc3VsdC52YWx1ZSA6IG9ic2VydmF0aW9uLnJlc3VsdCxcbiAgICAgICAgICAgICAgICBmZWF0dXJlOiBmb2kubmFtZSA/IGZvaS5uYW1lLnZhbHVlIDogKGZvaS5pZGVudGlmaWVyID8gZm9pLmlkZW50aWZpZXIudmFsdWUgOiBmb2kpLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICB1b206IG9ic2VydmF0aW9uLnJlc3VsdC5oYXNPd25Qcm9wZXJ0eShcInVvbVwiKSA/IG9ic2VydmF0aW9uLnJlc3VsdC51b20gOiBcIihOL0EpXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IG9ic2VydmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZWRyYXcoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJ0eU5hbWUocHJvY2VkdXJlLCBpZCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFwcm9wZXJ0eU5hbWVzW3Byb2NlZHVyZV0pIHtcbiAgICAgICAgICAgIC8vIFF1ZXVlIGNhbGxiYWNrIGNhbGxcbiAgICAgICAgICAgIGlmICghcHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0pIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXS5wdXNoKHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXdhaXRpbmdEZXNjcmliZVJlc3BvbnNlW3Byb2NlZHVyZV0pIHtcbiAgICAgICAgICAgICAgICB3YWl0aW5nRGVzY3JpYmVSZXNwb25zZVtwcm9jZWR1cmVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGEgRGVzY3JpYmVTZW5zb3IsIGNhY2hlIGFsbCBwcm9wZXJ0eSBuYW1lcyBmb3IgdGhpcyBwcm9jZWR1cmVcbiAgICAgICAgICAgICAgICBTT1MuZGVzY3JpYmVTZW5zb3IocHJvY2VkdXJlLCBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IGRlc2NyaXB0aW9uLmhhc093blByb3BlcnR5KFwiUHJvY2Vzc01vZGVsXCIpID8gZGVzY3JpcHRpb24uUHJvY2Vzc01vZGVsLm91dHB1dHMuT3V0cHV0TGlzdC5vdXRwdXQgOiBkZXNjcmlwdGlvbi5TeXN0ZW0ub3V0cHV0cy5PdXRwdXRMaXN0Lm91dHB1dDtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgaW5zdGFuY2VvZiBBcnJheSA/IHByb3BlcnRpZXMgOiBbcHJvcGVydGllc107XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlcyA9IFtcIlF1YW50aXR5XCIsIFwiQ291bnRcIiwgXCJCb29sZWFuXCIsIFwiQ2F0ZWdvcnlcIiwgXCJUZXh0XCIsIFwiT2JzZXJ2YWJsZVByb3BlcnR5XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHR5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkuaWQgPSBwcm9wZXJ0eVt0eXBlXS5kZWZpbml0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzW3Byb3BlcnR5LmlkXSA9IHByb3BlcnR5Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lc1twcm9jZWR1cmVdID0gbmFtZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYXIgcHJvcGVydHlDYWxsYmFja1F1ZXVlXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gcHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0uc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2FsbGJhY2suY2FsbCh1bmRlZmluZWQsIHByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXVtlbGVtLmlkXSwgZWxlbS5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eU5hbWVzW3Byb2NlZHVyZV1baWRdLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlYWQ6IHJlYWRcbiAgICB9O1xufTtcbiIsIi8qKlxuICogQGF1dGhvciBPc2NhciBGb250cyA8b3NjYXIuZm9udHNAZ2VvbWF0aS5jbz5cbiAqL1xuaW1wb3J0IGRhdGFfYWNjZXNzIGZyb20gJy4uL3Nvcy1kYXRhLWFjY2Vzcyc7XG5pbXBvcnQgbGQgZnJvbSAnLi4vbG9jYWxlLWRhdGUnO1xuaW1wb3J0IGNvbW1vbiBmcm9tICcuLi93aWRnZXQtY29tbW9uJztcblxudmFyIHRlbXBsYXRlID0gW1xuICAgICc8ZGl2IGNsYXNzPVwidGFibGUgd2lkZ2V0XCI+JyxcbiAgICAgICAgJzxoMz48L2gzPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFibGUtcmVzcG9uc2l2ZVwiPjwvZGl2PicsXG4gICAgICAgICc8ZGl2PjxzcGFuIGNsYXNzPVwiZm9vdG5vdGVcIj48L3NwYW4+PC9kaXY+JyxcbiAgICAnPC9kaXY+J1xuXS5qb2luKCcnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGlucHV0czogY29tbW9uLmlucHV0cy5jb25jYXQoW1wiZmVhdHVyZVwiLCBcInByb3BlcnRpZXNcIiwgXCJ0aW1lX3N0YXJ0XCIsIFwidGltZV9lbmRcIiwgXCJ0aXRsZVwiXSksXG4gICAgb3B0aW9uYWxfaW5wdXRzOiBjb21tb24ub3B0aW9uYWxfaW5wdXRzLFxuICAgIHByZWZlcnJlZFNpemVzOiBbe3c6IDQwMCwgaDogNDAwfV0sXG5cbiAgICBpbml0OiBmdW5jdGlvbihjb25maWcsIGVsLCBlcnJvckhhbmRsZXIpIHtcbiAgICAgICAgLy8gUmVuZGVyIHRlbXBsYXRlXG4gICAgICAgIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiaDNcIikuaW5uZXJIVE1MID0gY29uZmlnLnRpdGxlO1xuICAgICAgICB2YXIgdGFibGUgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLXJlc3BvbnNpdmVcIik7XG5cbiAgICAgICAgLy9sb2FkIHdpZGdldCBjb21tb24gZmVhdHVyZXNcbiAgICAgICAgY29tbW9uLmluaXQoY29uZmlnLCBlbCk7XG5cbiAgICAgICAgLy8gU2V0dXAgU09TIGRhdGEgYWNjZXNzXG4gICAgICAgIHZhciBkYXRhID0gZGF0YV9hY2Nlc3MoY29uZmlnLCByZWRyYXcsIGVycm9ySGFuZGxlcik7XG4gICAgICAgIGRhdGEucmVhZCgpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3XG4gICAgICAgIGZ1bmN0aW9uIHJlZHJhdyhkYXRhKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGFidWxhciBkYXRhIGZyb20gb2JzZXJ2YXRpb25zXG4gICAgICAgICAgICB2YXIgbWVhc3VyZXMgPSB7fTtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWVhc3VyZSA9IGRhdGFbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdmFsdWUgaW4gYSB0aW1lLWluZGV4ZWQgXCJtZWFzdXJlc1wiIG9iamVjdFxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gbWVhc3VyZS50aW1lLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1lYXN1cmVzW3RpbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lYXN1cmVzW3RpbWVdID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1lYXN1cmVzW3RpbWVdW21lYXN1cmUucHJvcGVydHldID0gbWVhc3VyZS52YWx1ZTtcblxuICAgICAgICAgICAgICAgIC8vIEFkZCBwcm9wZXJ0eSB0byBhIFwicHJvcGVydGllc1wiIG9iamVjdCwgaW5jbHVkaW5nIHVvbVxuICAgICAgICAgICAgICAgIGlmICghcHJvcGVydGllc1ttZWFzdXJlLnByb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW21lYXN1cmUucHJvcGVydHldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IG1lYXN1cmUucHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVvbVwiOiBtZWFzdXJlLnVvbVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3JlYXRlVGFibGUobWVhc3VyZXMsIHByb3BlcnRpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFibGUobWVhc3VyZXMsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkIHRhYmxlLWhvdmVyIHRhYmxlLWJvcmRlcmVkXCI+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aGVhZD4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRyPic7XG4gICAgICAgICAgICBodG1sICs9ICc8dGg+UmVzdWx0IFRpbWU8L3RoPic7XG5cbiAgICAgICAgICAgIHZhciBzb3J0ZWROYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLnNvcnQoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc29ydGVkTmFtZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHNvcnRlZE5hbWVzW2ldO1xuICAgICAgICAgICAgICAgIHZhciB1b20gPSBwcm9wZXJ0aWVzW25hbWVdLnVvbTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGg+JyArIG5hbWUgKyBcIiAoXCIgKyB1b20gKyAnKTwvdGg+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGhlYWQ+JztcblxuICAgICAgICAgICAgdmFyIHRpbWVzID0gT2JqZWN0LmtleXMobWVhc3VyZXMpO1xuICAgICAgICAgICAgdGltZXMuc29ydCgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgIGZvciAoaSBpbiB0aW1lcykge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gdGltZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IG1lYXN1cmVzW3RpbWVdO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4nO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0aCBjbGFzcz1cInRpbWVcIj4nICsgbGQuZGlzcGxheShuZXcgRGF0ZShwYXJzZUludCh0aW1lKSkpICsgJzwvdGg+JztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIHNvcnRlZE5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nICsgdmFsdWVzW3NvcnRlZE5hbWVzW2pdXSArICc8L3RkPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcbiAgICAgICAgICAgIHRhYmxlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==