/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"SensorWidgets": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"vendors~widget-jqgrid-js~widget-timechart-js":"vendors~widget-jqgrid-js~widget-timechart-js","vendors~widget-jqgrid-js":"vendors~widget-jqgrid-js","widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36":"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36","widget-jqgrid-js":"widget-jqgrid-js","vendors~widget-timechart-js":"vendors~widget-timechart-js","widget-timechart-js":"widget-timechart-js","vendors~widget-map-js":"vendors~widget-map-js","widget-map-js":"widget-map-js","vendors~widget-status-js":"vendors~widget-status-js","widget-status-js":"widget-status-js","vendors~widget-windrose-js":"vendors~widget-windrose-js","widget-windrose-js":"widget-windrose-js","widget-compass-js":"widget-compass-js","widget-gauge-js":"widget-gauge-js","widget-panel-js":"widget-panel-js","widget-progressbar-js":"widget-progressbar-js","widget-table-js":"widget-table-js","widget-thermometer-js":"widget-thermometer-js"}[chunkId]||chunkId) + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/js/SensorWidgets.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/js/SensorWidgets.css ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body .widget {\n    font-family: \"Source Sans Pro\", helvetica, sans-serif;\n    text-align: center;\n    margin: 0;\n}\n\n.widget {\n    height: 100%;\n    overflow: hidden;\n    color: #222;\n    font-family: Helvetica, sans-serif;\n}\n\n.widget h1 {\n    font-size: 28px;\n}\n\n.widget h2 {\n    font-size: 18px;\n}\n\n.widget h3 {\n    font-size: 14px;\n}\n\n.widget .footnote {\n    margin: 10px;\n    font-size: 11px;\n    font-weight: bold;\n    display: block;\n    color: #222; \n}\n\n.widget .data {\n    display: inline-block;\n    vertical-align: top;\n    margin: 10px;\n    max-width: 300px;\n}\n\n.widget.compass svg,\n.widget.gauge svg {\n    max-width: 300px;\n}\n\n.widget.status {\n    overflow: auto;\n}\n\n.widget.status th {\n    padding: 4px;\n    background-color: darkgrey;\n}\n\n.widget.status td {\n    padding: 4px;\n    background-color: lightgrey;\n}\n\n.widget.status td.nodata {\n    background-color: whitesmoke;\n    color: darkgrey;\n    font-size: small;\n}\n\n.widget.status .result_time {\n    font-size: small;\n    font-style: italic;\n}\n\n.widget.panel dl {\n    text-align: left;\n}\n\n.widget.panel dd.outdated {\n    color: #AA1111;\n    font-style: italic;\n}\n\n.widget.panel dd.outdated span {\n    font-size: 9px;\n    display: block;\n}\n\n.widget.map .leaflet-label .widget.panel h2 {\n    font-size: small;\n}\n\n.widget.map .leaflet-label .widget.panel h3 {\n    font-size: x-small;\n}\n\n.widget.map .leaflet-label .widget.panel h2,\n.widget.map .leaflet-label .widget.panel h3,\n.widget.map .leaflet-label .widget.panel dl,\n.widget.map .leaflet-label .widget.panel .footnote {\n    margin: 0;\n}\n\n.widget.map .leaflet-label .widget.panel {\n    background-color: transparent;\n}\n\n.widget.map .leaflet-label .widget.panel dt {\n    border-top: 1px solid darkgray;\n    clear: left;\n    font-size: x-small;\n    font-weight: normal;\n    line-height: normal;\n    padding-top: 2px;\n    float: none;\n    text-align: left;\n    width: 100%;\n}\n\n.widget.map .leaflet-label .widget.panel dd {\n    margin: 0;\n    text-align: right;\n    font-size: x-small;\n    line-height: normal;\n    padding-bottom: 2px;\n}\n\n.widget.table {\n    overflow: auto;\n    font-size: 12px;\n}\n\n.widget.windrose {\n    width: 100%;\n}\n", "",{"version":3,"sources":["webpack://src/js/SensorWidgets.css"],"names":[],"mappings":"AAAA;IACI,qDAAqD;IACrD,kBAAkB;IAClB,SAAS;AACb;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,WAAW;IACX,kCAAkC;AACtC;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,iBAAiB;IACjB,cAAc;IACd,WAAW;AACf;;AAEA;IACI,qBAAqB;IACrB,mBAAmB;IACnB,YAAY;IACZ,gBAAgB;AACpB;;AAEA;;IAEI,gBAAgB;AACpB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,YAAY;IACZ,0BAA0B;AAC9B;;AAEA;IACI,YAAY;IACZ,2BAA2B;AAC/B;;AAEA;IACI,4BAA4B;IAC5B,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,cAAc;AAClB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;;;;IAII,SAAS;AACb;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,8BAA8B;IAC9B,WAAW;IACX,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;IACnB,gBAAgB;IAChB,WAAW;IACX,gBAAgB;IAChB,WAAW;AACf;;AAEA;IACI,SAAS;IACT,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,eAAe;AACnB;;AAEA;IACI,WAAW;AACf","sourcesContent":["body .widget {\n    font-family: \"Source Sans Pro\", helvetica, sans-serif;\n    text-align: center;\n    margin: 0;\n}\n\n.widget {\n    height: 100%;\n    overflow: hidden;\n    color: #222;\n    font-family: Helvetica, sans-serif;\n}\n\n.widget h1 {\n    font-size: 28px;\n}\n\n.widget h2 {\n    font-size: 18px;\n}\n\n.widget h3 {\n    font-size: 14px;\n}\n\n.widget .footnote {\n    margin: 10px;\n    font-size: 11px;\n    font-weight: bold;\n    display: block;\n    color: #222; \n}\n\n.widget .data {\n    display: inline-block;\n    vertical-align: top;\n    margin: 10px;\n    max-width: 300px;\n}\n\n.widget.compass svg,\n.widget.gauge svg {\n    max-width: 300px;\n}\n\n.widget.status {\n    overflow: auto;\n}\n\n.widget.status th {\n    padding: 4px;\n    background-color: darkgrey;\n}\n\n.widget.status td {\n    padding: 4px;\n    background-color: lightgrey;\n}\n\n.widget.status td.nodata {\n    background-color: whitesmoke;\n    color: darkgrey;\n    font-size: small;\n}\n\n.widget.status .result_time {\n    font-size: small;\n    font-style: italic;\n}\n\n.widget.panel dl {\n    text-align: left;\n}\n\n.widget.panel dd.outdated {\n    color: #AA1111;\n    font-style: italic;\n}\n\n.widget.panel dd.outdated span {\n    font-size: 9px;\n    display: block;\n}\n\n.widget.map .leaflet-label .widget.panel h2 {\n    font-size: small;\n}\n\n.widget.map .leaflet-label .widget.panel h3 {\n    font-size: x-small;\n}\n\n.widget.map .leaflet-label .widget.panel h2,\n.widget.map .leaflet-label .widget.panel h3,\n.widget.map .leaflet-label .widget.panel dl,\n.widget.map .leaflet-label .widget.panel .footnote {\n    margin: 0;\n}\n\n.widget.map .leaflet-label .widget.panel {\n    background-color: transparent;\n}\n\n.widget.map .leaflet-label .widget.panel dt {\n    border-top: 1px solid darkgray;\n    clear: left;\n    font-size: x-small;\n    font-weight: normal;\n    line-height: normal;\n    padding-top: 2px;\n    float: none;\n    text-align: left;\n    width: 100%;\n}\n\n.widget.map .leaflet-label .widget.panel dd {\n    margin: 0;\n    text-align: right;\n    font-size: x-small;\n    line-height: normal;\n    padding-bottom: 2px;\n}\n\n.widget.table {\n    overflow: auto;\n    font-size: 12px;\n}\n\n.widget.windrose {\n    width: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/js/SOS.js":
/*!***********************!*\
  !*** ./src/js/SOS.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XML */ "./src/js/XML.js");
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */



/* harmony default export */ __webpack_exports__["default"] = ({
  _url: null,

  setUrl(url) {
    this._url = url;
  },

  getCapabilities(callback, errorHandler) {
    const request = {
      request: 'GetCapabilities',
      sections: ['Contents'],
    };

    this._send(request, (response) => {
      callback(response.contents);
    }, errorHandler);
  },

  describeSensor(procedure, callback, errorHandler) {
    const request = {
      request: 'DescribeSensor',
      procedure,
      procedureDescriptionFormat: 'http://www.opengis.net/sensorML/1.0.1',
    };

    this._send(request, (response) => {
      // Convert the SensorML description to a JSON object
      const { procedureDescription } = response;
      const { description } = procedureDescription;
      const { SensorML } = _XML__WEBPACK_IMPORTED_MODULE_0__["default"].read(description || procedureDescription, true);
      callback(SensorML.member);
    }, errorHandler);
  },

  getFeatureOfInterest(procedure, callback, errorHandler) {
    const request = {
      request: 'GetFeatureOfInterest',
      procedure,
    };

    this._send(request, (response) => {
      callback(response.featureOfInterest);
    }, errorHandler);
  },

  getDataAvailability(procedure, offering, features, properties, callback, errorHandler) {
    const request = {
      request: 'GetDataAvailability',
    };
    if (procedure) {
      request.procedure = procedure;
    }
    if (offering) {
      request.offering = offering;
    }
    if (features && features.length) {
      request.featureOfInterest = features;
    }
    if (properties && properties.length) {
      request.observedProperty = properties;
    }

    this._send(request, ({ dataAvailability }) => {
      callback(dataAvailability);
    }, errorHandler);
  },

  getObservation(offering, features, properties, time, callback, errorHandler) {
    const request = {
      request: 'GetObservation',
    };

    if (offering) {
      request.offering = offering;
    }

    if (features && features.length) {
      request.featureOfInterest = features;
    }

    if (properties && properties.length) {
      request.observedProperty = properties;
    }

    if (time) {
      let operation;
      if (time.length && time.length === 2) {
        // Time Range
        operation = 'during';
      } else {
        // Time Instant
        operation = 'equals';
      }
      const filter = {};
      filter[operation] = {
        ref: 'om:resultTime',
        value: time,
      };
      request.temporalFilter = [filter];
    }

    this._send(request, ({ observations }) => {
      callback(observations);
    }, errorHandler);
  },

  _send(request, onSuccess, onError) {
    request.service = 'SOS';
    request.version = '2.0.0';

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let response = xhr.responseText;
        try {
          response = JSON.parse(response);
        } catch (e) {
          // OK, not JSON
        }
        if (xhr.status === 200) {
          onSuccess.call(this, response);
        } else {
          const e = {
            status: xhr.statusText,
            url: this._url,
            request,
            response,
          };
          if (onError) {
            onError.call(this, e.status, e.url, e.request, e.response);
          }
        }
      }
    };

    xhr.open('POST', this._url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(JSON.stringify(request));
  },
});


/***/ }),

