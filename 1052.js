function unique_name_580 (err) {
              if (!err) {
                connection.query('USE `' + db + '`', function (err) {
                  runQuery(connection);
                });
              } else {
                releaseConnectionAndCallback(connection, err);
              }
            }