var redis = require('redis');

var Cache = module.exports = function() {
  var self = this;
  this.client = redis.createClient();
  this.client.on('error', function(err) {
    console.error('redis client error'+err);
    throw(err);
  });
  this.client.on('end', function() {
    self.disconnects++;
    self.connected = false;
  });
  this.client.on('connect', function() {
    self.connects++;
    self.connected = true;
  });
  this.hits = 0;
  this.misses = 0;
  this.errors = 0;
  this.default_ttl = 300; // 5 minutes 
  this.disconnects = 0;
  this.connects = 0;
  this.connected = false;
};

Cache.prototype.set = function(key, value, ttl, callback) {
  if (typeof ttl === 'function') {
    callback = ttl;
    ttl = this.default_ttl;
  }
  ttl = ttl || this.default_ttl;

  var self = this;
  this.client.set(key, value, function(err) {
    if (err) {
      self.errors++;
      return callback(err);
    }
    self.client.expire(key, ttl, function(err) {
      if (err) self.errors++;
      if (callback) callback(err);
    });
  });
};

Cache.prototype.get = function(key, callback) {
  var self = this;
  this.client.get(key, function(err, recommendations) {
    if (err) {
      self.errors++;
      return callback(err);
    }
    if (!recommendations) {
      self.misses++;
      return callback();
    }
    self.hits++;
    return callback(err, recommendations);
  });
};

Cache.prototype.total_keys = function(callback) {
  this.client.dbsize(callback); 
};
