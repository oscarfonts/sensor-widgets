import { expect } from 'chai';
import sinon from 'sinon';

import SOS from '../js/SOS';

import getCapabilitiesXmlRequest from './fixtures/getCapabilitiesRequest.xml';
import getCapabilitiesXmlResponse from './fixtures/getCapabilitiesResponse.xml';
import getCapabilitiesJsonResponse from './fixtures/getCapabilitiesResponse.json';

import describeSensorXmlRequest from './fixtures/describeSensorRequest.xml';
import describeSensorXmlResponse from './fixtures/describeSensorResponse.xml';
import describeSensorJsonResponse from './fixtures/describeSensorResponse.json';

const removeWhiteSpace = (str) => str.replace(/\s+/g, ' ').replace(/>[\t ]+</g, '><').trim();

let fakeServer;

beforeEach(() => {
  fakeServer = sinon.createFakeServer();
});

describe('SOS', () => {
  describe('#getCapabilities()', () => {
    it('should return a well-formatted capabilities object',() => {
      // GIVEN
      fakeServer.respondWith('POST', '/sos', [200, { 'Content-Type': 'application/xml' }, getCapabilitiesXmlResponse]);
      const onSuccess = sinon.spy();
      const onError = sinon.spy();

      // WHEN
      SOS.setUrl('/sos').getCapabilities(onSuccess, onError);
      fakeServer.respond();

      // THEN
      sinon.assert.calledWith(onSuccess, getCapabilitiesJsonResponse);
      sinon.assert.notCalled(onError);

      expect(fakeServer.requests).to.have.lengthOf(1);
      expect(fakeServer.requests[0].requestBody)
        .to.equal(removeWhiteSpace(getCapabilitiesXmlRequest));
    });
  });

  describe('#describeSensor()', () => {
    it('should return a well-formatted SensorML object', () => {
      // GIVEN
      const givenProcedure = 'http://sensors.portdebarcelona.cat/def/weather/procedure';
      fakeServer.respondWith('POST', '/sos', [200, { 'Content-Type': 'application/xml' }, describeSensorXmlResponse]);
      const onSuccess = sinon.spy();
      const onError = sinon.spy();

      // WHEN
      SOS.setUrl('/sos').describeSensor(givenProcedure, onSuccess, onError);
      fakeServer.respond();

      // THEN
      sinon.assert.calledWith(onSuccess, describeSensorJsonResponse);
      sinon.assert.notCalled(onError);

      expect(fakeServer.requests).to.have.lengthOf(1);
      expect(fakeServer.requests[0].requestBody)
        .to.equal(removeWhiteSpace(describeSensorXmlRequest));
    });
  });
});

afterEach(async () => {
  fakeServer.restore();
});
