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
/******/ 		return __webpack_require__.p + "" + ({"vendors~widget-jqgrid-js~widget-timechart-js":"vendors~widget-jqgrid-js~widget-timechart-js","vendors~widget-timechart-js":"vendors~widget-timechart-js","widget-timechart-js":"widget-timechart-js","widget-jqgrid-js":"widget-jqgrid-js","vendors~widget-map-js":"vendors~widget-map-js","widget-map-js":"widget-map-js","vendors~widget-status-js":"vendors~widget-status-js","widget-status-js":"widget-status-js","vendors~widget-windrose-js":"vendors~widget-windrose-js","widget-windrose-js":"widget-windrose-js","widget-compass-js":"widget-compass-js","widget-gauge-js":"widget-gauge-js","widget-panel-js":"widget-panel-js","widget-progressbar-js":"widget-progressbar-js","widget-table-js":"widget-table-js","widget-thermometer-js":"widget-thermometer-js"}[chunkId]||chunkId) + ".chunk.js"
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"body .widget {\\n    font-family: \\\"Source Sans Pro\\\", helvetica, sans-serif;\\n    text-align: center;\\n    margin: 0;\\n}\\n\\n.widget {\\n    height: 100%;\\n    overflow: hidden;\\n    color: #222;\\n    font-family: Helvetica, sans-serif;\\n}\\n\\n.widget h1 {\\n    font-size: 28px;\\n}\\n\\n.widget h2 {\\n    font-size: 18px;\\n}\\n\\n.widget h3 {\\n    font-size: 14px;\\n}\\n\\n.widget .footnote {\\n    margin: 10px;\\n    font-size: 11px;\\n    font-weight: bold;\\n    display: block;\\n    color: #222; \\n}\\n\\n.widget .data {\\n    display: inline-block;\\n    vertical-align: top;\\n    margin: 10px;\\n    max-width: 300px;\\n}\\n\\n.widget.compass svg,\\n.widget.gauge svg {\\n    max-width: 300px;\\n}\\n\\n.widget.status {\\n    overflow: auto;\\n}\\n\\n.widget.status th {\\n    padding: 4px;\\n    background-color: darkgrey;\\n}\\n\\n.widget.status td {\\n    padding: 4px;\\n    background-color: lightgrey;\\n}\\n\\n.widget.status td.nodata {\\n    background-color: whitesmoke;\\n    color: darkgrey;\\n    font-size: small;\\n}\\n\\n.widget.status .result_time {\\n    font-size: small;\\n    font-style: italic;\\n}\\n\\n.widget.panel dl {\\n    text-align: left;\\n}\\n\\n.widget.panel dd.outdated {\\n    color: #AA1111;\\n    font-style: italic;\\n}\\n\\n.widget.panel dd.outdated span {\\n    font-size: 9px;\\n    display: block;\\n}\\n\\n.widget.map .leaflet-label .widget.panel h2 {\\n    font-size: small;\\n}\\n\\n.widget.map .leaflet-label .widget.panel h3 {\\n    font-size: x-small;\\n}\\n\\n.widget.map .leaflet-label .widget.panel h2,\\n.widget.map .leaflet-label .widget.panel h3,\\n.widget.map .leaflet-label .widget.panel dl,\\n.widget.map .leaflet-label .widget.panel .footnote {\\n    margin: 0;\\n}\\n\\n.widget.map .leaflet-label .widget.panel {\\n    background-color: transparent;\\n}\\n\\n.widget.map .leaflet-label .widget.panel dt {\\n    border-top: 1px solid darkgray;\\n    clear: left;\\n    font-size: x-small;\\n    font-weight: normal;\\n    line-height: normal;\\n    padding-top: 2px;\\n    float: none;\\n    text-align: left;\\n    width: 100%;\\n}\\n\\n.widget.map .leaflet-label .widget.panel dd {\\n    margin: 0;\\n    text-align: right;\\n    font-size: x-small;\\n    line-height: normal;\\n    padding-bottom: 2px;\\n}\\n\\n.widget.table {\\n    overflow: auto;\\n    font-size: 12px;\\n}\\n\\n.widget.windrose {\\n    width: 100%;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/js/SensorWidgets.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/js/SOS.js":
/*!***********************!*\
  !*** ./src/js/SOS.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author Oscar Fonts <oscar.fonts@geomati.co>\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./XML */ \"./src/js/XML.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(XML) {\n    \"use strict\";\n\n    var SOS = {\n        _url: null,\n\n        setUrl: function(url) {\n            this._url = url;\n        },\n\n        getCapabilities: function(callback, errorHandler) {\n            var request = {\n                request: \"GetCapabilities\",\n                sections: [\"Contents\"]\n            };\n\n            this._send(request, function(response) {\n                callback(response.contents);\n            }, errorHandler);\n        },\n\n        describeSensor: function(procedure, callback, errorHandler) {\n            var request = {\n                request: \"DescribeSensor\",\n                procedure: procedure,\n                procedureDescriptionFormat: \"http://www.opengis.net/sensorML/1.0.1\"\n            };\n\n            this._send(request, function(response) {\n                // Convert the SensorML description to a JSON object\n                var description = response.procedureDescription.hasOwnProperty(\"description\") ?\n                        response.procedureDescription.description : response.procedureDescription;\n                var json = XML.read(description, true);\n                callback(json.SensorML.member);\n            }, errorHandler);\n        },\n\n        getFeatureOfInterest: function(procedure, callback, errorHandler) {\n            var request = {\n                request: \"GetFeatureOfInterest\",\n                procedure: procedure\n            };\n\n            this._send(request, function(response) {\n                callback(response.featureOfInterest);\n            }, errorHandler);\n        },\n\n        getDataAvailability: function(procedure, offering, features, properties, callback, errorHandler) {\n            var request = {\n                request: \"GetDataAvailability\"\n            };\n            if (procedure) {\n                request.procedure = procedure;\n            }\n            if (offering) {\n                request.offering = offering;\n            }\n            if (features && features.length) {\n                request.featureOfInterest = features;\n            }\n            if (properties && properties.length) {\n                request.observedProperty = properties;\n            }\n\n            this._send(request, function(response) {\n                callback(response.dataAvailability);\n            }, errorHandler);\n        },\n\n        getObservation: function(offering, features, properties, time, callback, errorHandler) {\n            var request = {\n                \"request\": \"GetObservation\"\n            };\n\n            if (offering) {\n                request.offering = offering;\n            }\n\n            if (features && features.length) {\n                request.featureOfInterest = features;\n            }\n\n            if (properties && properties.length) {\n                request.observedProperty = properties;\n            }\n\n            if (time) {\n                var operation;\n                if (time.length && time.length == 2) {\n                    // Time Range\n                    operation = \"during\";\n                } else {\n                    // Time Instant\n                    operation = \"equals\";\n                }\n                var filter = {};\n                filter[operation] = {\n                    \"ref\": \"om:resultTime\",\n                    \"value\": time\n                };\n                request.temporalFilter = [filter];\n            }\n\n            this._send(request, function(response) {\n                callback(response.observations);\n            }, errorHandler);\n        },\n\n        _send: function(request, onSuccess, onError) {\n            request.service = \"SOS\";\n            request.version = \"2.0.0\";\n\n            var xhr = new XMLHttpRequest();\n\n            xhr.onreadystatechange = function() {\n                if (xhr.readyState == 4) {\n                    var response = xhr.responseText;\n                    try {\n                        response = JSON.parse(response);\n                    } catch (e) {\n                        // OK, not JSON\n                    }\n                    if (xhr.status == 200) {\n                        onSuccess.call(this, response);\n                    } else {\n                        var e = {\n                            status: xhr.statusText,\n                            url: this._url,\n                            request: request,\n                            response: response\n                        };\n                        console.log(e);\n                        if (onError) {\n                            onError.call(this, e.status, e.url, e.request, e.response);\n                        }\n                    }\n                }\n            }.bind(this);\n\n            xhr.open(\"POST\", this._url, true);\n            xhr.setRequestHeader(\"Content-Type\", \"application/json\");\n            xhr.setRequestHeader(\"Accept\", \"application/json\");\n            xhr.send(JSON.stringify(request));\n        }\n    };\n\n    return SOS;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./src/js/SOS.js?");

