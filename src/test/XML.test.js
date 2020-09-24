import { expect } from 'chai';
import XML from '../js/XML';

describe('XML', () => {
  describe('#read()', () => {
    it('should convert XML string to JSON object', () => {
      // GIVEN
      const givenXml = '<xml><test>Hola</test></xml>';

      // WHEN
      const result = XML.read(givenXml);

      // THEN
      expect(result).to.deep.equal({ xml: { test: 'Hola' } });
    });
  });

  describe('#write()', () => {
    it('should convert JSON object to XML string', () => {
      // GIVEN
      const givenObject = { xml: { test: 'Hola' } };

      // WHEN
      const result = XML.write(givenObject);

      // THEN
      expect(result).to.deep.equal('<xml><test>Hola</test></xml>');
    });
  });
});
