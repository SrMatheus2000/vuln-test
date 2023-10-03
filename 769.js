function moveNodeModulesBack (next) {
    return function () {
      correctMkdir(from, iferr(done, function () {
        log.silly('move', 'put source node_modules back', fromModules)
        move(tempFromModules, fromModules).then(next, done)
      }))
    }
  }