getAllShares() {
    const maskCmd = this.maskCmd;
    return new Promise((resolve, reject) => {
      exec("smbtree -U guest -N", {}, function (err, stdout, stderr) {
        const allOutput = stdout + stderr;

        if (err !== null) {
          err.message = maskCmd ? allOutput : err.message + allOutput;
          return reject(err);
        }

        const shares = [];
        for (const line in stdout.split(/\r?\n/)) {
          const words = line.split(/\t/);
          if (words.length > 2 && words[2].match(/^\s*$/) !== null) {
            shares.append(words[2].trim());
          }
        }

        return resolve(shares);
      });
    });
  }