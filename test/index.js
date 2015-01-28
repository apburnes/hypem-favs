'use strict';

var chai = require('chai');
var expect = chai.expect;

var HypemFavs = require('../index');

var username = 'bizzurnzz';
var baseUrl = 'http://api.hypem.com';
var basePath = '/playlist/loved/';
var page = 1;

var invalidUser = [
  {},
  [],
  Date.now(),
  1,
  function(){}
];

describe('HypemFavs Instance', function() {
  it('should return an instance of HypemFavs', function() {
    return expect(HypemFavs(username)).to.be.instanceof(HypemFavs);
  });

  it('should return this.username which equals the input username arg', function() {
    return expect(HypemFavs(username).username).to.be.equal(username);
  });

  it('should return valid url base and path constants', function() {
    expect(HypemFavs(username).baseUrl).to.be.equal(baseUrl);
    expect(HypemFavs(username).basePath).to.be.equal(basePath);
  });

  it('should return this.songs as an empty array', function() {
    expect(HypemFavs(username).songs).to.be.instanceof(Array);
    expect(HypemFavs(username).songs).to.have.length(0);
  });

  it('should reject with an invalid username data type', function() {
    invalidUser.map(function(value) {
      return expect(HypemFavs(value)).to.be.instanceof(Error);
    });
  });
});

describe('HypemFavs Get Data', function() {
  it('should return a successful JSON response', function(done) {
    var Favs = HypemFavs(username);

    Favs.get(page, function(err, data) {
      expect(data).to.be.an('object');
      done(err);
    });
  });

  it('should return all of the favorites data', function(done) {
    var Favs = HypemFavs(username);

    Favs.getAll(function(err, data) {
      expect(data).to.be.an('object');
      done(err);
    });
  });
});
