function unique_name_266 (req) {
	if (req.body && req.body[exports.TOKEN_KEY]) {
		return req.body[exports.TOKEN_KEY];
	} else if (req.query && req.query[exports.TOKEN_KEY]) {
		return req.query[exports.TOKEN_KEY];
	} else if (req.headers && req.headers[exports.XSRF_HEADER_KEY]) {
		return req.headers[exports.XSRF_HEADER_KEY];
	} else if (req.headers && req.headers[exports.CSRF_HEADER_KEY]) {
		return req.headers[exports.CSRF_HEADER_KEY];
	} else if (req.cookies && req.cookies[exports.XSRF_COOKIE_KEY]) {
		return req.cookies[exports.XSRF_COOKIE_KEY];
	}
	return '';
}