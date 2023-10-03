function unique_name_745(name, callback) {

  var res = [];
  retry(function() {
    return new Promise(function(resolve, reject) {
      exec('ps -ef | grep ' + name, function(error, stdout) {
        if (error) {
          reject(error);
        };

        var items = stdout.split(EOL);
        var list = [];

        items.forEach(function(i) {
          var content = i.split(' ');
          content = filter(content);
          content = content.reverse();

          if (!!content[0]) {
            if (!new RegExp('grep|kill').test(content[1])) {
              content = content.reverse();
              list.push(content[1]);
            }
          }
        });

        if (!list.length) {
          resolve(res);
        }

        res = res.concat(list);

        exec('sudo kill -SIGKILL ' + list.join(' '), function(error) {
          reject();
        });
      });
    });
  }, 1000, 100).then(function(list) {
    callback(list);
  });
}