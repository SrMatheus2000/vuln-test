function(template, data) {
    return !template ? '' : (FN[template] = FN[template] || new Function("_",
      "return '" + template
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/'/g, "\\'")
        .replace(/\{\s*(\w+)\s*\}/g, "' + (_.$1 === undefined || _.$1 === null ? '' : _.$1) + '") +
      "'"
    ))(data);
  }