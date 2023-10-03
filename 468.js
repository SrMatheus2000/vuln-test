function deleteConnection(config, ap, callback) {
  var commandStr = 'nmcli connection delete id ';

  commandStr += ' ' + "'" + ap.ssid + "'";

  exec(commandStr, env, function(err) {
    callback && callback(err);
  });
}