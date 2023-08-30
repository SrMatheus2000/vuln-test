function (browserPath) {
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
    }