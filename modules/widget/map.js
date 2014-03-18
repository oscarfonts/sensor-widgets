/**
 * @author Oscar Fonts <oscar.fonts@geomati.co>
 */
define(['SOS', 'leaflet', 'proj4', 'proj4leaflet', 'leaflet-label'], function(SOS, L, proj4) {

	proj4.defs("EPSG:23031", "+title= ED50 / UTM zone 31N +proj=utm +zone=31 +ellps=intl +units=m +no_defs +towgs84=-181.5,-90.3,-187.2,0.144,0.492,-0.394,17.57");

	var inputs = ["service", "offering"];
	var map;

	return {
		inputs: inputs,
		init: function(config, renderTo) {
			renderTo.innerHTML = '<div class="widget"><div id="map" style="height:100%;"></div></div>';

			map = L.map('map').setView([30, 0], 2);

			L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
				subdomains: '1234',
				minZoom: 2,
				maxZoom: 17,
				attribution: 'Map data © <a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
			}).addTo(map); 

			SOS.setUrl(config.service);
			read();

			function read() {
				SOS.getCapabilities(function(offerings) {
					for (i in offerings) {
						var offering = offerings[i];
						if (offering.identifier == config.offering) {
							SOS.getFeatureOfInterest(offering.procedure[0], function(features) {
								var geojson = L.Proj.geoJson(fois2geojson(features), {
									onEachFeature: function(feature, layer) {
										if (feature.properties && feature.properties.name) {
											layer.bindLabel(feature.properties.name).addTo(map);
											//layer.bindPopup(feature.properties.name);
										}
									}
								});
								geojson.addTo(map);
								map.fitBounds(geojson.getBounds());
							});
						}
					}
				});
			}

			function fois2geojson(fois) {
				var features = [];
				for (var i in fois) {
					var foi = fois[i];
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
					if (feature.geometry.crs) {
						var crs = feature.geometry.crs;
						if (crs.type == "link") {
							var code = crs.properties.href.split("/").pop();
							delete feature.geometry.crs;
							delete crs.properties.href;
							crs.type = "name";
							crs.properties.name = "EPSG:" + code;
							feature.crs = crs;
						}
					}
					features.push(feature);
				}
				return {
					type: "FeatureCollection",
					features: features
				};
			}

			/*
			function draw(geojson) {
				renderTo.innerHTML = "<pre>" + JSON.stringify(geojson) + "</pre>";
			};
			*/
		}
	};
});
