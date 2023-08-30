(uri, config) {
    const regExp = new RegExp(':?' + _.escapeRegExp(config.password) + '@');
    return uri.replace(regExp, ':*****@');
  }