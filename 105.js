function deepCopy(sourceObj, destinationObj) {
    var out = destinationObj || {};
    Object.keys(sourceObj).forEach(function (key) {
        if (typeof sourceObj[key] === 'object') {
            out[key] = (util.isArray(sourceObj[key]) ? [] : {});
            deepCopy(sourceObj[key], out[key]);
        } else {
            out[key] = sourceObj[key];
        }
    });

    return out;
}