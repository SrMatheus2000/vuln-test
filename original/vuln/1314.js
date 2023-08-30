function template(literal, data) {
  var tmpl = literal.replace(/(\$\{)/gm, '$1data.');

  return eval('`' + tmpl + '`');
}