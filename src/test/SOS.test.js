import { expect } from 'chai';
import sinon from 'sinon';

import SOS from '../js/SOS';

import getCapabilitiesXmlRequest from './fixtures/getCapabilitiesRequest.xml';
import getCapabilitiesXmlResponse from './fixtures/getCapabilitiesResponse.xml';
import getCapabilitiesJsonResponse from './fixtures/getCapabilitiesResponse.json';

import describeSensorXmlRequest from './fixtures/describeSensorRequest.xml';
import describeSensorXmlResponse from './fixtures/describeSensorResponse.xml';
import describeSensorJsonResponse from './fixtures/describeSensorResponse.json';

import getFeatureOfInterestXmlRequest from './fixtures/getFeatureOfInterestRequest.xml';
import getFeatureOfInterestXmlResponse from './fixtures/getFeatureOfInterestResponse.xml';
import getFeatureOfInterestJsonResponse from './fixtures/getFeatureOfInterestResponse.json';

import getDataAvailabilityXmlRequest from './fixtures/getDataAvailabilityRequest.xml';
import getDataAvailabilityXmlResponse from './fixtures/getDataAvailabilityResponse.xml';
import getDataAvailabilityJsonResponse from './fixtures/getDataAvailabilityResponse.json';

const removeWhiteSpace = (str) => str.replace(/\s+/g, ' ').replace(/>[\t ]+</g, '><').trim();

let fakeServer;

beforeEach(() => {
  fakeServer = sinon.createFakeServer();
});

describe('SOS', () => {
  describe('#getCapabilities()', () => {
    it('should return a well-formatted capabilities object', () => {
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

  describe('#getFeatureOfInterest()', () => {
    it('should return a well-formatted feature collection object', () => {
      // GIVEN
      const givenProcedure = 'http://sensors.portdebarcelona.cat/def/weather/procedure';
      fakeServer.respondWith('POST', '/sos', [200, { 'Content-Type': 'application/xml' }, getFeatureOfInterestXmlResponse]);
      const onSuccess = sinon.spy();
      const onError = sinon.spy();

      // WHEN
      SOS.setUrl('/sos').getFeatureOfInterest(givenProcedure, onSuccess, onError);
      fakeServer.respond();

      // THEN
      sinon.assert.calledWith(onSuccess, getFeatureOfInterestJsonResponse);
      sinon.assert.notCalled(onError);

      expect(fakeServer.requests).to.have.lengthOf(1);
      expect(fakeServer.requests[0].requestBody)
        .to.equal(removeWhiteSpace(getFeatureOfInterestXmlRequest));
    });
  });

  describe('#getDataAvailability()', () => {
    it('should return a well-formatted dataAvailabilityMember collection object', () => {
      // GIVEN
      const givenProcedure = 'http://sensors.portdebarcelona.cat/def/weather/procedure';
      fakeServer.respondWith('POST', '/sos', [200, { 'Content-Type': 'application/xml' }, getDataAvailabilityXmlResponse]);
      const onSuccess = sinon.spy();
      const onError = sinon.spy();

      // WHEN
      SOS.setUrl('/sos').getDataAvailability(givenProcedure, onSuccess, onError);
      fakeServer.respond();

      // THEN
      sinon.assert.calledWith(onSuccess, getDataAvailabilityJsonResponse);
      sinon.assert.notCalled(onError);

      expect(fakeServer.requests).to.have.lengthOf(1);
      expect(fakeServer.requests[0].requestBody)
        .to.equal(removeWhiteSpace(getDataAvailabilityXmlRequest));
    });
  });
});

afterEach(async () => {
  fakeServer.restore();
});
