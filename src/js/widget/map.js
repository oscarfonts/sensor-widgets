/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['i18n', 'SOS', 'leaflet', 'SensorWidget', 'widget-common', 'leaflet-label', 'leaflet-cluster'], function(i18n, SOS, L, SensorWidget, common) {
    "use strict";

    // Overriding Leaflet.label so it accepts a DOM element as argument
    // (not only a string). Needed for async loading of content to label
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

    return {
        inputs: common.inputs.concat(["features", "properties"]),
        optional_inputs: ["permanent_tooltips", "popup_widget", "no_clustering", "swap_axis", "max_initial_zoom", "base_layer"].concat(common.optional_inputs),
        preferredSizes: [{w: 550, h: 400}],

        init: function(config, el, errorHandler) {

            el.innerHTML = i18n.t("Loading...");
            //load widget common features
            common.init(config, el);
        	
            var baseLayer;
            if (config.base_layer) {
                var params = (typeof config.base_layer == 'string' || config.base_layer instanceof String) ? JSON.parse(config.base_layer) : config.base_layer;
                if (params.type && params.type.toUpperCase() === 'WMS') {
                    // WMS Layer
                    baseLayer = L.tileLayer.wms(params.url, params.options);
                } else {
                    // XYZ TileLayer
                    baseLayer = L.tileLayer(params.url, params.options);
                }
            } else {
                // A default base layer, taken from http://leaflet-extras.github.io/leaflet-providers/preview/
                baseLayer =  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
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

            SOS.setUrl(config.service);
            read();

            function read() {
                SOS.getCapabilities(function(offerings) {
                    for (var i in offerings) {
                        var offering = offerings[i];
                        if (offering.identifier == config.offering) {
                            SOS.getFeatureOfInterest(offering.procedure[0], addFoIs, errorHandler);
                        }
                    }
                    function addFoIs(features) {
                        // Map div
                        el.innerHTML="";
                        var map_div = document.createElement("div");
                        map_div.className = "map widget";
                        el.appendChild(map_div);

                        var map = L.map(map_div, {
                            layers: [baseLayer]
                        }).setView([0, 0], 2);

                        // Clustering
                        var featureContainer;
                        if (config.no_clustering) {
                            featureContainer = map;
                        } else {
                            featureContainer = L.markerClusterGroup({
                                showCoverageOnHover: false,
                                maxClusterRadius: 50
                            });
                            map.addLayer(featureContainer);
                        }

                        var geojson = L.geoJson(fois2geojson(features),{
                            onEachFeature: function(feature, layer) {
                                // OnClick event
                                if(config.on_click) {
                                    layer.on('click', function(e) {
                                        config.on_click(e.target);
                                    });
                                }

                                // Tooltip (label)
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

                                // Info bubble (popup)
                                if (config.popup_widget) {
                                    var el_popup = document.createElement("div");
                                    var widget_config = JSON.parse(JSON.stringify(config.popup_widget));
                                    var name = widget_config.name;
                                    delete widget_config.name;
                                    widget_config.service = config.service;
                                    widget_config.offering = config.offering;
                                    new SensorWidget(name).inspect(function(inputs, optionals, sizes){
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
                                        new SensorWidget(name, widget_config, el_popup);
                                    });
                                }
                            }
                        });
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
                        if (!config.swap_axis) {
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
    };
});
