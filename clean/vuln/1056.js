function unique_name_584 (propName) {
    if (m.properties[propName] && self.id(model, propName)) return;
    var found;
    if (actualFields) {
      actualFields.forEach(function (f) {
        if (f.Field === propName) {
          found = f;
        }
      });
    }

    if (found) {
      actualize(propName, found);
    } else {
      sql.push('ADD COLUMN `' + propName + '` ' + self.propertySettingsSQL(model, propName));
    }
  }