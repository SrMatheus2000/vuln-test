function(entry) {
    if (entry.type == 'Directory') return;
    entry.pipe(Writer({
      path: path.join(opts.path,entry.path)
    }))
    .on('error',function(e) {
      self.emit('error',e);
    });
  }