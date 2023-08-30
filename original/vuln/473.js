function deleteConnection(config, ap, callback) {
  var iface = 'en0';
  var commandStr = 'networksetup -removepreferredwirelessnetwork ';

  if (config.iface) {
    iface = config.iface.toString();
  }

  commandStr = commandStr + "'" + iface + "'" + ' ' + "'" + ap.ssid + "'";

  exec(commandStr, env, function(err, resp) {
    if (
      resp &&
      resp.indexOf('was not found in the preferred networks list') >= 0
    ) {
      callback && callback(resp);
    } else {
      callback && callback(err);
    }
  });
}