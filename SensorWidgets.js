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
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    _url: null,

    setUrl: function(url) {
        this._url = url;
    },

    getCapabilities: function(callback, errorHandler) {
        var request = {
            request: "GetCapabilities",
            sections: ["Contents"]
        };

        this._send(request, function(response) {
            callback(response.contents);
        }, errorHandler);
    },

    describeSensor: function(procedure, callback, errorHandler) {
        var request = {
            request: "DescribeSensor",
            procedure: procedure,
            procedureDescriptionFormat: "http://www.opengis.net/sensorML/1.0.1"
        };

        this._send(request, function(response) {
            // Convert the SensorML description to a JSON object
            var description = response.procedureDescription.hasOwnProperty("description") ?
                    response.procedureDescription.description : response.procedureDescription;
            var json = _XML__WEBPACK_IMPORTED_MODULE_0__["default"].read(description, true);
            callback(json.SensorML.member);
        }, errorHandler);
    },

    getFeatureOfInterest: function(procedure, callback, errorHandler) {
        var request = {
            request: "GetFeatureOfInterest",
            procedure: procedure
        };

        this._send(request, function(response) {
            callback(response.featureOfInterest);
        }, errorHandler);
    },

    getDataAvailability: function(procedure, offering, features, properties, callback, errorHandler) {
        var request = {
            request: "GetDataAvailability"
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

        this._send(request, function(response) {
            callback(response.dataAvailability);
        }, errorHandler);
    },

    getObservation: function(offering, features, properties, time, callback, errorHandler) {
        var request = {
            "request": "GetObservation"
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
            var operation;
            if (time.length && time.length == 2) {
                // Time Range
                operation = "during";
            } else {
                // Time Instant
                operation = "equals";
            }
            var filter = {};
            filter[operation] = {
                "ref": "om:resultTime",
                "value": time
            };
            request.temporalFilter = [filter];
        }

        this._send(request, function(response) {
            callback(response.observations);
        }, errorHandler);
    },

    _send: function(request, onSuccess, onError) {
        request.service = "SOS";
        request.version = "2.0.0";

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var response = xhr.responseText;
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    // OK, not JSON
                }
                if (xhr.status == 200) {
                    onSuccess.call(this, response);
                } else {
                    var e = {
                        status: xhr.statusText,
                        url: this._url,
                        request: request,
                        response: response
                    };
                    console.log(e);
                    if (onError) {
                        onError.call(this, e.status, e.url, e.request, e.response);
                    }
                }
            }
        }.bind(this);

        xhr.open("POST", this._url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(JSON.stringify(request));
    }
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
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ "./src/js/i18n.js");
/* harmony import */ var _SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SensorWidgets.css */ "./src/js/SensorWidgets.css");
/* harmony import */ var _SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1__);



var instances = {};
var uid = function (i) {
    return function () {
        return 'SensorWidgetTarget-' + (++i);
    };
}(0);

