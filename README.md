[![build status](https://secure.travis-ci.org/andrewjstone/cacheit.png)](http://travis-ci.org/andrewjstone/cacheit)
A simple Redis Cache using [node-redis](https://github.com/mranney/node_redis)

## NOTE: This is only meant to be used with local redis servers

# API

## Constructor

```javascript
var Cache = require('cacheit');
var cache = new Cache();
```

## cache.set(key, value, [ttl], [callback])

 * ```key``` - string 
 * ```value``` - string or hash object (must be flat) 
 * ```ttl``` - time to live in m 
 * ```callback```

## cache.setHash(key, valuue, [ttl], [callback])
An alias for cache.set. This is just for symmetry with cache.getHash.

## cache.get(key, callback)

 ```key``` - string
 
Returns the string value or 'undefined' if the key is not found.

## cache.getHash(key, callback)

  ```key``` - string

Returns the entire hash object using the redis 'HGETALL' command.

## cache.delete(key, callback)

  ```key``` - string

Deletes the key using the redis 'DEL' command.

## cache.total_keys(callback)

Returns the total number of keys currently cached

# Properties 

 * ```cache.client``` - access the raw redis client 
 * ```cache.hits```
 * ```cache.misses```
 * ```cache.errors```
 * ```cache.default_ttl```
 * ```cache.connects```
 * ```cache.disconnects```
 * ```cache.connected```

# Tests
Ensure you have a local version of redis running.

Install mocha
    
    npm install mocha

Run tests

    cd test
    mocha test.js --reporter spec
