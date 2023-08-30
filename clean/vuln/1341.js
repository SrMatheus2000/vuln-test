function unique_name_779 (config) {
  config = (0, _extends3.default)({}, config, DEFAULT_CONFIG);
  var mockGlob = config.glob;
  var gaze = new _gaze2.default(mockGlob);
  var mock = {};

  function update() {
    mock = {};
    _glob2.default.sync(mockGlob).map(function (file) {
      try {
        var filePath = _path2.default.resolve(file);
        var res = require(filePath);
        delete require.cache[require.resolve(filePath)];
        return res;
      } catch (e) {
        return null;
      }
    }).filter(function (v) {
      return !!v;
    }).reduce(function (res, file) {
      return res.concat((0, _keys2.default)(file).map(function (api) {
        return {
          method: api.split(' ')[0],
          uri: api.split(' ')[1],
          fn: file[api]
        };
      }));
    }, []).forEach(function (api) {
      mock[api.uri] = mock[api.uri] || {};
      mock[api.uri][api.method] = api.fn;
      mockApp.all(api.uri, function (req, res, next) {
        if (req.method === api.method) {
          mock[api.uri][api.method](req, res);
        } else {
          next();
        }
      });
    });
  }
  gaze.on('ready', update);
  gaze.on('all', update);
  update();
  return mockApp;
}