/***/ }),

/***/ "./src/js/SensorWidget.js":
/*!********************************!*\
  !*** ./src/js/SensorWidget.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./i18n */ \"./src/js/i18n.js\");\n/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_i18n__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SensorWidgets.css */ \"./src/js/SensorWidgets.css\");\n/* harmony import */ var _SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SensorWidgets_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\"use strict\";\n\nvar instances = {};\nvar uid = function (i) {\n    return function () {\n        return 'SensorWidgetTarget-' + (++i);\n    };\n}(0);\n\nfunction indent(str, spaces) {\n    return str.replace(/^(?=.)/gm, new Array(spaces + 1).join(' '));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(name, config, renderTo) {\n    if (!renderTo) {\n        renderTo = document.body;\n    }\n\n    function errorHandler(message, url, request) {\n        var text = \"\";\n        if (url){\n            text = \"[\" + url + \"] \";\n        }\n        if (request && request.request) {\n            text += request.request + \": \";\n        }\n        if (message) {\n            text += message;\n        }\n        renderTo.innerHTML = '<div class=\"text-danger\">' + text + '</div>';\n    }\n\n    function checkConfig(name, inputs, config) {\n        var missing = [];\n\n        for (var i in inputs) {\n            var input = inputs[i];\n            if (!config.hasOwnProperty(input)) {\n                missing.push(input);\n            }\n        }\n        if (missing.length) {\n            errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0___default.a.t(\"The '{name}' widget is missing some mandatory parameters: \", {name: name}) + missing.join(\", \"));\n        }\n        return !missing.length;\n    }\n\n    if (name && config) {\n        if(!renderTo.id) renderTo.id = uid();\n\n        if (!config.service) {\n            config.service = '/52n-sos/sos/json';\n        }\n\n        __webpack_require__(\"./src/js/widget lazy recursive ^\\\\.\\\\/.*\\\\.js$\")(`./${name}.js`)\n            .then(({default: widget}) => {\n                renderTo.innerHTML = \"\";\n                if (instances.hasOwnProperty(renderTo.id) && instances[renderTo.id] && instances[renderTo.id].hasOwnProperty(\"destroy\")) {\n                    console.debug(\"Destroying previous widget on ElementId=\" + renderTo.id);\n                    instances[renderTo.id].destroy();\n                    delete instances[renderTo.id];\n                }\n                if (checkConfig(name, widget.inputs, config)) {\n                    console.debug(\"Creating new \" + name + \" widget on ElementId=\" + renderTo.id);\n                    instances[renderTo.id] = widget.init(config, renderTo, errorHandler);\n                }\n            }).catch(cause => {\n                console.error(cause);\n                errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0___default.a.t(\"Widget '{name}' cannot be found, or there was an error instantiating it\", {name: name}));\n            });\n    } else if (!name) {\n        errorHandler(_i18n__WEBPACK_IMPORTED_MODULE_0___default.a.t(\"No widget name specified\"));\n    }\n    return {\n        name: name,\n        config: config,\n        renderTo: renderTo,\n        inspect: function(cb) {\n            __webpack_require__(\"./src/js/widget lazy recursive ^\\\\.\\\\/.*\\\\.js$\")(`./${name}.js`)\n                .then(({default: widget}) => {\n                    cb.call(this, widget.inputs, widget.optional_inputs, widget.preferredSizes);\n            });\n        },\n        url: function() {\n            function relPathToAbs(pathname) {\n                var output = [];\n                pathname.replace(/^(\\.\\.?(\\/|$))+/, \"\")\n                        .replace(/\\/(\\.(\\/|$))+/g, \"/\")\n                        .replace(/\\/\\.\\.$/, \"/../\")\n                        .replace(/\\/?[^\\/]*/g, function (p) {\n                          if (p === \"/..\") {\n                            output.pop();\n                          } else {\n                            output.push(p);\n                          }\n                        });\n                return output.join(\"\").replace(/^\\//, pathname.charAt(0) === \"/\" ? \"/\" : \"\");\n            }\n            var url = relPathToAbs(\"../widget/\") + \"?\";\n            url += \"name=\"+ encodeURIComponent(name)+\"&\";\n            url += Object.keys(config).map(function(key) {\n                var val = config[key];\n                if (typeof config[key] === 'object') {\n                    val = JSON.stringify(config[key]);\n                }\n                return key + \"=\" + encodeURIComponent(val);\n            }).join(\"&\");\n            url += \"&lang=\"+_i18n__WEBPACK_IMPORTED_MODULE_0___default.a.getLang();\n            return url;\n        },\n        iframe: function(w, h) {\n            w = w ? w : \"100%\";\n            h = h ? h : \"100%\";\n            return '<iframe src=\"'+this.url()+'\" width=\"'+w+'\" height=\"'+h+'\" frameBorder=\"0\"></iframe>';\n        },\n        javascript: function() {\n            return \"SensorWidget('\"+name+\"', \" + JSON.stringify(config, null, 3) + \", document.getElementById('\"+name+\"-container'));\";\n        }\n    };\n});;\n\n\n//# sourceURL=webpack:///./src/js/SensorWidget.js?");

