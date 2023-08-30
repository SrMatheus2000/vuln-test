options =>
  new Promise((resolve, reject) => {
    const sources = Array.isArray(options.source)
      ? options.source.join(" ")
      : options.source;
    const command = `zip --quiet --recurse-paths ${
      options.destination
    } ${sources}`;
    const zipProcess = cp.exec(command, {
      stdio: "inherit",
      cwd: options.cwd
    });
    zipProcess.on("error", reject);
    zipProcess.on("close", exitCode => {
      if (exitCode === 0) {
        resolve();
      } else {
        // exit code 12 means "nothing to do" right?
        //console.log('rejecting', zipProcess)
        reject(
          new Error(
            `Unexpected exit code from native zip command: ${exitCode}\n executed command '${command}'\n executed inin directory '${options.cwd ||
              process.cwd()}'`
          )
        );
      }
    });
  });