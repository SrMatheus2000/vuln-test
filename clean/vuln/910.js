function unique_name_479(pathname, req, res) {
      var full_path;
      full_path = "" + dispatch.static_route + (unescape(pathname));
      return fs.exists(full_path, function(exists) {
        var e, error;
        if (exists) {
          if (((pathname.indexOf(dispatch.cgi_dir + "/") !== -1) || (pathname.match(/\.php$/))) && (pathname.substr(-1) !== "/") && (dispatch.serve_cgi === true)) {
            try {
              return dispatch.cgi(pathname, req, res);
            } catch (error) {
              e = error;
              if (!!dispatch.logging) {
                dispatch.log(e.toString());
              }
              return dispatch._500(null, res, pathname);
            }
          } else {
            return fs.stat(full_path, function(err, stats) {
              var fd;
              if (err) {
                if (!!dispatch.logging) {
                  dispatch.log(err.toString());
                }
                return dispatch._500(null, res, pathname);
              }
              if (stats) {
                if (stats.isDirectory()) {
                  if (!!dispatch.list_dir) {
                    return dispatch.directory(full_path, pathname, res);
                  }
                  return dispatch._405(null, res, pathname, "Directory listing not allowed");
                }
                if (stats.isFile()) {
                  fd = fs.createReadStream(full_path);
                  res.writeHead(200, {
                    'Content-Type': mime_types[path_tools.extname(full_path)] || 'text/plain'
                  });
                  return fd.pipe(res);
                }
              }
            });
          }
        } else {
          if (unescape(pathname).match(/favicon\.ico$/)) {
            res.writeHead(200, {
              'Content-Type': mime_types[path_tools.extname('favicon.ico')] || 'application/x-icon'
            });
            return res.end(new Buffer(unescape(escaped_favicon), 'binary'));
          }
          if (unescape(pathname).match(/icons\.png$/)) {
            res.writeHead(200, {
              'Content-Type': mime_types[path_tools.extname('icons.png')] || 'image/png'
            });
            return res.end(new Buffer(unescape(escaped_icons_png), 'binary'));
          }
          if (unescape(pathname).match(/pixel\.gif$/)) {
            res.writeHead(200, {
              'Content-Type': mime_types[path_tools.extname('pixel.gif')] || 'image/gif'
            });
            return res.end(new Buffer(unescape(escaped_pixel_gif), 'binary'));
          } else {
            return dispatch._404(null, res, pathname);
          }
        }
      });
    }