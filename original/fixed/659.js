function (er) {
      if (er) return cb(er)
      // Without prefix, nothing will ever work
      mkdirp(this.prefix, cb)
    }