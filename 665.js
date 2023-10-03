function block(callback) {
        cmd = scope.command(opts, range);

        if (opts.verbose)
          console.log(`Running: ${cmd}`);

        const report = [];

        const execute = proc(cmd, (err, stdout, stderr) => {
          if (err)
            return reporting.reports(opts, err, callback);
        });

        execute.stderr.on('data', (chunk) => {
          /* Silently discard stderr messages to not interupt scans */
        });

        execute.stdout.on('data', (chunk) => {
          report.push(chunk);
        });

        execute.stdout.on('end', () => {
          if (report.length > 0)
            return reporting.reports(opts, report, callback);
        });
      }