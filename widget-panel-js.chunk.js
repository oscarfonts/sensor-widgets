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
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */





var template = [
    '<div class="panel widget">',
        '<h2></h2>',
        '<h3>', _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("Loading..."), '</h3>',
        '<dl class="dl-horizontal"></dl>',
        '<div><span class="footnote"></span></div>',
    '</div>'
].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].inputs.concat(["feature", "properties", "refresh_interval"]),
    optional_inputs: ["title"].concat(_widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].optional_inputs),
    preferredSizes: [{w: 400, h: 400}],

    init: function(config, el, errorHandler) {
        // Render template
        el.innerHTML = template;
        var title = el.querySelector("h2");
        var subtitle = el.querySelector("h3");
        var panel = el.querySelector("dl");

        //load widget common features
        _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].init(config, el);

        // Setup SOS data access
        var data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_1__["default"])(config, redraw, errorHandler);
        var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
        data.read();

        // Update view
        function redraw(data) {
            if (!data.length) {
                title.innerHTML = config.title || "";
                subtitle.innerHTML = _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("(no data)");
                return;
            }

            // Get the most recent measure time as the reference one
            var mostRecentTime = new Date(Math.max.apply(Math,data.map(function(o){return o.time;})));

            // Sort by property
            data.sort(function(a, b) {
                return a.property.localeCompare(b.property);
            });

            title.innerHTML = config.title || _i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("Last measures from") + " " + data[0].feature;
            subtitle.innerHTML = _locale_date__WEBPACK_IMPORTED_MODULE_2__["default"].display(mostRecentTime);
            var html = "";
            for (var i in data) {
                var measure = data[i];
                html += "<dt>" + measure.property + "</dt>";
                if (measure.time.getTime() == mostRecentTime.getTime()) {
                    html += "<dd>" + measure.value + " " + measure.uom + "</dd>";
                } else { // Outdated! Display distinctly and with corresponding date
                    html += "<dd class='outdated'>" + measure.value + " " + measure.uom + "* <span>*(" + _locale_date__WEBPACK_IMPORTED_MODULE_2__["default"].display(measure.time) + ")</span></dd>";
                }
            }
            panel.innerHTML = html;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc29zLWRhdGEtYWNjZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQvcGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDd0I7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLElBQUksNENBQUc7O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNENBQUc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwR0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUMyQjtBQUNrQjtBQUNiO0FBQ007O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw2Q0FBSTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmLFlBQVksc0RBQU07QUFDbEIsc0NBQXNDLHNEQUFNO0FBQzVDLHNCQUFzQixlQUFlOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHNEQUFNOztBQUVkO0FBQ0EsbUJBQW1CLGdFQUFXO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQUk7QUFDekM7QUFDQTs7QUFFQTtBQUNBLG1GQUFtRixlQUFlOztBQUVsRztBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViLDhDQUE4Qyw2Q0FBSTtBQUNsRCxpQ0FBaUMsb0RBQUU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEIseUdBQXlHLG9EQUFFO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUMiLCJmaWxlIjoid2lkZ2V0LXBhbmVsLWpzLmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIE9zY2FyIEZvbnRzIDxvc2Nhci5mb250c0BnZW9tYXRpLmNvPlxuICovXG5pbXBvcnQgU09TIGZyb20gJy4vU09TJztcblxudmFyIHByb3BlcnR5TmFtZXMgPSB7fTtcbnZhciB3YWl0aW5nRGVzY3JpYmVSZXNwb25zZSA9IHt9O1xudmFyIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZSA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25maWcsIHJlZHJhdywgZXJyb3JIYW5kbGVyKSB7XG4gICAgU09TLnNldFVybChjb25maWcuc2VydmljZSk7XG5cbiAgICBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICB2YXIgb2ZmZXJpbmcgPSBjb25maWcub2ZmZXJpbmc7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IGNvbmZpZy5mZWF0dXJlID8gW2NvbmZpZy5mZWF0dXJlXSA6IGlzQXJyYXkoY29uZmlnLmZlYXR1cmVzKSA/IGNvbmZpZy5mZWF0dXJlcyA6IGNvbmZpZy5mZWF0dXJlcyA/IEpTT04ucGFyc2UoY29uZmlnLmZlYXR1cmVzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBjb25maWcucHJvcGVydHkgPyBbY29uZmlnLnByb3BlcnR5XSA6IGlzQXJyYXkoY29uZmlnLnByb3BlcnRpZXMpID8gY29uZmlnLnByb3BlcnRpZXMgOiBjb25maWcucHJvcGVydGllcyA/IEpTT04ucGFyc2UoY29uZmlnLnByb3BlcnRpZXMpIDogdW5kZWZpbmVkO1xuICAgICAgICB2YXIgdGltZSA9IChjb25maWcudGltZV9zdGFydCAmJiBjb25maWcudGltZV9lbmQpID8gW2NvbmZpZy50aW1lX3N0YXJ0LCBjb25maWcudGltZV9lbmRdIDogXCJsYXRlc3RcIjtcbiAgICAgICAgU09TLmdldE9ic2VydmF0aW9uKG9mZmVyaW5nLCBmZWF0dXJlcywgcHJvcGVydGllcywgdGltZSwgcGFyc2UsIGVycm9ySGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlKG9ic2VydmF0aW9ucykge1xuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlZHJhdyhbXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdGFidWxhciBkYXRhIGZyb20gb2JzZXJ2YXRpb25zXG4gICAgICAgIHZhciBkYXRhID0gW107XG4gICAgICAgIGZvciAodmFyIGkgaW4gb2JzZXJ2YXRpb25zKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YXRpb24gPSBvYnNlcnZhdGlvbnNbaV07XG4gICAgICAgICAgICBnZXRQcm9wZXJ0eU5hbWUob2JzZXJ2YXRpb24ucHJvY2VkdXJlLCBvYnNlcnZhdGlvbi5vYnNlcnZhYmxlUHJvcGVydHksIGFkZE9ic2VydmF0aW9uLCBvYnNlcnZhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRPYnNlcnZhdGlvbihwcm9wZXJ0eSwgb2JzZXJ2YXRpb24pIHtcbiAgICAgICAgICAgIHZhciBmb2kgPSBvYnNlcnZhdGlvbi5mZWF0dXJlT2ZJbnRlcmVzdDtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUob2JzZXJ2YXRpb24ucmVzdWx0VGltZSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IG9ic2VydmF0aW9uLnJlc3VsdC5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpID8gb2JzZXJ2YXRpb24ucmVzdWx0LnZhbHVlIDogb2JzZXJ2YXRpb24ucmVzdWx0LFxuICAgICAgICAgICAgICAgIGZlYXR1cmU6IGZvaS5uYW1lID8gZm9pLm5hbWUudmFsdWUgOiAoZm9pLmlkZW50aWZpZXIgPyBmb2kuaWRlbnRpZmllci52YWx1ZSA6IGZvaSksXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIHVvbTogb2JzZXJ2YXRpb24ucmVzdWx0Lmhhc093blByb3BlcnR5KFwidW9tXCIpID8gb2JzZXJ2YXRpb24ucmVzdWx0LnVvbSA6IFwiKE4vQSlcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gb2JzZXJ2YXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlZHJhdyhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BlcnR5TmFtZShwcm9jZWR1cmUsIGlkLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICBpZiAoIXByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXSkge1xuICAgICAgICAgICAgLy8gUXVldWUgY2FsbGJhY2sgY2FsbFxuICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXSkge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdLnB1c2goe1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghd2FpdGluZ0Rlc2NyaWJlUmVzcG9uc2VbcHJvY2VkdXJlXSkge1xuICAgICAgICAgICAgICAgIHdhaXRpbmdEZXNjcmliZVJlc3BvbnNlW3Byb2NlZHVyZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgYSBEZXNjcmliZVNlbnNvciwgY2FjaGUgYWxsIHByb3BlcnR5IG5hbWVzIGZvciB0aGlzIHByb2NlZHVyZVxuICAgICAgICAgICAgICAgIFNPUy5kZXNjcmliZVNlbnNvcihwcm9jZWR1cmUsIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gZGVzY3JpcHRpb24uaGFzT3duUHJvcGVydHkoXCJQcm9jZXNzTW9kZWxcIikgPyBkZXNjcmlwdGlvbi5Qcm9jZXNzTW9kZWwub3V0cHV0cy5PdXRwdXRMaXN0Lm91dHB1dCA6IGRlc2NyaXB0aW9uLlN5c3RlbS5vdXRwdXRzLk91dHB1dExpc3Qub3V0cHV0O1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyBpbnN0YW5jZW9mIEFycmF5ID8gcHJvcGVydGllcyA6IFtwcm9wZXJ0aWVzXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGVzID0gW1wiUXVhbnRpdHlcIiwgXCJDb3VudFwiLCBcIkJvb2xlYW5cIiwgXCJDYXRlZ29yeVwiLCBcIlRleHRcIiwgXCJPYnNlcnZhYmxlUHJvcGVydHlcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogaW4gdHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eS5pZCA9IHByb3BlcnR5W3R5cGVdLmRlZmluaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNbcHJvcGVydHkuaWRdID0gcHJvcGVydHkubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWVzW3Byb2NlZHVyZV0gPSBuYW1lcztcblxuICAgICAgICAgICAgICAgICAgICAvLyBDbGVhciBwcm9wZXJ0eUNhbGxiYWNrUXVldWVcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBwcm9wZXJ0eUNhbGxiYWNrUXVldWVbcHJvY2VkdXJlXS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jYWxsYmFjay5jYWxsKHVuZGVmaW5lZCwgcHJvcGVydHlOYW1lc1twcm9jZWR1cmVdW2VsZW0uaWRdLCBlbGVtLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXVtpZF0sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVhZDogcmVhZFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBAYXV0aG9yIE9zY2FyIEZvbnRzIDxvc2Nhci5mb250c0BnZW9tYXRpLmNvPlxuICovXG5pbXBvcnQgaTE4biBmcm9tICcuLi9pMThuJztcbmltcG9ydCBkYXRhX2FjY2VzcyBmcm9tICcuLi9zb3MtZGF0YS1hY2Nlc3MnO1xuaW1wb3J0IGxkIGZyb20gJy4uL2xvY2FsZS1kYXRlJztcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vd2lkZ2V0LWNvbW1vbic7XG5cbnZhciB0ZW1wbGF0ZSA9IFtcbiAgICAnPGRpdiBjbGFzcz1cInBhbmVsIHdpZGdldFwiPicsXG4gICAgICAgICc8aDI+PC9oMj4nLFxuICAgICAgICAnPGgzPicsIGkxOG4udChcIkxvYWRpbmcuLi5cIiksICc8L2gzPicsXG4gICAgICAgICc8ZGwgY2xhc3M9XCJkbC1ob3Jpem9udGFsXCI+PC9kbD4nLFxuICAgICAgICAnPGRpdj48c3BhbiBjbGFzcz1cImZvb3Rub3RlXCI+PC9zcGFuPjwvZGl2PicsXG4gICAgJzwvZGl2Pidcbl0uam9pbignJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbnB1dHM6IGNvbW1vbi5pbnB1dHMuY29uY2F0KFtcImZlYXR1cmVcIiwgXCJwcm9wZXJ0aWVzXCIsIFwicmVmcmVzaF9pbnRlcnZhbFwiXSksXG4gICAgb3B0aW9uYWxfaW5wdXRzOiBbXCJ0aXRsZVwiXS5jb25jYXQoY29tbW9uLm9wdGlvbmFsX2lucHV0cyksXG4gICAgcHJlZmVycmVkU2l6ZXM6IFt7dzogNDAwLCBoOiA0MDB9XSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKGNvbmZpZywgZWwsIGVycm9ySGFuZGxlcikge1xuICAgICAgICAvLyBSZW5kZXIgdGVtcGxhdGVcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICAgIHZhciB0aXRsZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKTtcbiAgICAgICAgdmFyIHN1YnRpdGxlID0gZWwucXVlcnlTZWxlY3RvcihcImgzXCIpO1xuICAgICAgICB2YXIgcGFuZWwgPSBlbC5xdWVyeVNlbGVjdG9yKFwiZGxcIik7XG5cbiAgICAgICAgLy9sb2FkIHdpZGdldCBjb21tb24gZmVhdHVyZXNcbiAgICAgICAgY29tbW9uLmluaXQoY29uZmlnLCBlbCk7XG5cbiAgICAgICAgLy8gU2V0dXAgU09TIGRhdGEgYWNjZXNzXG4gICAgICAgIHZhciBkYXRhID0gZGF0YV9hY2Nlc3MoY29uZmlnLCByZWRyYXcsIGVycm9ySGFuZGxlcik7XG4gICAgICAgIHZhciByZWZyZXNoSW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGRhdGEucmVhZCwgY29uZmlnLnJlZnJlc2hfaW50ZXJ2YWwgKiAxMDAwKTtcbiAgICAgICAgZGF0YS5yZWFkKCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHZpZXdcbiAgICAgICAgZnVuY3Rpb24gcmVkcmF3KGRhdGEpIHtcbiAgICAgICAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aXRsZS5pbm5lckhUTUwgPSBjb25maWcudGl0bGUgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZS5pbm5lckhUTUwgPSBpMThuLnQoXCIobm8gZGF0YSlcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIG1vc3QgcmVjZW50IG1lYXN1cmUgdGltZSBhcyB0aGUgcmVmZXJlbmNlIG9uZVxuICAgICAgICAgICAgdmFyIG1vc3RSZWNlbnRUaW1lID0gbmV3IERhdGUoTWF0aC5tYXguYXBwbHkoTWF0aCxkYXRhLm1hcChmdW5jdGlvbihvKXtyZXR1cm4gby50aW1lO30pKSk7XG5cbiAgICAgICAgICAgIC8vIFNvcnQgYnkgcHJvcGVydHlcbiAgICAgICAgICAgIGRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEucHJvcGVydHkubG9jYWxlQ29tcGFyZShiLnByb3BlcnR5KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aXRsZS5pbm5lckhUTUwgPSBjb25maWcudGl0bGUgfHwgaTE4bi50KFwiTGFzdCBtZWFzdXJlcyBmcm9tXCIpICsgXCIgXCIgKyBkYXRhWzBdLmZlYXR1cmU7XG4gICAgICAgICAgICBzdWJ0aXRsZS5pbm5lckhUTUwgPSBsZC5kaXNwbGF5KG1vc3RSZWNlbnRUaW1lKTtcbiAgICAgICAgICAgIHZhciBodG1sID0gXCJcIjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBtZWFzdXJlID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPGR0PlwiICsgbWVhc3VyZS5wcm9wZXJ0eSArIFwiPC9kdD5cIjtcbiAgICAgICAgICAgICAgICBpZiAobWVhc3VyZS50aW1lLmdldFRpbWUoKSA9PSBtb3N0UmVjZW50VGltZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBcIjxkZD5cIiArIG1lYXN1cmUudmFsdWUgKyBcIiBcIiArIG1lYXN1cmUudW9tICsgXCI8L2RkPlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIE91dGRhdGVkISBEaXNwbGF5IGRpc3RpbmN0bHkgYW5kIHdpdGggY29ycmVzcG9uZGluZyBkYXRlXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gXCI8ZGQgY2xhc3M9J291dGRhdGVkJz5cIiArIG1lYXN1cmUudmFsdWUgKyBcIiBcIiArIG1lYXN1cmUudW9tICsgXCIqIDxzcGFuPiooXCIgKyBsZC5kaXNwbGF5KG1lYXN1cmUudGltZSkgKyBcIik8L3NwYW4+PC9kZD5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYW5lbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWZyZXNoSW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=