(code) {
    if (typeof code !== 'string') {
      throw new TypeError('not a string')
    }
    return vm.runInContext(
      '(function () {"use strict"; return ' + code + '})()',
      this._context,
      this._options
    )
  }