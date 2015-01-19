/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'leaflet', 'proj4', 'proj4leaflet', 'leaflet-label'], function(SOS, L, proj4) {
    "use strict";

    proj4.defs("EPSG:23031", "+title= ED50 / UTM zone 31N +proj=utm +zone=31 +ellps=intl +units=m +no_defs +towgs84=-181.5,-90.3,-187.2,0.144,0.492,-0.394,17.57");

    var inputs = ["service", "offering", "features", "maxInitialZoom", "baseMap", "footnote"];
    var preferredSizes = Array({ 'w': 550, 'h': 400});
    
    var osmBase = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
        subdomains: '1234',
        title: 'djhgsdjhgdc',
        minZoom: 2,
        maxZoom: 14,
        attribution: '<a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a> | <a href="http://www.mapquest.com" target="_blank">MapQuest</a>'
    });
    
    var hyddaBase = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    	minZoom: 0,
    	maxZoom: 18,
    	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    
    var esriBase = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    
    var acetateBase = L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png', {
    	attribution: '&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
    	subdomains: '0123',
    	minZoom: 2,
    	maxZoom: 18
    });
    
    var baseMaps = {"osm": osmBase, "hydda": hyddaBase, "esri-sat": esriBase, "acetate": acetateBase};

    return {
        inputs: inputs,
        baseMaps: baseMaps,
        preferredSizes: preferredSizes, 
        init: function(config, el) {
            var map = L.map(el, {
                dragging: false,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                zoomControl: false
            }).setView([30, 0], 2);

            var selectedBase = baseMaps[config.baseMap];
            if(!selectedBase) selectedBase = baseMaps["osm"];
            selectedBase.addTo(map);
            
            if(config.footnote != undefined) map.attributionControl.addAttribution("<br>"+config.footnote);

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
                        var geojson = L.Proj.geoJson(fois2geojson(features), {
                            onEachFeature: function(feature, layer) {
                                if (feature.properties && feature.properties.name) {
                                    layer.bindLabel(feature.properties.name).addTo(map);
                                }
                            }
                        });
                        geojson.addTo(map);
                        map.fitBounds(geojson.getBounds(), {
                            maxZoom: config.maxInitialZoom ? parseInt(config.maxInitialZoom) : 14
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
                var crs = null;
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
                        // Transform CRS from link type to name type.
                        // See spec: http://geojson.org/geojson-spec.html#named-crs
                        // See impl: https://github.com/kartena/Proj4Leaflet#lprojgeojson
                        // Assumes the same CRS for all FoIs!!
                        if (!crs && feature.geometry.crs) {
                            crs = feature.geometry.crs;
                            if (crs.type == "link") {
                                var code = crs.properties.href.split("/").pop();
                                delete crs.properties.href;
                                crs.type = "name";
                                crs.properties.name = "EPSG:" + code;
                            }
                        }
                        delete feature.geometry.crs;
                        features.push(feature);
                    }
                }
                var featureCollection = {
                    type: "FeatureCollection",
                    features: features
                };
                // Assign 'global' CRS to the whole FeatureCollection (top-level structure)
                if (crs) {
                    featureCollection.crs = crs;
                }
                return featureCollection;
            }
        }
    };
});
