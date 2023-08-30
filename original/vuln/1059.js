function (indexName) {
    var i = m.settings.indexes[indexName];
    var found = ai[indexName] && ai[indexName].info;
    if (!found) {
      var type = '';
      var kind = '';
      if (i.type) {
        type = 'USING ' + i.type;
      }
      if (i.kind) {
        kind = i.kind;
      }
      if (kind && type) {
        sql.push('ADD ' + kind + ' INDEX `' + indexName + '` (' + i.columns + ') ' + type);
      } else {
        sql.push('ADD ' + kind + ' INDEX ' + type + ' `' + indexName + '` (' + i.columns + ')');
      }
    }
  }