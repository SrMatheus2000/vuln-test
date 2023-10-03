function executeCommand (cmd, callback) {
    exec(cmd, function (error) {
      callback(error);
    });
  }