function logRequest (method, res, startTime, opts) {
  const elapsedTime = Date.now() - startTime
  const attempt = res.headers.get('x-fetch-attempts')
  const attemptStr = attempt && attempt > 1 ? ` attempt #${attempt}` : ''
  const cacheStr = res.headers.get('x-local-cache') ? ' (from cache)' : ''
  opts.log.http(
    'fetch',
    `${method.toUpperCase()} ${res.status} ${res.url} ${elapsedTime}ms${attemptStr}${cacheStr}`
  )
}