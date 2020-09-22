/* eslint-disable no-param-reassign */
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import SensorWidget from '../SensorWidget';
import i18n from '../i18n';
import SOS from '../SOS';
import 'leaflet/dist/leaflet.css';
import common from '../widget-common';
// import 'leaflet.markercluster';

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
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default {
  inputs: common.inputs.concat(['features', 'properties']),
  optional_inputs: ['permanent_tooltips', 'popup_widget', 'no_clustering', 'swap_axis', 'max_initial_zoom', 'base_layer'].concat(common.optional_inputs),
  preferredSizes: [{ w: 550, h: 400 }],

  init(config, el, errorHandler) {
    el.innerHTML = i18n.t('Loading...');
    // load widget common features
    common.init(config, el);

    let baseLayer;
    if (config.base_layer) {
      const params = (typeof config.base_layer === 'string' || config.base_layer instanceof String) ? JSON.parse(config.base_layer) : config.base_layer;
      if (params.type && params.type.toUpperCase() === 'WMS') {
        // WMS Layer
        baseLayer = L.tileLayer.wms(params.url, params.options);
      } else {
        // XYZ TileLayer
        baseLayer = L.tileLayer(params.url, params.options);
      }
    } else {
      // A default base layer, taken from http://leaflet-extras.github.io/leaflet-providers/preview/
      baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      });
    }

    // Add footnote to attribution string
    if (config.footnote) {
      baseLayer.options.attribution += ` | <b>${config.footnote}</b>`;
    }

    // Parse popup configuration
    if (typeof config.popup_widget === 'string' || config.popup_widget instanceof String) {
      config.popup_widget = JSON.parse(config.popup_widget);
    }

    function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isInArray(value, array) {
      return array.indexOf(value) > -1;
    }

    function swapAxis(geometry) {
      const ret = [];
      for (let i = 0; i < geometry.length; i += 1) {
        if (isArray(geometry[i])) {
          ret[i] = swapAxis(geometry[i]);
        } else if (!i % 2) {
          ret[i] = geometry[i + 1];
          ret[i + 1] = geometry[i];
        }
      }
      return ret;
    }

    function fois2geojson(fois) {
      const configFeatures = isArray(config.features)
        ? config.features
        : JSON.parse(config.features);
      const features = [];
      Object.keys(fois).forEach((i) => {
        const foi = fois[i];
        if (foi.geometry
          && (!configFeatures.length || isInArray(foi.identifier.value, config.features))
        ) {
          if (config.swap_axis) {
            foi.geometry.coordinates = swapAxis(foi.geometry.coordinates);
          }
          const feature = {
            type: 'Feature',
            geometry: foi.geometry,
            id: foi.identifier.value,
            properties: {
              name: foi.name ? foi.name.value : foi.identifier.value,
            },
          };
          features.push(feature);
        }
      });
      return {
        type: 'FeatureCollection',
        features,
      };
    }

    function read() {
      SOS.getCapabilities((offerings) => {
        function addFoIs(features) {
          // Map div
          el.innerHTML = '';
          const mapDiv = document.createElement('div');
          mapDiv.className = 'map widget';
          el.appendChild(mapDiv);

          const map = L.map(mapDiv, {
            layers: [baseLayer],
          }).setView([0, 0], 2);

          // Clustering
          // var featureContainer;
          // if (config.no_clustering) {
          //    featureContainer = map;
          // } else {
          //   featureContainer = L.markerClusterGroup({
          //        showCoverageOnHover: false,
          //        maxClusterRadius: 50
          //    });
          //    map.addLayer(featureContainer);
          // }

          const geojson = L.geoJson(fois2geojson(features), {
            onEachFeature(feature, layer) {
              // OnClick event
              if (config.on_click) {
                layer.on('click', (e) => {
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
                const elPopup = document.createElement('div');
                const widgetConfig = JSON.parse(JSON.stringify(config.popup_widget));
                const { name } = widgetConfig;
                delete widgetConfig.name;
                widgetConfig.service = config.service;
                widgetConfig.offering = config.offering;
                new SensorWidget(name).inspect((inputs, optionals, sizes) => {
                  if (inputs.indexOf('feature') !== -1) {
                    widgetConfig.feature = feature.id;
                  } else if (inputs.indexOf('features') !== -1) {
                    widgetConfig.features = [feature.id];
                  }
                  layer.bindPopup(elPopup, {
                    minWidth: sizes[0].w,
                    minHeight: sizes[0].h,
                  });
                  elPopup.setAttribute('style', `width:${sizes[0].w}px;height:${sizes[0].h}px;`);
                  SensorWidget(name, widgetConfig, elPopup);
                });
              }
            },
          });
          map.addLayer(geojson);
          map.fitBounds(geojson.getBounds(), {
            maxZoom: config.max_initial_zoom ? parseInt(config.max_initial_zoom, 10) : 14,
          });
        }

        Object.keys(offerings).forEach((i) => {
          const offering = offerings[i];
          if (offering.identifier === config.offering) {
            SOS.getFeatureOfInterest(offering.procedure[0], addFoIs, errorHandler);
          }
        });
      }, errorHandler);
    }

    SOS.setUrl(config.service);
    read();
  },
};
