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



__webpack_require__.p = document.currentScript.src.replace(/[^\/]*$/, '');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL1NlbnNvcldpZGdldHMuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9TT1MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL1NlbnNvcldpZGdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvU2Vuc29yV2lkZ2V0cy5jc3M/ODkxZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvWE1MLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pMThuLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93aWRnZXQgbGF6eSBeXFwuXFwvLipcXC5qcyQgbmFtZXNwYWNlIG9iamVjdCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLHlDQUF5QyxzZ0NBQXNnQztRQUMvaUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHdCQUF3QixrQ0FBa0M7UUFDMUQsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLDBDQUEwQyxvQkFBb0IsV0FBVzs7UUFFekU7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsdUJBQXVCO1FBQ3ZDOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDck1BO0FBQUE7QUFBQTtBQUFBO0FBQzRGO0FBQzVGLDhCQUE4QixtRkFBMkI7QUFDekQ7QUFDQSw4QkFBOEIsUUFBUyxpQkFBaUIsOERBQThELHlCQUF5QixnQkFBZ0IsR0FBRyxhQUFhLG1CQUFtQix1QkFBdUIsa0JBQWtCLHlDQUF5QyxHQUFHLGdCQUFnQixzQkFBc0IsR0FBRyxnQkFBZ0Isc0JBQXNCLEdBQUcsZ0JBQWdCLHNCQUFzQixHQUFHLHVCQUF1QixtQkFBbUIsc0JBQXNCLHdCQUF3QixxQkFBcUIsa0JBQWtCLElBQUksbUJBQW1CLDRCQUE0QiwwQkFBMEIsbUJBQW1CLHVCQUF1QixHQUFHLDZDQUE2Qyx1QkFBdUIsR0FBRyxvQkFBb0IscUJBQXFCLEdBQUcsdUJBQXVCLG1CQUFtQixpQ0FBaUMsR0FBRyx1QkFBdUIsbUJBQW1CLGtDQUFrQyxHQUFHLDhCQUE4QixtQ0FBbUMsc0JBQXNCLHVCQUF1QixHQUFHLGlDQUFpQyx1QkFBdUIseUJBQXlCLEdBQUcsc0JBQXNCLHVCQUF1QixHQUFHLCtCQUErQixxQkFBcUIseUJBQXlCLEdBQUcsb0NBQW9DLHFCQUFxQixxQkFBcUIsR0FBRyxpREFBaUQsdUJBQXVCLEdBQUcsaURBQWlELHlCQUF5QixHQUFHLGtNQUFrTSxnQkFBZ0IsR0FBRyw4Q0FBOEMsb0NBQW9DLEdBQUcsaURBQWlELHFDQUFxQyxrQkFBa0IseUJBQXlCLDBCQUEwQiwwQkFBMEIsdUJBQXVCLGtCQUFrQix1QkFBdUIsa0JBQWtCLEdBQUcsaURBQWlELGdCQUFnQix3QkFBd0IseUJBQXlCLDBCQUEwQiwwQkFBMEIsR0FBRyxtQkFBbUIscUJBQXFCLHNCQUFzQixHQUFHLHNCQUFzQixrQkFBa0IsR0FBRyxTQUFTLHlGQUF5RixZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxRQUFRLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSx1Q0FBdUMsOERBQThELHlCQUF5QixnQkFBZ0IsR0FBRyxhQUFhLG1CQUFtQix1QkFBdUIsa0JBQWtCLHlDQUF5QyxHQUFHLGdCQUFnQixzQkFBc0IsR0FBRyxnQkFBZ0Isc0JBQXNCLEdBQUcsZ0JBQWdCLHNCQUFzQixHQUFHLHVCQUF1QixtQkFBbUIsc0JBQXNCLHdCQUF3QixxQkFBcUIsa0JBQWtCLElBQUksbUJBQW1CLDRCQUE0QiwwQkFBMEIsbUJBQW1CLHVCQUF1QixHQUFHLDZDQUE2Qyx1QkFBdUIsR0FBRyxvQkFBb0IscUJBQXFCLEdBQUcsdUJBQXVCLG1CQUFtQixpQ0FBaUMsR0FBRyx1QkFBdUIsbUJBQW1CLGtDQUFrQyxHQUFHLDhCQUE4QixtQ0FBbUMsc0JBQXNCLHVCQUF1QixHQUFHLGlDQUFpQyx1QkFBdUIseUJBQXlCLEdBQUcsc0JBQXNCLHVCQUF1QixHQUFHLCtCQUErQixxQkFBcUIseUJBQXlCLEdBQUcsb0NBQW9DLHFCQUFxQixxQkFBcUIsR0FBRyxpREFBaUQsdUJBQXVCLEdBQUcsaURBQWlELHlCQUF5QixHQUFHLGtNQUFrTSxnQkFBZ0IsR0FBRyw4Q0FBOEMsb0NBQW9DLEdBQUcsaURBQWlELHFDQUFxQyxrQkFBa0IseUJBQXlCLDBCQUEwQiwwQkFBMEIsdUJBQXVCLGtCQUFrQix1QkFBdUIsa0JBQWtCLEdBQUcsaURBQWlELGdCQUFnQix3QkFBd0IseUJBQXlCLDBCQUEwQiwwQkFBMEIsR0FBRyxtQkFBbUIscUJBQXFCLHNCQUFzQixHQUFHLHNCQUFzQixrQkFBa0IsR0FBRyxxQkFBcUI7QUFDM2hMO0FBQ2Usc0ZBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNOMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxxQkFBcUI7QUFDakU7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHFCQUFxQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCOztBQUU5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDN0ZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxTQUFJOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxxRUFBcUUscUJBQXFCLGFBQWE7O0FBRXZHOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsR0FBRzs7QUFFSDs7O0FBR0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLDZCQUE2QjtBQUNqRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDNVFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDd0I7O0FBRVQ7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNENBQUc7QUFDMUI7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUNuSkQ7QUFBQTtBQUFBO0FBQUE7QUFBMEI7QUFDRzs7QUFFN0IscUJBQXVCOztBQUV2QjtB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QiwrQ0FBWTtBQUM3QjtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBLGVBQWUsK0NBQVk7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0NBQVk7QUFDN0IsZ0JBQWdCLCtDQUFZO0FBQzVCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDNURGO0FBQUE7QUFBQTtBQUE2QztBQUNsQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFZO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsK0NBQUc7QUFDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQyIsImZpbGUiOiJTZW5zb3JXaWRnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJTZW5zb3JXaWRnZXRzXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJ2ZW5kb3JzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LXRpbWVjaGFydC1qc1wiOlwidmVuZG9yc353aWRnZXQtanFncmlkLWpzfndpZGdldC10aW1lY2hhcnQtanNcIixcInZlbmRvcnN+d2lkZ2V0LWpxZ3JpZC1qc1wiOlwidmVuZG9yc353aWRnZXQtanFncmlkLWpzXCIsXCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCI6XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXCJ3aWRnZXQtanFncmlkLWpzXCI6XCJ3aWRnZXQtanFncmlkLWpzXCIsXCJ2ZW5kb3JzfndpZGdldC10aW1lY2hhcnQtanNcIjpcInZlbmRvcnN+d2lkZ2V0LXRpbWVjaGFydC1qc1wiLFwid2lkZ2V0LXRpbWVjaGFydC1qc1wiOlwid2lkZ2V0LXRpbWVjaGFydC1qc1wiLFwidmVuZG9yc353aWRnZXQtbWFwLWpzXCI6XCJ2ZW5kb3JzfndpZGdldC1tYXAtanNcIixcIndpZGdldC1tYXAtanNcIjpcIndpZGdldC1tYXAtanNcIixcInZlbmRvcnN+d2lkZ2V0LXN0YXR1cy1qc1wiOlwidmVuZG9yc353aWRnZXQtc3RhdHVzLWpzXCIsXCJ3aWRnZXQtc3RhdHVzLWpzXCI6XCJ3aWRnZXQtc3RhdHVzLWpzXCIsXCJ2ZW5kb3JzfndpZGdldC13aW5kcm9zZS1qc1wiOlwidmVuZG9yc353aWRnZXQtd2luZHJvc2UtanNcIixcIndpZGdldC13aW5kcm9zZS1qc1wiOlwid2lkZ2V0LXdpbmRyb3NlLWpzXCIsXCJ3aWRnZXQtY29tcGFzcy1qc1wiOlwid2lkZ2V0LWNvbXBhc3MtanNcIixcIndpZGdldC1nYXVnZS1qc1wiOlwid2lkZ2V0LWdhdWdlLWpzXCIsXCJ3aWRnZXQtcGFuZWwtanNcIjpcIndpZGdldC1wYW5lbC1qc1wiLFwid2lkZ2V0LXByb2dyZXNzYmFyLWpzXCI6XCJ3aWRnZXQtcHJvZ3Jlc3NiYXItanNcIixcIndpZGdldC10YWJsZS1qc1wiOlwid2lkZ2V0LXRhYmxlLWpzXCIsXCJ3aWRnZXQtdGhlcm1vbWV0ZXItanNcIjpcIndpZGdldC10aGVybW9tZXRlci1qc1wifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5jaHVuay5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyh0cnVlKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkgLndpZGdldCB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiU291cmNlIFNhbnMgUHJvXFxcIiwgaGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuLndpZGdldCB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgY29sb3I6ICMyMjI7XFxuICAgIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxufVxcblxcbi53aWRnZXQgaDEge1xcbiAgICBmb250LXNpemU6IDI4cHg7XFxufVxcblxcbi53aWRnZXQgaDIge1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxufVxcblxcbi53aWRnZXQgaDMge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi53aWRnZXQgLmZvb3Rub3RlIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBmb250LXNpemU6IDExcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICMyMjI7IFxcbn1cXG5cXG4ud2lkZ2V0IC5kYXRhIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIG1heC13aWR0aDogMzAwcHg7XFxufVxcblxcbi53aWRnZXQuY29tcGFzcyBzdmcsXFxuLndpZGdldC5nYXVnZSBzdmcge1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyB7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyB0aCB7XFxuICAgIHBhZGRpbmc6IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZXk7XFxufVxcblxcbi53aWRnZXQuc3RhdHVzIHRkIHtcXG4gICAgcGFkZGluZzogNHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XFxufVxcblxcbi53aWRnZXQuc3RhdHVzIHRkLm5vZGF0YSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XFxuICAgIGNvbG9yOiBkYXJrZ3JleTtcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXG59XFxuXFxuLndpZGdldC5zdGF0dXMgLnJlc3VsdF90aW1lIHtcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4ud2lkZ2V0LnBhbmVsIGRsIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXFxuLndpZGdldC5wYW5lbCBkZC5vdXRkYXRlZCB7XFxuICAgIGNvbG9yOiAjQUExMTExO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi53aWRnZXQucGFuZWwgZGQub3V0ZGF0ZWQgc3BhbiB7XFxuICAgIGZvbnQtc2l6ZTogOXB4O1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBoMiB7XFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgaDMge1xcbiAgICBmb250LXNpemU6IHgtc21hbGw7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgaDIsXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBoMyxcXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGRsLFxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgLmZvb3Rub3RlIHtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgZHQge1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgZGFya2dyYXk7XFxuICAgIGNsZWFyOiBsZWZ0O1xcbiAgICBmb250LXNpemU6IHgtc21hbGw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICAgIHBhZGRpbmctdG9wOiAycHg7XFxuICAgIGZsb2F0OiBub25lO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBkZCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gICAgcGFkZGluZy1ib3R0b206IDJweDtcXG59XFxuXFxuLndpZGdldC50YWJsZSB7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxufVxcblxcbi53aWRnZXQud2luZHJvc2Uge1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovL3NyYy9qcy9TZW5zb3JXaWRnZXRzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHFEQUFxRDtJQUNyRCxrQkFBa0I7SUFDbEIsU0FBUztBQUNiOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsY0FBYztJQUNkLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGdCQUFnQjtBQUNwQjs7QUFFQTs7SUFFSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSw0QkFBNEI7SUFDNUIsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7Ozs7SUFJSSxTQUFTO0FBQ2I7O0FBRUE7SUFDSSw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFdBQVc7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IC53aWRnZXQge1xcbiAgICBmb250LWZhbWlseTogXFxcIlNvdXJjZSBTYW5zIFByb1xcXCIsIGhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbi53aWRnZXQge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGNvbG9yOiAjMjIyO1xcbiAgICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4ud2lkZ2V0IGgxIHtcXG4gICAgZm9udC1zaXplOiAyOHB4O1xcbn1cXG5cXG4ud2lkZ2V0IGgyIHtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbn1cXG5cXG4ud2lkZ2V0IGgzIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4ud2lkZ2V0IC5mb290bm90ZSB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgZm9udC1zaXplOiAxMXB4O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjMjIyOyBcXG59XFxuXFxuLndpZGdldCAuZGF0YSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbn1cXG5cXG4ud2lkZ2V0LmNvbXBhc3Mgc3ZnLFxcbi53aWRnZXQuZ2F1Z2Ugc3ZnIHtcXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcXG59XFxuXFxuLndpZGdldC5zdGF0dXMge1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLndpZGdldC5zdGF0dXMgdGgge1xcbiAgICBwYWRkaW5nOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmV5O1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyB0ZCB7XFxuICAgIHBhZGRpbmc6IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xcbn1cXG5cXG4ud2lkZ2V0LnN0YXR1cyB0ZC5ub2RhdGEge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgICBjb2xvcjogZGFya2dyZXk7XFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxufVxcblxcbi53aWRnZXQuc3RhdHVzIC5yZXN1bHRfdGltZSB7XFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLndpZGdldC5wYW5lbCBkbCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbi53aWRnZXQucGFuZWwgZGQub3V0ZGF0ZWQge1xcbiAgICBjb2xvcjogI0FBMTExMTtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4ud2lkZ2V0LnBhbmVsIGRkLm91dGRhdGVkIHNwYW4ge1xcbiAgICBmb250LXNpemU6IDlweDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgaDIge1xcbiAgICBmb250LXNpemU6IHNtYWxsO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGgzIHtcXG4gICAgZm9udC1zaXplOiB4LXNtYWxsO1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGgyLFxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgaDMsXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCBkbCxcXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIC5mb290bm90ZSB7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuLndpZGdldC5tYXAgLmxlYWZsZXQtbGFiZWwgLndpZGdldC5wYW5lbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4ud2lkZ2V0Lm1hcCAubGVhZmxldC1sYWJlbCAud2lkZ2V0LnBhbmVsIGR0IHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGRhcmtncmF5O1xcbiAgICBjbGVhcjogbGVmdDtcXG4gICAgZm9udC1zaXplOiB4LXNtYWxsO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgICBwYWRkaW5nLXRvcDogMnB4O1xcbiAgICBmbG9hdDogbm9uZTtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi53aWRnZXQubWFwIC5sZWFmbGV0LWxhYmVsIC53aWRnZXQucGFuZWwgZGQge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBmb250LXNpemU6IHgtc21hbGw7XFxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICAgIHBhZGRpbmctYm90dG9tOiAycHg7XFxufVxcblxcbi53aWRnZXQudGFibGUge1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG4ud2lkZ2V0LndpbmRyb3NlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCIvKipcbiAqIEBhdXRob3IgT3NjYXIgRm9udHMgPG9zY2FyLmZvbnRzQGdlb21hdGkuY28+XG4gKi9cbmltcG9ydCBYTUwgZnJvbSAnLi9YTUwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgX3VybDogbnVsbCxcblxuICAgIHNldFVybDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICB9LFxuXG4gICAgZ2V0Q2FwYWJpbGl0aWVzOiBmdW5jdGlvbihjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcmVxdWVzdDogXCJHZXRDYXBhYmlsaXRpZXNcIixcbiAgICAgICAgICAgIHNlY3Rpb25zOiBbXCJDb250ZW50c1wiXVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NlbmQocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmNvbnRlbnRzKTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgZGVzY3JpYmVTZW5zb3I6IGZ1bmN0aW9uKHByb2NlZHVyZSwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiRGVzY3JpYmVTZW5zb3JcIixcbiAgICAgICAgICAgIHByb2NlZHVyZTogcHJvY2VkdXJlLFxuICAgICAgICAgICAgcHJvY2VkdXJlRGVzY3JpcHRpb25Gb3JtYXQ6IFwiaHR0cDovL3d3dy5vcGVuZ2lzLm5ldC9zZW5zb3JNTC8xLjAuMVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2VuZChyZXF1ZXN0LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgU2Vuc29yTUwgZGVzY3JpcHRpb24gdG8gYSBKU09OIG9iamVjdFxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcmVzcG9uc2UucHJvY2VkdXJlRGVzY3JpcHRpb24uaGFzT3duUHJvcGVydHkoXCJkZXNjcmlwdGlvblwiKSA/XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnByb2NlZHVyZURlc2NyaXB0aW9uLmRlc2NyaXB0aW9uIDogcmVzcG9uc2UucHJvY2VkdXJlRGVzY3JpcHRpb247XG4gICAgICAgICAgICB2YXIganNvbiA9IFhNTC5yZWFkKGRlc2NyaXB0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGpzb24uU2Vuc29yTUwubWVtYmVyKTtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgZ2V0RmVhdHVyZU9mSW50ZXJlc3Q6IGZ1bmN0aW9uKHByb2NlZHVyZSwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiR2V0RmVhdHVyZU9mSW50ZXJlc3RcIixcbiAgICAgICAgICAgIHByb2NlZHVyZTogcHJvY2VkdXJlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2VuZChyZXF1ZXN0LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UuZmVhdHVyZU9mSW50ZXJlc3QpO1xuICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBnZXREYXRhQXZhaWxhYmlsaXR5OiBmdW5jdGlvbihwcm9jZWR1cmUsIG9mZmVyaW5nLCBmZWF0dXJlcywgcHJvcGVydGllcywgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiR2V0RGF0YUF2YWlsYWJpbGl0eVwiXG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9jZWR1cmUpIHtcbiAgICAgICAgICAgIHJlcXVlc3QucHJvY2VkdXJlID0gcHJvY2VkdXJlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZlcmluZykge1xuICAgICAgICAgICAgcmVxdWVzdC5vZmZlcmluZyA9IG9mZmVyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZWF0dXJlcyAmJiBmZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuZmVhdHVyZU9mSW50ZXJlc3QgPSBmZWF0dXJlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVxdWVzdC5vYnNlcnZlZFByb3BlcnR5ID0gcHJvcGVydGllcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbmQocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlLmRhdGFBdmFpbGFiaWxpdHkpO1xuICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBnZXRPYnNlcnZhdGlvbjogZnVuY3Rpb24ob2ZmZXJpbmcsIGZlYXR1cmVzLCBwcm9wZXJ0aWVzLCB0aW1lLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgXCJyZXF1ZXN0XCI6IFwiR2V0T2JzZXJ2YXRpb25cIlxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZlcmluZykge1xuICAgICAgICAgICAgcmVxdWVzdC5vZmZlcmluZyA9IG9mZmVyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZlYXR1cmVzICYmIGZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVxdWVzdC5mZWF0dXJlT2ZJbnRlcmVzdCA9IGZlYXR1cmVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qub2JzZXJ2ZWRQcm9wZXJ0eSA9IHByb3BlcnRpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgICAgdmFyIG9wZXJhdGlvbjtcbiAgICAgICAgICAgIGlmICh0aW1lLmxlbmd0aCAmJiB0aW1lLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gVGltZSBSYW5nZVxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IFwiZHVyaW5nXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRpbWUgSW5zdGFudFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IFwiZXF1YWxzXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZmlsdGVyID0ge307XG4gICAgICAgICAgICBmaWx0ZXJbb3BlcmF0aW9uXSA9IHtcbiAgICAgICAgICAgICAgICBcInJlZlwiOiBcIm9tOnJlc3VsdFRpbWVcIixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRpbWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0LnRlbXBvcmFsRmlsdGVyID0gW2ZpbHRlcl07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZW5kKHJlcXVlc3QsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZS5vYnNlcnZhdGlvbnMpO1xuICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBfc2VuZDogZnVuY3Rpb24ocmVxdWVzdCwgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgICAgIHJlcXVlc3Quc2VydmljZSA9IFwiU09TXCI7XG4gICAgICAgIHJlcXVlc3QudmVyc2lvbiA9IFwiMi4wLjBcIjtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPSywgbm90IEpTT05cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcy5jYWxsKHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMuX3VybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yLmNhbGwodGhpcywgZS5zdGF0dXMsIGUudXJsLCBlLnJlcXVlc3QsIGUucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XG4gICAgfVxufTsiLCJpbXBvcnQgaTE4biBmcm9tICcuL2kxOG4nO1xuaW1wb3J0ICcuL1NlbnNvcldpZGdldHMuY3NzJztcblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYy5yZXBsYWNlKC9bXlxcL10qJC8sICcnKTtcblxudmFyIGluc3RhbmNlcyA9IHt9O1xudmFyIHVpZCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICdTZW5zb3JXaWRnZXRUYXJnZXQtJyArICgrK2kpO1xuICAgIH07XG59KDApO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCBjb25maWcsIHJlbmRlclRvKSB7XG4gICAgaWYgKCFyZW5kZXJUbykge1xuICAgICAgICByZW5kZXJUbyA9IGRvY3VtZW50LmJvZHk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKG1lc3NhZ2UsIHVybCwgcmVxdWVzdCkge1xuICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICAgIGlmICh1cmwpe1xuICAgICAgICAgICAgdGV4dCA9IFwiW1wiICsgdXJsICsgXCJdIFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QucmVxdWVzdCkge1xuICAgICAgICAgICAgdGV4dCArPSByZXF1ZXN0LnJlcXVlc3QgKyBcIjogXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRleHQgKz0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJUby5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cInRleHQtZGFuZ2VyXCI+JyArIHRleHQgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0NvbmZpZyhuYW1lLCBpbnB1dHMsIGNvbmZpZykge1xuICAgICAgICB2YXIgbWlzc2luZyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gaW5wdXRzKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBpbnB1dHNbaV07XG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eShpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBtaXNzaW5nLnB1c2goaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgZXJyb3JIYW5kbGVyKGkxOG4udChcIlRoZSAne25hbWV9JyB3aWRnZXQgaXMgbWlzc2luZyBzb21lIG1hbmRhdG9yeSBwYXJhbWV0ZXJzOiBcIiwge25hbWU6IG5hbWV9KSArIG1pc3Npbmcuam9pbihcIiwgXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIW1pc3NpbmcubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChuYW1lICYmIGNvbmZpZykge1xuICAgICAgICBpZighcmVuZGVyVG8uaWQpIHJlbmRlclRvLmlkID0gdWlkKCk7XG5cbiAgICAgICAgaWYgKCFjb25maWcuc2VydmljZSkge1xuICAgICAgICAgICAgY29uZmlnLnNlcnZpY2UgPSAnLzUybi1zb3Mvc29zL2pzb24nO1xuICAgICAgICB9XG5cbiAgICAgICAgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwid2lkZ2V0LVtyZXF1ZXN0XVwiICovIGAuL3dpZGdldC8ke25hbWV9LmpzYClcbiAgICAgICAgICAgIC50aGVuKCh7ZGVmYXVsdDogd2lkZ2V0fSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlbmRlclRvLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShyZW5kZXJUby5pZCkgJiYgaW5zdGFuY2VzW3JlbmRlclRvLmlkXSAmJiBpbnN0YW5jZXNbcmVuZGVyVG8uaWRdLmhhc093blByb3BlcnR5KFwiZGVzdHJveVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiRGVzdHJveWluZyBwcmV2aW91cyB3aWRnZXQgb24gRWxlbWVudElkPVwiICsgcmVuZGVyVG8uaWQpO1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXNbcmVuZGVyVG8uaWRdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGluc3RhbmNlc1tyZW5kZXJUby5pZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGVja0NvbmZpZyhuYW1lLCB3aWRnZXQuaW5wdXRzLCBjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJDcmVhdGluZyBuZXcgXCIgKyBuYW1lICsgXCIgd2lkZ2V0IG9uIEVsZW1lbnRJZD1cIiArIHJlbmRlclRvLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzW3JlbmRlclRvLmlkXSA9IHdpZGdldC5pbml0KGNvbmZpZywgcmVuZGVyVG8sIGVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goY2F1c2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2F1c2UpO1xuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcihpMThuLnQoXCJXaWRnZXQgJ3tuYW1lfScgY2Fubm90IGJlIGZvdW5kLCBvciB0aGVyZSB3YXMgYW4gZXJyb3IgaW5zdGFudGlhdGluZyBpdFwiLCB7bmFtZTogbmFtZX0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIW5hbWUpIHtcbiAgICAgICAgZXJyb3JIYW5kbGVyKGkxOG4udChcIk5vIHdpZGdldCBuYW1lIHNwZWNpZmllZFwiKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZW5kZXJUbzogcmVuZGVyVG8sXG4gICAgICAgIGluc3BlY3Q6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJ3aWRnZXQtW3JlcXVlc3RdXCIgKi8gYC4vd2lkZ2V0LyR7bmFtZX0uanNgKVxuICAgICAgICAgICAgICAgIC50aGVuKCh7ZGVmYXVsdDogd2lkZ2V0fSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5jYWxsKHRoaXMsIHdpZGdldC5pbnB1dHMsIHdpZGdldC5vcHRpb25hbF9pbnB1dHMsIHdpZGdldC5wcmVmZXJyZWRTaXplcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbFBhdGhUb0FicyhwYXRobmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgICAgICAgICAgICBwYXRobmFtZS5yZXBsYWNlKC9eKFxcLlxcLj8oXFwvfCQpKSsvLCBcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLyhcXC4oXFwvfCQpKSsvZywgXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvXFwuXFwuJC8sIFwiLy4uL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLz9bXlxcL10qL2csIGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwID09PSBcIi8uLlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcIikucmVwbGFjZSgvXlxcLy8sIHBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gXCIvXCIgPyBcIi9cIiA6IFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHVybCA9IHJlbFBhdGhUb0FicyhcIi4uL3dpZGdldC9cIikgKyBcIj9cIjtcbiAgICAgICAgICAgIHVybCArPSBcIm5hbWU9XCIrIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKStcIiZcIjtcbiAgICAgICAgICAgIHVybCArPSBPYmplY3Qua2V5cyhjb25maWcpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gY29uZmlnW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWdba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKTtcbiAgICAgICAgICAgIH0pLmpvaW4oXCImXCIpO1xuICAgICAgICAgICAgdXJsICs9IFwiJmxhbmc9XCIraTE4bi5nZXRMYW5nKCk7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9LFxuICAgICAgICBpZnJhbWU6IGZ1bmN0aW9uKHcsIGgpIHtcbiAgICAgICAgICAgIHcgPSB3ID8gdyA6IFwiMTAwJVwiO1xuICAgICAgICAgICAgaCA9IGggPyBoIDogXCIxMDAlXCI7XG4gICAgICAgICAgICByZXR1cm4gJzxpZnJhbWUgc3JjPVwiJyt0aGlzLnVybCgpKydcIiB3aWR0aD1cIicrdysnXCIgaGVpZ2h0PVwiJytoKydcIiBmcmFtZUJvcmRlcj1cIjBcIj48L2lmcmFtZT4nO1xuICAgICAgICB9LFxuICAgICAgICBqYXZhc2NyaXB0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlNlbnNvcldpZGdldCgnXCIrbmFtZStcIicsIFwiICsgSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAzKSArIFwiLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnXCIrbmFtZStcIi1jb250YWluZXInKSk7XCI7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9TZW5zb3JXaWRnZXRzLmNzc1wiKTtcblxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgfVxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307IiwiLyogVGhpcyB3b3JrIGlzIGxpY2Vuc2VkIHVuZGVyIENyZWF0aXZlIENvbW1vbnMgR05VIExHUEwgTGljZW5zZS5cblxuIExpY2Vuc2U6IGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL0xHUEwvMi4xL1xuIFZlcnNpb246IDAuOVxuIEF1dGhvcjogIFN0ZWZhbiBHb2Vzc25lci8yMDA2XG4gU2VlOiAgICAgaHR0cDovL2dvZXNzbmVyLm5ldC9kb3dubG9hZC9wcmovanNvbnhtbC9cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIHJlYWQ6IGZ1bmN0aW9uKHhtbCwgY2xlYW4pIHtcbiAgICAgICAgdmFyIFggPSB7XG4gICAgICAgICAgICBhdDogKGNsZWFuID8gXCJcIiA6IFwiQFwiKSxcblxuICAgICAgICAgICAgdG9PYmo6IGZ1bmN0aW9uKHhtbCkge1xuICAgICAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICAgICAgaWYgKHhtbC5ub2RlVHlwZSA9PSAxKSB7IC8vIGVsZW1lbnQgbm9kZVxuICAgICAgICAgICAgICAgICAgICBpZiAoeG1sLmF0dHJpYnV0ZXMubGVuZ3RoKSB7IC8vIGVsZW1lbnQgd2l0aCBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhtbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB4bWwuYXR0cmlidXRlc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHhtbC5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc19ucyA9IG5hbWUubGFzdEluZGV4T2YoXCJ4bWxuczpcIiwgMCkgPT09IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2xlYW4gJiYgaXNfbnMpKSB7IC8vIEhpZGUgeG1sbnMgYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW1guYXQgKyBuYW1lXSA9ICh2YWx1ZSB8fCBcIlwiKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoeG1sLmZpcnN0Q2hpbGQpIHsgLy8gZWxlbWVudCBoYXMgY2hpbGQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0Q2hpbGQgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNkYXRhQ2hpbGQgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0VsZW1lbnRDaGlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IHhtbC5maXJzdENoaWxkOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuLm5vZGVUeXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRWxlbWVudENoaWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZVR5cGUgPT0gMyAmJiBuLm5vZGVWYWx1ZS5tYXRjaCgvW14gXFxmXFxuXFxyXFx0XFx2XS8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDaGlsZCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub24td2hpdGVzcGFjZSB0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLm5vZGVUeXBlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2RhdGFDaGlsZCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjZGF0YSBzZWN0aW9uIG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzRWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRDaGlsZCA8IDIgJiYgY2RhdGFDaGlsZCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RydWN0dXJlZCBlbGVtZW50IHdpdGggZXZ0bC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBzaW5nbGUgdGV4dCBvci9hbmQgY2RhdGEgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBYLnJlbW92ZVdoaXRlKHhtbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobiA9IHhtbC5maXJzdENoaWxkOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4ubm9kZVR5cGUgPT0gMykgeyAvLyB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW1wiI3RleHRcIl0gPSBYLmVzY2FwZShuLm5vZGVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4ubm9kZVR5cGUgPT0gNCkgeyAvLyBjZGF0YSBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tcIiNjZGF0YVwiXSA9IFguZXNjYXBlKG4ubm9kZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob1tuLm5vZGVOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11bHRpcGxlIG9jY3VyZW5jZSBvZiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9bbi5ub2RlTmFtZV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW24ubm9kZU5hbWVdW29bbi5ub2RlTmFtZV0ubGVuZ3RoXSA9IFgudG9PYmoobik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tuLm5vZGVOYW1lXSA9IFtvW24ubm9kZU5hbWVdLCBYLnRvT2JqKG4pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBmaXJzdCBvY2N1cmVuY2Ugb2YgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bbi5ub2RlTmFtZV0gPSBYLnRvT2JqKG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbWl4ZWQgY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXhtbC5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9IFguZXNjYXBlKFguaW5uZXJYbWwoeG1sKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW1wiI3RleHRcIl0gPSBYLmVzY2FwZShYLmlubmVyWG1sKHhtbCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXh0Q2hpbGQpIHsgLy8gcHVyZSB0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF4bWwuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9IFguZXNjYXBlKFguaW5uZXJYbWwoeG1sKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1tcIiN0ZXh0XCJdID0gWC5lc2NhcGUoWC5pbm5lclhtbCh4bWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNkYXRhQ2hpbGQpIHsgLy8gY2RhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2RhdGFDaGlsZCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9IFguZXNjYXBlKFguaW5uZXJYbWwoeG1sKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChuID0geG1sLmZpcnN0Q2hpbGQ7IG47IG4gPSBuLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW1wiI2NkYXRhXCJdID0gWC5lc2NhcGUobi5ub2RlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgheG1sLmF0dHJpYnV0ZXMubGVuZ3RoICYmICF4bWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHhtbC5ub2RlVHlwZSA9PSA5KSB7IC8vIGRvY3VtZW50Lm5vZGVcbiAgICAgICAgICAgICAgICAgICAgbyA9IFgudG9PYmooeG1sLmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh4bWwubm9kZVR5cGUgPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geG1sLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgY29tbWVudFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1bmhhbmRsZWQgbm9kZSB0eXBlOiBcIiArIHhtbC5ub2RlVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpbm5lclhtbDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoXCJpbm5lckhUTUxcIiBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSBub2RlLmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXNYbWwgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5ub2RlVHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIjxcIiArIG4ubm9kZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBuLmF0dHJpYnV0ZXNbaV0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gbi5hdHRyaWJ1dGVzW2ldLnZhbHVlIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgXCIgKyBuYW1lICsgXCI9XFxcIlwiICsgdmFsdWUudG9TdHJpbmcoKSArIFwiXFxcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobi5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCI+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSBuLmZpcnN0Q2hpbGQ7IGM7IGMgPSBjLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IGFzWG1sKGMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCI8L1wiICsgbi5ub2RlTmFtZSArIFwiPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIvPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5ub2RlVHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBuLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5ub2RlVHlwZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIjwhW0NEQVRBW1wiICsgbi5ub2RlVmFsdWUgKyBcIl1dPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IG5vZGUuZmlyc3RDaGlsZDsgYzsgYyA9IGMubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gYXNYbWwoYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlc2NhcGU6IGZ1bmN0aW9uKHR4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eHQucmVwbGFjZSgvW1xcXFxdL2csIFwiXFxcXFxcXFxcIikucmVwbGFjZSgvW1xcXCJdL2csICdcXFxcXCInKS5yZXBsYWNlKC9bXFxuXS9nLCAnXFxcXG4nKS5yZXBsYWNlKC9bXFxyXS9nLCAnXFxcXHInKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZVdoaXRlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuID0gZS5maXJzdENoaWxkOyBuOykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobi5ub2RlVHlwZSA9PSAzKSB7IC8vIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuLm5vZGVWYWx1ZS5tYXRjaCgvW14gXFxmXFxuXFxyXFx0XFx2XS8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVyZSB3aGl0ZXNwYWNlIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBueHQgPSBuLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucmVtb3ZlQ2hpbGQobik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IG54dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IG4ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobi5ub2RlVHlwZSA9PSAxKSB7IC8vIGVsZW1lbnQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgWC5yZW1vdmVXaGl0ZShuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBuLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBhbnkgb3RoZXIgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IG4ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3RyaXAgbmFtZXNwYWNlcyBmcm9tIFhNTCB0YWdzXG4gICAgICAgIGlmIChjbGVhbikge1xuICAgICAgICAgICAgeG1sID0geG1sLnJlcGxhY2UoLzwoXFwvPykoW146Plxcc10qOik/KFtePl0rKT4vZywgXCI8JDEkMz5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb252ZXJ0IHRvIGFuIFhNTCBET00gRG9jdW1lbnRcbiAgICAgICAgeG1sID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHhtbCwgXCJ0ZXh0L3htbFwiKTtcblxuICAgICAgICAvLyBTdGFydCBmcm9tIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50XG4gICAgICAgIGlmICh4bWwubm9kZVR5cGUgPT0gOSkge1xuICAgICAgICAgICAgeG1sID0geG1sLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgcmV0W3htbC5ub2RlTmFtZV0gPSBYLnRvT2JqKFgucmVtb3ZlV2hpdGUoeG1sKSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHdyaXRlOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgdmFyIHRvWG1sID0gZnVuY3Rpb24odiwgbmFtZSwgaW5kKSB7XG4gICAgICAgICAgICB2YXIgeG1sID0gXCJcIjtcbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHYubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHhtbCArPSBpbmQgKyB0b1htbCh2W2ldLCBuYW1lLCBpbmQgKyBcIlxcdFwiKSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YodikgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHZhciBoYXNDaGlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHhtbCArPSBpbmQgKyBcIjxcIiArIG5hbWU7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSBpbiB2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtLmNoYXJBdCgwKSA9PSBcIkBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgeG1sICs9IFwiIFwiICsgbS5zdWJzdHIoMSkgKyBcIj1cXFwiXCIgKyB2W21dLnRvU3RyaW5nKCkgKyBcIlxcXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NoaWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB4bWwgKz0gaGFzQ2hpbGQgPyBcIj5cIiA6IFwiLz5cIjtcbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChtIGluIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtID09IFwiI3RleHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbCArPSB2W21dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtID09IFwiI2NkYXRhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWwgKz0gXCI8IVtDREFUQVtcIiArIHZbbV0gKyBcIl1dPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtLmNoYXJBdCgwKSAhPSBcIkBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbCArPSB0b1htbCh2W21dLCBtLCBpbmQgKyBcIlxcdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB4bWwgKz0gKHhtbC5jaGFyQXQoeG1sLmxlbmd0aCAtIDEpID09IFwiXFxuXCIgPyBpbmQgOiBcIlwiKSArIFwiPC9cIiArIG5hbWUgKyBcIj5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHhtbCArPSBpbmQgKyBcIjxcIiArIG5hbWUgKyBcIj5cIiArIHYudG9TdHJpbmcoKSArIFwiPC9cIiArIG5hbWUgKyBcIj5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4bWw7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHhtbCA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICB4bWwgKz0gdG9YbWwob2JqZWN0W2ldLCBpLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geG1sO1xuICAgIH1cbn07IiwiLyoqXG4gKiBAYXV0aG9yIE9zY2FyIEZvbnRzIDxvc2Nhci5mb250c0BnZW9tYXRpLmNvPlxuICovXG5pbXBvcnQgdHJhbnNsYXRpb25zIGZyb20gJy4vdHJhbnNsYXRpb25zLmpzb24nO1xuXG52YXIgcGFyYW1zID0ge307XG5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KFwiJlwiKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB2YXIga3YgPSBpdGVtLnNwbGl0KFwiPVwiKTtcbiAgICBwYXJhbXNba3ZbMF1dID0ga3ZbMV07XG59KTtcblxudmFyIGFjdGl2ZUxhbmc7XG5zZXRMYW5nKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnbGFuZycpID8gcGFyYW1zLmxhbmcgOiAnZW4nKTtcblxuZnVuY3Rpb24gc2V0TGFuZyhsYW5nKSB7XG4gICAgYWN0aXZlTGFuZyA9IGxhbmc7XG4gICAgY29uc29sZS5kZWJ1ZygnTGFuZ3VhZ2Ugc2V0IHRvICcgKyBhY3RpdmVMYW5nKTtcbn1cblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nLCB2YWx1ZXMpe1xuICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZXMpXG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAoJ3snK2tleSsnfScsJ2cnKSwgdmFsdWVzW2tleV0pO1xuICAgIHJldHVybiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHQoc3RyaW5nLCB2YWx1ZXMpIHtcbiAgICBpZiAodHJhbnNsYXRpb25zLmhhc093blByb3BlcnR5KHN0cmluZykgJiYgdHJhbnNsYXRpb25zW3N0cmluZ10uaGFzT3duUHJvcGVydHkoYWN0aXZlTGFuZykpIHtcbiAgICAgICAgc3RyaW5nID0gdHJhbnNsYXRpb25zW3N0cmluZ11bYWN0aXZlTGFuZ107XG4gICAgfVxuICAgIHJldHVybiB0ZW1wbGF0ZShzdHJpbmcsIHZhbHVlcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsYW5nczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbnMubGFuZ3M7XG4gICAgfSxcbiAgICBnZXRMYW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUxhbmc7XG4gICAgfSxcbiAgICBzZXRMYW5nOiBzZXRMYW5nLFxuICAgIHQ6IHQsXG4gICAgYWRkVHJhbnNsYXRpb25zOiBmdW5jdGlvbihidW5kbGUpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYnVuZGxlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgaWYgKCF0cmFuc2xhdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uc1trZXldID0gYnVuZGxlW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlNraXBwaW5nIGR1cGxpY2F0ZSBlbnRyeSAnXCIgKyBrZXkgKyBcIicgaW4gdHJhbnNsYXRpb24gYnVuZGxlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB0cmFuc2xhdGVEb2NUcmVlOiBmdW5jdGlvbihlbCkge1xuICAgICAgICBpZiAoIWVsKSBlbCA9IGRvY3VtZW50O1xuICAgICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZWwsIE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsLCBmYWxzZSk7XG4gICAgICAgIHdoaWxlICh0cmVlV2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdHJlZVdhbGtlci5jdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmKC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB7IC8vIE5vdCBhIHdoaXRlc3BhY2Utb25seSB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IHQobm9kZS5ub2RlVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsImltcG9ydCBTZW5zb3JXaWRnZXQgZnJvbSAnLi9TZW5zb3JXaWRnZXQuanMnO1xuaW1wb3J0IHNvcyBmcm9tICcuL1NPUy5qcyc7XG5cbi8vICdMZWFrJyBTZW5zb3JXaWRnZXQgdG8gZ2xvYmFsIHNjb3BlLlxud2luZG93LlNlbnNvcldpZGdldCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgU2Vuc29yV2lkZ2V0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbn07XG5cbi8vIEV4cG9zZSBTT1MgYXMgd2VsbC5cbndpbmRvdy5nZXRTT1MgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKHNvcyk7XG59O1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2NvbXBhc3MuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L2NvbXBhc3MuanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzXCJcblx0XSxcblx0XCIuL2dhdWdlLmpzXCI6IFtcblx0XHRcIi4vc3JjL2pzL3dpZGdldC9nYXVnZS5qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LWdhdWdlLWpzXCJcblx0XSxcblx0XCIuL2pxZ3JpZC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvanFncmlkLmpzXCIsXG5cdFx0XCJ2ZW5kb3JzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LXRpbWVjaGFydC1qc1wiLFxuXHRcdFwidmVuZG9yc353aWRnZXQtanFncmlkLWpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtanFncmlkLWpzXCJcblx0XSxcblx0XCIuL21hcC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvbWFwLmpzXCIsXG5cdFx0XCJ2ZW5kb3JzfndpZGdldC1tYXAtanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC1tYXAtanNcIlxuXHRdLFxuXHRcIi4vcGFuZWwuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L3BhbmVsLmpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtcGFuZWwtanNcIlxuXHRdLFxuXHRcIi4vcHJvZ3Jlc3NiYXIuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L3Byb2dyZXNzYmFyLmpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtcHJvZ3Jlc3NiYXItanNcIlxuXHRdLFxuXHRcIi4vc3RhdHVzLmpzXCI6IFtcblx0XHRcIi4vc3JjL2pzL3dpZGdldC9zdGF0dXMuanNcIixcblx0XHRcInZlbmRvcnN+d2lkZ2V0LXN0YXR1cy1qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LXN0YXR1cy1qc1wiXG5cdF0sXG5cdFwiLi90YWJsZS5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvdGFibGUuanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC10YWJsZS1qc1wiXG5cdF0sXG5cdFwiLi90aGVybW9tZXRlci5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvdGhlcm1vbWV0ZXIuanNcIixcblx0XHRcIndpZGdldC1jb21wYXNzLWpzfndpZGdldC1nYXVnZS1qc353aWRnZXQtanFncmlkLWpzfndpZGdldC1tYXAtanN+d2lkZ2V0LXBhbmVsLWpzfndpZGdldC1wcm9ncmVzc2Jhci1+YmM1NjZlMzZcIixcblx0XHRcIndpZGdldC10aGVybW9tZXRlci1qc1wiXG5cdF0sXG5cdFwiLi90aW1lY2hhcnQuanNcIjogW1xuXHRcdFwiLi9zcmMvanMvd2lkZ2V0L3RpbWVjaGFydC5qc1wiLFxuXHRcdFwidmVuZG9yc353aWRnZXQtanFncmlkLWpzfndpZGdldC10aW1lY2hhcnQtanNcIixcblx0XHRcInZlbmRvcnN+d2lkZ2V0LXRpbWVjaGFydC1qc1wiLFxuXHRcdFwid2lkZ2V0LWNvbXBhc3MtanN+d2lkZ2V0LWdhdWdlLWpzfndpZGdldC1qcWdyaWQtanN+d2lkZ2V0LW1hcC1qc353aWRnZXQtcGFuZWwtanN+d2lkZ2V0LXByb2dyZXNzYmFyLX5iYzU2NmUzNlwiLFxuXHRcdFwid2lkZ2V0LXRpbWVjaGFydC1qc1wiXG5cdF0sXG5cdFwiLi93aW5kcm9zZS5qc1wiOiBbXG5cdFx0XCIuL3NyYy9qcy93aWRnZXQvd2luZHJvc2UuanNcIixcblx0XHRcInZlbmRvcnN+d2lkZ2V0LXdpbmRyb3NlLWpzXCIsXG5cdFx0XCJ3aWRnZXQtY29tcGFzcy1qc353aWRnZXQtZ2F1Z2UtanN+d2lkZ2V0LWpxZ3JpZC1qc353aWRnZXQtbWFwLWpzfndpZGdldC1wYW5lbC1qc353aWRnZXQtcHJvZ3Jlc3NiYXItfmJjNTY2ZTM2XCIsXG5cdFx0XCJ3aWRnZXQtd2luZHJvc2UtanNcIlxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHRcdHRocm93IGU7XG5cdFx0fSk7XG5cdH1cblxuXHR2YXIgaWRzID0gbWFwW3JlcV0sIGlkID0gaWRzWzBdO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoaWRzLnNsaWNlKDEpLm1hcChfX3dlYnBhY2tfcmVxdWlyZV9fLmUpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcblx0fSk7XG59XG53ZWJwYWNrQXN5bmNDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0FzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMvanMvd2lkZ2V0IGxhenkgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLipcXFxcLmpzJFwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQXN5bmNDb250ZXh0OyJdLCJzb3VyY2VSb290IjoiIn0=