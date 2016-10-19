var chai = require('chai');
var assert = chai.assert;
var helpers = require('./helpers');

describe('Helpers', function() {
    it('asciiToHex() convert an ASCII character in Hexadecimal', function() {
        assert.equal(helpers.asciiToHex(5), '0x35');
    });
    it('asciiToHex() convert an array of ASCII character in Hexadecimal', function() {
        assert.deepEqual(helpers.asciiToHex([0, 1, 2]), ['0x30', '0x31', '0x32']);
    });

    it('checksum() calculate an array of ASCII character checksum', function() {
        let chars = [0x30,0x35,0x30,0x34,0x31];
        let expected_checksum = [0x46,0x41];
        assert.deepEqual(helpers.checksum(chars), expected_checksum);
    });
});
