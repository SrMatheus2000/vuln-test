function merge(target, arg) { // length==2
  return _assignHelper(target, arguments, function (a, b, key, path) {
    var bval = b[key];
    if (bval !== undefined && isPrimitive(bval)) { a[key] = bval; }
    else if (!(key in a)) { a[key] = isArray(bval) ? [] : isPOJO(bval) ? {} : bval; }
  })
}