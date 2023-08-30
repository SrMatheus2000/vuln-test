function cloneArray(array) {
	const result = array.slice(0, 0);

	getEnumerableOwnPropertyKeys(array).forEach(key => {
		result[key] = clone(array[key]);
	});

	return result;
}