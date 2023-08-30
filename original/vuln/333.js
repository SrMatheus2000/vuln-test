signPersonalMessage (withAccount, message) {
    return new Promise((resolve, reject) => {
      this.unlock()
        .then(_ => {
          let hdPath
          if (this._isBIP44()) {
            hdPath = this._getPathForIndex(this.unlockedAccount)
          } else {
            hdPath = this._toLedgerPath(this._pathFromAddress(withAccount))
          }

          this._sendMessage({
            action: 'ledger-sign-personal-message',
            params: {
              hdPath,
              message: ethUtil.stripHexPrefix(message),
            },
          },
          ({success, payload}) => {
            if (success) {
              let v = payload['v'] - 27
              v = v.toString(16)
              if (v.length < 2) {
                v = `0${v}`
              }
              const signature = `0x${payload['r']}${payload['s']}${v}`
              const addressSignedWith = sigUtil.recoverPersonalSignature({data: message, sig: signature})
              if (ethUtil.toChecksumAddress(addressSignedWith) !== ethUtil.toChecksumAddress(withAccount)) {
                reject(new Error('Ledger: The signature doesnt match the right address'))
              }
              resolve(signature)
            } else {
              reject(new Error(payload.error || 'Ledger: Uknown error while signing message'))
            }
          })
      })
    })
  }