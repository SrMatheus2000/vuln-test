async _ => {
          const from = this.unlockedAccount
          const to = from + n
          this.accounts = []
          for (let i = from; i < to; i++) {
            let address
            if (this._isBIP44()) {
              const path = this._getPathForIndex(i)
              address = await this.unlock(path)
            } else {
              address = this._addressFromIndex(pathBase, i)
            }
            this.accounts.push(address)
            this.page = 0
          }
          resolve(this.accounts)
        }