function processRequest (req, res) {
  var body = []
  var length = 0

  req.on('data', function (data) {
    body.push(data)
    length += data.length

    if (length > inputRequestLimit) {
      error(res, new Error('Input request exceeded inputRequestLimit'))
      res.destroy()
    }
  })

  req.on('end', function () {
    req.body = messageHandler.parse(Buffer.concat(body).toString())

    process.send(messageHandler.serialize({
      action: 'register',
      rid: req.body.options.rid,
      pid: process.pid
    }))

    try {
      var cbs = {}

      var callback = function () {
        var cid = uuid()

        cbs[cid] = arguments[arguments.length - 1]

        if (!callbackRequests[req.body.options.rid]) {
          callbackRequests[req.body.options.rid] = function (m) {
            if (m.params.length) {
              if (m.params[0]) {
                m.params[0] = new Error(m.params[0])
              }
            }

            var cb = cbs[m.cid]

            delete cbs[m.cid]

            cb.apply(this, m.params)

            if (Object.keys(cbs).length === 0) {
              delete callbackRequests[req.body.options.rid]
            }
          }
        }

        var args = Array.prototype.slice.call(arguments)

        args.pop()

        process.send(messageHandler.serialize({
          action: 'callback',
          cid: cid,
          rid: req.body.options.rid,
          pid: process.pid,
          params: args.sort()
        }))
      }

      require(req.body.options.execModulePath)(req.body.inputs, callback, function (err, val) {
        if (err) {
          return error(res, err)
        }

        res.end(messageHandler.serialize(val))
      })
    } catch (e) {
      error(res, e)
    }
  })
}