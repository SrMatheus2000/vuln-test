function init() {
  const {
    PACKAGE_PREFIX
  } = ESM

  let inspectDepth = 0

  const endMarkerRegExp = new RegExp(
    "[\\[\"']" +
    PACKAGE_PREFIX +
    ":proxy['\"\\]]\\s*:\\s*1\\s*\\}\\s*.?$"
  )

  const liteInspectOptions = {
    breakLength: Infinity,
    colors: false,
    compact: true,
    customInspect: false,
    depth: 0,
    maxArrayLength: 0,
    showHidden: false,
    showProxy: true
  }

  const markerInspectOptions = {
    breakLength: Infinity,
    colors: false,
    compact: true,
    customInspect: false,
    depth: 1,
    maxArrayLength: 0,
    showHidden: true,
    showProxy: true
  }

  function isOwnProxy(value) {
    return OwnProxy.instances.has(value) ||
      isOwnProxyFallback(value)
  }

  function isOwnProxyFallback(value) {
    if (! shared.support.inspectProxies ||
        ! isObjectLike(value) ||
        ++inspectDepth !== 1) {
      return false
    }

    let inspected

    try {
      inspected = inspect(value, liteInspectOptions)
    } finally {
      inspectDepth -= 1
    }

    if (! inspected.startsWith("Proxy")) {
      return false
    }

    inspectDepth += 1

    try {
      inspected = inspect(value, markerInspectOptions)
    } finally {
      inspectDepth -= 1
    }

    return endMarkerRegExp.test(inspected)
  }

  return isOwnProxy
}