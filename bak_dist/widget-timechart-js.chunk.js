(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-timechart-js"],{

/***/ "./src/js/locale-date.js":
/*!*******************************!*\
  !*** ./src/js/locale-date.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author Oscar Fonts <oscar.fonts@geomati.co>\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./i18n */ \"./src/js/i18n.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(i18n) {\n    \"use strict\";\n\n    var date = {\n        utc: false,\n        locale: navigator.language || navigator.browserLanguage\n    };\n\n    return {\n        display: function(d) {\n            if (!d) {\n                return i18n.t(\"(no date)\");\n            }\n            if (date.utc) {\n                return d.toLocaleString(date.locale, {\n                    timeZone: \"UTC\"\n                }) + \" UTC\";\n            } else {\n                return d.toLocaleString(date.locale);\n            }\n        },\n        locale: function(l) {\n            if (l) {\n                date.locale = l;\n            }\n            return date.locale;\n        },\n        utc: function(u) {\n            if (typeof u !== 'undefined') {\n                date.utc = u;\n            }\n            return date.utc;\n        }\n    };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./src/js/locale-date.js?");

/***/ }),

/***/ "./src/js/sos-data-access.js":
/*!***********************************!*\
  !*** ./src/js/sos-data-access.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author Oscar Fonts <oscar.fonts@geomati.co>\n */\n !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./SOS */ \"./src/js/SOS.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(SOS) {\n    \"use strict\";\n\n    var propertyNames = {};\n    var waitingDescribeResponse = {};\n    var propertyCallbackQueue = {};\n\n\treturn function(config, redraw, errorHandler) {\n        SOS.setUrl(config.service);\n\n        function read() {\n            var offering = config.offering;\n            var features = config.feature ? [config.feature] : isArray(config.features) ? config.features : config.features ? JSON.parse(config.features) : undefined;\n            var properties = config.property ? [config.property] : isArray(config.properties) ? config.properties : config.properties ? JSON.parse(config.properties) : undefined;\n            var time = (config.time_start && config.time_end) ? [config.time_start, config.time_end] : \"latest\";\n            SOS.getObservation(offering, features, properties, time, parse, errorHandler);\n        }\n\n        function isArray(obj) {\n            return Object.prototype.toString.call(obj) === '[object Array]';\n        }\n\n        function parse(observations) {\n            if (!observations.length) {\n                redraw([]);\n            }\n\n            // Get tabular data from observations\n            var data = [];\n            for (var i in observations) {\n                var observation = observations[i];\n                getPropertyName(observation.procedure, observation.observableProperty, addObservation, observation);\n            }\n\n            function addObservation(property, observation) {\n                var foi = observation.featureOfInterest;\n                data.push({\n                    time: new Date(observation.resultTime),\n                    value: observation.result.hasOwnProperty(\"value\") ? observation.result.value : observation.result,\n                    feature: foi.name ? foi.name.value : (foi.identifier ? foi.identifier.value : foi),\n                    property: property,\n                    uom: observation.result.hasOwnProperty(\"uom\") ? observation.result.uom : \"(N/A)\"\n                });\n                if (data.length == observations.length) {\n                    redraw(data);\n                }\n            }\n        }\n\n        function getPropertyName(procedure, id, callback, context) {\n            if (!propertyNames[procedure]) {\n                // Queue callback call\n                if (!propertyCallbackQueue[procedure]) {\n                    propertyCallbackQueue[procedure] = [];\n                }\n\n                propertyCallbackQueue[procedure].push({\n                    callback: callback,\n                    id: id,\n                    context: context\n                });\n\n                if (!waitingDescribeResponse[procedure]) {\n                    waitingDescribeResponse[procedure] = true;\n                    // Trigger a DescribeSensor, cache all property names for this procedure\n                    SOS.describeSensor(procedure, function(description) {\n                        var properties = description.hasOwnProperty(\"ProcessModel\") ? description.ProcessModel.outputs.OutputList.output : description.System.outputs.OutputList.output;\n                        properties = properties instanceof Array ? properties : [properties];\n                        var types = [\"Quantity\", \"Count\", \"Boolean\", \"Category\", \"Text\", \"ObservableProperty\"];\n\n                        var names = [];\n                        for (var i in properties) {\n                            var property = properties[i];\n                            for (var j in types) {\n                                var type = types[j];\n                                if (property.hasOwnProperty(type)) {\n                                    property.id = property[type].definition;\n                                }\n                            }\n                            names[property.id] = property.name;\n                        }\n                        propertyNames[procedure] = names;\n\n                        // Clear propertyCallbackQueue\n                        while (propertyCallbackQueue[procedure].length) {\n                            var elem = propertyCallbackQueue[procedure].shift();\n                            elem.callback.call(undefined, propertyNames[procedure][elem.id], elem.context);\n                        }\n                    }, errorHandler);\n                }\n            } else {\n                callback(propertyNames[procedure][id], context);\n            }\n        }\n\n        return {\n            read: read\n        };\n\t};\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./src/js/sos-data-access.js?");

/***/ }),

