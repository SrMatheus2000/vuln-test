function unique_name_225(err) {
      exec('netsh wlan delete profile "' + ap.ssid + '"', { env }, function() {
        callback && callback(err);
      });
    }