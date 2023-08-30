function (pid, next) {
  var killCommand = process.platform !== 'darwin' ? 'taskkill /F /PID ' + pid : 'kill ' + pid;
  ChildProcess.exec(killCommand, function (err, stdout, stderr) {
    if (err || stderr)
      return next( err || stderr.toString() );

    stdout = stdout.toString();

    // wait a while (200ms) for windows before calling callback
    if (process.platform !== 'darwin') {
      setTimeout(function () {
        next(null, stdout);
      }, 200 );
			return;
    }

    next(null, stdout);
  });
}