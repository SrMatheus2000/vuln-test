function unique_name_122 (files, message, newVer, tagName, callback) {
  message = message.replace('%s', newVer).replace('"', '').replace("'", '');
  files = files.map(function (file) {
    return '"' + escapeQuotes(file) + '"';
  }).join(' ');
  var functionSeries = [
    function (done) {
      cp.exec(gitApp + ' add ' + files, gitExtra, done);
    },

    function (done) {
      cp.exec([gitApp, 'commit', '-m', '"' + message + '"'].join(' '), gitExtra, done);
    },

    function (done) {
      cp.exec(
        [
          gitApp, 'tag', '-a', tagName, '-m', '"' + message + '"'
        ].join(' '),
        gitExtra, done
      );
    }
  ];
  contra.series(functionSeries, callback);
}