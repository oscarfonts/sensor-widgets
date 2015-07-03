/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'leaflet', 'SensorWidget', 'widget-common', 'leaflet-label'], function(SOS, L, SensorWidget, common) {
    "use strict";

    return {
        inputs: common.inputs.concat(["features"]),
        optional_inputs: ["max_initial_zoom", "base_layer"].concat(common.optional_inputs),
        preferredSizes: [{w: 550, h: 400}],

        init: function(config, el) {

            // Main div
            var main_div = document.createElement("div");
            main_div.className = "map widget";
            el.appendChild(main_div);
        	
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
            
            var map = L.map(main_div, {
                layers: [baseLayer]
            });

            SOS.setUrl(config.service);
            read();

            function read() {
                SOS.getCapabilities(function(offerings) {
                    for (var i in offerings) {
                        var offering = offerings[i];
                        if (offering.identifier == config.offering) {
                            SOS.getFeatureOfInterest(offering.procedure[0], addFoIs);
                        }
                    }
                    function addFoIs(features) {
                        var geojson = L.geoJson(fois2geojson(features));
                        geojson.addTo(map);
                        map.fitBounds(geojson.getBounds(), {
                            maxZoom: config.max_initial_zoom ? parseInt(config.max_initial_zoom) : 14
                        });
                    }
                });
            }

            function isArray(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }

            function isInArray(value, array) {
                return array.indexOf(value) > -1;
            }

            function fois2geojson(fois) {
                var config_features = isArray(config.features) ? config.features : JSON.parse(config.features);
                var features = [];
                for (var i in fois) {
                    var foi = fois[i];
                    if (foi.geometry && (!config_features.length || isInArray(foi.identifier.value, config.features))) {
                        var feature = {
                            type: "Feature",
                            geometry: foi.geometry,
                            id: foi.identifier.value,
                            properties: {
                                name: foi.name.value
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
