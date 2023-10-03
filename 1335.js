function _command (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, {maxBuffer: 1024 * 1000}, function (err, stdout, stderr) {
      if (err) return reject(err);
      if (stderr) return reject(stderr);
      resolve(stdout)
    })
  })
}