/***/ "./src/js/SensorWidget.js":
/*!********************************!*\
  !*** ./src/js/SensorWidget.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SensorWidget; });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "./src/js/i18n.js");
/* harmony import */ var _SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SensorWidgets.css */ "./src/js/SensorWidgets.css");
/* harmony import */ var _SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable no-param-reassign */



// eslint-disable-next-line camelcase,no-undef
__webpack_require__.p = document.currentScript.src.replace(/[^/]*$/, '');

const instances = {};
// eslint-disable-next-line no-plusplus
const uid = ((i) => () => `SensorWidgetTarget-${++i}`)(0);

function SensorWidget(name, config, renderTo) {
  const target = renderTo || document.body;

  function errorHandler(message, url, request) {
    let text = '';
    if (url) {
      text = `[${url}] `;
    }
    if (request && request.request) {
      text += `${request.request}: `;
    }
    if (message) {
      text += message;
    }
    target.innerHTML = `<div class="text-danger">${text}</div>`;
  }

  function checkConfig(widgetName, widgetInputs, widgetConfig) {
    const missing = [];

    Object.values(widgetInputs).forEach((input) => {
      if (!Object.prototype.hasOwnProperty.call(widgetConfig, input)) {
        missing.push(input);
      }
    });
    if (missing.length) {
      errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("The '{name}' widget is missing some mandatory parameters: ", { name: widgetName }) + missing.join(', '));
    }
    return !missing.length;
  }

  if (name && config) {
    if (!target.id) target.id = uid();

    if (!config.service) {
      config.service = '/52n-sos/sos/json';
    }

    __webpack_require__("./src/js/widget lazy recursive ^\\.\\/.*\\.js$")(`./${name}.js`)
      .then(({ default: widget }) => {
        target.innerHTML = '';
        if (Object.prototype.hasOwnProperty.call(instances, target.id) && instances[target.id] && Object.prototype.hasOwnProperty.call(instances[target.id], 'destroy')) {
          console.debug(`Destroying previous widget on ElementId=${target.id}`);
          instances[target.id].destroy();
          delete instances[target.id];
        }
        if (checkConfig(name, widget.inputs, config)) {
          console.debug(`Creating new ${name} widget on ElementId=${target.id}`);
          instances[target.id] = widget.init(config, target, errorHandler);
        }
      }).catch((cause) => {
        console.error(cause);
        errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("Widget '{name}' cannot be found, or there was an error instantiating it", { name }));
      });
  } else if (!name) {
    errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t('No widget name specified'));
  }
  return {
    name,
    config,
    renderTo: target,
    inspect(cb) {
      __webpack_require__("./src/js/widget lazy recursive ^\\.\\/.*\\.js$")(`./${name}.js`)
        .then(({ default: widget }) => {
          cb.call(this, widget.inputs, widget.optional_inputs, widget.preferredSizes);
        });
    },
    url() {
      function relPathToAbs(pathname) {
        const output = [];
        pathname.replace(/^(\.\.?(\/|$))+/, '')
          .replace(/\/(\.(\/|$))+/g, '/')
          .replace(/\/\.\.$/, '/../')
          .replace(/\/?[^/]*/g, (p) => {
            if (p === '/..') {
              output.pop();
            } else {
              output.push(p);
            }
          });
        return output.join('').replace(/^\//, pathname.charAt(0) === '/' ? '/' : '');
      }
      let url = `${relPathToAbs('../widget/')}?`;
      url += `name=${encodeURIComponent(name)}&`;
      url += Object.keys(config).map((key) => {
        let val = config[key];
        if (typeof config[key] === 'object') {
          val = JSON.stringify(config[key]);
        }
        return `${key}=${encodeURIComponent(val)}`;
      }).join('&');
      url += `&lang=${_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].getLang()}`;
      return url;
    },
    iframe(w, h) {
      w = w || '100%';
      h = h || '100%';
      return `<iframe src="${this.url()}" width="${w}" height="${h}" frameBorder="0"></iframe>`;
    },
    javascript() {
      return `SensorWidget('${name}', ${JSON.stringify(config, null, 3)}, document.getElementById('${name}-container'));`;
    },
  };
}


