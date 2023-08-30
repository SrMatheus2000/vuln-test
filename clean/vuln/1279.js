function _ps(args, cb) {
  if (process.platform === 'win32') {
    // TODO add windows support
    return cb('Windows support not implemented yet.');
  } else {
    var cmd = 'ps';
    if (args) {
      cmd += ' ' + args.join(' ');
    }
    childProcess.exec(cmd, function (err, stdout, stderr) {
      if (err || stderr)
        return cb(err || stderr.toString());
      return cb(null, _parse(stdout.toString()));
    });
  }
}