function(options, model) {
    var fragment = '';
    if (options.offset && !options.limit) {
      fragment += ' LIMIT ' + options.offset + ', ' + 18440000000000000000;
    } else if (options.limit) {
      if (options.offset) {
        fragment += ' LIMIT ' + options.offset + ', ' + options.limit;
      } else {
        fragment += ' LIMIT ' + options.limit;
      }
    }

    return fragment;
  }