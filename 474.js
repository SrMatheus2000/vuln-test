function unique_name_224() {
      var cmd =
        'netsh wlan connect ssid="' + ap.ssid + '" name="' + ap.ssid + '"';
      if (config.iface) {
        cmd += ' interface="' + config.iface + '"';
      }
      return execCommand(cmd);
    }