/***/ "./src/js/widget-common.js":
/*!*********************************!*\
  !*** ./src/js/widget-common.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author Martí Pericay <marti@pericay.com>\n * @author Oscar Fonts <oscar.fonts@geomati.co>\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./locale-date */ \"./src/js/locale-date.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(ld) {\n    \"use strict\";\n\n    function loadCSS(url) {\n        var link = document.createElement(\"link\");\n        link.setAttribute(\"rel\", \"stylesheet\");\n        link.setAttribute(\"type\", \"text/css\");\n        link.setAttribute(\"href\", url);\n        if (typeof link != \"undefined\") {\n            document.getElementsByTagName(\"head\")[0].appendChild(link);\n        }\n    }\n\n    return {\n        inputs: [\"service\", \"offering\"],\n        optional_inputs: [\"footnote\", \"custom_css_url\", \"display_utc_times\"],\n\n        init: function(config, el) {\n            if (config.custom_css_url !== undefined) {\n                loadCSS(config.custom_css_url);\n            }\n            if (config.footnote !== undefined && el.querySelector(\".footnote\")) {\n                el.querySelector(\".footnote\").innerHTML = config.footnote;\n            }\n            if(config.display_utc_times) {\n                ld.utc(true);\n            }\n        }\n    };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./src/js/widget-common.js?");

/***/ }),

/***/ "./src/js/widget/timechart.js":
/*!************************************!*\
  !*** ./src/js/widget/timechart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sos-data-access */ \"./src/js/sos-data-access.js\");\n/* harmony import */ var _sos_data_access__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sos_data_access__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../locale-date */ \"./src/js/locale-date.js\");\n/* harmony import */ var _locale_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_locale_date__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget-common */ \"./src/js/widget-common.js\");\n/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_widget_common__WEBPACK_IMPORTED_MODULE_3__);\n/**\n * @author Oscar Fonts <oscar.fonts@geomati.co>\n */\n\n\nwindow.$ = window.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a; // what a shit\n\n__webpack_require__(/*! flot */ \"./node_modules/flot/dist/es5/jquery.flot.js\");\n__webpack_require__(/*! flot/source/jquery.flot.resize */ \"./node_modules/flot/source/jquery.flot.resize.js\");\n__webpack_require__(/*! flot/source/jquery.flot.time */ \"./node_modules/flot/source/jquery.flot.time.js\");\n__webpack_require__(/*! flot/source/jquery.flot.navigate */ \"./node_modules/flot/source/jquery.flot.navigate.js\");\n__webpack_require__(/*! flot-plugins/dist/source/misc/jquery.flot.tooltip */ \"./node_modules/flot-plugins/dist/source/misc/jquery.flot.tooltip.js\");\n\n\n\n\n\n\"use strict\";\n\nvar template = [\n    '<div class=\"timechart widget\">',\n        '<h3 style=\"width:100%\"></h3>',\n        '<div class=\"graph\" style=\"height:75%; width: 100%; max-height: 380px;\"></div>',\n        '<div class=\"legend\" style=\"display: inline-block; float: right; margin-right: 15px; margin-left: 50px; margin-top: 10px\"></div>',\n        '<div><span class=\"footnote\"></span></div>',\n    '</div>'\n].join('');\n\nlet timechart = {\n    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3___default.a.inputs.concat([\"features\", \"properties\", \"time_start\", \"time_end\", \"title\"]),\n    optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3___default.a.optional_inputs,\n    preferredSizes: [{w: 650, h: 530}],\n\n    init: function(config, el, errorHandler) {\n        // Render template\n        el.innerHTML = template;\n        el.querySelector(\"h3\").innerHTML = config.title;\n        var graph = el.querySelector(\".graph\");\n\n        //load widget common features\n        _widget_common__WEBPACK_IMPORTED_MODULE_3___default.a.init(config, el);\n\n        // Setup SOS data access\n        var data = _sos_data_access__WEBPACK_IMPORTED_MODULE_1___default()(config, redraw, errorHandler);\n        data.read();\n\n        function redraw(data) {\n            var series = {};\n            for (var i in data) {\n                var measure = data[i];\n                var label = measure.property + \" (\" + measure.feature + \")\";\n                if (!series[label]) {\n                    series[label] = {\n                        data: [],\n                        label: label\n                    };\n                }\n                series[label].data.push([measure.time.getTime(), measure.value]);\n            }\n\n            var sortFunction = function(a, b) {\n                return b[0] - a[0];\n            };\n\n            // Sort data by time, convert to array\n            var arr = [];\n            for (var k in series) {\n                series[k].data.sort(sortFunction);\n                arr.push(series[k]);\n            }\n\n            var options = {\n                xaxis: {\n                    mode: \"time\",\n                    timezone: _locale_date__WEBPACK_IMPORTED_MODULE_2___default.a.utc() ? \"UTC\" : \"browser\"\n                },\n                yaxis: {\n                    zoomRange: false,\n                    panRange: false\n                },\n                grid: {\n                    hoverable: true\n                },\n                legend: {\n                    container: el.querySelector(\".legend\")\n                },\n                series: {\n                    lines: {\n                        show: true\n                    },\n                    points: {\n                        show: true\n                    }\n                },\n                tooltip: true,\n                tooltipOpts: {\n                    content: data.length ? \"[%x] %s: %y.2 \" + data[0].uom : \"\"\n                },\n                zoom: {\n                    interactive: true\n                },\n                pan: {\n                    interactive: true\n                }\n            };\n\n            if(config.colors) {\n                options.colors = config.colors;\n            }\n\n            var plot = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.plot(graph, arr, options);\n\n            if(config.callback) {\n                config.callback(plot, graph);\n            }\n\n        }\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (timechart);\n\n\n//# sourceURL=webpack:///./src/js/widget/timechart.js?");

/***/ })

}]);