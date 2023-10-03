function baseExtend(args, merge) {
  var i, j, obj, src, key, keys, len;
  var target = args[0];
  var length = args.length;

  for (i = 1; i < length; ++i) {

    obj = args[i];
    if ((obj === null || typeof obj !== 'object') && typeof obj !== 'function'){
      continue;
    }

    keys = Object.keys(obj);
    len = keys.length;

    for (j = 0; j < len; j++) {
      key = keys[j];
      src = obj[key];

      if (clonable(src)) {
        if (merge && clonable(target[key])) {
          baseExtend([target[key], src], merge);
        } else if (src !== undefined) {
          target[key] = baseExtend([{}, src], merge);
        }
      } else if (src !== undefined) {
        target[key] = Array.isArray(src) ? src.slice() : src;
      }
    }
  }
  return target;
}