/***/ }),

/***/ "./src/js/SensorWidgets.css":
/*!**********************************!*\
  !*** ./src/js/SensorWidgets.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./SensorWidgets.css */ "./node_modules/css-loader/dist/cjs.js!./src/js/SensorWidgets.css");

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

/***/ "./src/js/XML.js":
/*!***********************!*\
  !*** ./src/js/XML.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* This work is licensed under Creative Commons GNU LGPL License.

 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 See:     http://goessner.net/download/prj/jsonxml/
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  read(xml, clean) {
    const X = {
      at: (clean ? '' : '@'),

      toObj(elem) {
        let o = {};
        if (elem.nodeType === 1) { // element node
          if (elem.attributes.length) { // element with attributes
            for (let i = 0; i < elem.attributes.length; i += 1) {
              const { name } = elem.attributes[i];
              const { value } = elem.attributes[i];
              const isNs = name.lastIndexOf('xmlns:', 0) === 0;
              if (!(clean && isNs)) { // Hide xmlns attributes
                o[X.at + name] = (value || '').toString();
              }
            }
          }
          if (elem.firstChild) { // element has child nodes
            let textChild = 0;
            let cdataChild = 0;
            let hasElementChild = false;
            for (let n = elem.firstChild; n; n = n.nextSibling) {
              if (n.nodeType === 1) {
                hasElementChild = true;
              } else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                textChild += 1;
                // non-whitespace text
              } else if (n.nodeType === 4) {
                cdataChild += 1;
                // cdata section node
              }
            }
            if (hasElementChild) {
              if (textChild < 2 && cdataChild < 2) {
                // structured element with evtl.
                // a single text or/and cdata node
                X.removeWhite(elem);
                for (let n = elem.firstChild; n; n = n.nextSibling) {
                  if (n.nodeType === 3) { // text node
                    o['#text'] = X.escape(n.nodeValue);
                  } else if (n.nodeType === 4) { // cdata node
                    o['#cdata'] = X.escape(n.nodeValue);
                  } else if (o[n.nodeName]) {
                    // multiple occurence of element
                    if (o[n.nodeName] instanceof Array) {
                      o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                    } else {
                      o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                    }
                  } else { // first occurence of element
                    o[n.nodeName] = X.toObj(n);
                  }
                }
              } else if (!elem.attributes.length) {
                o = X.escape(X.innerXml(elem));
              } else {
                o['#text'] = X.escape(X.innerXml(elem));
              }
            } else if (textChild) { // pure text
              if (!elem.attributes.length) {
                o = X.escape(X.innerXml(elem));
              } else {
                o['#text'] = X.escape(X.innerXml(elem));
              }
            } else if (cdataChild) { // cdata
              if (cdataChild > 1) {
                o = X.escape(X.innerXml(elem));
              } else {
                for (let n = elem.firstChild; n; n = n.nextSibling) {
                  o['#cdata'] = X.escape(n.nodeValue);
                }
              }
            }
          }
          if (!elem.attributes.length && !elem.firstChild) {
            o = null;
          }
        } else if (elem.nodeType === 9) { // document.node
          o = X.toObj(elem.documentElement);
        } else if (elem.nodeType === 8) {
          return elem.data;
          // A comment
        } else {
          // console.error(`unhandled node type: ${elem.nodeType}`);
        }

        return o;
      },

      innerXml(node) {
        let str = '';
        if ('innerHTML' in node) {
          str = node.innerHTML;
        } else {
          const asXml = (n) => {
            let s = '';
            if (n.nodeType === 1) {
              s += `<${n.nodeName}`;
              for (let i = 0; i < n.attributes.length; i += 1) {
                const { name } = n.attributes[i];
                const value = n.attributes[i].value || '';
                s += ` ${name}="${value.toString()}"`;
              }
              if (n.firstChild) {
                s += '>';
                for (let c = n.firstChild; c; c = c.nextSibling) {
                  s += asXml(c);
                }
                s += `</${n.nodeName}>`;
              } else {
                s += '/>';
              }
            } else if (n.nodeType === 3) {
              s += n.nodeValue;
            } else if (n.nodeType === 4) {
              s += `<![CDATA[${n.nodeValue}]]>`;
            }
            return s;
          };

          for (let c = node.firstChild; c; c = c.nextSibling) {
            str += asXml(c);
          }
        }
        return str;
      },

      escape(txt) {
        return txt.replace(/[\\]/g, '\\\\').replace(/["]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
      },

      removeWhite(e) {
        e.normalize();
        for (let n = e.firstChild; n;) {
          if (n.nodeType === 3) { // text node
            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
              // pure whitespace text node
              const nxt = n.nextSibling;
              e.removeChild(n);
              n = nxt;
            } else {
              n = n.nextSibling;
            }
          } else if (n.nodeType === 1) { // element node
            X.removeWhite(n);
            n = n.nextSibling;
          } else { // any other node
            n = n.nextSibling;
          }
        }
        return e;
      },
    };

    // Strip namespaces from XML tags
    const cleanXml = clean ? xml.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, '<$1$3>') : xml;

    // Convert to an XML DOM Document
    const domRoot = (new DOMParser()).parseFromString(cleanXml, 'text/xml');

    // Start from document's root element
    const domElem = (domRoot.nodeType === 9) ? domRoot.documentElement : domRoot;

    const ret = {};
    ret[domElem.nodeName] = X.toObj(X.removeWhite(domElem));
    return ret;
  },

  write(object) {
    const toXml = (v, name, ind) => {
      let xml = '';
      if (v instanceof Array) {
        for (let i = 0, n = v.length; i < n; i += 1) {
          xml += `${ind + toXml(v[i], name, `${ind}\t`)}\n`;
        }
      } else if (typeof (v) === 'object') {
        let hasChild = false;
        xml += `${ind}<${name}`;
        Object.keys(v).forEach((m) => {
          if (m.charAt(0) === '@') {
            xml += ` ${m.substr(1)}="${v[m].toString()}"`;
          } else {
            hasChild = true;
          }
        });
        xml += hasChild ? '>' : '/>';
        if (hasChild) {
          Object.keys(v).forEach((m) => {
            if (m === '#text') {
              xml += v[m];
            } else if (m === '#cdata') {
              xml += `<![CDATA[${v[m]}]]>`;
            } else if (m.charAt(0) !== '@') {
              xml += toXml(v[m], m, `${ind}\t`);
            }
          });
          xml += `${xml.charAt(xml.length - 1) === '\n' ? ind : ''}</${name}>`;
        }
      } else {
        xml += `${ind}<${name}>${v.toString()}</${name}>`;
      }
      return xml;
    };

    let xml = '';
    Object.keys(object).forEach((i) => {
      xml += toXml(object[i], i, '');
    });
    return xml;
  },
});


/***/ }),

