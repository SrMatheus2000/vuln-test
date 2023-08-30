(fn, options) => {
	options = Object.assign({
		cacheKey: defaultCacheKey,
		cache: new Map(),
		cachePromiseRejection: false
	}, options);

	const {cache} = options;
	const noMaxAge = typeof options.maxAge !== 'number';
	options.maxAge = options.maxAge || 0;

	const setData = (key, data) => {
		cache.set(key, {
			data,
			maxAge: Date.now() + options.maxAge
		});
	};

	const memoized = function (...args) {
		const key = options.cacheKey(...args);

		if (cache.has(key)) {
			const c = cache.get(key);

			if (noMaxAge || Date.now() < c.maxAge) {
				return c.data;
			}

			cache.delete(key);
		}

		const ret = fn.call(this, ...args);

		setData(key, ret);

		if (isPromise(ret) && options.cachePromiseRejection === false) {
			// Remove rejected promises from cache unless `cachePromiseRejection` is set to `true`
			ret.catch(() => cache.delete(key));
		}

		return ret;
	};

	mimicFn(memoized, fn);

	cacheStore.set(memoized, options.cache);

	return memoized;
}