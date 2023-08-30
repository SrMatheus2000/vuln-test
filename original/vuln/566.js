(uri, config) {
    const regExp = new RegExp(':?' + (config.password || '') + '@');
    return uri.replace(regExp, ':*****@');
  }