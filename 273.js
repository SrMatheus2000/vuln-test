function parse (string) {
  var match = regex.exec(string)
  if (!match) {
    return {
      attributes: {},
      body: string,
      bodyBegin: 1
    }
  }

  var yaml = match[match.length - 1].replace(/^\s+|\s+$/g, '')
  var attributes = parser.load(yaml) || {}
  var body = string.replace(match[0], '')
  var line = computeLocation(match, string)

  return {
    attributes: attributes,
    body: body,
    bodyBegin: line,
    frontmatter: yaml
  }
}