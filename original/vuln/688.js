function(t,e,n,r){void 0===n&&(n=!1);var i={before:e,after:t,inc:n};if(r)return this._iter(new Y("between",i,r));var o=this._cacheGet("between",i);return!1===o&&(o=this._iter(new x("between",i)),this._cacheAdd("between",o,i)),o}