/***/ }),

/***/ "./src/js/SensorWidgets.css":
/*!**********************************!*\
  !*** ./src/js/SensorWidgets.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./SensorWidgets.css */ \"./node_modules/css-loader/dist/cjs.js!./src/js/SensorWidgets.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/js/SensorWidgets.css?");

/***/ }),

/***/ "./src/js/XML.js":
/*!***********************!*\
  !*** ./src/js/XML.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/* This work is licensed under Creative Commons GNU LGPL License.\n\n License: http://creativecommons.org/licenses/LGPL/2.1/\n Version: 0.9\n Author:  Stefan Goessner/2006\n See:     http://goessner.net/download/prj/jsonxml/\n */\n!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n    \"use strict\";\n\n    return {\n        read: function(xml, clean) {\n            var X = {\n                at: (clean ? \"\" : \"@\"),\n\n                toObj: function(xml) {\n                    var o = {};\n                    if (xml.nodeType == 1) { // element node\n                        if (xml.attributes.length) { // element with attributes\n                            for (var i = 0; i < xml.attributes.length; i++) {\n                                var name = xml.attributes[i].name;\n                                var value = xml.attributes[i].value;\n                                var is_ns = name.lastIndexOf(\"xmlns:\", 0) === 0;\n                                if (!(clean && is_ns)) { // Hide xmlns attributes\n                                    o[X.at + name] = (value || \"\").toString();\n                                }\n                            }\n                        }\n                        if (xml.firstChild) { // element has child nodes\n                            var textChild = 0,\n                                cdataChild = 0,\n                                hasElementChild = false;\n                            for (var n = xml.firstChild; n; n = n.nextSibling) {\n                                if (n.nodeType == 1) {\n                                    hasElementChild = true;\n                                } else if (n.nodeType == 3 && n.nodeValue.match(/[^ \\f\\n\\r\\t\\v]/)) {\n                                    textChild++;\n                                    // non-whitespace text\n                                } else if (n.nodeType == 4) {\n                                    cdataChild++;\n                                    // cdata section node\n                                }\n                            }\n                            if (hasElementChild) {\n                                if (textChild < 2 && cdataChild < 2) {\n                                    // structured element with evtl.\n                                    // a single text or/and cdata node\n                                    X.removeWhite(xml);\n                                    for (n = xml.firstChild; n; n = n.nextSibling) {\n                                        if (n.nodeType == 3) { // text node\n                                            o[\"#text\"] = X.escape(n.nodeValue);\n                                        } else if (n.nodeType == 4) { // cdata node\n                                            o[\"#cdata\"] = X.escape(n.nodeValue);\n                                        } else if (o[n.nodeName]) {\n                                            // multiple occurence of element\n                                            if (o[n.nodeName] instanceof Array) {\n                                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);\n                                            } else {\n                                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];\n                                            }\n                                        } else { // first occurence of element\n                                            o[n.nodeName] = X.toObj(n);\n                                        }\n                                    }\n                                } else { // mixed content\n                                    if (!xml.attributes.length) {\n                                        o = X.escape(X.innerXml(xml));\n                                    } else {\n                                        o[\"#text\"] = X.escape(X.innerXml(xml));\n                                    }\n                                }\n                            } else if (textChild) { // pure text\n                                if (!xml.attributes.length) {\n                                    o = X.escape(X.innerXml(xml));\n                                } else {\n                                    o[\"#text\"] = X.escape(X.innerXml(xml));\n                                }\n                            } else if (cdataChild) { // cdata\n                                if (cdataChild > 1) {\n                                    o = X.escape(X.innerXml(xml));\n                                } else {\n                                    for (n = xml.firstChild; n; n = n.nextSibling) {\n                                        o[\"#cdata\"] = X.escape(n.nodeValue);\n                                    }\n                                }\n                            }\n                        }\n                        if (!xml.attributes.length && !xml.firstChild) {\n                            o = null;\n                        }\n                    } else if (xml.nodeType == 9) { // document.node\n                        o = X.toObj(xml.documentElement);\n                    } else if (xml.nodeType == 8) {\n                        return xml.data;\n                        // A comment\n                    } else {\n                        console.error(\"unhandled node type: \" + xml.nodeType);\n                    }\n\n                    return o;\n                },\n\n                innerXml: function(node) {\n                    var s = \"\";\n                    if (\"innerHTML\" in node) {\n                        s = node.innerHTML;\n                    } else {\n                        var asXml = function(n) {\n                            var s = \"\";\n                            if (n.nodeType == 1) {\n                                s += \"<\" + n.nodeName;\n                                for (var i = 0; i < n.attributes.length; i++) {\n                                    var name = n.attributes[i].name;\n                                    var value = n.attributes[i].value || \"\";\n                                    s += \" \" + name + \"=\\\"\" + value.toString() + \"\\\"\";\n                                }\n                                if (n.firstChild) {\n                                    s += \">\";\n                                    for (var c = n.firstChild; c; c = c.nextSibling) {\n                                        s += asXml(c);\n                                    }\n                                    s += \"</\" + n.nodeName + \">\";\n                                } else {\n                                    s += \"/>\";\n                                }\n                            } else if (n.nodeType == 3) {\n                                s += n.nodeValue;\n                            } else if (n.nodeType == 4) {\n                                s += \"<![CDATA[\" + n.nodeValue + \"]]>\";\n                            }\n                            return s;\n                        };\n\n                        for (var c = node.firstChild; c; c = c.nextSibling) {\n                            s += asXml(c);\n                        }\n                    }\n                    return s;\n                },\n\n                escape: function(txt) {\n                    return txt.replace(/[\\\\]/g, \"\\\\\\\\\").replace(/[\\\"]/g, '\\\\\"').replace(/[\\n]/g, '\\\\n').replace(/[\\r]/g, '\\\\r');\n                },\n\n                removeWhite: function(e) {\n                    e.normalize();\n                    for (var n = e.firstChild; n;) {\n                        if (n.nodeType == 3) { // text node\n                            if (!n.nodeValue.match(/[^ \\f\\n\\r\\t\\v]/)) {\n                                // pure whitespace text node\n                                var nxt = n.nextSibling;\n                                e.removeChild(n);\n                                n = nxt;\n                            } else {\n                                n = n.nextSibling;\n                            }\n                        } else if (n.nodeType == 1) { // element node\n                            X.removeWhite(n);\n                            n = n.nextSibling;\n                        } else { // any other node\n                            n = n.nextSibling;\n                        }\n                    }\n                    return e;\n                }\n            };\n\n            // Strip namespaces from XML tags\n            if (clean) {\n                xml = xml.replace(/<(\\/?)([^:>\\s]*:)?([^>]+)>/g, \"<$1$3>\");\n            }\n\n            // Convert to an XML DOM Document\n            xml = (new DOMParser()).parseFromString(xml, \"text/xml\");\n\n            // Start from document's root element\n            if (xml.nodeType == 9) {\n                xml = xml.documentElement;\n            }\n\n            var ret = {};\n            ret[xml.nodeName] = X.toObj(X.removeWhite(xml));\n            return ret;\n        },\n\n        write: function(object) {\n            var toXml = function(v, name, ind) {\n                var xml = \"\";\n                if (v instanceof Array) {\n                    for (var i = 0, n = v.length; i < n; i++) {\n                        xml += ind + toXml(v[i], name, ind + \"\\t\") + \"\\n\";\n                    }\n                } else if (typeof(v) == \"object\") {\n                    var hasChild = false;\n                    xml += ind + \"<\" + name;\n                    for (var m in v) {\n                        if (m.charAt(0) == \"@\") {\n                            xml += \" \" + m.substr(1) + \"=\\\"\" + v[m].toString() + \"\\\"\";\n                        } else {\n                            hasChild = true;\n                        }\n                    }\n                    xml += hasChild ? \">\" : \"/>\";\n                    if (hasChild) {\n                        for (m in v) {\n                            if (m == \"#text\") {\n                                xml += v[m];\n                            } else if (m == \"#cdata\") {\n                                xml += \"<![CDATA[\" + v[m] + \"]]>\";\n                            } else if (m.charAt(0) != \"@\") {\n                                xml += toXml(v[m], m, ind + \"\\t\");\n                            }\n                        }\n                        xml += (xml.charAt(xml.length - 1) == \"\\n\" ? ind : \"\") + \"</\" + name + \">\";\n                    }\n                } else {\n                    xml += ind + \"<\" + name + \">\" + v.toString() + \"</\" + name + \">\";\n                }\n                return xml;\n            };\n\n            var xml = \"\";\n            for (var i in object) {\n                xml += toXml(object[i], i, \"\");\n            }\n            return xml;\n        }\n    };\n}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./src/js/XML.js?");

