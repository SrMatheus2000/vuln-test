function isSafeMethod (object, method) {
  // test for plain functions defined on the object (instead of a method)
  if (hasOwnProperty(object, method)) {
    return isPlainObject(object);
  }
  else {
    // only allow methods defined on the prototype of this object
    // and not defined on the prototype of native Object
    // i.e. constructor, __defineGetter__, hasOwnProperty, etc. are not allowed
    // A few safe native methods are allowed: toString, valueOf, toLocaleString
    return (object &&
        hasOwnProperty(object.constructor.prototype, method) &&
        (!hasOwnProperty(Object.prototype, method) || hasOwnProperty(safeNativeMethods, method)));
  }
}