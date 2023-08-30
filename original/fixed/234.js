function (fn, options) {
  assert(typeof fn === 'function')
  options = options || {}
  options.withCallback = true
  return createWrapper(fn, options)
}