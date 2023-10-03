function unique_name_388(req, res) {

    var _url  = url.parse(req.url);

    var dest  = _url.hostname;
    var port  = _url.port || 80;
    var host  = '127.0.0.1';

    var target;
    if(proxy_host === '<ANY>' || proxy_host === dest) {

      target = {
        host: host,
        port: port
      };

      var urlmatch = req.url.match(/http:\/\/[^/]*:?[0-9]*(\/.*)$/);

      if(urlmatch) {
        req.url = urlmatch[1];
      } else {
        req.url = '/';
      }

    } else {
      target = {
        host: dest,
        port: port
      };
    }

    proxy.web(req, res, {target: target});

  }