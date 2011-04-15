/*!
 * expose.js
 * 
 * @author Oleg Slobodskoi
 * @website https://github.com/kof/expose.js
 * @licence Dual licensed under the MIT or GPL Version 2 licenses.
 */
function expose(namespace, api) {
    var env = {};
    
    if (typeof namespace !== 'string') {
        api = namespace;
        namespace = null;
    }
    
    // the global api of any environment
    // thanks to Nicholas C. Zakas
    // http://www.nczonline.net/blog/2008/04/20/get-the-javascript-global/
    env.global = (function(){
        return this;
    }).call(null);   
    
    // expose passed api as exports
    env.exports = api || {}; 

    // commonjs        
    if (typeof module !== 'undefined' && 
        typeof exports !== 'undefined' &&
        module.exports) {
        env.commonjs = true;
        env.module = module;
        module.exports = exports = env.exports;
    }
    
    // browser only
    if (typeof window !== 'undefined') {
        env.browser = true;
        // we are not in amd wrapper
        if (!env.commonjs && namespace && env.exports) {
            env.global[namespace] = env.exports;
        }
    }

    return env;
}