function unique_name_364 (...args) {
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
	}