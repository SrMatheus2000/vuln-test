function extend (target, ...rest) {
  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !isFunction(target)) target = {}

  let i = isObject(rest[0]) ? 0 : 1
  let deep = (rest[0] === true)

  for (let l = rest.length; i < l; i++) {
    let opts = rest[i]
    let copyIsArray = false
    let clone = null
    // Only deal with non-null/undefined values
    if (opts != null) {
      // Extend the base object
      for (let name in opts) {
        let src = target[name]
        let copy = opts[name]
        // Prevent never-ending loop
        if (target === copy) continue
        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && isArray(src) ? src : []
          } else clone = src && isPlainObject(src) ? src : {}
          // Never move original objects, clone them
          target[name] = extend(clone, deep, copy)
        } else if (typeof copy !== 'undefined') target[name] = copy
      }
    }
  }

  return target
}