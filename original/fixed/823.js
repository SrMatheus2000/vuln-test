function(value, key) {
    if (_.isString(value)) {
      try {
        value = JSON.parse(value);
      } catch (err) {}
      options[key] = value;
    }
  }