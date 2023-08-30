getAnnotationURL(sourceMapString) {
    return sourceMapString
      .match(/\/\*\s*# sourceMappingURL=(.*)\s*\*\//)[1]
      .trim()
  }