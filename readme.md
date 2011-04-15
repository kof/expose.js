## expose.js is a commonjs boilerplate.

If you want your javascript code can be used in browser and on the server within [commonjs](http://commonjs.org) - you have to consider a lot of things.

There are actually 3 enviroments we need to take care about:

1. browser env. with default behaviour
2. browser env. while using [AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) wrapper
3. serverside env. f.e. [nodejs](http://nodejs.org)

Differences:

1. in default browser you have no `module`, `exports` and `module.exports` objects and `this` references the `window` object.
2. in browser using AMD wrapper you might be able to use `module`, `exports`, `module.exports`, `setExports` and `this` can reference `exports` or `window` object. It depends on loader implementation.
3. in nodejs you have `module`, `exports`, `module.exports` and `this` references to `exports`.

expose.js is a tiny function, which takes care about all this differences and provides an api for all enviroments.

You can copy this function into your library or add it during build process.

## API

### env = expose(namespace, api);

`expose` will detect the environment and depending on it, export your api.

- `namespace` is an optional string and is used to attach your `api` object to `window`. You should use it if you want to support browsers without AMD.
- `api` is also optional and is the object you want to export.
- `env` is always an object.

Example `env` object:

	{
		commmonjs: true, // is `true` if you are inside of commonjs env. - amd or ss
		browser: true, // is `true` if you are in the browser
		global: global, // always correct global object in any env.
		exports: api, // your api object or the empty exports object
		module: module // is set if you are in commonjs env.
	}

## Examples

get the env.

	var env = expose();
	
get the env. and create a global namespace if needed.

	var env = expose('mylib');
	var exports = env.exports;
	var	global = env.global;
	exports.myMethod = function(){
		global.setTimeout; // always correct global
	};

export the library

	var $ = {};
	
	$.myMethod = function(){};
	
	expose('mylib', $);
	
		 		