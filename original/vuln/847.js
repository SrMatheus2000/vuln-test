(err, remoteId) => {
    if (err) {
      return callback(err)
    }

    state.id.remote = remoteId

    log('1.1 identify - %s - identified remote peer as %s', state.id.local.toB58String(), state.id.remote.toB58String())
    callback()
  }