/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import XML from './XML';

export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';
export const toArray = (payload) => (isArray(payload) ? payload : [payload]);

export default {
  _url: null,

  setUrl(url) {
    this._url = url;
    return this;
  },

  getCapabilities(callback, errorHandler) {
    const request = {
      'sos:GetCapabilities': {
        '@xmlns:sos': 'http://www.opengis.net/sos/2.0',
        '@xmlns:ows': 'http://www.opengis.net/ows/1.1',
        '@service': 'SOS',
        'ows:AcceptVersions': {
          'ows:Version': '2.0.0',
        },
        'ows:Sections': {
          'ows:Section': 'Contents',
        },
      },
    };

    this._send_xml(request, (response) => {
      const cleanResponse = response.Capabilities.contents.Contents.offering
        .map((offering) => offering.ObservationOffering)
        .map((offering) => ({
          ...offering,
          name: offering.name['#text'],
          procedure: toArray(offering.procedure),
          procedureDescriptionFormat: toArray(offering.procedureDescriptionFormat),
          observableProperty: toArray(offering.observableProperty),
          relatedFeature: offering.relatedFeature ? offering.relatedFeature.map((feature) => ({
            featureOfInterest: feature.FeatureRelationship.target.href,
            role: [],
          })) : undefined,
          observedArea: {
            lowerLeft: offering.observedArea.Envelope.lowerCorner.split(' ').map((coord) => Number(coord)),
            upperRight: offering.observedArea.Envelope.upperCorner.split(' ').map((coord) => Number(coord)),
            crs: {
              type: 'link',
              properties: {
                href: offering.observedArea.Envelope.srsName,
              },
            },
          },
          phenomenonTime: [
            offering.phenomenonTime.TimePeriod.beginPosition,
            offering.phenomenonTime.TimePeriod.endPosition,
          ],
          resultTime: [
            offering.resultTime.TimePeriod.beginPosition,
            offering.resultTime.TimePeriod.endPosition,
          ],
          responseFormat: toArray(offering.responseFormat),
          observationType: toArray(offering.observationType),
          featureOfInterestType: toArray(offering.featureOfInterestType),
        }));

      callback(cleanResponse);
    }, errorHandler);

    return this;
  },

  describeSensor(procedure, callback, errorHandler) {
    const request = {
      'swes:DescribeSensor': {
        '@xmlns:swes': 'http://www.opengis.net/swes/2.0',
        '@service': 'SOS',
        '@version': '2.0.0',
        'swes:procedure': 'http://sensors.portdebarcelona.cat/def/weather/procedure',
        'swes:procedureDescriptionFormat': 'http://www.opengis.net/sensorML/1.0.1',
      },
    };

    this._send_xml(request, (response) => {
      // Convert the SensorML description to a JSON object
      const cleanResponse = response.DescribeSensorResponse.description
        .SensorDescription.data.SensorML.member;
      callback(cleanResponse);
    }, errorHandler);

    return this;
  },

  getFeatureOfInterest(procedure, callback, errorHandler) {
    const request = {
      'sos:GetFeatureOfInterest': {
        '@xmlns:sos': 'http://www.opengis.net/sos/2.0',
        '@service': 'SOS',
        '@version': '2.0.0',
        'sos:procedure': 'http://sensors.portdebarcelona.cat/def/weather/procedure',
      },
    };

    this._send_xml(request, (response) => {
      const cleanResponse = response.GetFeatureOfInterestResponse.featureMember
        .map((feature) => feature.SF_SpatialSamplingFeature)
        .map((feature) => ({
          identifier: {
            codespace: '',
            value: feature.identifier['#text'],
          },
          name: {
            codespace: feature.name.codeSpace,
            value: feature.name['#text'],
          },
          sampledFeature: feature.sampledFeature.href,
          geometry: {
            // TODO this won't work for geometry types other than Point
            type: Object.keys(feature.shape)[0],
            coordinates: Object.values(feature.shape)[0].pos['#text'].split(' ').map((coord) => Number(coord)),
          },
        }));

      console.log(JSON.stringify(cleanResponse, null, 2));
      callback(cleanResponse);
    }, errorHandler);

    return this;
  },

  getDataAvailability(procedure, callback, errorHandler) {
    const request = {
      'sos:GetDataAvailability': {
        '@xmlns:sos': 'http://www.opengis.net/sos/2.0',
        '@service': 'SOS',
        '@version': '2.0.0',
        'sos:procedure': 'http://sensors.portdebarcelona.cat/def/weather/procedure',
      },
    };

    this._send_xml(request, (response) => {
      // Convert the description to a JSON object
      const members = response.GetDataAvailabilityResponse.dataAvailabilityMember;
      const cleanResponse = this._transform_attributes(members);

      callback(cleanResponse);
    }, errorHandler);

    return this;
  },

  _transform_attributes(members) {
    let dictionary = []
    for (let i = 0; i < members.length; i++) {
      Object.keys(members[i]).forEach(function(key) {
        if(key == 'phenomenonTime') {
          // save tp
          const phenomenon_time = members[i][key];
          if (phenomenon_time['TimePeriod']) {
            // reformat tp
            let formatted_tp = [phenomenon_time['TimePeriod']['beginPosition'], phenomenon_time['TimePeriod']['endPosition']]
            members[i][key] = formatted_tp
            // if id, save it in the dict
            if (phenomenon_time['TimePeriod'].id) dictionary[`#${phenomenon_time['TimePeriod'].id}`] = formatted_tp;
          }

          // if link, get it
          if(phenomenon_time.href) {
            members[i][key] = dictionary[phenomenon_time.href];
          }
        } else if (key == 'id') {
          //delete ids to match test data (TODO: extra ids should be allowed)
          delete members[i].id;
        } else {
          members[i][key] = members[i][key].href;
        }
      });
    }
    return members;
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

    this._send_json(request, ({ observations }) => {
      callback(observations);
    }, errorHandler);

    return this;
  },

  _send_json(request, onSuccess, onError) {
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

  _send_xml(request, onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let response = xhr.responseText;
        try {
          response = XML.read(response, true);
        } catch (e) {
          // OK, not XML
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
    xhr.setRequestHeader('Content-Type', 'application/xml');
    xhr.setRequestHeader('Accept', 'application/xml');
    xhr.send(XML.write(request));
  },
};
