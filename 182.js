function pullVal(obj, path, val) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    strict: true
  };

  if (obj === undefined || obj === null || path === undefined) {
    return obj;
  } // Clean the path


  path = clean(path);
  var pathParts = split(path);
  var part = pathParts.shift();

  if (pathParts.length) {
    // Generate the path part in the object if it does not already exist
    obj[part] = decouple(obj[part], options) || {}; // Recurse - we don't need to assign obj[part] the result of this call because
    // we are modifying by reference since we haven't reached the furthest path
    // part (leaf) node yet

    pullVal(obj[part], pathParts.join("."), val, options);
  } else if (part) {
    obj[part] = decouple(obj[part], options) || []; // Recurse - this is the leaf node so assign the response to obj[part] in
    // case it is set to an immutable response

    obj[part] = pullVal(obj[part], "", val, options);
  } else {
    // The target array is the root object, pull the value
    obj = decouple(obj, options) || [];

    if (!(obj instanceof Array)) {
      throw "Cannot pull from a path whose leaf node is not an array!";
    }

    var index = -1; // Find the index of the passed value

    if (options.strict === true) {
      index = obj.indexOf(val);
    } else {
      // Do a non-strict check
      index = obj.findIndex(function (item) {
        return match(item, val);
      });
    }

    if (index > -1) {
      // Remove the item from the array
      obj.splice(index, 1);
    }
  }

  return decouple(obj, options);
}