/***/ }),

/***/ "./src/js/i18n.js":
/*!************************!*\
  !*** ./src/js/i18n.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author Oscar Fonts <oscar.fonts@geomati.co>\n */\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./translations.json */ \"./src/js/translations.json\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(translations) {\n    \"use strict\";\n\n    var params = {};\n    location.search.substr(1).split(\"&\").forEach(function(item) {\n        var kv = item.split(\"=\");\n        params[kv[0]] = kv[1];\n    });\n\n    var activeLang;\n    setLang(params.hasOwnProperty('lang') ? params.lang : 'en');\n\n    function setLang(lang) {\n        activeLang = lang;\n        console.debug('Language set to ' + activeLang);\n    }\n\n    function template(string, values){\n        for (var key in values)\n            string = string.replace(new RegExp('{'+key+'}','g'), values[key]);\n        return string;\n    }\n\n    function t(string, values) {\n        if (translations.hasOwnProperty(string) && translations[string].hasOwnProperty(activeLang)) {\n            string = translations[string][activeLang];\n        }\n        return template(string, values);\n    }\n\n    return {\n        langs: function() {\n            return translations.langs;\n        },\n        getLang: function() {\n            return activeLang;\n        },\n        setLang: setLang,\n        t: t,\n        addTranslations: function(bundle) {\n            Object.keys(bundle).forEach(function(key) {\n                if (!translations.hasOwnProperty(key)) {\n                    translations[key] = bundle[key];\n                } else {\n                    console.warn(\"Skipping duplicate entry '\" + key + \"' in translation bundle.\");\n                }\n            });\n        },\n        translateDocTree: function(el) {\n            if (!el) el = document;\n            var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);\n            while (treeWalker.nextNode()) {\n                var node = treeWalker.currentNode;\n                if(/\\S/.test(node.nodeValue)) { // Not a whitespace-only text node\n                    node.nodeValue = t(node.nodeValue);\n                }\n            }\n        }\n    };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//# sourceURL=webpack:///./src/js/i18n.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SensorWidget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SensorWidget.js */ \"./src/js/SensorWidget.js\");\n/* harmony import */ var _SOS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SOS.js */ \"./src/js/SOS.js\");\n/* harmony import */ var _SOS_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SOS_js__WEBPACK_IMPORTED_MODULE_1__);\n/*\nrequire.config({\n    waitSeconds: 30,\n    baseUrl: '../js',\n    paths: {\n        'text': '../lib/requirejs-text/text',\n        'bootstrap': '../lib/bootstrap/bootstrap.amd',\n        'daterangepicker': '../lib/bootstrap-daterangepicker/daterangepicker',\n        'flot': '../lib/flot/jquery.flot.amd',\n        'flot-navigate': '../lib/flot/jquery.flot.navigate.amd',\n        'flot-resize': '../lib/flot/jquery.flot.resize.amd',\n        'flot-time': '../lib/flot/jquery.flot.time.amd',\n        'flot-tooltip': '../lib/flot.tooltip/jquery.flot.tooltip.amd',\n        'highcharts': '../lib/highcharts/highcharts',\n        'highcharts-more': '../lib/highcharts/highcharts-more',\n        'highlight': '../lib/highlightjs/highlight.pack',\n        'jquery': '../lib/jquery/jquery',\n        'jquery-ui': '../lib/jquery-ui/jquery-ui',\n        'jqgrid': '../lib/jqgrid/jquery.jqGrid.amd',\n        'jqgrid-locale-en': '../lib/jqgrid/grid.locale-en.amd',\n        'leaflet': '../lib/leaflet/leaflet',\n        'leaflet-cluster': '../lib/leaflet.markercluster/leaflet.markercluster',\n        'leaflet-label': '../lib/Leaflet.label/leaflet.label',\n        'moment': '../lib/moment/moment',\n        'moment-es': '../lib/moment/locale/es',\n        'moment-ca': '../lib/moment/locale/ca'\n    },\n    map: {\n        \"*\": {\n            \"jquery\": \"jquery-noconflict\"\n        },\n        \"jquery-noconflict\": {\n            \"jquery\": \"jquery\"\n        }\n    },\n    shim: {\n        'daterangepicker': {\n            deps: ['bootstrap', 'moment-es', 'moment-ca', 'jquery', 'css!../lib/bootstrap-daterangepicker/daterangepicker-bs3.css']\n        },\n        'flot': {\n            deps: ['jquery']\n        },\n        'flot-navigate': {\n            deps: ['flot']\n        },\n        'flot-resize': {\n            deps: ['flot']\n        },\n        'flot-time': {\n            deps: ['flot']\n        },\n        'flot-tooltip': {\n            deps: ['flot']\n        },\n        'highcharts': {\n            exports: 'Highcharts'\n        },\n        'highcharts-more': {\n            deps: ['highcharts']\n        },\n        'highlight': {\n            deps: ['css!../lib/highlightjs/color-brewer.css']\n        },\n        'jquery-ui': {\n            deps: ['jquery', 'css!../css/jquery-ui.css']\n        },\n        'jqgrid': {\n            deps: ['jquery-ui', 'jqgrid-locale-en', 'css!../lib/jqgrid/ui.jqgrid.css']\n        },\n        'leaflet': {\n            deps: ['css!../lib/leaflet/leaflet.css']\n        },\n        'leaflet-cluster': {\n            deps: ['leaflet', 'css!../lib/leaflet.markercluster/MarkerCluster.css', 'css!../lib/leaflet.markercluster/MarkerCluster.Default.css']\n        },\n        'leaflet-label': {\n            deps: ['leaflet', 'css!../lib/Leaflet.label/leaflet.label.css']\n        },\n        'moment-es': {\n            deps: ['moment']\n        },\n        'moment-ca': {\n            deps: ['moment']\n        }\n    }\n});\n\n(function(requirejs) {\n    var script;\n    if (document.currentScript) {\n        script = document.currentScript;\n    } else {\n        var scripts = document.getElementsByTagName('script');\n        script = scripts[scripts.length - 1];\n    }\n\n    var baseUrl = script.src.replace(/[^\\/]*$/, '');\n    console.debug(\"Sensor Widgets' Base URL is: \" + baseUrl);\n\n    requirejs.config({\n        baseUrl: baseUrl\n    });\n})(requirejs);\n*/\n\n\n\n\n// 'Leak' SensorWidget to global scope.\nwindow.SensorWidget = function() {\n    var args = arguments;\n    window.onload = function() {\n        _SensorWidget_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].apply(this, args);\n    }\n};\n\n// Expose SOS as well.\nwindow.getSOS = function(callback) {\n    callback(_SOS_js__WEBPACK_IMPORTED_MODULE_1___default.a);\n};\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/translations.json":
