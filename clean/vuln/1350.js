function doNpmCommand(options, cb) {
  cb = cb || function() {};

  if (!options.npmCommand) {
    return cb(new Error('`npmCommand` option is required'));
  }

  // Defaults
  options.cmdOptions = options.cmdOptions || {};
  options.cmdArgs = options.cmdArgs || [];

  // Check to make sure npm CLI is accessible
  var NPM_V_OUTPUT = /^[0-9]+\.[0-9]+\.[0-9]+/;
  var stdout$npm_v = exec('npm -v').stdout;
  concat(stdout$npm_v, function(err, result) {
    if (err) return cb(err);
    if (typeof result !== 'string' ||
      !result.match(NPM_V_OUTPUT)) {
      return cb(Err.cantFindNpm(result));
    }

    // Build command to execute
    var cmd = '';
    cmd += 'npm ' + options.npmCommand + ' ';
    cmd += options.cmdArgs.join(' ');
    cmd += ' ';

    // if ('save' in options && options.save) {
    //     cmd += '--save ';
    // }
    //
    // if ('saveExact' in options && options.saveExact) {
    //   cmd += '--save-exact ';
    // }
    //
    // if ('saveDev' in options && options.saveDev) {
    //   cmd += '--save-dev ';
    // }
    //
    // if (options.path.length > 0) {
    //   cmd += '--prefix ' + options.path + ' ';
    // }

    for (var key in options.cmdOptions) {
      // Skip undefined options
      if (options.cmdOptions[key] !== undefined) {
        cmd += '--' + key + '=' + options.cmdOptions[key] + ' ';
      }
    }
    cmd += '';

    // DRY:
    // console.log('WOULD HAVE RUN::');
    // console.log(cmd);

    // Spin up child process
    var npm = exec(cmd, {cwd: options.dir});
    var stderr$npm = npm.stderr;
    var stdout$npm = npm.stdout;

    // Watch in case anything goes wrong
    stderr$npm.pipe(process.stderr);

    // When finished, trigger success cb
    npm.on('exit', function onSuccess() {
      cb();
    });
  });
}