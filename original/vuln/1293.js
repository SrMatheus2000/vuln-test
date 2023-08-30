function patch(changes, x, options) {
	return patchInPlace(changes, clone(x), options);
}