/***/ "./src/js/i18n.js":
/*!************************!*\
  !*** ./src/js/i18n.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _translations_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translations.json */ "./src/js/translations.json");
var _translations_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./translations.json */ "./src/js/translations.json", 1);


const params = {};
window.location.search.substr(1).split('&').forEach((item) => {
  const [key, value] = item.split('=');
  params[key] = value;
});

let activeLang;

function setLang(lang) {
  activeLang = lang;
  console.debug(`Language set to ${activeLang}`);
}

setLang(Object.prototype.hasOwnProperty.call(params, 'lang') ? params.lang : 'en');

function template(templ, dict) {
  let result = templ;
  if (dict) {
    Object.entries(dict).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), value);
    });
  }
  return result;
}

function t(string, values) {
  let translated = string;
  if (Object.prototype.hasOwnProperty.call(_translations_json__WEBPACK_IMPORTED_MODULE_0__, string)
    && Object.prototype.hasOwnProperty.call(_translations_json__WEBPACK_IMPORTED_MODULE_0__[string], activeLang)) {
    translated = _translations_json__WEBPACK_IMPORTED_MODULE_0__[string][activeLang];
  }
  return template(translated, values);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  langs() {
    return _translations_json__WEBPACK_IMPORTED_MODULE_0__.langs;
  },
  getLang() {
    return activeLang;
  },
  setLang,
  t,
  addTranslations(bundle) {
    Object.keys(bundle).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(_translations_json__WEBPACK_IMPORTED_MODULE_0__, key)) {
        _translations_json__WEBPACK_IMPORTED_MODULE_0__[key] = bundle[key];
      } else {
        console.warn(`Skipping duplicate entry '${key}' in translation bundle.`);
      }
    });
  },
  translateDocTree(el) {
    const element = el || document;
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    while (treeWalker.nextNode()) {
      const node = treeWalker.currentNode;
      if (/\S/.test(node.nodeValue)) { // Not a whitespace-only text node
        node.nodeValue = t(node.nodeValue);
      }
    }
  },
});


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SensorWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SensorWidget */ "./src/js/SensorWidget.js");
/* harmony import */ var _SOS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SOS */ "./src/js/SOS.js");



