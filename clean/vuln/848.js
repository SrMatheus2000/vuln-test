(state, msg, callback) => {
  log('1.1 identify')

  state.proposalEncoded.in = msg
  state.proposal.in = pbm.Propose.decode(msg)
  const pubkey = state.proposal.in.pubkey

  state.key.remote = crypto.keys.unmarshalPublicKey(pubkey)
  PeerId.createFromPubKey(pubkey.toString('base64'), (err, remoteId) => {
    if (err) {
      return callback(err)
    }

    state.id.remote = remoteId

    log('1.1 identify - %s - identified remote peer as %s', state.id.local.toB58String(), state.id.remote.toB58String())
    callback()
  })
}