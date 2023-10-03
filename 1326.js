function setup(options) {
  var app = loopback();
  options.app = app;

  var _Nginx = options.Nginx || Nginx;
  app._nginx = new _Nginx(options);
  app._disableApi = true;
  app._enableExplorer = debug.enabled;
  app._controlUri = options.controlUri;
  app._Channel = options.Channel || WebsocketChannel;

  // Set the IP and port that server should listen on
  if (options.apiEndpoint) {
    var apiEndpoint = url.parse(options.apiEndpoint);
    app.set('host', apiEndpoint.hostname);
    app.set('port', apiEndpoint.port);
    app._disableApi = false;
  }

  app.use(loopback.favicon());
  app.use(loopback.compress());

  app.dataSource('db', {
    name: 'db',
    connector: 'memory',
    file: path.join(options.baseDir, 'routes.json'),
  });

  boot(app, __dirname);
  app.use(loopback.urlNotFound());
  app.use(loopback.errorHandler());

  app.start = function start(callback) {
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
  };

  function stop(callback) {
    var tasks = [];

    tasks.push(this._nginx.stop.bind(this._nginx));
    if (this._server)
      tasks.push(this._server.close.bind(this._server));
    async.series(tasks, callback);
  }
  app.stop = stop;

  function reload(callback) {
    this._nginx.reload(callback);
  }
  app.reload = reload;

  function _initControlChannel(callback) {
    var self = this;
    this._channel = this._Channel.connect(
      this._nginx.onRequest.bind(this._nginx),
      this._controlUri
    );

    this._channel.on('connect', function() {
      debug('start: connected');
      self._channel.notify({
        cmd: 'starting',
      });
    });

    self._channel.on('error', function(err) {
      debug('channel errored: %s', err.message);
      console.log('Error communicating with Central server: %s', err.message);
      self.stop();
    });
    setImmediate(callback);
  }
  app._initControlChannel = _initControlChannel;

  function updateService(serviceId, endpoints, callback) {
    var Config = app.models.Config;
    var Endpoint = app.models.Endpoint;

    Config.clean(serviceId, function saveEndpoints() {
      async.eachSeries(
        endpoints,
        Endpoint.createEndpoint.bind(Endpoint),
        function(err) {
          if (err) return callback(err);
          Endpoint.app.reload(callback);
        }
      );
    });
  }
  app.updateService = updateService;

  function syncEndpoints(serviceList, callback) {
    var Config = app.models.Config;
    var Endpoint = app.models.Endpoint;
    var self = this;
    Config.clean(null, function saveEndpoints() {
      async.eachSeries(serviceList,
        function(service, callback) {
          self.updateService(service.serviceId, service.endpoints, callback);
        }, function(err) {
          if (err) return callback(err);
          Endpoint.app.reload(callback);
        }
      );
    });
  }
  app.syncEndpoints = syncEndpoints;

  stopWhenDone(app);
  return app;
}