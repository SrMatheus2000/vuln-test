function start(callback) {
    var self = this;
    var tasks = [];
    if (!self._disableApi) {
      tasks.push(function(callback) {
        app._server = app.listen(function() {
          self._apiAddress = this.address();
          debug('API listening on: ', self._apiAddress);
          callback();
        });
      });
    }
    tasks.push(self._nginx.start.bind(self._nginx));
    if (self._controlUri) {
      tasks.push(self._initControlChannel.bind(self));
    }
    tasks.push(function(callback) {
      if (self._apiAddress) self.emit('listening', self._apiAddress);
      self.emit('started');
      callback();
    });

    async.series(tasks, function(err) {
      if (err) {
        if (callback) return callback(err);
        throw err;
      }
      if (callback) callback();
    });
  }