function unique_name_393 (er) {
    if (er) return cb(er)
    this.loadUid(function (er) {
      if (er) return cb(er)
      // Without prefix, nothing will ever work
      correctMkdir(this.prefix, cb)
    }.bind(this))
  }