function generateColumnString(column) {
  return /.+\(.*\)/.test(column)
    ? column // expression
    : template`"${column}"`; // single column
}