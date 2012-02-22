A simple Redis Cache using [node-redis](https://github.com/mranney/node_redis)

## NOTE: This is only meant to be used with local redis servers

# API

## Constructor

```javascript
var Cache = require('cacheit');
var cache = new Cache();
```

## cache.set(key, value, ttl, callback)

 * ```key``` - string 
 * ```value``` - string type only
 * ```ttl``` - time to live in ms (optional)
 * ```callback``` - optional

## cache.get(key, callback)

 ```key``` - string
 
Returns the string value or 'undefined' if the key is not found.

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

