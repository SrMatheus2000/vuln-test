function unique_name_309 (pathIN, pathOUT, password, callback) {
  var params = [
    'pkcs12',
    '-in',
    pathIN,
    '-out',
    pathOUT,
    '-nodes'
  ]
  var delTempPWFiles = []
  helper.createPasswordFile({ 'cipher': '', 'password': password, 'passType': 'in' }, params, delTempPWFiles[delTempPWFiles.length])
  helper.createPasswordFile({ 'cipher': '', 'password': password, 'passType': 'out' }, params, delTempPWFiles[delTempPWFiles.length])
  openssl.spawnWrapper(params, false, function (error, code) {
    function done (error) {
      if (error) {
        callback(error)
      } else {
        callback(null, code === 0)
      }
    }
    helper.deleteTempFiles(delTempPWFiles, function (fsErr) {
      done(error || fsErr)
    })
  })
}