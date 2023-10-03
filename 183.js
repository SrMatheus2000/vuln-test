(obj, path, options = {}, tracking = {}) => {
	let internalPath = path;
	
	options = {
		"transformRead": returnWhatWasGiven,
		"transformKey": returnWhatWasGiven,
		"transformWrite": returnWhatWasGiven,
		...options
	};
	
	// No object data
	if (obj === undefined || obj === null) {
		return;
	}
	
	// No path string
	if (!internalPath) {
		return;
	}
	
	internalPath = clean(internalPath);
	
	// Path is not a string, throw error
	if (typeof internalPath !== "string") {
		throw new Error("Path argument must be a string");
	}
	
	if (typeof obj !== "object") {
		return;
	}
	
	const newObj = decouple(obj, options);
	
	// Path has no dot-notation, set key/value
	if (isNonCompositePath(internalPath)) {
		if (newObj.hasOwnProperty(unEscape(internalPath))) {
			delete newObj[options.transformKey(unEscape(internalPath))];
			return newObj;
		}
		
		tracking.returnOriginal = true;
		return obj;
	}
	
	
	const pathParts = split(internalPath);
	const pathPart = pathParts.shift();
	const transformedPathPart = options.transformKey(unEscape(pathPart));
	let childPart = newObj[transformedPathPart];
	
	if (!childPart) {
		// No child part available, nothing to unset!
		tracking.returnOriginal = true;
		return obj;
	}
	
	newObj[transformedPathPart] = unSet(childPart, pathParts.join('.'), options, tracking);
	
	if (tracking.returnOriginal) {
		return obj;
	}
	
	return newObj;
}