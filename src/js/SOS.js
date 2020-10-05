/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import XML from './XML';

export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';
export const toArray = (payload) => (isArray(payload) ? payload : [payload]);
export const isObject = (val) => (typeof val === 'object');

function resolveXmlLocalHrefs(document) {
  const hrefs = {};

  const resolve = (part) => {
    if (isArray(part)) {
      return part.map((item) => resolve(item));
    }

    if (!isObject(part)) {
      return part;
    }

    const resolvedObject = {};

    Object.entries(part).forEach(([key, value]) => {
      if (value.id) {
        hrefs[value.id] = { [key]: resolve(value) };
      }
      if (value.href && value.href.startsWith('#')) {
        const { href, ...val } = value;
        resolvedObject[key] = {
          ...val,
          ...hrefs[href.substring(1)],
        };
      } else {
        resolvedObject[key] = resolve(value);
      }
    });

    return resolvedObject;
  };

  return resolve(document);
}

function sendXml(url, request, onSuccess, onError) {
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
        onSuccess.call(null, resolveXmlLocalHrefs(response));
      } else if (onError) {
        onError.call(null, xhr.statusText, url, request, response);
      }
    }
  };

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/xml');
  xhr.setRequestHeader('Accept', 'application/xml');
  xhr.send(XML.write(request));
}

function sendJson(url, request, onSuccess, onError) {
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
        onSuccess.call(null, response);
      } else if (onError) {
        onError.call(null, xhr.statusText, url, request, response);
      }
    }
  };

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send(JSON.stringify(request));
}

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

    sendXml(this._url, request, (response) => {
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

    sendXml(this._url, request, (response) => {
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

    sendXml(this._url, request, (response) => {
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

      callback(cleanResponse);
    }, errorHandler);

    return this;
  },

  getDataAvailability(procedure, offering, features, properties, callback, errorHandler) {
    const request = {
      'gda:GetDataAvailability': {
        '@xmlns:gda': 'http://www.opengis.net/sosgda/1.0',
        '@service': 'SOS',
        '@version': '2.0.0',
        'gda:procedure': 'http://sensors.portdebarcelona.cat/def/weather/procedure',
        ...(procedure && { 'gda:procedure': procedure }),
        ...(offering && { 'gda:offering': offering }),
        ...(features && features.length && { 'gda:featureOfInterest': features }),
        ...(properties && properties.length && { 'gda:observedProperty': properties }),
      },
    };

    sendXml(this._url, request, (response) => {
      const cleanResponse = response.GetDataAvailabilityResponse.dataAvailabilityMember
        .map((member) => ({
          featureOfInterest: member.featureOfInterest.href,
          procedure: member.procedure.href,
          observedProperty: member.observedProperty.href,
          phenomenonTime: [
            member.phenomenonTime.TimePeriod.beginPosition,
            member.phenomenonTime.TimePeriod.endPosition,
          ],
        }));

      callback(cleanResponse);
    }, errorHandler);

    return this;
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

    sendJson(this._url, request, ({ observations }) => {
      callback(observations);
    }, errorHandler);

    return this;
  },
};
