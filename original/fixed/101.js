function (val) {
    if (typeof val === 'string') {
      args.push(escapeFn(val));
    }
  }