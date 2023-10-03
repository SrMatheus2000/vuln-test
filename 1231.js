function unique_name_718 () {

  this.config = null;
  this.router = null;
  this.modelRegistry = {};
  this.templateRegistry = {};
  this.controllerRegistry = {};

  this.init = function (config, callback) {
    var self = this;

    // Local copy of the config obj for all the init shits
    this.config = config;

    init.init(this, function () {
      self.start(callback);
    });
  };

  this.handleControllerAction = function (controllerInst, reqUrl, method,
          params, accessTime, reqObj, respObj) {
    var initKeys
      , initializer
      , cb;

    // Async setup steps to allow the controller to handle
    // the request
    initKeys = [
      'cookies'
    , 'i18n'
    , 'inFlight'
    , 'parseBody'
    , 'session'
    ];

    // Mix all the shits onto the controller instance
    utils.mixin(controllerInst, {
      app: this
    , url: reqUrl  // Can we dispense with this? It's in the params
    , method: method // And this?
    , params: params
    , accessTime: accessTime
    , request: reqObj
    , response: respObj
    , name: params.controller
    });

    reqObj.controller = controllerInst;
    respObj.controller = controllerInst;

    cb = function () {
      controllerInst._handleAction.call(controllerInst, params.action);
      // TODO Replace this with readable-stream module for 0.8 support
      if (reqObj.req && typeof reqObj.req.read != 'function') {
        reqObj.sync(); // Flush buffered events and begin emitting
      }
    };
    initializer = new utils.async.Initializer(initKeys, cb);

    // Run all the async setup steps
    initKeys.forEach(function (key) {
      controllerInit[key].call(controllerInst, function () {
        initializer.complete(key);
      });
    });
  };

  this.handleStaticFile = function (staticPath, params, reqUrl, reqObj, respObj) {
    var controllerInst;
    // May be a path to a directory, with or without a trailing
    // slash -- any trailing slash has already been stripped by
    // this point
    if (fs.statSync(staticPath).isDirectory()) {
      // TODO: Make the name of any index file configurable
      staticPath = path.join(staticPath, 'index.html');
      if (utils.file.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
        controllerInst = new StaticFileController(reqObj, respObj, params);
        controllerInst.respond({
          path: staticPath
        });
      }
      // Directory with no index file
      else {
        this.handleNotFound(reqUrl, params, reqObj, respObj);
      }
    }
    // Path to an actual file. Just serve it up
    else if (fs.statSync(staticPath).isFile()) {
      controllerInst = new StaticFileController(reqObj, respObj, params);
      controllerInst.respond({
        path: staticPath
      });
    }
  };

  this.handleMethodNotAllowed = function (method, reqUrl, params, reqObj, respObj,
      nonMethodRoutes) {
    // build a unique list of acceptable methods for this resource
    var acceptableMethods = {}
      , err
      , controllerInst;

    nonMethodRoutes.map(function (params) {
      acceptableMethods[params.method] = true;
    });
    acceptableMethods = Object.keys(acceptableMethods);

    // send a friendly error response
    throw new errors.MethodNotAllowedError(
      method + ' method not allowed. Please consider ' +
      acceptableMethods.join(', ').replace(/,\s(\w+)$/," or $1") +
      ' instead.');
  };

  this.handleNotFound = function (reqUrl, params, reqObj, respObj) {
    throw new errors.NotFoundError(reqUrl + ' not found.');
  };

  this.handleNoMatchedRoute = function (method, reqUrl, params, reqObj, respObj) {
    var staticPath
      , controllerInst
      , nonMethodRoutes;


    // Get the path to the file, decoding the request URI
    staticPath = this.config.staticFilePath + decodeURIComponent(reqUrl);
    // Ignore querystring
    staticPath = staticPath.split('?')[0];

    // Static?
    if (utils.file.existsSync(staticPath)) {
      this.handleStaticFile(staticPath, params, reqUrl, reqObj, respObj, params);
    }
    else {
      nonMethodRoutes = this.router.all(reqUrl);

      // Good route, wrong verb -- 405?
      if (nonMethodRoutes.length) {
        this.handleMethodNotAllowed(method, reqUrl, params, reqObj, respObj,
          nonMethodRoutes);
      }
      // Nada, 404
      else {
        this.handleNotFound(reqUrl, params, reqObj, respObj);
      }
    }
  };
  this.handleNoAction = function (params, reqObj, respObj) {
    throw new errors.InternalServerError('No ' + params.action +
        ' action on ' + params.controller + ' controller.');
  };

  this.handleNoController = function (params, reqObj, respObj) {
    throw new errors.InternalServerError('controller ' +
        params.controller + ' not found.');
  };

  this.start = function (callback) {
    var self = this
      , ctors = this.controllerRegistry
      , controllerActionTimers = {};

    // Handle the requests
    // ==================
    geddy.server.addListener('request', function (req, resp) {
      var dmn = domain.create()
        , caught = false
        , badRequestErr
        , controllerInst
        , reqObj
        , respObj;

      // Attempt a nice, high-fi customizable error
      // Only try this once -- if something fails during the
      // rendering process for the error, fall back to a low-fi
      // fool-proof error to display that
      dmn.on('error', function (err) {
        var serverErr
          , controllerInst;

        if (caught) {
          return errors.respond(err, respObj);
        }

        caught = true;

        if (err.statusCode) {
          serverErr = err;
        }
        else {
          serverErr = new errors.InternalServerError(err.message, err.stack);
        }

        try {
          controllerInst = new ErrorController(reqObj, respObj);
          controllerInst.respondWith(serverErr);
        }
        // Catch sync errors in the error-rendering process
        // Respond with a low-fi fool-proof err
        // Async ones will be handled by re-entering this domain
        // on-error handler
        catch(e) {
          errors.respond(e, respObj);
        }
      });

      dmn.add(req);
      dmn.add(resp);

      // Parsing URLs may result in a bad request -- if this happens,
      // throw the error inside the domain code, so we can get a nice,
      // customizable error message
      try {
        reqObj = requestHelpers.enhanceRequest(req);
        respObj = requestHelpers.enhanceResponse(resp);
      }
      catch (err) {
        req.url = '/';
        reqObj = requestHelpers.enhanceRequest(req);
        respObj = requestHelpers.enhanceResponse(resp);
        badRequestErr = new errors.BadRequestError(err.message, err.stack);
        controllerInst = new ErrorController(reqObj, respObj);
        return controllerInst.respondWith(badRequestErr);
      }

      dmn.add(reqObj);
      dmn.add(respObj);

      dmn.run(function () {
        var reqUrl
          , urlParams
          , urlPath
          , method
          , accessTime
          , params
          , controllerInst;

        // Parse out some needed request properties
        reqUrl = requestHelpers.normalizeUrl(req);
        urlParams = requestHelpers.getUrlParams(reqUrl);
        urlPath = requestHelpers.getBasePath(reqUrl);
        method = requestHelpers.getMethod(reqUrl, urlParams, req);
        accessTime = requestHelpers.getAccessTime();

        // Now only for timeout, domains are handling errors
        requestHelpers.initInFlight(reqObj, respObj, method, accessTime);

        // TODO: Allow custom formats
        logging.initRequestLogger(reqUrl, reqObj, respObj, method, accessTime);

        params = requestHelpers.getParams(self.router, urlPath, method);
        // Route/method combo give us something valid?
        if (params) {

          controllerInst = controller.create(params.controller);
          // Valid controller?
          if (controllerInst) {
            // Enhance the parsed params with URL params
            geddy.mixin(params, urlParams);

            // FIXME: Backward-compat shim for old action-name 'destroy'
            if (params.action == 'destroy' &&
                typeof controllerInst.destroy != 'function') {
              params.action = 'remove';
            }

            if (typeof controllerInst[params.action] == 'function') {
              self.handleControllerAction(controllerInst, reqUrl, method,
                      params, accessTime, reqObj, respObj);
            }
            // No action, 500 error
            else {
              self.handleNoAction(params, reqObj, respObj);
            }
          }
          // No controller, 500 error
          else {
            self.handleNoController(params, reqObj, respObj);
          }
        }
        // Either 405, static, or 404
        else {
          self.handleNoMatchedRoute(method, reqUrl, params, reqObj, respObj);
        }

      });
    });

    callback();
  };

}