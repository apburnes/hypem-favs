'use strict';

var request = require('request');
var _ = require('lodash');

function HypemFavorites(username) {
  if (!(this instanceof HypemFavorites)) {
    return new HypemFavorites(username);
  }

  if (typeof username !== 'string') {
    return new Error('The username argument must be a string');
  }

  this.baseUrl = 'http://api.hypem.com';
  this.basePath = '/playlist/loved/';
  this.username = username;
  this.songs = [];
}

HypemFavorites.prototype.get = function getPage(page, callback) {
  if (typeof page === 'function') {
    callback = page;
    page = 1;
  }

  if (typeof page !== 'number') {
    return callback(new Error('First argument must be a number or callback function'));
  }

  var self = this;

  var options = {
    url: this.baseUrl.concat(this.basePath, this.username, '/json/', page, '/data.js'),
    json: true
  };

  request(options, function (err, res, data) {
    if (err) {
      return callback(err);
    }

    var keys = _.keys(data);

    var done = _.after(keys.length, function() {
      var response = _.assign({}, {
        statusCode: res.statusCode,
        username: self.username,
        songs: self.songs
      });

      callback(null, response);
    });

    _.map(data, function(value) {
      if (typeof value === 'object') {
        done();
        return self.songs.push(value);
      }

      return done();
    });
  });
}

HypemFavorites.prototype.getAll = function getAll(page, callback) {
  if (typeof page === 'function') {
    callback = page;
    page = 1;
  }

  var self = this;

  this.get(page, function(err, res) {
    if (err) {
      return callback(err);
    }

    if (res.statusCode !== 200) {
      return callback(null, self);
    }

    if (res.statusCode === 200) {
      var count = ++page;

      self.getAll(count, callback);
    }
  });
}

module.exports = HypemFavorites;
