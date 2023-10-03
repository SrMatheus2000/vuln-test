function unique_name_310 (pathBundleIN, pathOUT, password, callback) {
  var tmpfile = pathBundleIN.cert.replace(/\.[^.]+$/, '.cer')
  var params = [
    'pkcs7',
    '-print_certs',
    '-in',
    pathBundleIN.cert,
    '-out',
    tmpfile
  ]
  openssl.spawnWrapper(params, false, function (error, code) {
    if (error) {
      callback(error)
    } else {
      var params = [
        'pkcs12',
        '-export',
        '-in',
        tmpfile,
        '-inkey',
        pathBundleIN.key,
        '-out',
        pathOUT
      ]
      if (pathBundleIN.ca) {
        if (!Array.isArray(pathBundleIN.ca)) {
          pathBundleIN.ca = [ pathBundleIN.ca ]
        }
        pathBundleIN.ca.forEach(function (ca) {
          params.push('-certfile')
          params.push(ca)
        })
      }
      var delTempPWFiles = [tmpfile]
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
  })
}