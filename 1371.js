function unique_name_799 () {
  var version = '2.11.7';

  var bin = new BinWrapper()
    .src('http://downloads.typesafe.com/scala/' + version + '/scala-' + version + '.tgz', 'darwin')
    .src('http://downloads.typesafe.com/scala/' + version + '/scala-' + version + '.tgz', 'linux')
    .dest(path.join(path.dirname(__dirname), 'vendor'));

  return bluebird.promisifyAll(bin);
}