function Extract (opts) {
  if (!(this instanceof Extract))
    return new Extract(opts);

  var self = this;

  Parse.call(self,opts);

  self.on('entry', function(entry) {
    if (entry.type == 'Directory') return;
    entry.pipe(Writer({
      path: path.join(opts.path,entry.path)
    }))
    .on('error',function(e) {
      self.emit('error',e);
    });
  });
}