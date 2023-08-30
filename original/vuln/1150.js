function(options) {
    var fragment = '';
    if (options.limit) fragment += ' LIMIT ' + options.limit;
    if (options.offset) fragment += ' OFFSET ' + options.offset;

    return fragment;
  }