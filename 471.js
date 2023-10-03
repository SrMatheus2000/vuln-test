function connectToWifi(config, ap, callback) {
  var iface = 'en0';
  var commandStr = 'networksetup -setairportnetwork ';

  if (config.iface) {
    iface = config.iface.toString();
  }

  commandStr =
    commandStr +
    "'" +
    iface +
    "'" +
    ' ' +
    "'" +
    ap.ssid +
    "'" +
    ' ' +
    "'" +
    ap.password +
    "'";
  //console.log(commandStr);

  exec(commandStr, { env }, function(err, resp) {
    //console.log(stderr, resp);
    if (resp && resp.indexOf('Failed to join network') >= 0) {
      callback && callback(resp);
    } else if (resp && resp.indexOf('Could not find network') >= 0) {
      callback && callback(resp);
    } else {
      callback && callback(err);
    }
  });
}