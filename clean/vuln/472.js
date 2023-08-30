function getCurrentConnections(config, callback) {
  var commandStr = macProvider + ' --getinfo';

  exec(commandStr, env, function(err, stdout) {
    if (err) {
      callback && callback(err);
    } else {
      callback && callback(null, parseAirport(stdout));
    }
  });
}