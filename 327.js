(resolve, reject) => {
      this.unlock()
        .then(_ => {

          tx.v = ethUtil.bufferToHex(tx.getChainId())
          tx.r = '0x00'
          tx.s = '0x00'

          let hdPath
          if (this._isBIP44()) {
            hdPath = this._getPathForIndex(this.unlockedAccount)
          } else {
            hdPath = this._toLedgerPath(this._pathFromAddress(address))
          }

          this._sendMessage({
            action: 'ledger-sign-transaction',
            params: {
              tx: tx.serialize().toString('hex'),
              hdPath,
              to: ethUtil.bufferToHex(tx.to).toLowerCase()
            },
          },
          ({success, payload}) => {
            if (success) {

              tx.v = Buffer.from(payload.v, 'hex')
              tx.r = Buffer.from(payload.r, 'hex')
              tx.s = Buffer.from(payload.s, 'hex')

              const valid = tx.verifySignature()
              if (valid) {
                resolve(tx)
              } else {
                reject(new Error('Ledger: The transaction signature is not valid'))
              }
            } else {
              reject(new Error(payload.error || 'Ledger: Unknown error while signing transaction'))
            }
          })
      })
    }