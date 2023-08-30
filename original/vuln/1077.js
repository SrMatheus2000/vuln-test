function(req, res, next) {
    var resource = url.parse(req.url);
    var filePath = process.cwd()+(resource.pathname || '/');

    if(filePath[filePath.length-1] === '/') filePath += 'index.html';

    var startTime = process.hrtime();
    fs.stat(filePath, function(err, stat) {
      if(err) {
        return next(err);
      }

      // ETag hash
      var uniqueHash = crypto.createHash('md5').update(new Buffer([
        _seed,
        filePath,
        (stat.ctime && stat.ctime.getTime())
      ].join(''))).digest('hex');
      var eTag = 'W/"'+uniqueHash+'"';

      // Use cache
      var headers = req.headers || {};
      var matchETag = headers['if-none-match'] === eTag;
      var matchExpiration = ((new Date(headers['if-modified-since'])).getTime() - Date.now()) >= 0;

      res.setHeader('ETag', eTag);

      if(matchExpiration && matchETag) {
        res.writeHead(304);
        res.end();
        return;
      }
      
      res.setHeader('Last-Modified', new Date(Date.now() + _expirationTime * 1000));
      res.setHeader('Cache-Control', "max-age="+ _expirationTime);

      var readStream = fs.createReadStream(filePath);
      readStream.on('open', function() {
        readStream.pipe(res);
      });

      readStream.on('error', function(err) {
        if(err && err.code === 'ENOENT') {
          return next();

        } else {
          res.writeHead(500);
          res.end();
        }
      });

    });

    // Log request
    res.on('finish', function() {
      var deltaTime = process.hrtime(startTime);

      debug.log([
        res.statusCode,
        req.method, 
        req.url,
        Math.ceil((deltaTime[0] * 1e9 + deltaTime[1]) / 1e6) + 'ms'
      ].join(' '));
    });

  }