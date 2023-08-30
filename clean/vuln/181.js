function pushVal(obj, path, val) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (obj === undefined || obj === null || path === undefined) {
    return obj;
  } // Clean the path


  path = clean(path);
  var pathParts = split(path);
  var part = pathParts.shift();

  if (pathParts.length) {
    // Generate the path part in the object if it does not already exist
    obj[part] = decouple(obj[part], options) || {}; // Recurse

    pushVal(obj[part], pathParts.join("."), val, options);
  } else if (part) {
    // We have found the target array, push the value
    obj[part] = decouple(obj[part], options) || [];

    if (!(obj[part] instanceof Array)) {
      throw "Cannot push to a path whose leaf node is not an array!";
    }

    obj[part].push(val);
  } else {
    // We have found the target array, push the value
    obj = decouple(obj, options) || [];

    if (!(obj instanceof Array)) {
      throw "Cannot push to a path whose leaf node is not an array!";
    }

    obj.push(val);
  }

  return decouple(obj, options);
}