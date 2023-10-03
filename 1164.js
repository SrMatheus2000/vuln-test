function unique_name_666(object, timeZone) {
  var values = [];
  for (var key in object) {
    var value = object[key];
    if(typeof value === 'function') {
      continue;
    }

    values.push('`' + key + '` = ' + SqlString.escape(value, true, timeZone));
  }

  return values.join(', ');
}