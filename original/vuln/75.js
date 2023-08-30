execute(cmd, cmdArgs, workingDir) {
    const fullCmd = wrap(util.format("%s %s", cmd, cmdArgs));
    const command = [
      "smbclient",
      this.getSmbClientArgs(fullCmd).join(" "),
    ].join(" ");

    const options = {
      cwd: workingDir || "",
    };
    const maskCmd = this.maskCmd;

    return new Promise((resolve, reject) => {
      exec(command, options, function (err, stdout, stderr) {
        const allOutput = stdout + stderr;

        if (err) {
          // The error message by default contains the whole smbclient command that was run
          // This contains the username, password in plain text which can be a security risk
          // maskCmd option allows user to hide the command from the error message
          err.message = maskCmd ? allOutput : err.message + allOutput;
          return reject(err);
        }

        return resolve(allOutput);
      });
    });
  }