function (browser, url, proxyURL, pacFileURL, dataDir, bypassList) {
    // Firefox pac set
    // http://www.indexdata.com/connector-platform/enginedoc/proxy-auto.html
    // http://kb.mozillazine.org/Network.proxy.autoconfig_url
    // user_pref("network.proxy.autoconfig_url", "http://us2.indexdata.com:9005/id/cf.pac");
    // user_pref("network.proxy.type", 2);

    return this.detect(browser).then(function (browserPath) {
      if (!browserPath) {
        throw Error('[Error] can not find browser ' + browser);
      } else {
        dataDir = dataDir || path.join(os.tmpdir(), 'op-browser');

        var commandOptions = configUtil[browser](dataDir, url, browserPath, proxyURL, pacFileURL, bypassList);

        return new Promise(function (resolve, reject) {
          childProcess.execFile(path.resolve(browserPath), commandOptions, {maxBuffer: 50000 * 1024}, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({
                path: browserPath,
                cmdOptions: commandOptions,
                proxyURL: proxyURL,
                pacFileURL: pacFileURL
              });
            }
          });
        });
      }
    });
  }