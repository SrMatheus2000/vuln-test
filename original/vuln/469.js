function disconnect(config, callback) {
  var commandStr = 'nmcli device disconnect';

  if (config.iface) {
    commandStr += ' ' + config.iface;
  }

  exec(commandStr, { env }, function(err) {
    callback && callback(err);
  });
}