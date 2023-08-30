function execCommand(command, options) {
  return new Promise(function(resolve, reject) {
    var commandOptions = {
      env: process.env,
      cwd: process.cwd(),
      maxBuffer: options.maxBuffer || 300 * 1024,
      shell: options.shell
    };

    if (options.sync || options.endless) {
      var commandResult = child_process.execFileSync(command[0], command.slice(1));
      var error = null;

      if (commandResult.status) {
        error = {code: commandResult.status};
      }

      resolve({error: error, report: commandResult.stdout});
    } else {
      child_process.execFile(command[0], command.slice(1), commandOptions, function(error, report) {
        resolve({error: error, report: report});
      });
    }
  });
}