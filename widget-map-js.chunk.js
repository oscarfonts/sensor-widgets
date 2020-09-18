(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["widget-map-js"],{

/***/ "./src/js/widget/map.js":
/*!******************************!*\
  !*** ./src/js/widget/map.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SensorWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SensorWidget */ "./src/js/SensorWidget.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/js/i18n.js");
/* harmony import */ var _SOS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SOS */ "./src/js/SOS.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _widget_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widget-common */ "./src/js/widget-common.js");
/* harmony import */ var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! leaflet.markercluster */ "./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js");
/* harmony import */ var leaflet_markercluster__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(leaflet_markercluster__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var leaflet_dist_images_marker_icon_2x_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png");
/* harmony import */ var leaflet_dist_images_marker_icon_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png");
/* harmony import */ var leaflet_dist_images_marker_shadow_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png");
/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */












// TODO readd tooltips
// TODO readd clustering
// TODO readd popups

// Overriding Leaflet.label so it accepts a DOM element as argument
// (not only a string). Needed for async loading of content to label
/*
L.Label.prototype._updateContent = function() {
    if (!this._content || !this._map || this._prevContent === this._content) {
        return;
    }

    if (typeof this._content === 'string') {
        this._container.innerHTML = this._content;
    } else {
        while (this._container.hasChildNodes()) {
            this._container.removeChild(this._container.firstChild);
        }
        this._container.appendChild(this._content);
    }
    this._prevContent = this._content;
    this._labelWidth = this._container.offsetWidth;
};
*/


// Ugly hack to import icons with Webpack
delete leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.Icon.Default.prototype._getIconUrl;
leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.Icon.Default.mergeOptions({
    iconRetinaUrl: leaflet_dist_images_marker_icon_2x_png__WEBPACK_IMPORTED_MODULE_7__["default"],
    iconUrl: leaflet_dist_images_marker_icon_png__WEBPACK_IMPORTED_MODULE_8__["default"],
    shadowUrl: leaflet_dist_images_marker_shadow_png__WEBPACK_IMPORTED_MODULE_9__["default"]
});

/* harmony default export */ __webpack_exports__["default"] = ({
    inputs: _widget_common__WEBPACK_IMPORTED_MODULE_5__["default"].inputs.concat(["features", "properties"]),
    optional_inputs: ["permanent_tooltips", "popup_widget", "no_clustering", "swap_axis", "max_initial_zoom", "base_layer"].concat(_widget_common__WEBPACK_IMPORTED_MODULE_5__["default"].optional_inputs),
    preferredSizes: [{w: 550, h: 400}],

    init: function(config, el, errorHandler) {

        el.innerHTML = _i18n__WEBPACK_IMPORTED_MODULE_1__["default"].t("Loading...");
        //load widget common features
        _widget_common__WEBPACK_IMPORTED_MODULE_5__["default"].init(config, el);

        var baseLayer;
        if (config.base_layer) {
            var params = (typeof config.base_layer == 'string' || config.base_layer instanceof String) ? JSON.parse(config.base_layer) : config.base_layer;
            if (params.type && params.type.toUpperCase() === 'WMS') {
                // WMS Layer
                baseLayer = leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.tileLayer.wms(params.url, params.options);
            } else {
                // XYZ TileLayer
                baseLayer = leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.tileLayer(params.url, params.options);
            }
        } else {
            // A default base layer, taken from http://leaflet-extras.github.io/leaflet-providers/preview/
            baseLayer =  leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                subdomains: 'abcd',
                maxZoom: 19
            });
        }

        // Add footnote to attribution string
        if (config.footnote) {
            baseLayer.options.attribution += " | <b>" + config.footnote + "</b>";
        }

        // Parse popup configuration
        if (typeof config.popup_widget === 'string' || config.popup_widget instanceof String) {
            config.popup_widget = JSON.parse(config.popup_widget);
        }

        _SOS__WEBPACK_IMPORTED_MODULE_2__["default"].setUrl(config.service);
        read();

        function read() {
            _SOS__WEBPACK_IMPORTED_MODULE_2__["default"].getCapabilities(function(offerings) {
                for (var i in offerings) {
                    var offering = offerings[i];
                    if (offering.identifier == config.offering) {
                        _SOS__WEBPACK_IMPORTED_MODULE_2__["default"].getFeatureOfInterest(offering.procedure[0], addFoIs, errorHandler);
                    }
                }
                function addFoIs(features) {
                    // Map div
                    el.innerHTML="";
                    var map_div = document.createElement("div");
                    map_div.className = "map widget";
                    el.appendChild(map_div);

                    var map = leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.map(map_div, {
                        layers: [baseLayer]
                    }).setView([0, 0], 2);

                    // Clustering
                    //var featureContainer;
                    //if (config.no_clustering) {
                    //    featureContainer = map;
                    //} else {
                    //   featureContainer = L.markerClusterGroup({
                    //        showCoverageOnHover: false,
                    //        maxClusterRadius: 50
                    //    });
                    //    map.addLayer(featureContainer);
                    //}

                    var geojson = leaflet__WEBPACK_IMPORTED_MODULE_3___default.a.geoJson(fois2geojson(features),{
                        onEachFeature: function(feature, layer) {
                            // OnClick event
                            if(config.on_click) {
                                layer.on('click', function(e) {
                                    config.on_click(e.target);
                                });
                            }

                            // Tooltip (label)
                            /*
                            var labelElement = document.createElement('div');
                            labelElement.id = 'map-tooltip-' + feature.id;
                            labelElement.appendChild(document.createTextNode(feature.properties.name));
                            layer.bindLabel(labelElement, {noHide: true}).addTo(featureContainer);
                            if (config.properties && config.properties != "[]" && config.properties.length) {
                                new SensorWidget('panel', {
                                    "service": config.service,
                                    "offering": config.offering,
                                    "feature": feature.id,
                                    "properties": config.properties,
                                    "refresh_interval": "60",
                                    "title": feature.properties.name
                                }, labelElement);
                            }
                            if (!config.permanent_tooltips && layer.setLabelNoHide) {
                                layer.setLabelNoHide(false);
                            }
                            */

                            // Info bubble (popup)
                            if (config.popup_widget) {
                                var el_popup = document.createElement("div");
                                var widget_config = JSON.parse(JSON.stringify(config.popup_widget));
                                var name = widget_config.name;
                                delete widget_config.name;
                                widget_config.service = config.service;
                                widget_config.offering = config.offering;
                                new _SensorWidget__WEBPACK_IMPORTED_MODULE_0__["default"](name).inspect(function(inputs, optionals, sizes){
                                    if(inputs.indexOf('feature') != -1) {
                                        widget_config.feature = feature.id;
                                    } else if(inputs.indexOf('features') != -1) {
                                        widget_config.features = [feature.id];
                                    }
                                    layer.bindPopup(el_popup, {
                                        minWidth:  sizes[0].w,
                                        minHeight: sizes[0].h
                                    });
                                    el_popup.setAttribute("style","width:" + sizes[0].w + "px;height:" + sizes[0].h + "px;");
                                    new _SensorWidget__WEBPACK_IMPORTED_MODULE_0__["default"](name, widget_config, el_popup);
                                });
                            }
                        }
                    });
                    map.addLayer(geojson);
                    map.fitBounds(geojson.getBounds(), {
                        maxZoom: config.max_initial_zoom ? parseInt(config.max_initial_zoom) : 14
                    });
                }
            }, errorHandler);
        }

        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }

        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }

        function swap_axis(geometry) {
            var ret = [];
            for (var i=0; i < geometry.length; i++) {
                if(isArray(geometry[i])) {
                    ret[i]=swap_axis(geometry[i]);
                } else if(!i%2) {
                    ret[i]=geometry[i+1];
                    ret[i+1]=geometry[i];
                }
            }
            return ret;
        }

        function fois2geojson(fois) {
            var config_features = isArray(config.features) ? config.features : JSON.parse(config.features);
            var features = [];
            for (var i in fois) {
                var foi = fois[i];
                if (foi.geometry && (!config_features.length || isInArray(foi.identifier.value, config.features))) {
                    if (config.swap_axis) {
                        foi.geometry.coordinates  = swap_axis(foi.geometry.coordinates);
                    }
                    var feature = {
                        type: "Feature",
                        geometry: foi.geometry,
                        id: foi.identifier.value,
                        properties: {
                            name: foi.name ? foi.name.value : foi.identifier.value
                        }
                    };
                    features.push(feature);
                }
            }
            var featureCollection = {
                type: "FeatureCollection",
                features: features
            };
            return featureCollection;
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvd2lkZ2V0L21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUMyQztBQUNoQjtBQUNGO0FBQ0Q7QUFDVTtBQUNJO0FBQ1A7O0FBRW9DO0FBQ1Y7QUFDSTs7QUFFN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLE9BQU8sOENBQUM7QUFDUiw4Q0FBQztBQUNELElBQUksNkZBQWE7QUFDakIsSUFBSSxvRkFBTztBQUNYLElBQUksd0ZBQVM7QUFDYixDQUFDOztBQUVjO0FBQ2YsWUFBWSxzREFBTTtBQUNsQixtSUFBbUksc0RBQU07QUFDekksc0JBQXNCLGVBQWU7O0FBRXJDOztBQUVBLHVCQUF1Qiw2Q0FBSTtBQUMzQjtBQUNBLFFBQVEsc0RBQU07O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw4Q0FBQztBQUM3QixhQUFhO0FBQ2I7QUFDQSw0QkFBNEIsOENBQUM7QUFDN0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUIsOENBQUMsb0JBQW9CLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUM1RixvQ0FBb0MsMEVBQTBFO0FBQzlHO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSw0Q0FBRztBQUNYOztBQUVBO0FBQ0EsWUFBWSw0Q0FBRztBQUNmO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0Q0FBRztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qiw4Q0FBQztBQUMvQjtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUEsa0NBQWtDLDhDQUFDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxhQUFhO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHFEQUFZO0FBQ2hEO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyw4RkFBOEYsNEJBQTRCO0FBQzFILHdDQUF3QyxxREFBWTtBQUNwRCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUMiLCJmaWxlIjoid2lkZ2V0LW1hcC1qcy5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciBPc2NhciBGb250cyA8b3NjYXIuZm9udHNAZ2VvbWF0aS5jbz5cbiAqL1xuaW1wb3J0IFNlbnNvcldpZGdldCBmcm9tICcuLi9TZW5zb3JXaWRnZXQnO1xuaW1wb3J0IGkxOG4gZnJvbSAnLi4vaTE4bic7XG5pbXBvcnQgU09TIGZyb20gJy4uL1NPUyc7XG5pbXBvcnQgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAnbGVhZmxldC9kaXN0L2xlYWZsZXQuY3NzJztcbmltcG9ydCBjb21tb24gZnJvbSAnLi4vd2lkZ2V0LWNvbW1vbic7XG5pbXBvcnQgJ2xlYWZsZXQubWFya2VyY2x1c3Rlcic7XG5cbmltcG9ydCBpY29uUmV0aW5hVXJsIGZyb20gJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24tMngucG5nJztcbmltcG9ydCBpY29uVXJsIGZyb20nbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnO1xuaW1wb3J0IHNoYWRvd1VybCBmcm9tJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnO1xuXG4vLyBUT0RPIHJlYWRkIHRvb2x0aXBzXG4vLyBUT0RPIHJlYWRkIGNsdXN0ZXJpbmdcbi8vIFRPRE8gcmVhZGQgcG9wdXBzXG5cbi8vIE92ZXJyaWRpbmcgTGVhZmxldC5sYWJlbCBzbyBpdCBhY2NlcHRzIGEgRE9NIGVsZW1lbnQgYXMgYXJndW1lbnRcbi8vIChub3Qgb25seSBhIHN0cmluZykuIE5lZWRlZCBmb3IgYXN5bmMgbG9hZGluZyBvZiBjb250ZW50IHRvIGxhYmVsXG4vKlxuTC5MYWJlbC5wcm90b3R5cGUuX3VwZGF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRlbnQgfHwgIXRoaXMuX21hcCB8fCB0aGlzLl9wcmV2Q29udGVudCA9PT0gdGhpcy5fY29udGVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5fY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAodGhpcy5fY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuX2NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fY29udGVudCk7XG4gICAgfVxuICAgIHRoaXMuX3ByZXZDb250ZW50ID0gdGhpcy5fY29udGVudDtcbiAgICB0aGlzLl9sYWJlbFdpZHRoID0gdGhpcy5fY29udGFpbmVyLm9mZnNldFdpZHRoO1xufTtcbiovXG5cblxuLy8gVWdseSBoYWNrIHRvIGltcG9ydCBpY29ucyB3aXRoIFdlYnBhY2tcbmRlbGV0ZSBMLkljb24uRGVmYXVsdC5wcm90b3R5cGUuX2dldEljb25Vcmw7XG5MLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xuICAgIGljb25SZXRpbmFVcmwsXG4gICAgaWNvblVybCxcbiAgICBzaGFkb3dVcmxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5wdXRzOiBjb21tb24uaW5wdXRzLmNvbmNhdChbXCJmZWF0dXJlc1wiLCBcInByb3BlcnRpZXNcIl0pLFxuICAgIG9wdGlvbmFsX2lucHV0czogW1wicGVybWFuZW50X3Rvb2x0aXBzXCIsIFwicG9wdXBfd2lkZ2V0XCIsIFwibm9fY2x1c3RlcmluZ1wiLCBcInN3YXBfYXhpc1wiLCBcIm1heF9pbml0aWFsX3pvb21cIiwgXCJiYXNlX2xheWVyXCJdLmNvbmNhdChjb21tb24ub3B0aW9uYWxfaW5wdXRzKSxcbiAgICBwcmVmZXJyZWRTaXplczogW3t3OiA1NTAsIGg6IDQwMH1dLFxuXG4gICAgaW5pdDogZnVuY3Rpb24oY29uZmlnLCBlbCwgZXJyb3JIYW5kbGVyKSB7XG5cbiAgICAgICAgZWwuaW5uZXJIVE1MID0gaTE4bi50KFwiTG9hZGluZy4uLlwiKTtcbiAgICAgICAgLy9sb2FkIHdpZGdldCBjb21tb24gZmVhdHVyZXNcbiAgICAgICAgY29tbW9uLmluaXQoY29uZmlnLCBlbCk7XG5cbiAgICAgICAgdmFyIGJhc2VMYXllcjtcbiAgICAgICAgaWYgKGNvbmZpZy5iYXNlX2xheWVyKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gKHR5cGVvZiBjb25maWcuYmFzZV9sYXllciA9PSAnc3RyaW5nJyB8fCBjb25maWcuYmFzZV9sYXllciBpbnN0YW5jZW9mIFN0cmluZykgPyBKU09OLnBhcnNlKGNvbmZpZy5iYXNlX2xheWVyKSA6IGNvbmZpZy5iYXNlX2xheWVyO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy50eXBlICYmIHBhcmFtcy50eXBlLnRvVXBwZXJDYXNlKCkgPT09ICdXTVMnKSB7XG4gICAgICAgICAgICAgICAgLy8gV01TIExheWVyXG4gICAgICAgICAgICAgICAgYmFzZUxheWVyID0gTC50aWxlTGF5ZXIud21zKHBhcmFtcy51cmwsIHBhcmFtcy5vcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gWFlaIFRpbGVMYXllclxuICAgICAgICAgICAgICAgIGJhc2VMYXllciA9IEwudGlsZUxheWVyKHBhcmFtcy51cmwsIHBhcmFtcy5vcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEEgZGVmYXVsdCBiYXNlIGxheWVyLCB0YWtlbiBmcm9tIGh0dHA6Ly9sZWFmbGV0LWV4dHJhcy5naXRodWIuaW8vbGVhZmxldC1wcm92aWRlcnMvcHJldmlldy9cbiAgICAgICAgICAgIGJhc2VMYXllciA9ICBMLnRpbGVMYXllcignaHR0cDovL3tzfS5iYXNlbWFwcy5jYXJ0b2Nkbi5jb20vbGlnaHRfYWxsL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL3d3dy5vcGVuc3RyZWV0bWFwLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiAmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9jYXJ0b2RiLmNvbS9hdHRyaWJ1dGlvbnNcIj5DYXJ0b0RCPC9hPicsXG4gICAgICAgICAgICAgICAgc3ViZG9tYWluczogJ2FiY2QnLFxuICAgICAgICAgICAgICAgIG1heFpvb206IDE5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBmb290bm90ZSB0byBhdHRyaWJ1dGlvbiBzdHJpbmdcbiAgICAgICAgaWYgKGNvbmZpZy5mb290bm90ZSkge1xuICAgICAgICAgICAgYmFzZUxheWVyLm9wdGlvbnMuYXR0cmlidXRpb24gKz0gXCIgfCA8Yj5cIiArIGNvbmZpZy5mb290bm90ZSArIFwiPC9iPlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFyc2UgcG9wdXAgY29uZmlndXJhdGlvblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5wb3B1cF93aWRnZXQgPT09ICdzdHJpbmcnIHx8IGNvbmZpZy5wb3B1cF93aWRnZXQgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5wb3B1cF93aWRnZXQgPSBKU09OLnBhcnNlKGNvbmZpZy5wb3B1cF93aWRnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgU09TLnNldFVybChjb25maWcuc2VydmljZSk7XG4gICAgICAgIHJlYWQoKTtcblxuICAgICAgICBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgU09TLmdldENhcGFiaWxpdGllcyhmdW5jdGlvbihvZmZlcmluZ3MpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIG9mZmVyaW5ncykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2ZmZXJpbmcgPSBvZmZlcmluZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZlcmluZy5pZGVudGlmaWVyID09IGNvbmZpZy5vZmZlcmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgU09TLmdldEZlYXR1cmVPZkludGVyZXN0KG9mZmVyaW5nLnByb2NlZHVyZVswXSwgYWRkRm9JcywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb0lzKGZlYXR1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcCBkaXZcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXBfZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwX2Rpdi5jbGFzc05hbWUgPSBcIm1hcCB3aWRnZXRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQobWFwX2Rpdik7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcCA9IEwubWFwKG1hcF9kaXYsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyczogW2Jhc2VMYXllcl1cbiAgICAgICAgICAgICAgICAgICAgfSkuc2V0VmlldyhbMCwgMF0sIDIpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENsdXN0ZXJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgZmVhdHVyZUNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoY29uZmlnLm5vX2NsdXN0ZXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZmVhdHVyZUNvbnRhaW5lciA9IG1hcDtcbiAgICAgICAgICAgICAgICAgICAgLy99IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAgIGZlYXR1cmVDb250YWluZXIgPSBMLm1hcmtlckNsdXN0ZXJHcm91cCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBzaG93Q292ZXJhZ2VPbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG1heENsdXN0ZXJSYWRpdXM6IDUwXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICBtYXAuYWRkTGF5ZXIoZmVhdHVyZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBnZW9qc29uID0gTC5nZW9Kc29uKGZvaXMyZ2VvanNvbihmZWF0dXJlcykse1xuICAgICAgICAgICAgICAgICAgICAgICAgb25FYWNoRmVhdHVyZTogZnVuY3Rpb24oZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPbkNsaWNrIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uZmlnLm9uX2NsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5vbl9jbGljayhlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvb2x0aXAgKGxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC5pZCA9ICdtYXAtdG9vbHRpcC0nICsgZmVhdHVyZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZmVhdHVyZS5wcm9wZXJ0aWVzLm5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5iaW5kTGFiZWwobGFiZWxFbGVtZW50LCB7bm9IaWRlOiB0cnVlfSkuYWRkVG8oZmVhdHVyZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5wcm9wZXJ0aWVzICYmIGNvbmZpZy5wcm9wZXJ0aWVzICE9IFwiW11cIiAmJiBjb25maWcucHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFNlbnNvcldpZGdldCgncGFuZWwnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcnZpY2VcIjogY29uZmlnLnNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9mZmVyaW5nXCI6IGNvbmZpZy5vZmZlcmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVwiOiBmZWF0dXJlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IGNvbmZpZy5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWZyZXNoX2ludGVydmFsXCI6IFwiNjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogZmVhdHVyZS5wcm9wZXJ0aWVzLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbGFiZWxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25maWcucGVybWFuZW50X3Rvb2x0aXBzICYmIGxheWVyLnNldExhYmVsTm9IaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnNldExhYmVsTm9IaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluZm8gYnViYmxlIChwb3B1cClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnBvcHVwX3dpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxfcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkZ2V0X2NvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnLnBvcHVwX3dpZGdldCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHdpZGdldF9jb25maWcubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHdpZGdldF9jb25maWcubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0X2NvbmZpZy5zZXJ2aWNlID0gY29uZmlnLnNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldF9jb25maWcub2ZmZXJpbmcgPSBjb25maWcub2ZmZXJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTZW5zb3JXaWRnZXQobmFtZSkuaW5zcGVjdChmdW5jdGlvbihpbnB1dHMsIG9wdGlvbmFscywgc2l6ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXRzLmluZGV4T2YoJ2ZlYXR1cmUnKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldF9jb25maWcuZmVhdHVyZSA9IGZlYXR1cmUuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXRzLmluZGV4T2YoJ2ZlYXR1cmVzJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRfY29uZmlnLmZlYXR1cmVzID0gW2ZlYXR1cmUuaWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuYmluZFBvcHVwKGVsX3BvcHVwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICBzaXplc1swXS53LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogc2l6ZXNbMF0uaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbF9wb3B1cC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6XCIgKyBzaXplc1swXS53ICsgXCJweDtoZWlnaHQ6XCIgKyBzaXplc1swXS5oICsgXCJweDtcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgU2Vuc29yV2lkZ2V0KG5hbWUsIHdpZGdldF9jb25maWcsIGVsX3BvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKGdlb2pzb24pO1xuICAgICAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKGdlb2pzb24uZ2V0Qm91bmRzKCksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFpvb206IGNvbmZpZy5tYXhfaW5pdGlhbF96b29tID8gcGFyc2VJbnQoY29uZmlnLm1heF9pbml0aWFsX3pvb20pIDogMTRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0luQXJyYXkodmFsdWUsIGFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN3YXBfYXhpcyhnZW9tZXRyeSkge1xuICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgZ2VvbWV0cnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihpc0FycmF5KGdlb21ldHJ5W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXRbaV09c3dhcF9heGlzKGdlb21ldHJ5W2ldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIWklMikge1xuICAgICAgICAgICAgICAgICAgICByZXRbaV09Z2VvbWV0cnlbaSsxXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0W2krMV09Z2VvbWV0cnlbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZvaXMyZ2VvanNvbihmb2lzKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnX2ZlYXR1cmVzID0gaXNBcnJheShjb25maWcuZmVhdHVyZXMpID8gY29uZmlnLmZlYXR1cmVzIDogSlNPTi5wYXJzZShjb25maWcuZmVhdHVyZXMpO1xuICAgICAgICAgICAgdmFyIGZlYXR1cmVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGZvaXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9pID0gZm9pc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZm9pLmdlb21ldHJ5ICYmICghY29uZmlnX2ZlYXR1cmVzLmxlbmd0aCB8fCBpc0luQXJyYXkoZm9pLmlkZW50aWZpZXIudmFsdWUsIGNvbmZpZy5mZWF0dXJlcykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuc3dhcF9heGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2kuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgID0gc3dhcF9heGlzKGZvaS5nZW9tZXRyeS5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZlYXR1cmUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkZlYXR1cmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5OiBmb2kuZ2VvbWV0cnksXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZm9pLmlkZW50aWZpZXIudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZm9pLm5hbWUgPyBmb2kubmFtZS52YWx1ZSA6IGZvaS5pZGVudGlmaWVyLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZlYXR1cmVDb2xsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==