function actualize(propName, oldSettings) {
    var newSettings = m.properties[propName];
    if (newSettings && changed(newSettings, oldSettings)) {
      sql.push('CHANGE COLUMN `' + propName + '` `' + propName + '` ' +
        self.propertySettingsSQL(model, propName));
    }
  }