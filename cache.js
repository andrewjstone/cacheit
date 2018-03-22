var redis = require('redis');

var Cache = module.exports = function() {
  var self = this;
  this.client = redis.createClient({detect_buffers: true});
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

Cache.prototype.setHash = 
Cache.prototype.set = function(key, value, ttl, callback) {
  if (typeof ttl === 'function') {
    callback = ttl;
    ttl = this.default_ttl;
  }
  ttl = ttl || this.default_ttl;

  var self = this;
  var op = typeof value === 'string' || value instanceof Buffer ? 'set' : 'hmset';
  this.client[op](key, value, function(err) {
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

Cache.prototype.delete = function(key, callback) {
  this.client.del(key, function(err) {
    if (err) {
      self.errors++;
      return callback(err);
    }
    callback(null);
  });
};

Cache.prototype.getHash = function(key, callback) {
  this._get(key, 'hgetall', callback);
};

Cache.prototype.get = function(key, callback) {
  this._get(key, 'get', callback);
};

Cache.prototype._get = function(key, op, callback) {
  var self = this;
  this.client[op](key, function(err, value) {
    if (err) {
      self.errors++;
      return callback(err);
    }
    if (!value) {
      self.misses++;
      return callback();
    }
    self.hits++;
    return callback(err, value);
  });
};

Cache.prototype.total_keys = function(callback) {
  this.client.dbsize(callback); 
};