// 'Leak' SensorWidget to global scope.
window.SensorWidget = (...args) => {
  window.onload = () => _SensorWidget__WEBPACK_IMPORTED_MODULE_0__["default"].apply(undefined, args);
};

// Expose SOS as well.
window.getSOS = (callback) => {
  callback(_SOS__WEBPACK_IMPORTED_MODULE_1__["default"]);
};


/***/ }),

/***/ "./src/js/translations.json":
/*!**********************************!*\
  !*** ./src/js/translations.json ***!
  \**********************************/
/*! exports provided: langs, (no date), No widget name specified, Widget '{name}' cannot be found, or there was an error instantiating it, The '{name}' widget is missing some mandatory parameters: , Loading..., deg, Request time, Response time, (no data), Result time, Cel, Results, Time, Value, Unit, {name} Widget Configuration, Mandatory inputs, Compass, Gauge, Jqgrid, Map, Panel, Progressbar, Table, Thermometer, Timechart, Windrose, Select a Service..., Select an Offering..., (multiselect), Service, Property, Properties, Refresh Interval, Time Range, MMM D, YYYY H:mm, Custom Range, Today, Last hour, Last {n} hours, From, To, Apply, Cancel, W, Optional inputs, Title, Footnote, Custom Css Url, Max Initial Zoom, Base Layer, Widget dimensions, Initial Size, Create Widget, {name} Configuration Parameters, jqGrid Example, Last observations, Data Table - last 3 hours, Sirena Windrose, Last 3 hours of wind observations, Code, Embed, Link, Mandatory, Optional, Suggested Sizes, A sample footnote for {name} widget, Last measures from, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"langs\":{\"en\":\"English\",\"es\":\"Español\",\"ca\":\"Català\"},\"(no date)\":{\"es\":\"(sin fecha)\",\"ca\":\"(sense data)\"},\"No widget name specified\":{\"es\":\"No se ha especificado ningún nombre de widget\",\"ca\":\"Cal especificar un nom de widget\"},\"Widget '{name}' cannot be found, or there was an error instantiating it\":{\"es\":\"No se ha encontrado el widget de nombre '{name}', o se produjo un error instanciándolo\",\"ca\":\"No s'ha trobat cap widget anomenat '{name}', o s'ha produit un error en instanciar-lo\"},\"The '{name}' widget is missing some mandatory parameters: \":{\"es\":\"Faltan algunos parámetros obligatorios para el widget '{name}': \",\"ca\":\"Cal afegir els següents paràmetres obligatoris al widget '{name}': \"},\"Loading...\":{\"es\":\"Cargando...\",\"ca\":\"Carregant...\"},\"deg\":{\"es\":\"º\",\"ca\":\"º\"},\"Request time\":{\"es\":\"Petición el\",\"ca\":\"Petició el\"},\"Response time\":{\"es\":\"Respuesta el\",\"ca\":\"Resposta el\"},\"(no data)\":{\"es\":\"(sin datos)\",\"ca\":\"(sense dades)\"},\"Result time\":{\"es\":\"Resultado del\",\"ca\":\"Resultat del\"},\"Cel\":{\"es\":\"ºC\",\"ca\":\"ºC\"},\"Results\":{\"es\":\"Resultados\",\"ca\":\"Resultats\"},\"Time\":{\"es\":\"Hora\",\"ca\":\"Hora\"},\"Value\":{\"es\":\"Valor\",\"ca\":\"Valor\"},\"Unit\":{\"es\":\"Unidad\",\"ca\":\"Unitat\"},\"{name} Widget Configuration\":{\"es\":\"Configuración de {name}\",\"ca\":\"Configuració de {name}\"},\"Mandatory inputs\":{\"es\":\"Parámetros obligatorios\",\"ca\":\"Paràmetres obligatoris\"},\"Compass\":{\"es\":\"Rumbo\",\"ca\":\"Rumb\"},\"Gauge\":{\"es\":\"Manómetro\",\"ca\":\"Manòmetre\"},\"Jqgrid\":{\"es\":\"Tabla JQuery\",\"ca\":\"Taula JQuery\"},\"Map\":{\"es\":\"Mapa\",\"ca\":\"Mapa\"},\"Panel\":{\"es\":\"Panel\",\"ca\":\"Panell\"},\"Progressbar\":{\"es\":\"Barra\",\"ca\":\"Barra\"},\"Table\":{\"es\":\"Tabla\",\"ca\":\"Taula\"},\"Thermometer\":{\"es\":\"Termómetro\",\"ca\":\"Termòmetre\"},\"Timechart\":{\"es\":\"Serie tiempo\",\"ca\":\"Sèrie temps\"},\"Windrose\":{\"es\":\"Rosa vientos\",\"ca\":\"Rosa vents\"},\"Select a Service...\":{\"es\":\"Seleccione un servicio...\",\"ca\":\"Sel·leccioneu un servei...\"},\"Select an Offering...\":{\"es\":\"Seleccione un offering...\",\"ca\":\"Sel·leccioneu un offering...\"},\"(multiselect)\":{\"es\":\"(selección múltiple)\",\"ca\":\"(selecció múltiple)\"},\"Service\":{\"es\":\"Servicio\",\"ca\":\"Servei\"},\"Property\":{\"es\":\"Propiedad\",\"ca\":\"Propietat\"},\"Properties\":{\"es\":\"Propiedades\",\"ca\":\"Propietats\"},\"Refresh Interval\":{\"es\":\"Intervalo de refresco\",\"ca\":\"Intèrval de refresc\"},\"Time Range\":{\"es\":\"Rango de tiempo\",\"ca\":\"Rang de temps\"},\"MMM D, YYYY H:mm\":{\"es\":\"D MMM YYYY H:mm\",\"ca\":\"D MMM YYYY H:mm\"},\"Custom Range\":{\"es\":\"Rango predefinido\",\"ca\":\"Rang predefinit\"},\"Today\":{\"es\":\"Hoy\",\"ca\":\"Avui\"},\"Last hour\":{\"es\":\"La última hora\",\"ca\":\"La última hora\"},\"Last {n} hours\":{\"es\":\"Las últimas {n} horas\",\"ca\":\"Les últimes {n} hores\"},\"From\":{\"es\":\"De\",\"ca\":\"De\"},\"To\":{\"es\":\"A\",\"ca\":\"A\"},\"Apply\":{\"es\":\"Aplicar\",\"ca\":\"Aplica\"},\"Cancel\":{\"es\":\"Cancelar\",\"ca\":\"Cancel·la\"},\"W\":{\"es\":\"S\",\"ca\":\"S\"},\"Optional inputs\":{\"es\":\"Parámetros opcionales\",\"ca\":\"Paràmetres opcionals\"},\"Title\":{\"es\":\"Título\",\"ca\":\"Títol\"},\"Footnote\":{\"es\":\"Nota al pie\",\"ca\":\"Nota al peu\"},\"Custom Css Url\":{\"es\":\"URL del CSS personalizado\",\"ca\":\"URL del CSS personalitzat\"},\"Max Initial Zoom\":{\"es\":\"Zoom Inicial Máximo\",\"ca\":\"Zoom Inicial Màxim\"},\"Base Layer\":{\"es\":\"Mapa de Base\",\"ca\":\"Mapa de Base\"},\"Widget dimensions\":{\"es\":\"Tamaño del widget\",\"ca\":\"Mides del widget\"},\"Initial Size\":{\"es\":\"Tamaño inicial\",\"ca\":\"Mida inicial\"},\"Create Widget\":{\"es\":\"Crear Widget\",\"ca\":\"Crear Widget\"},\"{name} Configuration Parameters\":{\"es\":\"Parámetros de {name}\",\"ca\":\"Paràmetres de {name}\"},\"jqGrid Example\":{\"es\":\"Ejemplo de tabla JQuery\",\"ca\":\"Exemple de taula JQuery\"},\"Last observations\":{\"es\":\"Observaciones más recientes\",\"ca\":\"Darreres observacions\"},\"Data Table - last 3 hours\":{\"es\":\"Tabla de datos - últimas 3 horas\",\"ca\":\"Taula de dades - darreres 3 hores\"},\"Sirena Windrose\":{\"es\":\"Rosa de los Vientos Sirena\",\"ca\":\"Rosa dels Vents Sirena\"},\"Last 3 hours of wind observations\":{\"es\":\"Últimas 3 horas de observaciones del viento\",\"ca\":\"Darreres 3 hores d'observacions del vent\"},\"Code\":{\"es\":\"Código\",\"ca\":\"Codi\"},\"Embed\":{\"es\":\"Incrustar\",\"ca\":\"Incrusta\"},\"Link\":{\"es\":\"Enlazar\",\"ca\":\"Enllaça\"},\"Mandatory\":{\"es\":\"Obligatorios\",\"ca\":\"Obligatoris\"},\"Optional\":{\"es\":\"Opcionales\",\"ca\":\"Opcionals\"},\"Suggested Sizes\":{\"es\":\"Tamaños recomendados\",\"ca\":\"Mides recomanades\"},\"A sample footnote for {name} widget\":{\"es\":\"Nota al pie de ejemplo en el widget {name}\",\"ca\":\"Nota al peu d'exemple al widget {name}\"},\"Last measures from\":{\"es\":\"Últimas mediciones de\",\"ca\":\"Darreres mesures de\"}}");

/***/ }),