/*!**********************************!*\
  !*** ./src/js/translations.json ***!
  \**********************************/
/*! exports provided: langs, (no date), No widget name specified, Widget '{name}' cannot be found, or there was an error instantiating it, The '{name}' widget is missing some mandatory parameters: , Loading..., deg, Request time, Response time, (no data), Result time, Cel, Results, Time, Value, Unit, {name} Widget Configuration, Mandatory inputs, Compass, Gauge, Jqgrid, Map, Panel, Progressbar, Table, Thermometer, Timechart, Windrose, Select a Service..., Select an Offering..., (multiselect), Service, Property, Properties, Refresh Interval, Time Range, MMM D, YYYY H:mm, Custom Range, Today, Last hour, Last {n} hours, From, To, Apply, Cancel, W, Optional inputs, Title, Footnote, Custom Css Url, Max Initial Zoom, Base Layer, Widget dimensions, Initial Size, Create Widget, {name} Configuration Parameters, jqGrid Example, Last observations, Data Table - last 3 hours, Sirena Windrose, Last 3 hours of wind observations, Code, Embed, Link, Mandatory, Optional, Suggested Sizes, A sample footnote for {name} widget, Last measures from, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"langs\\\":{\\\"en\\\":\\\"English\\\",\\\"es\\\":\\\"Español\\\",\\\"ca\\\":\\\"Català\\\"},\\\"(no date)\\\":{\\\"es\\\":\\\"(sin fecha)\\\",\\\"ca\\\":\\\"(sense data)\\\"},\\\"No widget name specified\\\":{\\\"es\\\":\\\"No se ha especificado ningún nombre de widget\\\",\\\"ca\\\":\\\"Cal especificar un nom de widget\\\"},\\\"Widget '{name}' cannot be found, or there was an error instantiating it\\\":{\\\"es\\\":\\\"No se ha encontrado el widget de nombre '{name}', o se produjo un error instanciándolo\\\",\\\"ca\\\":\\\"No s'ha trobat cap widget anomenat '{name}', o s'ha produit un error en instanciar-lo\\\"},\\\"The '{name}' widget is missing some mandatory parameters: \\\":{\\\"es\\\":\\\"Faltan algunos parámetros obligatorios para el widget '{name}': \\\",\\\"ca\\\":\\\"Cal afegir els següents paràmetres obligatoris al widget '{name}': \\\"},\\\"Loading...\\\":{\\\"es\\\":\\\"Cargando...\\\",\\\"ca\\\":\\\"Carregant...\\\"},\\\"deg\\\":{\\\"es\\\":\\\"º\\\",\\\"ca\\\":\\\"º\\\"},\\\"Request time\\\":{\\\"es\\\":\\\"Petición el\\\",\\\"ca\\\":\\\"Petició el\\\"},\\\"Response time\\\":{\\\"es\\\":\\\"Respuesta el\\\",\\\"ca\\\":\\\"Resposta el\\\"},\\\"(no data)\\\":{\\\"es\\\":\\\"(sin datos)\\\",\\\"ca\\\":\\\"(sense dades)\\\"},\\\"Result time\\\":{\\\"es\\\":\\\"Resultado del\\\",\\\"ca\\\":\\\"Resultat del\\\"},\\\"Cel\\\":{\\\"es\\\":\\\"ºC\\\",\\\"ca\\\":\\\"ºC\\\"},\\\"Results\\\":{\\\"es\\\":\\\"Resultados\\\",\\\"ca\\\":\\\"Resultats\\\"},\\\"Time\\\":{\\\"es\\\":\\\"Hora\\\",\\\"ca\\\":\\\"Hora\\\"},\\\"Value\\\":{\\\"es\\\":\\\"Valor\\\",\\\"ca\\\":\\\"Valor\\\"},\\\"Unit\\\":{\\\"es\\\":\\\"Unidad\\\",\\\"ca\\\":\\\"Unitat\\\"},\\\"{name} Widget Configuration\\\":{\\\"es\\\":\\\"Configuración de {name}\\\",\\\"ca\\\":\\\"Configuració de {name}\\\"},\\\"Mandatory inputs\\\":{\\\"es\\\":\\\"Parámetros obligatorios\\\",\\\"ca\\\":\\\"Paràmetres obligatoris\\\"},\\\"Compass\\\":{\\\"es\\\":\\\"Rumbo\\\",\\\"ca\\\":\\\"Rumb\\\"},\\\"Gauge\\\":{\\\"es\\\":\\\"Manómetro\\\",\\\"ca\\\":\\\"Manòmetre\\\"},\\\"Jqgrid\\\":{\\\"es\\\":\\\"Tabla JQuery\\\",\\\"ca\\\":\\\"Taula JQuery\\\"},\\\"Map\\\":{\\\"es\\\":\\\"Mapa\\\",\\\"ca\\\":\\\"Mapa\\\"},\\\"Panel\\\":{\\\"es\\\":\\\"Panel\\\",\\\"ca\\\":\\\"Panell\\\"},\\\"Progressbar\\\":{\\\"es\\\":\\\"Barra\\\",\\\"ca\\\":\\\"Barra\\\"},\\\"Table\\\":{\\\"es\\\":\\\"Tabla\\\",\\\"ca\\\":\\\"Taula\\\"},\\\"Thermometer\\\":{\\\"es\\\":\\\"Termómetro\\\",\\\"ca\\\":\\\"Termòmetre\\\"},\\\"Timechart\\\":{\\\"es\\\":\\\"Serie tiempo\\\",\\\"ca\\\":\\\"Sèrie temps\\\"},\\\"Windrose\\\":{\\\"es\\\":\\\"Rosa vientos\\\",\\\"ca\\\":\\\"Rosa vents\\\"},\\\"Select a Service...\\\":{\\\"es\\\":\\\"Seleccione un servicio...\\\",\\\"ca\\\":\\\"Sel·leccioneu un servei...\\\"},\\\"Select an Offering...\\\":{\\\"es\\\":\\\"Seleccione un offering...\\\",\\\"ca\\\":\\\"Sel·leccioneu un offering...\\\"},\\\"(multiselect)\\\":{\\\"es\\\":\\\"(selección múltiple)\\\",\\\"ca\\\":\\\"(selecció múltiple)\\\"},\\\"Service\\\":{\\\"es\\\":\\\"Servicio\\\",\\\"ca\\\":\\\"Servei\\\"},\\\"Property\\\":{\\\"es\\\":\\\"Propiedad\\\",\\\"ca\\\":\\\"Propietat\\\"},\\\"Properties\\\":{\\\"es\\\":\\\"Propiedades\\\",\\\"ca\\\":\\\"Propietats\\\"},\\\"Refresh Interval\\\":{\\\"es\\\":\\\"Intervalo de refresco\\\",\\\"ca\\\":\\\"Intèrval de refresc\\\"},\\\"Time Range\\\":{\\\"es\\\":\\\"Rango de tiempo\\\",\\\"ca\\\":\\\"Rang de temps\\\"},\\\"MMM D, YYYY H:mm\\\":{\\\"es\\\":\\\"D MMM YYYY H:mm\\\",\\\"ca\\\":\\\"D MMM YYYY H:mm\\\"},\\\"Custom Range\\\":{\\\"es\\\":\\\"Rango predefinido\\\",\\\"ca\\\":\\\"Rang predefinit\\\"},\\\"Today\\\":{\\\"es\\\":\\\"Hoy\\\",\\\"ca\\\":\\\"Avui\\\"},\\\"Last hour\\\":{\\\"es\\\":\\\"La última hora\\\",\\\"ca\\\":\\\"La última hora\\\"},\\\"Last {n} hours\\\":{\\\"es\\\":\\\"Las últimas {n} horas\\\",\\\"ca\\\":\\\"Les últimes {n} hores\\\"},\\\"From\\\":{\\\"es\\\":\\\"De\\\",\\\"ca\\\":\\\"De\\\"},\\\"To\\\":{\\\"es\\\":\\\"A\\\",\\\"ca\\\":\\\"A\\\"},\\\"Apply\\\":{\\\"es\\\":\\\"Aplicar\\\",\\\"ca\\\":\\\"Aplica\\\"},\\\"Cancel\\\":{\\\"es\\\":\\\"Cancelar\\\",\\\"ca\\\":\\\"Cancel·la\\\"},\\\"W\\\":{\\\"es\\\":\\\"S\\\",\\\"ca\\\":\\\"S\\\"},\\\"Optional inputs\\\":{\\\"es\\\":\\\"Parámetros opcionales\\\",\\\"ca\\\":\\\"Paràmetres opcionals\\\"},\\\"Title\\\":{\\\"es\\\":\\\"Título\\\",\\\"ca\\\":\\\"Títol\\\"},\\\"Footnote\\\":{\\\"es\\\":\\\"Nota al pie\\\",\\\"ca\\\":\\\"Nota al peu\\\"},\\\"Custom Css Url\\\":{\\\"es\\\":\\\"URL del CSS personalizado\\\",\\\"ca\\\":\\\"URL del CSS personalitzat\\\"},\\\"Max Initial Zoom\\\":{\\\"es\\\":\\\"Zoom Inicial Máximo\\\",\\\"ca\\\":\\\"Zoom Inicial Màxim\\\"},\\\"Base Layer\\\":{\\\"es\\\":\\\"Mapa de Base\\\",\\\"ca\\\":\\\"Mapa de Base\\\"},\\\"Widget dimensions\\\":{\\\"es\\\":\\\"Tamaño del widget\\\",\\\"ca\\\":\\\"Mides del widget\\\"},\\\"Initial Size\\\":{\\\"es\\\":\\\"Tamaño inicial\\\",\\\"ca\\\":\\\"Mida inicial\\\"},\\\"Create Widget\\\":{\\\"es\\\":\\\"Crear Widget\\\",\\\"ca\\\":\\\"Crear Widget\\\"},\\\"{name} Configuration Parameters\\\":{\\\"es\\\":\\\"Parámetros de {name}\\\",\\\"ca\\\":\\\"Paràmetres de {name}\\\"},\\\"jqGrid Example\\\":{\\\"es\\\":\\\"Ejemplo de tabla JQuery\\\",\\\"ca\\\":\\\"Exemple de taula JQuery\\\"},\\\"Last observations\\\":{\\\"es\\\":\\\"Observaciones más recientes\\\",\\\"ca\\\":\\\"Darreres observacions\\\"},\\\"Data Table - last 3 hours\\\":{\\\"es\\\":\\\"Tabla de datos - últimas 3 horas\\\",\\\"ca\\\":\\\"Taula de dades - darreres 3 hores\\\"},\\\"Sirena Windrose\\\":{\\\"es\\\":\\\"Rosa de los Vientos Sirena\\\",\\\"ca\\\":\\\"Rosa dels Vents Sirena\\\"},\\\"Last 3 hours of wind observations\\\":{\\\"es\\\":\\\"Últimas 3 horas de observaciones del viento\\\",\\\"ca\\\":\\\"Darreres 3 hores d'observacions del vent\\\"},\\\"Code\\\":{\\\"es\\\":\\\"Código\\\",\\\"ca\\\":\\\"Codi\\\"},\\\"Embed\\\":{\\\"es\\\":\\\"Incrustar\\\",\\\"ca\\\":\\\"Incrusta\\\"},\\\"Link\\\":{\\\"es\\\":\\\"Enlazar\\\",\\\"ca\\\":\\\"Enllaça\\\"},\\\"Mandatory\\\":{\\\"es\\\":\\\"Obligatorios\\\",\\\"ca\\\":\\\"Obligatoris\\\"},\\\"Optional\\\":{\\\"es\\\":\\\"Opcionales\\\",\\\"ca\\\":\\\"Opcionals\\\"},\\\"Suggested Sizes\\\":{\\\"es\\\":\\\"Tamaños recomendados\\\",\\\"ca\\\":\\\"Mides recomanades\\\"},\\\"A sample footnote for {name} widget\\\":{\\\"es\\\":\\\"Nota al pie de ejemplo en el widget {name}\\\",\\\"ca\\\":\\\"Nota al peu d'exemple al widget {name}\\\"},\\\"Last measures from\\\":{\\\"es\\\":\\\"Últimas mediciones de\\\",\\\"ca\\\":\\\"Darreres mesures de\\\"}}\");\n\n//# sourceURL=webpack:///./src/js/translations.json?");

/***/ }),

