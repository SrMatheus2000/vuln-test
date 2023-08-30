function (err) {
              if (!err) {
                connection.query('USE ' + client.escapeId(db), function (err) {
                  runQuery(connection);
                });
              } else {
                releaseConnectionAndCallback(connection, err);
              }
            }