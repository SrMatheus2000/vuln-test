function unique_name_542 (tx) {
      tx.executeSql(sql, [], function (tx, result) {
        for (var i = 0, l = result.rows.length; i < l; i++) {
          var doc = result.rows.item(i);
          var metadata = JSON.parse(doc.metadata);
          var data = JSON.parse(doc.data);
          if (!(utils.isLocalId(metadata.id))) {
            doc = {
              id: metadata.id,
              key: metadata.id,
              value: {rev: merge.winningRev(metadata)}
            };
            if (opts.include_docs) {
              doc.doc = data;
              doc.doc._rev = merge.winningRev(metadata);
              if (opts.conflicts) {
                doc.doc._conflicts = merge.collectConflicts(metadata);
              }
              for (var att in doc.doc._attachments) {
                doc.doc._attachments[att].stub = true;
              }
            }
            if ('keys' in opts) {
              if (opts.keys.indexOf(metadata.id) > -1) {
                if (utils.isDeleted(metadata)) {
                  doc.value.deleted = true;
                  doc.doc = null;
                }
                resultsMap[doc.id] = doc;
              }
            } else {
              if (!utils.isDeleted(metadata)) {
                results.push(doc);
              }
            }
          }
        }
      });
    }