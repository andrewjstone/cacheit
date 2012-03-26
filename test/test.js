var assert = require('assert');
var Cache = require('../cache');
var cache = new Cache();

describe('cacheit', function() {

  it('successfully caches a value', function(done) {
    cache.set('testkey', 'testval', 1, function(err) {
      assert.ok(!err);
      done();
    });
  });

  it('successfully retrieves a cached value', function(done) {
    cache.get('testkey', function(err, data) {
      assert.ok(!err); 
      assert.deepEqual(data, 'testval');
      done();
    });
  });

  it('expires after 2 seconds (1 sec plus margin of error)', function(done) {
    this.timeout(3000);
    setTimeout(function() {
      cache.get('testkey', function(err, data) {
        assert.ok(!err);
        assert.deepEqual(data, undefined);
        done();
      });
    }, 2000);
  });

  it('successfully caches and retrieves the same value', function(done) {
    cache.set('testkey', 'testval', function(err) {
      assert.ok(!err);
      cache.get('testkey', function(err, data) {
        assert.ok(!err);
        assert.deepEqual(data, 'testval');
        done();
      });
    });
  });

  it('successfully deletes the same value', function(done) {
    cache.delete('testkey', function(err) {
      assert.ok(!err);
      cache.get('testkey', function(err, data) {
        assert.ok(!err);
        assert.deepEqual(data, undefined);
        done();
      })
    });
  });

});