/* harmony default export */ __webpack_exports__["default"] = (function(name, config, renderTo) {
    if (!renderTo) {
        renderTo = document.body;
    }

    function errorHandler(message, url, request) {
        var text = "";
        if (url){
            text = "[" + url + "] ";
        }
        if (request && request.request) {
            text += request.request + ": ";
        }
        if (message) {
            text += message;
        }
        renderTo.innerHTML = '<div class="text-danger">' + text + '</div>';
    }

    function checkConfig(name, inputs, config) {
        var missing = [];

        for (var i in inputs) {
            var input = inputs[i];
            if (!config.hasOwnProperty(input)) {
                missing.push(input);
            }
        }
        if (missing.length) {
            errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("The '{name}' widget is missing some mandatory parameters: ", {name: name}) + missing.join(", "));
        }
        return !missing.length;
    }

    if (name && config) {
        if(!renderTo.id) renderTo.id = uid();

        if (!config.service) {
            config.service = '/52n-sos/sos/json';
        }

        __webpack_require__("./src/js/widget lazy recursive ^\\.\\/.*\\.js$")(`./${name}.js`)
            .then(({default: widget}) => {
                renderTo.innerHTML = "";
                if (instances.hasOwnProperty(renderTo.id) && instances[renderTo.id] && instances[renderTo.id].hasOwnProperty("destroy")) {
                    console.debug("Destroying previous widget on ElementId=" + renderTo.id);
                    instances[renderTo.id].destroy();
                    delete instances[renderTo.id];
                }
                if (checkConfig(name, widget.inputs, config)) {
                    console.debug("Creating new " + name + " widget on ElementId=" + renderTo.id);
                    instances[renderTo.id] = widget.init(config, renderTo, errorHandler);
                }
            }).catch(cause => {
                console.error(cause);
                errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("Widget '{name}' cannot be found, or there was an error instantiating it", {name: name}));
            });
    } else if (!name) {
        errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].t("No widget name specified"));
    }
    return {
        name: name,
        config: config,
        renderTo: renderTo,
        inspect: function(cb) {
            __webpack_require__("./src/js/widget lazy recursive ^\\.\\/.*\\.js$")(`./${name}.js`)
                .then(({default: widget}) => {
                    cb.call(this, widget.inputs, widget.optional_inputs, widget.preferredSizes);
            });
        },
        url: function() {
            function relPathToAbs(pathname) {
                var output = [];
                pathname.replace(/^(\.\.?(\/|$))+/, "")
                        .replace(/\/(\.(\/|$))+/g, "/")
                        .replace(/\/\.\.$/, "/../")
                        .replace(/\/?[^\/]*/g, function (p) {
                          if (p === "/..") {
                            output.pop();
                          } else {
                            output.push(p);
                          }
                        });
                return output.join("").replace(/^\//, pathname.charAt(0) === "/" ? "/" : "");
            }
            var url = relPathToAbs("../widget/") + "?";
            url += "name="+ encodeURIComponent(name)+"&";
            url += Object.keys(config).map(function(key) {
                var val = config[key];
                if (typeof config[key] === 'object') {
                    val = JSON.stringify(config[key]);
                }
                return key + "=" + encodeURIComponent(val);
            }).join("&");
            url += "&lang="+_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].getLang();
            return url;
        },
        iframe: function(w, h) {
            w = w ? w : "100%";
            h = h ? h : "100%";
            return '<iframe src="'+this.url()+'" width="'+w+'" height="'+h+'" frameBorder="0"></iframe>';
        },
        javascript: function() {
            return "SensorWidget('"+name+"', " + JSON.stringify(config, null, 3) + ", document.getElementById('"+name+"-container'));";
        }
    };
});;


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
    read: function(xml, clean) {
        var X = {
            at: (clean ? "" : "@"),

            toObj: function(xml) {
                var o = {};
                if (xml.nodeType == 1) { // element node
                    if (xml.attributes.length) { // element with attributes
                        for (var i = 0; i < xml.attributes.length; i++) {
                            var name = xml.attributes[i].name;
                            var value = xml.attributes[i].value;
                            var is_ns = name.lastIndexOf("xmlns:", 0) === 0;
                            if (!(clean && is_ns)) { // Hide xmlns attributes
                                o[X.at + name] = (value || "").toString();
                            }
                        }
                    }
                    if (xml.firstChild) { // element has child nodes
                        var textChild = 0,
                            cdataChild = 0,
                            hasElementChild = false;
                        for (var n = xml.firstChild; n; n = n.nextSibling) {
                            if (n.nodeType == 1) {
                                hasElementChild = true;
                            } else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                                textChild++;
                                // non-whitespace text
                            } else if (n.nodeType == 4) {
                                cdataChild++;
                                // cdata section node
                            }
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) {
                                // structured element with evtl.
                                // a single text or/and cdata node
                                X.removeWhite(xml);
                                for (n = xml.firstChild; n; n = n.nextSibling) {
                                    if (n.nodeType == 3) { // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    } else if (n.nodeType == 4) { // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
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
                            } else { // mixed content
                                if (!xml.attributes.length) {
                                    o = X.escape(X.innerXml(xml));
                                } else {
                                    o["#text"] = X.escape(X.innerXml(xml));
                                }
                            }
                        } else if (textChild) { // pure text
                            if (!xml.attributes.length) {
                                o = X.escape(X.innerXml(xml));
                            } else {
                                o["#text"] = X.escape(X.innerXml(xml));
                            }
                        } else if (cdataChild) { // cdata
                            if (cdataChild > 1) {
                                o = X.escape(X.innerXml(xml));
                            } else {
                                for (n = xml.firstChild; n; n = n.nextSibling) {
                                    o["#cdata"] = X.escape(n.nodeValue);
                                }
                            }
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) {
                        o = null;
                    }
                } else if (xml.nodeType == 9) { // document.node
                    o = X.toObj(xml.documentElement);
                } else if (xml.nodeType == 8) {
                    return xml.data;
                    // A comment
                } else {
                    console.error("unhandled node type: " + xml.nodeType);
                }

                return o;
            },

            innerXml: function(node) {
                var s = "";
                if ("innerHTML" in node) {
                    s = node.innerHTML;
                } else {
                    var asXml = function(n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i = 0; i < n.attributes.length; i++) {
                                var name = n.attributes[i].name;
                                var value = n.attributes[i].value || "";
                                s += " " + name + "=\"" + value.toString() + "\"";
                            }
                            if (n.firstChild) {
                                s += ">";
                                for (var c = n.firstChild; c; c = c.nextSibling) {
                                    s += asXml(c);
                                }
                                s += "</" + n.nodeName + ">";
                            } else {
                                s += "/>";
                            }
                        } else if (n.nodeType == 3) {
                            s += n.nodeValue;
                        } else if (n.nodeType == 4) {
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        }
                        return s;
                    };

                    for (var c = node.firstChild; c; c = c.nextSibling) {
                        s += asXml(c);
                    }
                }
                return s;
            },

            escape: function(txt) {
                return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
            },

            removeWhite: function(e) {
                e.normalize();
                for (var n = e.firstChild; n;) {
                    if (n.nodeType == 3) { // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                            // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        } else {
                            n = n.nextSibling;
                        }
                    } else if (n.nodeType == 1) { // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    } else { // any other node
                        n = n.nextSibling;
                    }
                }
                return e;
            }
        };

        // Strip namespaces from XML tags
        if (clean) {
            xml = xml.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, "<$1$3>");
        }

        // Convert to an XML DOM Document
        xml = (new DOMParser()).parseFromString(xml, "text/xml");

        // Start from document's root element
        if (xml.nodeType == 9) {
            xml = xml.documentElement;
        }

        var ret = {};
        ret[xml.nodeName] = X.toObj(X.removeWhite(xml));
        return ret;
    },

    write: function(object) {
        var toXml = function(v, name, ind) {
            var xml = "";
            if (v instanceof Array) {
                for (var i = 0, n = v.length; i < n; i++) {
                    xml += ind + toXml(v[i], name, ind + "\t") + "\n";
                }
            } else if (typeof(v) == "object") {
                var hasChild = false;
                xml += ind + "<" + name;
                for (var m in v) {
                    if (m.charAt(0) == "@") {
                        xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                    } else {
                        hasChild = true;
                    }
                }
                xml += hasChild ? ">" : "/>";
                if (hasChild) {
                    for (m in v) {
                        if (m == "#text") {
                            xml += v[m];
                        } else if (m == "#cdata") {
                            xml += "<![CDATA[" + v[m] + "]]>";
                        } else if (m.charAt(0) != "@") {
                            xml += toXml(v[m], m, ind + "\t");
                        }
                    }
                    xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
                }
            } else {
                xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
            }
            return xml;
        };

        var xml = "";
        for (var i in object) {
            xml += toXml(object[i], i, "");
        }
        return xml;
    }
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
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */


var params = {};
location.search.substr(1).split("&").forEach(function(item) {
    var kv = item.split("=");
    params[kv[0]] = kv[1];
});

var activeLang;
setLang(params.hasOwnProperty('lang') ? params.lang : 'en');

function setLang(lang) {
    activeLang = lang;
    console.debug('Language set to ' + activeLang);
}

function template(string, values){
    for (var key in values)
        string = string.replace(new RegExp('{'+key+'}','g'), values[key]);
    return string;
}

function t(string, values) {
    if (_translations_json__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty(string) && _translations_json__WEBPACK_IMPORTED_MODULE_0__[string].hasOwnProperty(activeLang)) {
        string = _translations_json__WEBPACK_IMPORTED_MODULE_0__[string][activeLang];
    }
    return template(string, values);
}

/* harmony default export */ __webpack_exports__["default"] = ({
    langs: function() {
        return _translations_json__WEBPACK_IMPORTED_MODULE_0__.langs;
    },
    getLang: function() {
        return activeLang;
    },
    setLang: setLang,
    t: t,
    addTranslations: function(bundle) {
        Object.keys(bundle).forEach(function(key) {
            if (!_translations_json__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty(key)) {
                _translations_json__WEBPACK_IMPORTED_MODULE_0__[key] = bundle[key];
            } else {
                console.warn("Skipping duplicate entry '" + key + "' in translation bundle.");
            }
        });
    },
    translateDocTree: function(el) {
        if (!el) el = document;
        var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        while (treeWalker.nextNode()) {
            var node = treeWalker.currentNode;
            if(/\S/.test(node.nodeValue)) { // Not a whitespace-only text node
                node.nodeValue = t(node.nodeValue);
            }
        }
    }
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
/* harmony import */ var _SensorWidget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SensorWidget.js */ "./src/js/SensorWidget.js");
/* harmony import */ var _SOS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SOS.js */ "./src/js/SOS.js");



