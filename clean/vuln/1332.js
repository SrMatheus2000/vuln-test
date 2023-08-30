function jscover(source, target, options, callback) {
  source = source || '';
  target = target || '';
  options = options || [];
  var tmpName = '__cov__' + Date.now();
  var tmpdir = process.env.TMPDIR || '/tmp';
  var tmpTargetDir = path.join(tmpdir, tmpName);
  var tmpTarget = path.join(tmpTargetDir, path.basename(target));

  var cleanup = function () {
    fse.removeSync(tmpTargetDir);
    fse.removeSync(path.join(target, tmpName));
  };

  var cmd = JSCoverCommand;
  if (options && options.length > 0) {
    cmd += ' ' + options.join(' ');
  }
  cmd += ' --exclude=node_modules --exclude=.git/ --exclude=.svn/';
  cmd += ' --exclude="' + tmpTarget + '" --exclude="' + target + '"';
  cmd += ' "' + source + '" "' + tmpTarget + '"';
  debug(cmd);
  var child = exec(cmd, function (err, stdout, stderr) {
    var output = '';
    if (stdout) {
      output += stdout;
    }
    if (stderr) {
      output += stderr;
      if (!err) {
        err = new Error(stderr.trim());
      }
      err.name = 'JSCover' + err.name;
    }
    if (err) {
      debug(err, stderr);
      cleanup();
      return callback(err, output);
    }

    var success = !stdout && !stderr;
    if (!success) {
      return callback(null, output);
    }
    ndir.walk(tmpTarget, function onDir(dirpath, items) {
      var todir = dirpath.replace(tmpTarget, target);
      fse.mkdirpSync(todir);
      for (var i = 0; i < items.length; i++) {
        var info = items[i];
        var from = info[0];
        var name = path.basename(from);
        if (name === '.git' || name === '.svn' || name.indexOf('jscoverage') === 0) {
          continue;
        }
        var to = path.join(todir, path.basename(from));
        if (info[1].isDirectory()) {
          fse.mkdirpSync(to);
        } else if (info[1].isFile()) {
          var content = fs.readFileSync(from);
          if (path.extname(to).toLowerCase() === '.js') {
            content = PEDDING + content.toString();
          }
          fs.writeFileSync(to, content);
        }
      }
    }, function end() {
      cleanup();
      callback();
    }, function error(err, errPath) {
      cleanup();
      console.error('%s error: %s', errPath, err);
      callback(err);
    });

  });
}