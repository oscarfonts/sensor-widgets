import { expect } from 'chai';
import XML from '../js/XML';

import getLatestObservationRequest from './fixtures/getLatestObservationsRequest.xml';

const removeWhiteSpace = (str) => str.replace(/\s+/g, ' ').replace(/>[\t ]+</g, '><').trim();

describe('XML', () => {
  describe('#read()', () => {
    it('reads simple XML', () => {
      // GIVEN
      const givenXml = '<xml><test>Hola</test></xml>';

      // WHEN
      const result = XML.read(givenXml);

      // THEN
      expect(result).to.deep.equal({ xml: { test: 'Hola' } });
    });

    it('reads XML with namespaces', () => {
      // WHEN
      const result = XML.read(getLatestObservationRequest);

      // THEN
      const expected = {
        'sos:GetObservation': {
          '@xmlns:sos': 'http://www.opengis.net/sos/2.0',
          '@xmlns:fes': 'http://www.opengis.net/fes/2.0',
          '@xmlns:gml': 'http://www.opengis.net/gml/3.2',
          '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          '@service': 'SOS',
          '@version': '2.0.0',
          '@xsi:schemaLocation': 'http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd',
          'sos:procedure': 'http://sensors.portdebarcelona.cat/def/weather/procedure',
          'sos:offering': 'http://sensors.portdebarcelona.cat/def/weather/offerings#1M',
          'sos:observedProperty': 'http://sensors.portdebarcelona.cat/def/weather/properties#33M',
          'sos:temporalFilter': {
            'fes:TEquals': {
              'fes:ValueReference': 'resultTime',
              'gml:TimeInstant': {
                '@gml:id': 'ti_1',
                'gml:timePosition': 'latest',
              },
            },
          },
          'sos:featureOfInterest': 'http://sensors.portdebarcelona.cat/def/weather/features#02',
          'sos:responseFormat': 'http://www.opengis.net/om/2.0',
        },
      };
      expect(result).to.deep.equal(expected);
    });

    it('reads XML without namespaces', () => {
      // WHEN
      const result = XML.read(getLatestObservationRequest, true);

      // THEN
      const expected = {
        GetObservation: {
          service: 'SOS',
          version: '2.0.0',
          schemaLocation: 'http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd',
          procedure: 'http://sensors.portdebarcelona.cat/def/weather/procedure',
          offering: 'http://sensors.portdebarcelona.cat/def/weather/offerings#1M',
          observedProperty: 'http://sensors.portdebarcelona.cat/def/weather/properties#33M',
          temporalFilter: {
            TEquals: {
              ValueReference: 'resultTime',
              TimeInstant: {
                id: 'ti_1',
                timePosition: 'latest',
              },
            },
          },
          featureOfInterest: 'http://sensors.portdebarcelona.cat/def/weather/features#02',
          responseFormat: 'http://www.opengis.net/om/2.0',
        },
      };
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#write()', () => {
    it('writes simple XML', () => {
      // GIVEN
      const givenObject = { xml: { test: 'Hola' } };

      // WHEN
      const result = XML.write(givenObject);

      // THEN
      expect(result).to.deep.equal('<xml><test>Hola</test></xml>');
    });

    it('writes XML with namespaces', () => {
      // GIVEN
      const givenObject = {
        'sos:GetObservation': {
          '@xmlns:sos': 'http://www.opengis.net/sos/2.0',
          '@xmlns:fes': 'http://www.opengis.net/fes/2.0',
          '@xmlns:gml': 'http://www.opengis.net/gml/3.2',
          '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          '@service': 'SOS',
          '@version': '2.0.0',
          '@xsi:schemaLocation': 'http://www.opengis.net/sos/2.0 http://schemas.opengis.net/sos/2.0/sos.xsd',
          'sos:procedure': 'http://sensors.portdebarcelona.cat/def/weather/procedure',
          'sos:offering': 'http://sensors.portdebarcelona.cat/def/weather/offerings#1M',
          'sos:observedProperty': 'http://sensors.portdebarcelona.cat/def/weather/properties#33M',
          'sos:temporalFilter': {
            'fes:TEquals': {
              'fes:ValueReference': 'resultTime',
              'gml:TimeInstant': {
                '@gml:id': 'ti_1',
                'gml:timePosition': 'latest',
              },
            },
          },
          'sos:featureOfInterest': 'http://sensors.portdebarcelona.cat/def/weather/features#02',
          'sos:responseFormat': 'http://www.opengis.net/om/2.0',
        },
      };

      // WHEN
      const result = XML.write(givenObject);

      // THEN
      const expected = removeWhiteSpace(getLatestObservationRequest);
      expect(result).to.equal(expected);
    });
  });
});
