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
      if (xhr.status === 200 && !response.ExceptionReport) {
        onSuccess.call(null, resolveXmlLocalHrefs(response));
      } else if (onError) {
        const errorMessage = response.ExceptionReport
          ? response.ExceptionReport.Exception.ExceptionText
          : xhr.statusText;
        onError.call(null, errorMessage, url, request, response);
      }
    }
  };

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/xml');
  xhr.setRequestHeader('Accept', 'application/xml');
  xhr.send(XML.write(request));
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
          relatedFeature: offering.relatedFeature
            ? toArray(offering.relatedFeature).map((feature) => ({
              featureOfInterest: feature.FeatureRelationship.target.href,
              role: [],
            }))
            : undefined,
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
      const cleanResponse = toArray(response.GetFeatureOfInterestResponse.featureMember)
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
        ...(procedure && { 'gda:procedure': procedure }),
        ...(offering && { 'gda:offering': offering }),
        ...(features && features.length && { 'gda:featureOfInterest': features }),
        ...(properties && properties.length && { 'gda:observedProperty': properties }),
      },
    };

    sendXml(this._url, request, (response) => {
      const cleanResponse = toArray(response.GetDataAvailabilityResponse.dataAvailabilityMember)
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
    let temporalFilter;
    if (time) {
      if (time.length && time.length === 2) {
        temporalFilter = {
          'fes:During': {
            'fes:ValueReference': 'resultTime',
            'gml:TimePeriod': {
              '@gml:id': 'tp_1',
              'gml:beginPosition': time[0],
              'gml:endPosition': time[1],
            },
          },
        };
      } else {
        temporalFilter = {
          'fes:TEquals': {
            'fes:ValueReference': 'resultTime',
            'gml:TimeInstant': {
              '@gml:id': 'ti_1',
              'gml:timePosition': time,
            },
          },
        };
      }
    }

    const request = {
      'sos:GetObservation': {
        '@xmlns:sos': 'http://www.opengis.net/sos/2.0',
        '@xmlns:fes': 'http://www.opengis.net/fes/2.0',
        '@xmlns:gml': 'http://www.opengis.net/gml/3.2',
        '@service': 'SOS',
        '@version': '2.0.0',
        ...(offering && { 'sos:offering': offering }),
        ...(properties && properties.length && { 'sos:observedProperty': properties }),
        ...(temporalFilter && { 'sos:temporalFilter': temporalFilter }),
        ...(features && features.length && { 'sos:featureOfInterest': features }),
      },
    };

    sendXml(this._url, request, (response) => {
      if (!response.GetObservationResponse.observationData) {
        callback([]);
      } else {
        const cleanResponse = toArray(response.GetObservationResponse.observationData)
          .map((observation) => observation.OM_Observation)
          .map((observation) => ({
            procedure: observation.procedure.href,
            observableProperty: observation.observedProperty.href,
            featureOfInterest: {
              identifier: {
                codespace: 'http://www.opengis.net/def/nil/OGC/0/unknown',
                value: observation.featureOfInterest.href,
              },
              name: {
                codespace: 'http://www.opengis.net/def/nil/OGC/0/unknown',
                value: observation.featureOfInterest.title,
              },
            },
            phenomenonTime: observation.phenomenonTime.TimeInstant
              ? observation.phenomenonTime.TimeInstant.timePosition
              : [observation.phenomenonTime.TimePeriod.beginPosition,
                observation.phenomenonTime.TimePeriod.endPosition],
            resultTime: observation.resultTime.TimeInstant.timePosition,
            result: {
              uom: observation.result.uom,
              value: Number(observation.result['#text']),
            },
          }));
        callback(cleanResponse);
      }
    }, errorHandler);

    return this;
  },
};
