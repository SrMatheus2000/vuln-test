function connectToWifi(config, ap, callback) {
  var commandStr =
    "nmcli -w 10 device wifi connect '" +
    ap.ssid +
    "'" +
    ' password ' +
    "'" +
    ap.password +
    "'";

  if (config.iface) {
    commandStr = commandStr + ' ifname ' + config.iface;
  }

  exec(commandStr, { env: env }, function(err, resp) {
    // Errors from nmcli came from stdout, we test presence of 'Error: ' string
    if (resp.includes('Error: ')) {
      err = new Error(resp.replace('Error: ', ''));
    }
    callback && callback(err);
  });
}