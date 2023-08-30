function unique_name_396 () {
    correctMkdir(self.where, iferr(cb, function () {
      var pkgs = {}
      self.args.forEach(function (pkg) {
        pkgs[pkg.name] = true
      })
      readPackageTree(self.where, function (ctx, kid) { return ctx.parent || pkgs[kid] }, iferr(cb, function (currentTree) {
        self.currentTree = currentTree
        return cb()
      }))
    }))
  }