/***/ "./src/js/widget lazy recursive ^\\.\\/.*\\.js$":
/*!**********************************************************!*\
  !*** ./src/js/widget lazy ^\.\/.*\.js$ namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./compass.js\": [\n\t\t\"./src/js/widget/compass.js\",\n\t\t9,\n\t\t\"widget-compass-js\"\n\t],\n\t\"./gauge.js\": [\n\t\t\"./src/js/widget/gauge.js\",\n\t\t7,\n\t\t\"widget-gauge-js\"\n\t],\n\t\"./jqgrid.js\": [\n\t\t\"./src/js/widget/jqgrid.js\",\n\t\t7,\n\t\t\"vendors~widget-jqgrid-js~widget-timechart-js\",\n\t\t\"widget-jqgrid-js\"\n\t],\n\t\"./map.js\": [\n\t\t\"./src/js/widget/map.js\",\n\t\t9,\n\t\t\"vendors~widget-map-js\",\n\t\t\"widget-map-js\"\n\t],\n\t\"./panel.js\": [\n\t\t\"./src/js/widget/panel.js\",\n\t\t7,\n\t\t\"widget-panel-js\"\n\t],\n\t\"./progressbar.js\": [\n\t\t\"./src/js/widget/progressbar.js\",\n\t\t7,\n\t\t\"widget-progressbar-js\"\n\t],\n\t\"./status.js\": [\n\t\t\"./src/js/widget/status.js\",\n\t\t7,\n\t\t\"vendors~widget-status-js\",\n\t\t\"widget-status-js\"\n\t],\n\t\"./table.js\": [\n\t\t\"./src/js/widget/table.js\",\n\t\t7,\n\t\t\"widget-table-js\"\n\t],\n\t\"./thermometer.js\": [\n\t\t\"./src/js/widget/thermometer.js\",\n\t\t7,\n\t\t\"widget-thermometer-js\"\n\t],\n\t\"./timechart.js\": [\n\t\t\"./src/js/widget/timechart.js\",\n\t\t9,\n\t\t\"vendors~widget-jqgrid-js~widget-timechart-js\",\n\t\t\"vendors~widget-timechart-js\",\n\t\t\"widget-timechart-js\"\n\t],\n\t\"./windrose.js\": [\n\t\t\"./src/js/widget/windrose.js\",\n\t\t7,\n\t\t\"vendors~widget-windrose-js\",\n\t\t\"widget-windrose-js\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn Promise.all(ids.slice(2).map(__webpack_require__.e)).then(function() {\n\t\treturn __webpack_require__.t(id, ids[1])\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"./src/js/widget lazy recursive ^\\\\.\\\\/.*\\\\.js$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///./src/js/widget_lazy_^\\.\\/.*\\.js$_namespace_object?");

/***/ })

/******/ });