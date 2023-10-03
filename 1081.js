function unique_name_606(value) {
  if (value === '*') return value;
  var matched = value.match(/(.*?)(\[[0-9]\])/);
  if (matched) return this.wrapValue(matched[1]) + matched[2];
  return '"' + value + '"';
}