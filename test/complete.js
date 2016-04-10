var expect = require('chai').expect;
var bitws = require('../dist/bitws-js.js');
var bitwsMin = require('../dist/bitws-js.min.js');

describe('Complete Test', function() {

  it("should create a JWS message and validate it", function() {
    var data = bitws.deriveKeys('some user', 'some pwd');
    expect(data).to.have.property('key');
    expect(data).to.have.property('payload');

    var payload = {data: data.payload};
    var raw = bitws.signSerialize(null, payload, data.key.sign);

    var decoded = bitws.validateDeserialize(null, raw);
    expect(decoded).to.have.property("header");
    expect(decoded).to.have.property("payload");

    expect(decoded.header).to.have.property("kid");
    expect(decoded.header.kid).to.be.equal(data.key.sign.address);

    expect(decoded.payload).to.have.property("aud");
    expect(decoded.payload.aud).to.be.null;
  });

  it("should provide the same keys", function() {
    var data = bitws.deriveKeys('some user', 'some pwd');
    var data2 = bitws.deriveKeys(
      'some user', 'some pwd', data.payload.iterations, data.payload.salt);

    expect(data2.payload.salt).to.be.equal(data.payload.salt);
    expect(data2.key.address).to.be.equal(data.key.address);
    expect(data2.key.encKey).to.be.equal(data.key.encKey);
  });

});

describe('Complete Test on .min file', function() {

  it("should create a JWS message and validate it", function() {
    var data = bitwsMin.deriveKeys('some user', 'some pwd');
    expect(data).to.have.property('key');
    expect(data).to.have.property('payload');

    var payload = {data: data.payload};
    var raw = bitwsMin.signSerialize(null, payload, data.key.sign);

    var decoded = bitwsMin.validateDeserialize(null, raw);
    expect(decoded).to.have.property("header");
    expect(decoded).to.have.property("payload");

    expect(decoded.header).to.have.property("kid");
    expect(decoded.header.kid).to.be.equal(data.key.sign.address);

    expect(decoded.payload).to.have.property("aud");
    expect(decoded.payload.aud).to.be.null;
  });

  it("should provide the same keys", function() {
    var data = bitwsMin.deriveKeys('some user', 'some pwd');
    var data2 = bitwsMin.deriveKeys(
      'some user', 'some pwd', data.payload.iterations, data.payload.salt);

    expect(data2.payload.salt).to.be.equal(data.payload.salt);
    expect(data2.key.address).to.be.equal(data.key.address);
    expect(data2.key.encKey).to.be.equal(data.key.encKey);
  });

});