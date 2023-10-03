function writeConfig(output, key, value, recurse) {
  var k, o;
  if (isObject(value) && !isArray(value)) {
    o = isObject(output[key]) ? output[key] : (output[key] = {});
    for (k in value) {
      if (recurse && (recurse === true || recurse[k])) {
        writeConfig(o, k, value[k]);
      } else {
        o[k] = value[k];
      }
    }
  } else {
    output[key] = value;
  }
}