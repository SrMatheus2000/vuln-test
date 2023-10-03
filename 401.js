function unique_name_196(program, options) {
    this.sourceNode = [];
    this.opcodes = [];
    this.children = [];
    this.options = options;
    this.stringParams = options.stringParams;
    this.trackIds = options.trackIds;

    options.blockParams = options.blockParams || [];

    // These changes will propagate to the other compiler components
    let knownHelpers = options.knownHelpers;
    options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true,
      'lookup': true
    };
    if (knownHelpers) {
      // the next line should use "Object.keys", but the code has been like this a long time and changing it, might
      // cause backwards-compatibility issues... It's an old library...
      // eslint-disable-next-line guard-for-in
      for (let name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.accept(program);
  }