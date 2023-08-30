function (err) {
              if (!err) {
                connection.query('USE `' + db + '`', function (err) {
                  runQuery(connection);
                });
              } else {
                releaseConnectionAndCallback(connection, err);
              }
            }