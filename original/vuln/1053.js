function (err) {
        if (err) {
          if (err && err.message.match(/(^|: )unknown database/i)) {
            var charset = self.settings.charset;
            var collation = self.settings.collation;
            var q = 'CREATE DATABASE ' + db + ' CHARACTER SET ' + charset + ' COLLATE ' + collation;
            connection.query(q, function (err) {
              if (!err) {
                connection.query('USE `' + db + '`', function (err) {
                  runQuery(connection);
                });
              } else {
                releaseConnectionAndCallback(connection, err);
              }
            });
            return;
          } else {
            releaseConnectionAndCallback(connection, err);
            return;
          }
        }
        runQuery(connection);
      }