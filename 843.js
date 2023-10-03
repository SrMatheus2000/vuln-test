function jsonBody (request, reply) {
  var body = ''
  var req = request.req
  req.on('error', onError)
  req.on('data', onData)
  req.on('end', onEnd)
  function onError (err) {
    reply.code(422).send(err)
  }
  function onData (chunk) {
    body += chunk
  }
  function onEnd () {
    try {
      request.body = JSON.parse(body)
    } catch (err) {
      reply.code(422).send(err)
      return
    }
    handler(reply)
  }
}