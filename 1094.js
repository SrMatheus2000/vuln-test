function cpOptsInData(data, opts) {
  _OPTS.forEach(function (p) {
    if (typeof data[p] != 'undefined') {
      // Disallow setting the root opt for includes via a passed data obj
      // Unsanitized, parameterized use of `render` could allow the
      // include directory to be reset, opening up the possibility of
      // remote code execution
      if (p == 'root') {
        return;
      }
      opts[p] = data[p];
    }
  });
}