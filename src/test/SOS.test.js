import { expect } from 'chai';
import sinon from 'sinon';

import SOS from '../js/SOS';

import getCapabilitiesXmlRequest from './fixtures/getCapabilitiesRequest.xml';
import getCapabilitiesXmlResponse from './fixtures/getCapabilitiesResponse.xml';
import getCapabilitiesJsonResponse from './fixtures/getCapabilitiesResponse.json';

const removeWhiteSpace = (str) => str.replace(/\s+/g, ' ').replace(/>[\t ]+</g, '><').trim();

let fakeServer;

before(() => {
  fakeServer = sinon.createFakeServer();
});

describe('SOS', () => {
  describe('#getCapabilities()', () => {
    it('should return a well-formatted capabilities document', () => {
      // GIVEN
      fakeServer.respondWith('POST', '/sos', [200, { 'Content-Type': 'application/xml' }, getCapabilitiesXmlResponse]);
      const onSuccess = sinon.spy();
      const onError = sinon.spy();

      // WHEN
      SOS.setUrl('/sos').getCapabilities(onSuccess, onError);
      fakeServer.respond();

      // THEN
      sinon.assert.calledWith(onSuccess, getCapabilitiesJsonResponse.contents);
      sinon.assert.notCalled(onError);

      expect(fakeServer.requests).to.have.lengthOf(1);
      expect(fakeServer.requests[0].requestBody)
        .to.equal(removeWhiteSpace(getCapabilitiesXmlRequest));
    });
  });
});

after(async () => {
  fakeServer.restore();
});
