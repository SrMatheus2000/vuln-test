exitCode => {
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
    }