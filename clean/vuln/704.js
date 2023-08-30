function unique_name_367 ({ stderr, timeout, 'ignore-stderr': ignoreStdErr }) {
    let count = 0;
    let hasError = false;
    let isSuccess = true;
    timeout = timeout / 1000;
    while (!this.isReady) {
      try {
        const stat = yield fs.stat(stderr);
        if (stat && stat.size > 0) {
          hasError = true;
          break;
        }
      } catch (_) {
        // nothing
      }

      if (count >= timeout) {
        this.logger.error('Start failed, %ds timeout', timeout);
        isSuccess = false;
        break;
      }

      yield sleep(1000);
      this.logger.log('Wait Start: %d...', ++count);
    }

    if (hasError) {
      try {
        const [ stdout ] = yield exec('tail -n 100 ' + stderr);
        this.logger.error('Got error when startup: ');
        this.logger.error(stdout);
      } catch (_) {
        // nothing
      }
      isSuccess = ignoreStdErr;
      this.logger.error('Start got error, see %s', stderr);
      this.logger.error('Or use `--ignore-stderr` to ignore stderr at startup.');
    }

    if (!isSuccess) {
      this.child.kill('SIGTERM');
      yield sleep(1000);
      this.exit(1);
    }
  }