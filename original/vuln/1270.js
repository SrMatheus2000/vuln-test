(pid, signal) => {
  // get signal index.
  let signalIndex = -1;
  if (signal) {
    if (Number.isInteger(signal)) {
      signalIndex = signal;
    } else {
      signalIndex = getSignal(signal);
    }
  }

  // shell command
  let cmd = '';
  if (signalIndex < 0) cmd = `kill ${pid}`;
  else cmd = `kill -${signalIndex} ${pid}`;

  // run command
  return exec(cmd).then((result) => {
    if (result.stderr) {
      throw new Error(result.stderr);
    }
    return Promise.resolve();
  });
}