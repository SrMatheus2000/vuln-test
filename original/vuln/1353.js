function (command, cb) {
  exec("curl " + command, { maxBuffer : 2048 * 1024 }, function (error, stdout, stderr) {
    cb(null, {payload: stdout, stats: parseStats(stderr)});
  })
    .on("error", function (err) {
      cb(err, null);
    });
}