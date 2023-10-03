function addRemote(name, url, cb) {
    if (typeof cb !== 'function') {
      throw new TypeError('expected callback to be a function');
    }
    if (typeof url !== 'string') {
      cb(new TypeError('expected url to be a string'));
      return;
    }
    if (typeof name !== 'string') {
      cb(new TypeError('expected name to be a string'));
      return;
    }
    cp.exec('git remote add ' + name + ' ' + url, {cwd: cwd}, cb);
  }