/***/ "./src/js/widget lazy recursive ^\\.\\/.*\\.js$":
/*!**********************************************************!*\
  !*** ./src/js/widget lazy ^\.\/.*\.js$ namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./compass.js": [
		"./src/js/widget/compass.js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-compass-js"
	],
	"./gauge.js": [
		"./src/js/widget/gauge.js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-gauge-js"
	],
	"./jqgrid.js": [
		"./src/js/widget/jqgrid.js",
		"vendors~widget-jqgrid-js~widget-timechart-js",
		"vendors~widget-jqgrid-js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-jqgrid-js"
	],
	"./map.js": [
		"./src/js/widget/map.js",
		"vendors~widget-map-js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-map-js"
	],
	"./panel.js": [
		"./src/js/widget/panel.js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-panel-js"
	],
	"./progressbar.js": [
		"./src/js/widget/progressbar.js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-progressbar-js"
	],
	"./status.js": [
		"./src/js/widget/status.js",
		"vendors~widget-status-js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-status-js"
	],
	"./table.js": [
		"./src/js/widget/table.js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-table-js"
	],
	"./thermometer.js": [
		"./src/js/widget/thermometer.js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-thermometer-js"
	],
	"./timechart.js": [
		"./src/js/widget/timechart.js",
		"vendors~widget-jqgrid-js~widget-timechart-js",
		"vendors~widget-timechart-js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-timechart-js"
	],
	"./windrose.js": [
		"./src/js/widget/windrose.js",
		"vendors~widget-windrose-js",
		"widget-compass-js~widget-gauge-js~widget-jqgrid-js~widget-map-js~widget-panel-js~widget-progressbar-~bc566e36",
		"widget-windrose-js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/js/widget lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ })

/******/ });
//# sourceMappingURL=SensorWidgets.js.map