// 'Leak' SensorWidget to global scope.
window.SensorWidget = function() {
    var args = arguments;
    window.onload = function() {
        _SensorWidget_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, args);
    }
};

// Expose SOS as well.
window.getSOS = function(callback) {
    callback(_SOS_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL1NlbnNvcldpZGdldHMuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9TT1MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL1NlbnNvcldpZGdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvU2Vuc29yV2lkZ2V0cy5jc3M/ODkxZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvWE1MLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pMThuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQgbGF6eSBeXFwuXFwvLipcXC5qcyQgbmFtZXNwYWNlIG9iamVjdCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLHlDQUF5QyxzZ0NBQXNnQztRQUMvaUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFF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QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDNVFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDd0I7O0FBRVQ7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNENBQUc7QUFDMUI7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUNuSkQ7QUFBQTtBQUFBO0FBQUE7QUFBMEI7QUFDRzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQSxlQUFlLCtDQUFZO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLCtDQUFZO0FBQzdCLGdCQUFnQiwrQ0FBWTtBQUM1QixhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7OztBQzVERjtBQUFBO0FBQUE7QUFBNkM7QUFDbEI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBWTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLCtDQUFHO0FBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUMiLCJmaWxlIjoiU2Vuc29yV2lkZ2V0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiU2Vuc29yV2lkZ2V0c1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1widmVuZG9yc353aWRnZXQtanFncmlkLWpzfndpZGdldC10aW1lY2hhcnQtanNcIjpcInZlbmRvcnN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtdGltZWNoYXJ0LWpzXCIsXCJ2ZW5kb3JzfndpZGdldC1qcWdyaWQtanNcIjpcInZlbmRvcnN+d2lkZ2V0LWpxZ3JpZC1qc1wiLFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiOlwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFwid2lkZ2V0LWpxZ3JpZC1qc1wiOlwid2lkZ2V0LWpxZ3JpZC1qc1wiLFwidmVuZG9yc353aWRnZXQtdGltZWNoYXJ0LWpzXCI6XCJ2ZW5kb3JzfndpZGdldC10aW1lY2hhcnQtanNcIixcIndpZGdldC10aW1lY2hhcnQtanNcIjpcIndpZGdldC10aW1lY2hhcnQtanNcIixcInZlbmRvcnN+d2lkZ2V0LW1hcC1qc1wiOlwidmVuZG9yc353aWRnZXQtbWFwLWpzXCIsXCJ3aWRnZXQtbWFwLWpzXCI6XCJ3aWRnZXQtbWFwLWpzXCIsXCJ2ZW5kb3JzfndpZGdldC1zdGF0dXMtanNcIjpcInZlbmRvcnN+d2lkZ2V0LXN0YXR1cy1qc1wiLFwid2lkZ2V0LXN0YXR1cy1qc1wiOlwid2lkZ2V0LXN0YXR1cy1qc1wiLFwidmVuZG9yc353aWRnZXQtd2luZHJvc2UtanNcIjpcInZlbmRvcnN+d2lkZ2V0LXdpbmRyb3NlLWpzXCIsXCJ3aWRnZXQtd2luZHJvc2UtanNcIjpcIndpZGdldC13aW5kcm9zZS1qc1wiLFwid2lkZ2V0LWNvbXBhc3MtanNcIjpcIndpZGdldC1jb21wYXNzLWpzXCIsXCJ3aWRnZXQtZ2F1Z2UtanNcIjpcIndpZGdldC1nYXVnZS1qc1wiLFwid2lkZ2V0LXBhbmVsLWpzXCI6XCJ3aWRnZXQtcGFuZWwtanNcIixcIndpZGdldC1wcm9ncmVzc2Jhci1qc1wiOlwid2lkZ2V0LXByb2dyZXNzYmFyLWpzXCIsXCJ3aWRnZXQtdGFibGUtanNcIjpcIndpZGdldC10YWJsZS1qc1wiLFwid2lkZ2V0LXRoZXJtb21ldGVyLWpzXCI6XCJ3aWRnZXQtdGhlcm1vbWV0ZXItanNcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuY2h1bmsuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL21haW4uanNcIik7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18odHJ1ZSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IC53aWRnZXQge1xcbiAgICBmb250LWZhbWlseTogXFxcIlNvdXJjZSBTYW5zIFByb1xcXCIsIGhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbi53aWRnZXQge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGNvbG9yOiAjMjIyO1xcbiAgICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4ud2lkZ2V0IGgxIHtcXG4gICAgZm9udC1zaXplOiAyOHB4O1xcbn1cXG5cXG4ud2lkZ2V0IGgyIHtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbn1cXG5cXG4ud2lkZ2V0IGgzIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4ud2lkZ2V0IC5mb290bm90ZSB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgZm9udC1zaXplOiAxMXB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjMjIyOyBcXG59XFxuXFxuLndpZGdldCAuZGF0YSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbn1cXG5cXG4ud2lkZ2V0LmNvbXBhc3Mgc3ZnLFxcbi53aWRnZXQuZ2F1Z2Ugc3ZnIHtcXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcXG59XFxuXFxuLndpZGdldC5zdGF0dXMge1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLndpZGdldC5zdGF0dXMgdGgge1xcbiAgICBwYWRkaW5nOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmV5O1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyB0ZCB7XFxuICAgIHBhZGRpbmc6IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyB0ZC5ub2RhdGEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgICBjb2xvcjogZGFya2dyZXk7XFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxufVxcblxcbi53aWRnZXQuc3RhdHVzIC5yZXN1bHRfdGltZSB7XFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLndpZGdldC5wYW5lbCBkbCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbi53aWRnZXQucGFuZWwgZGQub3V0ZGF0ZWQge1xcbiAgICBjb2xvcjogI0FBMTExMTtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4ud2lkZ2V0LnBhbmVsIGRkLm91dGRhdGVkIHNwYW4ge1xcbiAgICBmb250LXNpemU6IDlweDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgaDIge1xcbiAgICBmb250LXNpemU6IHNtYWxsO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGgzIHtcXG4gICAgZm9udC1zaXplOiB4LXNtYWxsO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGgyLFxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgaDMsXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBkbCxcXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIC5mb290bm90ZSB7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGR0IHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGRhcmtncmF5O1xcbiAgICBjbGVhcjogbGVmdDtcXG4gICAgZm9udC1zaXplOiB4LXNtYWxsO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgICBwYWRkaW5nLXRvcDogMnB4O1xcbiAgICBmbG9hdDogbm9uZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgZGQge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBmb250LXNpemU6IHgtc21hbGw7XFxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICAgIHBhZGRpbmctYm90dG9tOiAycHg7XFxufVxcblxcbi53aWRnZXQudGFibGUge1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG4ud2lkZ2V0LndpbmRyb3NlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly9zcmMvanMvU2Vuc29yV2lkZ2V0cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxxREFBcUQ7SUFDckQsa0JBQWtCO0lBQ2xCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEI7O0FBRUE7O0lBRUksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFlBQVk7SUFDWiwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBOzs7O0lBSUksU0FBUztBQUNiOztBQUVBO0lBQ0ksNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksOEJBQThCO0lBQzlCLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxXQUFXO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSAud2lkZ2V0IHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJTb3VyY2UgU2FucyBQcm9cXFwiLCBoZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG4ud2lkZ2V0IHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBjb2xvcjogIzIyMjtcXG4gICAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG59XFxuXFxuLndpZGdldCBoMSB7XFxuICAgIGZvbnQtc2l6ZTogMjhweDtcXG59XFxuXFxuLndpZGdldCBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG59XFxuXFxuLndpZGdldCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXFxuLndpZGdldCAuZm9vdG5vdGUge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTFweDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogIzIyMjsgXFxufVxcblxcbi53aWRnZXQgLmRhdGEge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcXG59XFxuXFxuLndpZGdldC5jb21wYXNzIHN2ZyxcXG4ud2lkZ2V0LmdhdWdlIHN2ZyB7XFxuICAgIG1heC13aWR0aDogMzAwcHg7XFxufVxcblxcbi53aWRnZXQuc3RhdHVzIHtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi53aWRnZXQuc3RhdHVzIHRoIHtcXG4gICAgcGFkZGluZzogNHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JleTtcXG59XFxuXFxuLndpZGdldC5zdGF0dXMgdGQge1xcbiAgICBwYWRkaW5nOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcXG59XFxuXFxuLndpZGdldC5zdGF0dXMgdGQubm9kYXRhIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcXG4gICAgY29sb3I6IGRhcmtncmV5O1xcbiAgICBmb250LXNpemU6IHNtYWxsO1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyAucmVzdWx0X3RpbWUge1xcbiAgICBmb250LXNpemU6IHNtYWxsO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi53aWRnZXQucGFuZWwgZGwge1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG4ud2lkZ2V0LnBhbmVsIGRkLm91dGRhdGVkIHtcXG4gICAgY29sb3I6ICNBQTExMTE7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLndpZGdldC5wYW5lbCBkZC5vdXRkYXRlZCBzcGFuIHtcXG4gICAgZm9udC1zaXplOiA5cHg7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGgyIHtcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBoMixcXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGgzLFxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgZGwsXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCAuZm9vdG5vdGUge1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBkdCB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBkYXJrZ3JheTtcXG4gICAgY2xlYXI6IGxlZnQ7XFxuICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gICAgcGFkZGluZy10b3A6IDJweDtcXG4gICAgZmxvYXQ6IG5vbmU7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGRkIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgZm9udC1zaXplOiB4LXNtYWxsO1xcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMnB4O1xcbn1cXG5cXG4ud2lkZ2V0LnRhYmxlIHtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXFxuLndpZGdldC53aW5kcm9zZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiLyoqXG4gKiBAYXV0aG9yIE9zY2FyIEZvbnRzIDxvc2Nhci5mb250c0BnZW9tYXRpLmNvPlxuICovXG5pbXBvcnQgWE1MIGZyb20gJy4vWE1MJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIF91cmw6IG51bGwsXG5cbiAgICBzZXRVcmw6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgfSxcblxuICAgIGdldENhcGFiaWxpdGllczogZnVuY3Rpb24oY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiR2V0Q2FwYWJpbGl0aWVzXCIsXG4gICAgICAgICAgICBzZWN0aW9uczogW1wiQ29udGVudHNcIl1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zZW5kKHJlcXVlc3QsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5jb250ZW50cyk7XG4gICAgICAgIH0sIGVycm9ySGFuZGxlcik7XG4gICAgfSxcblxuICAgIGRlc2NyaWJlU2Vuc29yOiBmdW5jdGlvbihwcm9jZWR1cmUsIGNhbGxiYWNrLCBlcnJvckhhbmRsZXIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICByZXF1ZXN0OiBcIkRlc2NyaWJlU2Vuc29yXCIsXG4gICAgICAgICAgICBwcm9jZWR1cmU6IHByb2NlZHVyZSxcbiAgICAgICAgICAgIHByb2NlZHVyZURlc2NyaXB0aW9uRm9ybWF0OiBcImh0dHA6Ly93d3cub3Blbmdpcy5uZXQvc2Vuc29yTUwvMS4wLjFcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NlbmQocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIFNlbnNvck1MIGRlc2NyaXB0aW9uIHRvIGEgSlNPTiBvYmplY3RcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHJlc3BvbnNlLnByb2NlZHVyZURlc2NyaXB0aW9uLmhhc093blByb3BlcnR5KFwiZGVzY3JpcHRpb25cIikgP1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5wcm9jZWR1cmVEZXNjcmlwdGlvbi5kZXNjcmlwdGlvbiA6IHJlc3BvbnNlLnByb2NlZHVyZURlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdmFyIGpzb24gPSBYTUwucmVhZChkZXNjcmlwdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgICBjYWxsYmFjayhqc29uLlNlbnNvck1MLm1lbWJlcik7XG4gICAgICAgIH0sIGVycm9ySGFuZGxlcik7XG4gICAgfSxcblxuICAgIGdldEZlYXR1cmVPZkludGVyZXN0OiBmdW5jdGlvbihwcm9jZWR1cmUsIGNhbGxiYWNrLCBlcnJvckhhbmRsZXIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICByZXF1ZXN0OiBcIkdldEZlYXR1cmVPZkludGVyZXN0XCIsXG4gICAgICAgICAgICBwcm9jZWR1cmU6IHByb2NlZHVyZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NlbmQocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmZlYXR1cmVPZkludGVyZXN0KTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgZ2V0RGF0YUF2YWlsYWJpbGl0eTogZnVuY3Rpb24ocHJvY2VkdXJlLCBvZmZlcmluZywgZmVhdHVyZXMsIHByb3BlcnRpZXMsIGNhbGxiYWNrLCBlcnJvckhhbmRsZXIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICByZXF1ZXN0OiBcIkdldERhdGFBdmFpbGFiaWxpdHlcIlxuICAgICAgICB9O1xuICAgICAgICBpZiAocHJvY2VkdXJlKSB7XG4gICAgICAgICAgICByZXF1ZXN0LnByb2NlZHVyZSA9IHByb2NlZHVyZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2ZmZXJpbmcpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qub2ZmZXJpbmcgPSBvZmZlcmluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVhdHVyZXMgJiYgZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXF1ZXN0LmZlYXR1cmVPZkludGVyZXN0ID0gZmVhdHVyZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qub2JzZXJ2ZWRQcm9wZXJ0eSA9IHByb3BlcnRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZW5kKHJlcXVlc3QsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5kYXRhQXZhaWxhYmlsaXR5KTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgZ2V0T2JzZXJ2YXRpb246IGZ1bmN0aW9uKG9mZmVyaW5nLCBmZWF0dXJlcywgcHJvcGVydGllcywgdGltZSwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIFwicmVxdWVzdFwiOiBcIkdldE9ic2VydmF0aW9uXCJcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob2ZmZXJpbmcpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qub2ZmZXJpbmcgPSBvZmZlcmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmZWF0dXJlcyAmJiBmZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuZmVhdHVyZU9mSW50ZXJlc3QgPSBmZWF0dXJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzICYmIHByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXF1ZXN0Lm9ic2VydmVkUHJvcGVydHkgPSBwcm9wZXJ0aWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWUpIHtcbiAgICAgICAgICAgIHZhciBvcGVyYXRpb247XG4gICAgICAgICAgICBpZiAodGltZS5sZW5ndGggJiYgdGltZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIC8vIFRpbWUgUmFuZ2VcbiAgICAgICAgICAgICAgICBvcGVyYXRpb24gPSBcImR1cmluZ1wiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaW1lIEluc3RhbnRcbiAgICAgICAgICAgICAgICBvcGVyYXRpb24gPSBcImVxdWFsc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHt9O1xuICAgICAgICAgICAgZmlsdGVyW29wZXJhdGlvbl0gPSB7XG4gICAgICAgICAgICAgICAgXCJyZWZcIjogXCJvbTpyZXN1bHRUaW1lXCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB0aW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxdWVzdC50ZW1wb3JhbEZpbHRlciA9IFtmaWx0ZXJdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2VuZChyZXF1ZXN0LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2Uub2JzZXJ2YXRpb25zKTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgX3NlbmQ6IGZ1bmN0aW9uKHJlcXVlc3QsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgICAgICByZXF1ZXN0LnNlcnZpY2UgPSBcIlNPU1wiO1xuICAgICAgICByZXF1ZXN0LnZlcnNpb24gPSBcIjIuMC4wXCI7XG5cbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT0ssIG5vdCBKU09OXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MuY2FsbCh0aGlzLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLl91cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvci5jYWxsKHRoaXMsIGUuc3RhdHVzLCBlLnVybCwgZS5yZXF1ZXN0LCBlLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB0aGlzLl91cmwsIHRydWUpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xuICAgIH1cbn07IiwiaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJztcbmltcG9ydCAnLi9TZW5zb3JXaWRnZXRzLmNzcyc7XG5cbnZhciBpbnN0YW5jZXMgPSB7fTtcbnZhciB1aWQgPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnU2Vuc29yV2lkZ2V0VGFyZ2V0LScgKyAoKytpKTtcbiAgICB9O1xufSgwKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgY29uZmlnLCByZW5kZXJUbykge1xuICAgIGlmICghcmVuZGVyVG8pIHtcbiAgICAgICAgcmVuZGVyVG8gPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihtZXNzYWdlLCB1cmwsIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xuICAgICAgICBpZiAodXJsKXtcbiAgICAgICAgICAgIHRleHQgPSBcIltcIiArIHVybCArIFwiXSBcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRleHQgKz0gcmVxdWVzdC5yZXF1ZXN0ICsgXCI6IFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICB0ZXh0ICs9IG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyVG8uaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPicgKyB0ZXh0ICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tDb25maWcobmFtZSwgaW5wdXRzLCBjb25maWcpIHtcbiAgICAgICAgdmFyIG1pc3NpbmcgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpIGluIGlucHV0cykge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gaW5wdXRzW2ldO1xuICAgICAgICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgbWlzc2luZy5wdXNoKGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWlzc2luZy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVycm9ySGFuZGxlcihpMThuLnQoXCJUaGUgJ3tuYW1lfScgd2lkZ2V0IGlzIG1pc3Npbmcgc29tZSBtYW5kYXRvcnkgcGFyYW1ldGVyczogXCIsIHtuYW1lOiBuYW1lfSkgKyBtaXNzaW5nLmpvaW4oXCIsIFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFtaXNzaW5nLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAobmFtZSAmJiBjb25maWcpIHtcbiAgICAgICAgaWYoIXJlbmRlclRvLmlkKSByZW5kZXJUby5pZCA9IHVpZCgpO1xuXG4gICAgICAgIGlmICghY29uZmlnLnNlcnZpY2UpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zZXJ2aWNlID0gJy81Mm4tc29zL3Nvcy9qc29uJztcbiAgICAgICAgfVxuXG4gICAgICAgIGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIndpZGdldC1bcmVxdWVzdF1cIiAqLyBgLi93aWRnZXQvJHtuYW1lfS5qc2ApXG4gICAgICAgICAgICAudGhlbigoe2RlZmF1bHQ6IHdpZGdldH0pID0+IHtcbiAgICAgICAgICAgICAgICByZW5kZXJUby5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZXMuaGFzT3duUHJvcGVydHkocmVuZGVyVG8uaWQpICYmIGluc3RhbmNlc1tyZW5kZXJUby5pZF0gJiYgaW5zdGFuY2VzW3JlbmRlclRvLmlkXS5oYXNPd25Qcm9wZXJ0eShcImRlc3Ryb3lcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkRlc3Ryb3lpbmcgcHJldmlvdXMgd2lkZ2V0IG9uIEVsZW1lbnRJZD1cIiArIHJlbmRlclRvLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzW3JlbmRlclRvLmlkXS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnN0YW5jZXNbcmVuZGVyVG8uaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tDb25maWcobmFtZSwgd2lkZ2V0LmlucHV0cywgY29uZmlnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiQ3JlYXRpbmcgbmV3IFwiICsgbmFtZSArIFwiIHdpZGdldCBvbiBFbGVtZW50SWQ9XCIgKyByZW5kZXJUby5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlc1tyZW5kZXJUby5pZF0gPSB3aWRnZXQuaW5pdChjb25maWcsIHJlbmRlclRvLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGNhdXNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNhdXNlKTtcbiAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIoaTE4bi50KFwiV2lkZ2V0ICd7bmFtZX0nIGNhbm5vdCBiZSBmb3VuZCwgb3IgdGhlcmUgd2FzIGFuIGVycm9yIGluc3RhbnRpYXRpbmcgaXRcIiwge25hbWU6IG5hbWV9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFuYW1lKSB7XG4gICAgICAgIGVycm9ySGFuZGxlcihpMThuLnQoXCJObyB3aWRnZXQgbmFtZSBzcGVjaWZpZWRcIikpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVuZGVyVG86IHJlbmRlclRvLFxuICAgICAgICBpbnNwZWN0OiBmdW5jdGlvbihjYikge1xuICAgICAgICAgICAgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwid2lkZ2V0LVtyZXF1ZXN0XVwiICovIGAuL3dpZGdldC8ke25hbWV9LmpzYClcbiAgICAgICAgICAgICAgICAudGhlbigoe2RlZmF1bHQ6IHdpZGdldH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2IuY2FsbCh0aGlzLCB3aWRnZXQuaW5wdXRzLCB3aWRnZXQub3B0aW9uYWxfaW5wdXRzLCB3aWRnZXQucHJlZmVycmVkU2l6ZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVybDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiByZWxQYXRoVG9BYnMocGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUucmVwbGFjZSgvXihcXC5cXC4/KFxcL3wkKSkrLywgXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8oXFwuKFxcL3wkKSkrL2csIFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcLlxcLiQvLCBcIi8uLi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC8/W15cXC9dKi9nLCBmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocCA9PT0gXCIvLi5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dC5qb2luKFwiXCIpLnJlcGxhY2UoL15cXC8vLCBwYXRobmFtZS5jaGFyQXQoMCkgPT09IFwiL1wiID8gXCIvXCIgOiBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1cmwgPSByZWxQYXRoVG9BYnMoXCIuLi93aWRnZXQvXCIpICsgXCI/XCI7XG4gICAgICAgICAgICB1cmwgKz0gXCJuYW1lPVwiKyBlbmNvZGVVUklDb21wb25lbnQobmFtZSkrXCImXCI7XG4gICAgICAgICAgICB1cmwgKz0gT2JqZWN0LmtleXMoY29uZmlnKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGNvbmZpZ1trZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KGNvbmZpZ1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCk7XG4gICAgICAgICAgICB9KS5qb2luKFwiJlwiKTtcbiAgICAgICAgICAgIHVybCArPSBcIiZsYW5nPVwiK2kxOG4uZ2V0TGFuZygpO1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSxcbiAgICAgICAgaWZyYW1lOiBmdW5jdGlvbih3LCBoKSB7XG4gICAgICAgICAgICB3ID0gdyA/IHcgOiBcIjEwMCVcIjtcbiAgICAgICAgICAgIGggPSBoID8gaCA6IFwiMTAwJVwiO1xuICAgICAgICAgICAgcmV0dXJuICc8aWZyYW1lIHNyYz1cIicrdGhpcy51cmwoKSsnXCIgd2lkdGg9XCInK3crJ1wiIGhlaWdodD1cIicraCsnXCIgZnJhbWVCb3JkZXI9XCIwXCI+PC9pZnJhbWU+JztcbiAgICAgICAgfSxcbiAgICAgICAgamF2YXNjcmlwdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTZW5zb3JXaWRnZXQoJ1wiK25hbWUrXCInLCBcIiArIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgMykgKyBcIiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1wiK25hbWUrXCItY29udGFpbmVyJykpO1wiO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vU2Vuc29yV2lkZ2V0cy5jc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIi8qIFRoaXMgd29yayBpcyBsaWNlbnNlZCB1bmRlciBDcmVhdGl2ZSBDb21tb25zIEdOVSBMR1BMIExpY2Vuc2UuXG5cbiBMaWNlbnNlOiBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS9cbiBWZXJzaW9uOiAwLjlcbiBBdXRob3I6ICBTdGVmYW4gR29lc3NuZXIvMjAwNlxuIFNlZTogICAgIGh0dHA6Ly9nb2Vzc25lci5uZXQvZG93bmxvYWQvcHJqL2pzb254bWwvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZWFkOiBmdW5jdGlvbih4bWwsIGNsZWFuKSB7XG4gICAgICAgIHZhciBYID0ge1xuICAgICAgICAgICAgYXQ6IChjbGVhbiA/IFwiXCIgOiBcIkBcIiksXG5cbiAgICAgICAgICAgIHRvT2JqOiBmdW5jdGlvbih4bWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmICh4bWwubm9kZVR5cGUgPT0gMSkgeyAvLyBlbGVtZW50IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhtbC5hdHRyaWJ1dGVzLmxlbmd0aCkgeyAvLyBlbGVtZW50IHdpdGggYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4bWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0geG1sLmF0dHJpYnV0ZXNbaV0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB4bWwuYXR0cmlidXRlc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNfbnMgPSBuYW1lLmxhc3RJbmRleE9mKFwieG1sbnM6XCIsIDApID09PSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGNsZWFuICYmIGlzX25zKSkgeyAvLyBIaWRlIHhtbG5zIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tYLmF0ICsgbmFtZV0gPSAodmFsdWUgfHwgXCJcIikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHhtbC5maXJzdENoaWxkKSB7IC8vIGVsZW1lbnQgaGFzIGNoaWxkIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dENoaWxkID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZGF0YUNoaWxkID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNFbGVtZW50Q2hpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSB4bWwuZmlyc3RDaGlsZDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5ub2RlVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRDaGlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLm5vZGVUeXBlID09IDMgJiYgbi5ub2RlVmFsdWUubWF0Y2goL1teIFxcZlxcblxcclxcdFxcdl0vKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q2hpbGQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9uLXdoaXRlc3BhY2UgdGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5ub2RlVHlwZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNkYXRhQ2hpbGQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2RhdGEgc2VjdGlvbiBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0VsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0Q2hpbGQgPCAyICYmIGNkYXRhQ2hpbGQgPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cnVjdHVyZWQgZWxlbWVudCB3aXRoIGV2dGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgc2luZ2xlIHRleHQgb3IvYW5kIGNkYXRhIG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWC5yZW1vdmVXaGl0ZSh4bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSB4bWwuZmlyc3RDaGlsZDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLm5vZGVUeXBlID09IDMpIHsgLy8gdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tcIiN0ZXh0XCJdID0gWC5lc2NhcGUobi5ub2RlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLm5vZGVUeXBlID09IDQpIHsgLy8gY2RhdGEgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bXCIjY2RhdGFcIl0gPSBYLmVzY2FwZShuLm5vZGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9bbi5ub2RlTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtdWx0aXBsZSBvY2N1cmVuY2Ugb2YgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvW24ubm9kZU5hbWVdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tuLm5vZGVOYW1lXVtvW24ubm9kZU5hbWVdLmxlbmd0aF0gPSBYLnRvT2JqKG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bbi5ub2RlTmFtZV0gPSBbb1tuLm5vZGVOYW1lXSwgWC50b09iaihuKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gZmlyc3Qgb2NjdXJlbmNlIG9mIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW24ubm9kZU5hbWVdID0gWC50b09iaihuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG1peGVkIGNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF4bWwuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBYLmVzY2FwZShYLmlubmVyWG1sKHhtbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tcIiN0ZXh0XCJdID0gWC5lc2NhcGUoWC5pbm5lclhtbCh4bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4dENoaWxkKSB7IC8vIHB1cmUgdGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgheG1sLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBYLmVzY2FwZShYLmlubmVyWG1sKHhtbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bXCIjdGV4dFwiXSA9IFguZXNjYXBlKFguaW5uZXJYbWwoeG1sKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZGF0YUNoaWxkKSB7IC8vIGNkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNkYXRhQ2hpbGQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBYLmVzY2FwZShYLmlubmVyWG1sKHhtbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobiA9IHhtbC5maXJzdENoaWxkOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tcIiNjZGF0YVwiXSA9IFguZXNjYXBlKG4ubm9kZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXhtbC5hdHRyaWJ1dGVzLmxlbmd0aCAmJiAheG1sLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh4bWwubm9kZVR5cGUgPT0gOSkgeyAvLyBkb2N1bWVudC5ub2RlXG4gICAgICAgICAgICAgICAgICAgIG8gPSBYLnRvT2JqKHhtbC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeG1sLm5vZGVUeXBlID09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhtbC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwidW5oYW5kbGVkIG5vZGUgdHlwZTogXCIgKyB4bWwubm9kZVR5cGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5uZXJYbWw6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKFwiaW5uZXJIVE1MXCIgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBzID0gbm9kZS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFzWG1sID0gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ubm9kZVR5cGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCI8XCIgKyBuLm5vZGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gbi5hdHRyaWJ1dGVzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IG4uYXR0cmlidXRlc1tpXS52YWx1ZSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiIFwiICsgbmFtZSArIFwiPVxcXCJcIiArIHZhbHVlLnRvU3RyaW5nKCkgKyBcIlxcXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gbi5maXJzdENoaWxkOyBjOyBjID0gYy5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBhc1htbChjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiPC9cIiArIG4ubm9kZU5hbWUgKyBcIj5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiLz5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZVR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gbi5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZVR5cGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCI8IVtDREFUQVtcIiArIG4ubm9kZVZhbHVlICsgXCJdXT5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSBub2RlLmZpcnN0Q2hpbGQ7IGM7IGMgPSBjLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IGFzWG1sKGMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXNjYXBlOiBmdW5jdGlvbih0eHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHh0LnJlcGxhY2UoL1tcXFxcXS9nLCBcIlxcXFxcXFxcXCIpLnJlcGxhY2UoL1tcXFwiXS9nLCAnXFxcXFwiJykucmVwbGFjZSgvW1xcbl0vZywgJ1xcXFxuJykucmVwbGFjZSgvW1xccl0vZywgJ1xcXFxyJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZW1vdmVXaGl0ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IGUuZmlyc3RDaGlsZDsgbjspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4ubm9kZVR5cGUgPT0gMykgeyAvLyB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbi5ub2RlVmFsdWUubWF0Y2goL1teIFxcZlxcblxcclxcdFxcdl0vKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1cmUgd2hpdGVzcGFjZSB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnh0ID0gbi5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnJlbW92ZUNoaWxkKG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBueHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBuLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZVR5cGUgPT0gMSkgeyAvLyBlbGVtZW50IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIFgucmVtb3ZlV2hpdGUobik7XG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gbi5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gYW55IG90aGVyIG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBuLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN0cmlwIG5hbWVzcGFjZXMgZnJvbSBYTUwgdGFnc1xuICAgICAgICBpZiAoY2xlYW4pIHtcbiAgICAgICAgICAgIHhtbCA9IHhtbC5yZXBsYWNlKC88KFxcLz8pKFteOj5cXHNdKjopPyhbXj5dKyk+L2csIFwiPCQxJDM+XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29udmVydCB0byBhbiBYTUwgRE9NIERvY3VtZW50XG4gICAgICAgIHhtbCA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh4bWwsIFwidGV4dC94bWxcIik7XG5cbiAgICAgICAgLy8gU3RhcnQgZnJvbSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudFxuICAgICAgICBpZiAoeG1sLm5vZGVUeXBlID09IDkpIHtcbiAgICAgICAgICAgIHhtbCA9IHhtbC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgIHJldFt4bWwubm9kZU5hbWVdID0gWC50b09iaihYLnJlbW92ZVdoaXRlKHhtbCkpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICB3cml0ZTogZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHZhciB0b1htbCA9IGZ1bmN0aW9uKHYsIG5hbWUsIGluZCkge1xuICAgICAgICAgICAgdmFyIHhtbCA9IFwiXCI7XG4gICAgICAgICAgICBpZiAodiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSB2Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB4bWwgKz0gaW5kICsgdG9YbWwodltpXSwgbmFtZSwgaW5kICsgXCJcXHRcIikgKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKHYpID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzQ2hpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB4bWwgKz0gaW5kICsgXCI8XCIgKyBuYW1lO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG0gaW4gdikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobS5jaGFyQXQoMCkgPT0gXCJAXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbCArPSBcIiBcIiArIG0uc3Vic3RyKDEpICsgXCI9XFxcIlwiICsgdlttXS50b1N0cmluZygpICsgXCJcXFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNDaGlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeG1sICs9IGhhc0NoaWxkID8gXCI+XCIgOiBcIi8+XCI7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobSBpbiB2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobSA9PSBcIiN0ZXh0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWwgKz0gdlttXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobSA9PSBcIiNjZGF0YVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sICs9IFwiPCFbQ0RBVEFbXCIgKyB2W21dICsgXCJdXT5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobS5jaGFyQXQoMCkgIT0gXCJAXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWwgKz0gdG9YbWwodlttXSwgbSwgaW5kICsgXCJcXHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgeG1sICs9ICh4bWwuY2hhckF0KHhtbC5sZW5ndGggLSAxKSA9PSBcIlxcblwiID8gaW5kIDogXCJcIikgKyBcIjwvXCIgKyBuYW1lICsgXCI+XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4bWwgKz0gaW5kICsgXCI8XCIgKyBuYW1lICsgXCI+XCIgKyB2LnRvU3RyaW5nKCkgKyBcIjwvXCIgKyBuYW1lICsgXCI+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geG1sO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB4bWwgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpIGluIG9iamVjdCkge1xuICAgICAgICAgICAgeG1sICs9IHRvWG1sKG9iamVjdFtpXSwgaSwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhtbDtcbiAgICB9XG59OyIsIi8qKlxuICogQGF1dGhvciBPc2NhciBGb250cyA8b3NjYXIuZm9udHNAZ2VvbWF0aS5jbz5cbiAqL1xuaW1wb3J0IHRyYW5zbGF0aW9ucyBmcm9tICcuL3RyYW5zbGF0aW9ucy5qc29uJztcblxudmFyIHBhcmFtcyA9IHt9O1xubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdChcIiZcIikuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgdmFyIGt2ID0gaXRlbS5zcGxpdChcIj1cIik7XG4gICAgcGFyYW1zW2t2WzBdXSA9IGt2WzFdO1xufSk7XG5cbnZhciBhY3RpdmVMYW5nO1xuc2V0TGFuZyhwYXJhbXMuaGFzT3duUHJvcGVydHkoJ2xhbmcnKSA/IHBhcmFtcy5sYW5nIDogJ2VuJyk7XG5cbmZ1bmN0aW9uIHNldExhbmcobGFuZykge1xuICAgIGFjdGl2ZUxhbmcgPSBsYW5nO1xuICAgIGNvbnNvbGUuZGVidWcoJ0xhbmd1YWdlIHNldCB0byAnICsgYWN0aXZlTGFuZyk7XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0cmluZywgdmFsdWVzKXtcbiAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWVzKVxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKCd7JytrZXkrJ30nLCdnJyksIHZhbHVlc1trZXldKTtcbiAgICByZXR1cm4gc3RyaW5nO1xufVxuXG5mdW5jdGlvbiB0KHN0cmluZywgdmFsdWVzKSB7XG4gICAgaWYgKHRyYW5zbGF0aW9ucy5oYXNPd25Qcm9wZXJ0eShzdHJpbmcpICYmIHRyYW5zbGF0aW9uc1tzdHJpbmddLmhhc093blByb3BlcnR5KGFjdGl2ZUxhbmcpKSB7XG4gICAgICAgIHN0cmluZyA9IHRyYW5zbGF0aW9uc1tzdHJpbmddW2FjdGl2ZUxhbmddO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGUoc3RyaW5nLCB2YWx1ZXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbGFuZ3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb25zLmxhbmdzO1xuICAgIH0sXG4gICAgZ2V0TGFuZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhY3RpdmVMYW5nO1xuICAgIH0sXG4gICAgc2V0TGFuZzogc2V0TGFuZyxcbiAgICB0OiB0LFxuICAgIGFkZFRyYW5zbGF0aW9uczogZnVuY3Rpb24oYnVuZGxlKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGJ1bmRsZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmICghdHJhbnNsYXRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbnNba2V5XSA9IGJ1bmRsZVtrZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJTa2lwcGluZyBkdXBsaWNhdGUgZW50cnkgJ1wiICsga2V5ICsgXCInIGluIHRyYW5zbGF0aW9uIGJ1bmRsZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdHJhbnNsYXRlRG9jVHJlZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgaWYgKCFlbCkgZWwgPSBkb2N1bWVudDtcbiAgICAgICAgdmFyIHRyZWVXYWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGVsLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCwgZmFsc2UpO1xuICAgICAgICB3aGlsZSAodHJlZVdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRyZWVXYWxrZXIuY3VycmVudE5vZGU7XG4gICAgICAgICAgICBpZigvXFxTLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkgeyAvLyBOb3QgYSB3aGl0ZXNwYWNlLW9ubHkgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgbm9kZS5ub2RlVmFsdWUgPSB0KG5vZGUubm9kZVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgU2Vuc29yV2lkZ2V0IGZyb20gJy4vU2Vuc29yV2lkZ2V0LmpzJztcbmltcG9ydCBzb3MgZnJvbSAnLi9TT1MuanMnO1xuXG4vLyAnTGVhaycgU2Vuc29yV2lkZ2V0IHRvIGdsb2JhbCBzY29wZS5cbndpbmRvdy5TZW5zb3JXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFNlbnNvcldpZGdldC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG59O1xuXG4vLyBFeHBvc2UgU09TIGFzIHdlbGwuXG53aW5kb3cuZ2V0U09TID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayhzb3MpO1xufTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9jb21wYXNzLmpzXCI6IFtcblx0XHRcIi4vc3JjL2pzL3dpZGdldC9jb21wYXNzLmpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc1wiXG5cdF0sXG5cdFwiLi9nYXVnZS5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvZ2F1Z2UuanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC1nYXVnZS1qc1wiXG5cdF0sXG5cdFwiLi9qcWdyaWQuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L2pxZ3JpZC5qc1wiLFxuXHRcdFwidmVuZG9yc353aWRnZXQtanFncmlkLWpzfndpZGdldC10aW1lY2hhcnQtanNcIixcblx0XHRcInZlbmRvcnN+d2lkZ2V0LWpxZ3JpZC1qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LWpxZ3JpZC1qc1wiXG5cdF0sXG5cdFwiLi9tYXAuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L21hcC5qc1wiLFxuXHRcdFwidmVuZG9yc353aWRnZXQtbWFwLWpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtbWFwLWpzXCJcblx0XSxcblx0XCIuL3BhbmVsLmpzXCI6IFtcblx0XHRcIi4vc3JjL2pzL3dpZGdldC9wYW5lbC5qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LXBhbmVsLWpzXCJcblx0XSxcblx0XCIuL3Byb2dyZXNzYmFyLmpzXCI6IFtcblx0XHRcIi4vc3JjL2pzL3dpZGdldC9wcm9ncmVzc2Jhci5qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LXByb2dyZXNzYmFyLWpzXCJcblx0XSxcblx0XCIuL3N0YXR1cy5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvc3RhdHVzLmpzXCIsXG5cdFx0XCJ2ZW5kb3JzfndpZGdldC1zdGF0dXMtanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC1zdGF0dXMtanNcIlxuXHRdLFxuXHRcIi4vdGFibGUuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L3RhYmxlLmpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtdGFibGUtanNcIlxuXHRdLFxuXHRcIi4vdGhlcm1vbWV0ZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L3RoZXJtb21ldGVyLmpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtdGhlcm1vbWV0ZXItanNcIlxuXHRdLFxuXHRcIi4vdGltZWNoYXJ0LmpzXCI6IFtcblx0XHRcIi4vc3JjL2pzL3dpZGdldC90aW1lY2hhcnQuanNcIixcblx0XHRcInZlbmRvcnN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtdGltZWNoYXJ0LWpzXCIsXG5cdFx0XCJ2ZW5kb3JzfndpZGdldC10aW1lY2hhcnQtanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC10aW1lY2hhcnQtanNcIlxuXHRdLFxuXHRcIi4vd2luZHJvc2UuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L3dpbmRyb3NlLmpzXCIsXG5cdFx0XCJ2ZW5kb3JzfndpZGdldC13aW5kcm9zZS1qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LXdpbmRyb3NlLWpzXCJcblx0XVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHQocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIFByb21pc2UuYWxsKGlkcy5zbGljZSgxKS5tYXAoX193ZWJwYWNrX3JlcXVpcmVfXy5lKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG5cdH0pO1xufVxud2VicGFja0FzeW5jQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tBc3luY0NvbnRleHQuaWQgPSBcIi4vc3JjL2pzL3dpZGdldCBsYXp5IHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qXFxcXC5qcyRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiXSwic291cmNlUm9vdCI6IiJ9