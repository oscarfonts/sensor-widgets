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
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */






var template = [
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
    '</div>'
].join('');

/* harmony default export */ __webpack_exports__["default"] = ({
    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].inputs.concat(["feature", "property", "refresh_interval", "min_value", "max_value"]),
    optional_inputs: _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].optional_inputs,
    preferredSizes: [{w: 500, h: 220}],

    init: function(config, el, errorHandler) {
        // Render template
        el.innerHTML = template;
        el.querySelector(".min").innerHTML = config.min_value;
        el.querySelector(".max").innerHTML = config.max_value;

        //load widget common features
        _widget_common__WEBPACK_IMPORTED_MODULE_3__["default"].init(config, el);

        // Setup SOS data access
        var data = Object(_sos_data_access__WEBPACK_IMPORTED_MODULE_1__["default"])(config, redraw, errorHandler);
        var refreshIntervalId = setInterval(data.read, config.refresh_interval * 1000);
        data.read();

        // Update view
        function redraw(data) {
            var measure = data[0];
            el.querySelector(".date").innerHTML = _locale_date__WEBPACK_IMPORTED_MODULE_2__["default"].display(measure.time);
            el.querySelector(".value").innerHTML = measure.value + " " + measure.uom;
            el.querySelector(".feature").innerHTML = measure.feature;
            el.querySelector(".property").innerHTML = measure.property;

            var fullspan = el.querySelector(".background-bar").offsetWidth;
            var proportion = (measure.value - config.min_value) / (config.max_value - config.min_value);
            var width = fullspan * proportion;

            el.querySelector(".bar").style.width = width + "px";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvd2lkZ2V0L3Byb2dyZXNzYmFyLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc29zLWRhdGEtYWNjZXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQvcHJvZ3Jlc3NiYXIuY3NzPzBlYjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dpZGdldC9wcm9ncmVzc2Jhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDK0Y7QUFDL0YsOEJBQThCLG1GQUEyQjtBQUN6RDtBQUNBLDhCQUE4QixRQUFTLGtDQUFrQyxtQkFBbUIsaUJBQWlCLHFCQUFxQix5QkFBeUIsMEJBQTBCLEdBQUcseUNBQXlDLHVCQUF1Qix1QkFBdUIsMEJBQTBCLG9HQUFvRyx1RUFBdUUsb0VBQW9FLG1FQUFtRSxrRUFBa0UsK0RBQStELG1CQUFtQiwwQkFBMEIsOERBQThELGlFQUFpRSx5REFBeUQsR0FBRyw0QkFBNEIsa0JBQWtCLG1CQUFtQix5QkFBeUIsMEJBQTBCLDhEQUE4RCxpRUFBaUUseURBQXlELEdBQUcsNEJBQTRCLHlCQUF5QixpQkFBaUIsa0JBQWtCLGVBQWUsR0FBRyw0QkFBNEIseUJBQXlCLGlCQUFpQixtQkFBbUIsR0FBRyw4QkFBOEIseUJBQXlCLGdCQUFnQix3QkFBd0IsR0FBRyw2QkFBNkIsZ0NBQWdDLG9HQUFvRyx1RUFBdUUsb0VBQW9FLG1FQUFtRSxrRUFBa0UsK0RBQStELEdBQUcsK0JBQStCLGdDQUFnQyxvR0FBb0csdUVBQXVFLG9FQUFvRSxtRUFBbUUsa0VBQWtFLCtEQUErRCxHQUFHLDhCQUE4QixnQ0FBZ0Msb0dBQW9HLHVFQUF1RSxvRUFBb0UsbUVBQW1FLGtFQUFrRSwrREFBK0QsR0FBRyw2QkFBNkIsZ0NBQWdDLG9HQUFvRyx1RUFBdUUsb0VBQW9FLG1FQUFtRSxrRUFBa0UsK0RBQStELEdBQUcsU0FBUyw4RkFBOEYsVUFBVSxVQUFVLFVBQVUs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZixZQUFZLHNEQUFNO0FBQ2xCLHFCQUFxQixzREFBTTtBQUMzQixzQkFBc0IsZUFBZTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsc0RBQU07O0FBRWQ7QUFDQSxtQkFBbUIsZ0VBQVc7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Qsb0RBQUU7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQyIsImZpbGUiOiJ3aWRnZXQtcHJvZ3Jlc3NiYXItanMuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18odHJ1ZSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIucHJvZ3Jlc3NiYXIud2lkZ2V0IC5wcm9ncmVzcyB7XFxuICAgIGhlaWdodDogODVweDtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIHBhZGRpbmctbGVmdDogMTJweDtcXG4gICAgcGFkZGluZy1yaWdodDogMTJweDtcXG59XFxuXFxuLnByb2dyZXNzYmFyLndpZGdldCAuYmFja2dyb3VuZC1iYXIge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZTllNWUyO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBmcm9tKCNlMWRkZDkpLCB0bygjZTllNWUyKSk7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2UxZGRkOSwgI2U5ZTVlMik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2UxZGRkOSwgI2U5ZTVlMik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAjZTFkZGQ5LCAjZTllNWUyKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgI2UxZGRkOSwgI2U5ZTVlMik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0b3AsICNlMWRkZDksICNlOWU1ZTIpO1xcbiAgICBoZWlnaHQ6IDIwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIC1tb3otYm94LXNoYWRvdzogMCAxcHggMCAjYmViYmI5IGluc2V0LCAwIDFweCAwICNmY2ZjZmM7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggMCAjYmViYmI5IGluc2V0LCAwIDFweCAwICNmY2ZjZmM7XFxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgI2JlYmJiOSBpbnNldCwgMCAxcHggMCAjZmNmY2ZjO1xcbn1cXG4ucHJvZ3Jlc3NiYXIud2lkZ2V0IC5iYXIge1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxOHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIC1tb3otYm94LXNoYWRvdzogMCAxcHggMCAjZmNmY2ZjIGluc2V0LCAwIDFweCAwICNiZWJiYjk7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAxcHggMCAjZmNmY2ZjIGluc2V0LCAwIDFweCAwICNiZWJiYjk7XFxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgI2ZjZmNmYyBpbnNldCwgMCAxcHggMCAjYmViYmI5O1xcbn1cXG4ucHJvZ3Jlc3NiYXIud2lkZ2V0IC5taW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogLTIwcHg7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogMDtcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAubWF4IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IC0yMHB4O1xcbiAgICBmbG9hdDogcmlnaHQ7XFxufVxcbi5wcm9ncmVzc2Jhci53aWRnZXQgLnZhbHVlIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbn1cXG4ucHJvZ3Jlc3NiYXIud2lkZ2V0IC5waW5rIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y2NzRhNDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSgjZjY3NGE0KSwgdG8oI2UwNjk5NSkpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNmNjc0YTQsICNlMDY5OTUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNmNjc0YTQsICNlMDY5OTUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y2NzRhNCwgI2UwNjk5NSk7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICNmNjc0YTQsICNlMDY5OTUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZjY3NGE0LCAjZTA2OTk1KTtcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAueWVsbG93IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwYmI0YjtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSgjZjBiYjRiKSwgdG8oI2Q5YWE0NCkpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNmMGJiNGIsICNkOWFhNDQpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNmMGJiNGIsICNkOWFhNDQpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgI2YwYmI0YiwgI2Q5YWE0NCk7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICNmMGJiNGIsICNkOWFhNDQpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZjBiYjRiLCAjZDlhYTQ0KTtcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAuZ3JlZW4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTFjZTViO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBmcm9tKCNhMWNlNWIpLCB0bygjOTFiYTUyKSk7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ExY2U1YiwgIzkxYmE1Mik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2ExY2U1YiwgIzkxYmE1Mik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAjYTFjZTViLCAjOTFiYTUyKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgI2ExY2U1YiwgIzkxYmE1Mik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0b3AsICNhMWNlNWIsICM5MWJhNTIpO1xcbn1cXG4ucHJvZ3Jlc3NiYXIud2lkZ2V0IC5ibHVlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY2YjNjYztcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSgjNjZiM2NjKSwgdG8oIzVkYTNiYSkpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICM2NmIzY2MsICM1ZGEzYmEpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICM2NmIzY2MsICM1ZGEzYmEpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgIzY2YjNjYywgIzVkYTNiYSk7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICM2NmIzY2MsICM1ZGEzYmEpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjNjZiM2NjLCAjNWRhM2JhKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovL3NyYy9qcy93aWRnZXQvcHJvZ3Jlc3NiYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksWUFBWTtJQUNaLFVBQVU7SUFDVixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLDZGQUE2RjtJQUM3RixnRUFBZ0U7SUFDaEUsNkRBQTZEO0lBQzdELDREQUE0RDtJQUM1RCwyREFBMkQ7SUFDM0Qsd0RBQXdEO0lBQ3hELFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsdURBQXVEO0lBQ3ZELDBEQUEwRDtJQUMxRCxrREFBa0Q7QUFDdEQ7QUFDQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQix1REFBdUQ7SUFDdkQsMERBQTBEO0lBQzFELGtEQUFrRDtBQUN0RDtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixXQUFXO0lBQ1gsUUFBUTtBQUNaO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSx5QkFBeUI7SUFDekIsNkZBQTZGO0lBQzdGLGdFQUFnRTtJQUNoRSw2REFBNkQ7SUFDN0QsNERBQTREO0lBQzVELDJEQUEyRDtJQUMzRCx3REFBd0Q7QUFDNUQ7QUFDQTtJQUNJLHlCQUF5QjtJQUN6Qiw2RkFBNkY7SUFDN0YsZ0VBQWdFO0lBQ2hFLDZEQUE2RDtJQUM3RCw0REFBNEQ7SUFDNUQsMkRBQTJEO0lBQzNELHdEQUF3RDtBQUM1RDtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLDZGQUE2RjtJQUM3RixnRUFBZ0U7SUFDaEUsNkRBQTZEO0lBQzdELDREQUE0RDtJQUM1RCwyREFBMkQ7SUFDM0Qsd0RBQXdEO0FBQzVEO0FBQ0E7SUFDSSx5QkFBeUI7SUFDekIsNkZBQTZGO0lBQzdGLGdFQUFnRTtJQUNoRSw2REFBNkQ7SUFDN0QsNERBQTREO0lBQzVELDJEQUEyRDtJQUMzRCx3REFBd0Q7QUFDNURcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnByb2dyZXNzYmFyLndpZGdldCAucHJvZ3Jlc3Mge1xcbiAgICBoZWlnaHQ6IDg1cHg7XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDEycHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XFxufVxcblxcbi5wcm9ncmVzc2Jhci53aWRnZXQgLmJhY2tncm91bmQtYmFyIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgbWFyZ2luLXRvcDogMzBweDtcXG4gICAgYmFja2dyb3VuZDogI2U5ZTVlMjtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSgjZTFkZGQ5KSwgdG8oI2U5ZTVlMikpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlMWRkZDksICNlOWU1ZTIpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlMWRkZDksICNlOWU1ZTIpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgI2UxZGRkOSwgI2U5ZTVlMik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICNlMWRkZDksICNlOWU1ZTIpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZTFkZGQ5LCAjZTllNWUyKTtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAtbW96LWJveC1zaGFkb3c6IDAgMXB4IDAgI2JlYmJiOSBpbnNldCwgMCAxcHggMCAjZmNmY2ZjO1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDAgI2JlYmJiOSBpbnNldCwgMCAxcHggMCAjZmNmY2ZjO1xcbiAgICBib3gtc2hhZG93OiAwIDFweCAwICNiZWJiYjkgaW5zZXQsIDAgMXB4IDAgI2ZjZmNmYztcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAuYmFyIHtcXG4gICAgd2lkdGg6IDEwcHg7XFxuICAgIGhlaWdodDogMThweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAtbW96LWJveC1zaGFkb3c6IDAgMXB4IDAgI2ZjZmNmYyBpbnNldCwgMCAxcHggMCAjYmViYmI5O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDAgI2ZjZmNmYyBpbnNldCwgMCAxcHggMCAjYmViYmI5O1xcbiAgICBib3gtc2hhZG93OiAwIDFweCAwICNmY2ZjZmMgaW5zZXQsIDAgMXB4IDAgI2JlYmJiOTtcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAubWluIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IC0yMHB4O1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDA7XFxufVxcbi5wcm9ncmVzc2Jhci53aWRnZXQgLm1heCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiAtMjBweDtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbn1cXG4ucHJvZ3Jlc3NiYXIud2lkZ2V0IC52YWx1ZSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAucGluayB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNjc0YTQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGZyb20oI2Y2NzRhNCksIHRvKCNlMDY5OTUpKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZjY3NGE0LCAjZTA2OTk1KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjY3NGE0LCAjZTA2OTk1KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1zLWxpbmVhci1ncmFkaWVudCh0b3AsICNmNjc0YTQsICNlMDY5OTUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjZjY3NGE0LCAjZTA2OTk1KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y2NzRhNCwgI2UwNjk5NSk7XFxufVxcbi5wcm9ncmVzc2Jhci53aWRnZXQgLnllbGxvdyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGJiNGI7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGZyb20oI2YwYmI0YiksIHRvKCNkOWFhNDQpKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZjBiYjRiLCAjZDlhYTQ0KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjBiYjRiLCAjZDlhYTQ0KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1zLWxpbmVhci1ncmFkaWVudCh0b3AsICNmMGJiNGIsICNkOWFhNDQpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjZjBiYjRiLCAjZDlhYTQ0KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgI2YwYmI0YiwgI2Q5YWE0NCk7XFxufVxcbi5wcm9ncmVzc2Jhci53aWRnZXQgLmdyZWVuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ExY2U1YjtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSgjYTFjZTViKSwgdG8oIzkxYmE1MikpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNhMWNlNWIsICM5MWJhNTIpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNhMWNlNWIsICM5MWJhNTIpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ExY2U1YiwgIzkxYmE1Mik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICNhMWNlNWIsICM5MWJhNTIpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjYTFjZTViLCAjOTFiYTUyKTtcXG59XFxuLnByb2dyZXNzYmFyLndpZGdldCAuYmx1ZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NmIzY2M7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGZyb20oIzY2YjNjYyksIHRvKCM1ZGEzYmEpKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjNjZiM2NjLCAjNWRhM2JhKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjNjZiM2NjLCAjNWRhM2JhKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1zLWxpbmVhci1ncmFkaWVudCh0b3AsICM2NmIzY2MsICM1ZGEzYmEpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAjNjZiM2NjLCAjNWRhM2JhKTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvcCwgIzY2YjNjYywgIzVkYTNiYSk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCBTT1MgZnJvbSAnLi9TT1MnO1xuXG52YXIgcHJvcGVydHlOYW1lcyA9IHt9O1xudmFyIHdhaXRpbmdEZXNjcmliZVJlc3BvbnNlID0ge307XG52YXIgcHJvcGVydHlDYWxsYmFja1F1ZXVlID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbmZpZywgcmVkcmF3LCBlcnJvckhhbmRsZXIpIHtcbiAgICBTT1Muc2V0VXJsKGNvbmZpZy5zZXJ2aWNlKTtcblxuICAgIGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgIHZhciBvZmZlcmluZyA9IGNvbmZpZy5vZmZlcmluZztcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gY29uZmlnLmZlYXR1cmUgPyBbY29uZmlnLmZlYXR1cmVdIDogaXNBcnJheShjb25maWcuZmVhdHVyZXMpID8gY29uZmlnLmZlYXR1cmVzIDogY29uZmlnLmZlYXR1cmVzID8gSlNPTi5wYXJzZShjb25maWcuZmVhdHVyZXMpIDogdW5kZWZpbmVkO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IGNvbmZpZy5wcm9wZXJ0eSA/IFtjb25maWcucHJvcGVydHldIDogaXNBcnJheShjb25maWcucHJvcGVydGllcykgPyBjb25maWcucHJvcGVydGllcyA6IGNvbmZpZy5wcm9wZXJ0aWVzID8gSlNPTi5wYXJzZShjb25maWcucHJvcGVydGllcykgOiB1bmRlZmluZWQ7XG4gICAgICAgIHZhciB0aW1lID0gKGNvbmZpZy50aW1lX3N0YXJ0ICYmIGNvbmZpZy50aW1lX2VuZCkgPyBbY29uZmlnLnRpbWVfc3RhcnQsIGNvbmZpZy50aW1lX2VuZF0gOiBcImxhdGVzdFwiO1xuICAgICAgICBTT1MuZ2V0T2JzZXJ2YXRpb24ob2ZmZXJpbmcsIGZlYXR1cmVzLCBwcm9wZXJ0aWVzLCB0aW1lLCBwYXJzZSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2Uob2JzZXJ2YXRpb25zKSB7XG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVkcmF3KFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0YWJ1bGFyIGRhdGEgZnJvbSBvYnNlcnZhdGlvbnNcbiAgICAgICAgdmFyIGRhdGEgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvYnNlcnZhdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhdGlvbiA9IG9ic2VydmF0aW9uc1tpXTtcbiAgICAgICAgICAgIGdldFByb3BlcnR5TmFtZShvYnNlcnZhdGlvbi5wcm9jZWR1cmUsIG9ic2VydmF0aW9uLm9ic2VydmFibGVQcm9wZXJ0eSwgYWRkT2JzZXJ2YXRpb24sIG9ic2VydmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE9ic2VydmF0aW9uKHByb3BlcnR5LCBvYnNlcnZhdGlvbikge1xuICAgICAgICAgICAgdmFyIGZvaSA9IG9ic2VydmF0aW9uLmZlYXR1cmVPZkludGVyZXN0O1xuICAgICAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZShvYnNlcnZhdGlvbi5yZXN1bHRUaW1lKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogb2JzZXJ2YXRpb24ucmVzdWx0Lmhhc093blByb3BlcnR5KFwidmFsdWVcIikgPyBvYnNlcnZhdGlvbi5yZXN1bHQudmFsdWUgOiBvYnNlcnZhdGlvbi5yZXN1bHQsXG4gICAgICAgICAgICAgICAgZmVhdHVyZTogZm9pLm5hbWUgPyBmb2kubmFtZS52YWx1ZSA6IChmb2kuaWRlbnRpZmllciA/IGZvaS5pZGVudGlmaWVyLnZhbHVlIDogZm9pKSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgdW9tOiBvYnNlcnZhdGlvbi5yZXN1bHQuaGFzT3duUHJvcGVydHkoXCJ1b21cIikgPyBvYnNlcnZhdGlvbi5yZXN1bHQudW9tIDogXCIoTi9BKVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSBvYnNlcnZhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVkcmF3KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcGVydHlOYW1lKHByb2NlZHVyZSwgaWQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lc1twcm9jZWR1cmVdKSB7XG4gICAgICAgICAgICAvLyBRdWV1ZSBjYWxsYmFjayBjYWxsXG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0gPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCF3YWl0aW5nRGVzY3JpYmVSZXNwb25zZVtwcm9jZWR1cmVdKSB7XG4gICAgICAgICAgICAgICAgd2FpdGluZ0Rlc2NyaWJlUmVzcG9uc2VbcHJvY2VkdXJlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBhIERlc2NyaWJlU2Vuc29yLCBjYWNoZSBhbGwgcHJvcGVydHkgbmFtZXMgZm9yIHRoaXMgcHJvY2VkdXJlXG4gICAgICAgICAgICAgICAgU09TLmRlc2NyaWJlU2Vuc29yKHByb2NlZHVyZSwgZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBkZXNjcmlwdGlvbi5oYXNPd25Qcm9wZXJ0eShcIlByb2Nlc3NNb2RlbFwiKSA/IGRlc2NyaXB0aW9uLlByb2Nlc3NNb2RlbC5vdXRwdXRzLk91dHB1dExpc3Qub3V0cHV0IDogZGVzY3JpcHRpb24uU3lzdGVtLm91dHB1dHMuT3V0cHV0TGlzdC5vdXRwdXQ7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIGluc3RhbmNlb2YgQXJyYXkgPyBwcm9wZXJ0aWVzIDogW3Byb3BlcnRpZXNdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZXMgPSBbXCJRdWFudGl0eVwiLCBcIkNvdW50XCIsIFwiQm9vbGVhblwiLCBcIkNhdGVnb3J5XCIsIFwiVGV4dFwiLCBcIk9ic2VydmFibGVQcm9wZXJ0eVwiXTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiB0eXBlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5Lmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5LmlkID0gcHJvcGVydHlbdHlwZV0uZGVmaW5pdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1twcm9wZXJ0eS5pZF0gPSBwcm9wZXJ0eS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZXNbcHJvY2VkdXJlXSA9IG5hbWVzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFyIHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHJvcGVydHlDYWxsYmFja1F1ZXVlW3Byb2NlZHVyZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHByb3BlcnR5Q2FsbGJhY2tRdWV1ZVtwcm9jZWR1cmVdLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNhbGxiYWNrLmNhbGwodW5kZWZpbmVkLCBwcm9wZXJ0eU5hbWVzW3Byb2NlZHVyZV1bZWxlbS5pZF0sIGVsZW0uY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHlOYW1lc1twcm9jZWR1cmVdW2lkXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWFkOiByZWFkXG4gICAgfTtcbn07XG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcHJvZ3Jlc3NiYXIuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCAnLi9wcm9ncmVzc2Jhci5jc3MnO1xuXG5pbXBvcnQgZGF0YV9hY2Nlc3MgZnJvbSAnLi4vc29zLWRhdGEtYWNjZXNzJztcbmltcG9ydCBsZCBmcm9tICcuLi9sb2NhbGUtZGF0ZSc7XG5pbXBvcnQgY29tbW9uIGZyb20gJy4uL3dpZGdldC1jb21tb24nO1xuXG52YXIgdGVtcGxhdGUgPSBbXG4gICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzc2JhciB3aWRnZXRcIj4nLFxuICAgICAgICAnPGgxIGNsYXNzPVwiZmVhdHVyZVwiPjwvaDE+JyxcbiAgICAgICAgJzxoMyBjbGFzcz1cInByb3BlcnR5XCI+PC9oMz4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+JyxcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWluXCI+MDwvZGl2PicsXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1heFwiPjEwMDwvZGl2PicsXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhY2tncm91bmQtYmFyXCI+JyxcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJncmVlbiBiYXJcIj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInZhbHVlXCI+PC9kaXY+JyxcbiAgICAgICAgICAgICAgICAnPC9zcGFuPicsXG4gICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8aDMgY2xhc3M9XCJkYXRlXCI+PC9oMz4nLFxuICAgICAgICAnPGRpdj48c3BhbiBjbGFzcz1cImZvb3Rub3RlXCI+PC9zcGFuPjwvZGl2PicsXG4gICAgJzwvZGl2Pidcbl0uam9pbignJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbnB1dHM6IGNvbW1vbi5pbnB1dHMuY29uY2F0KFtcImZlYXR1cmVcIiwgXCJwcm9wZXJ0eVwiLCBcInJlZnJlc2hfaW50ZXJ2YWxcIiwgXCJtaW5fdmFsdWVcIiwgXCJtYXhfdmFsdWVcIl0pLFxuICAgIG9wdGlvbmFsX2lucHV0czogY29tbW9uLm9wdGlvbmFsX2lucHV0cyxcbiAgICBwcmVmZXJyZWRTaXplczogW3t3OiA1MDAsIGg6IDIyMH1dLFxuXG4gICAgaW5pdDogZnVuY3Rpb24oY29uZmlnLCBlbCwgZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIC8vIFJlbmRlciB0ZW1wbGF0ZVxuICAgICAgICBlbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5taW5cIikuaW5uZXJIVE1MID0gY29uZmlnLm1pbl92YWx1ZTtcbiAgICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5tYXhcIikuaW5uZXJIVE1MID0gY29uZmlnLm1heF92YWx1ZTtcblxuICAgICAgICAvL2xvYWQgd2lkZ2V0IGNvbW1vbiBmZWF0dXJlc1xuICAgICAgICBjb21tb24uaW5pdChjb25maWcsIGVsKTtcblxuICAgICAgICAvLyBTZXR1cCBTT1MgZGF0YSBhY2Nlc3NcbiAgICAgICAgdmFyIGRhdGEgPSBkYXRhX2FjY2Vzcyhjb25maWcsIHJlZHJhdywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgdmFyIHJlZnJlc2hJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZGF0YS5yZWFkLCBjb25maWcucmVmcmVzaF9pbnRlcnZhbCAqIDEwMDApO1xuICAgICAgICBkYXRhLnJlYWQoKTtcblxuICAgICAgICAvLyBVcGRhdGUgdmlld1xuICAgICAgICBmdW5jdGlvbiByZWRyYXcoZGF0YSkge1xuICAgICAgICAgICAgdmFyIG1lYXN1cmUgPSBkYXRhWzBdO1xuICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5kYXRlXCIpLmlubmVySFRNTCA9IGxkLmRpc3BsYXkobWVhc3VyZS50aW1lKTtcbiAgICAgICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmFsdWVcIikuaW5uZXJIVE1MID0gbWVhc3VyZS52YWx1ZSArIFwiIFwiICsgbWVhc3VyZS51b207XG4gICAgICAgICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiLmZlYXR1cmVcIikuaW5uZXJIVE1MID0gbWVhc3VyZS5mZWF0dXJlO1xuICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5wcm9wZXJ0eVwiKS5pbm5lckhUTUwgPSBtZWFzdXJlLnByb3BlcnR5O1xuXG4gICAgICAgICAgICB2YXIgZnVsbHNwYW4gPSBlbC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmQtYmFyXCIpLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgdmFyIHByb3BvcnRpb24gPSAobWVhc3VyZS52YWx1ZSAtIGNvbmZpZy5taW5fdmFsdWUpIC8gKGNvbmZpZy5tYXhfdmFsdWUgLSBjb25maWcubWluX3ZhbHVlKTtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGZ1bGxzcGFuICogcHJvcG9ydGlvbjtcblxuICAgICAgICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5iYXJcIikuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlZnJlc2hJbnRlcnZhbElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==