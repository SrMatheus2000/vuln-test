function set (obj, key, val, quiet, skipCompare) {
  let meta
  if (typeof key === 'string') {
    if (key.indexOf('.') > -1) {
      obj = getObjKeyPair(obj, key, true)
      key = obj[1]
      obj = obj[0]
    }

    if (!global.DECAL_WATCH_ENABLED) skipCompare = quiet = true
    if (!skipCompare && get(obj, key) === val) return false

    if (obj instanceof CoreObject) {
      meta = obj.__meta
      if (meta.setters[key]) meta.setters[key].call(obj, val, key)
      else meta.values[key] = val
      if (!quiet) obj.propertyDidChange(key)
    } else obj[key] = val

    return obj
  } else if (arguments.length === 2) {
    for (let i in key) set(obj, i, key[i], val, quiet)
    return obj
  }

  error('Tried to call `set` with unsupported arguments', arguments)
}