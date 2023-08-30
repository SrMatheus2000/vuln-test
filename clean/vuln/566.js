function unique_name_287 (uri, config) {
    const regExp = new RegExp(':?' + (config.password || '') + '@');
    return uri.replace(regExp, ':*****@');
  }