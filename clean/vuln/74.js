function constructor(connection, {root, cwd} = {}) {
    this.connection = connection;
    this.cwd = nodePath.normalize(cwd ? nodePath.join(nodePath.sep, cwd) : nodePath.sep);
    this._root = nodePath.resolve(root || process.cwd());
  }