function andLogAndFinish (spec, tracker, done) {
  validate('SOF|SZF|OOF|OZF', [spec, tracker, done])
  return (er, pkg) => {
    if (er) {
      log.silly('fetchPackageMetaData', 'error for ' + String(spec), er.message)
      if (tracker) tracker.finish()
    }
    return done(er, pkg)
  }
}