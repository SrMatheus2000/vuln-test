function unique_name_798 () {
  var scalaVersion = '2.11';
  var scalaJsVersion = '0.6.7';
  
  var bin = new BinWrapper({strip: 0})
    .src('http://www.scala-js.org/files/scalajs_' + scalaVersion + '-' + scalaJsVersion + '.tgz', 'darwin')
    .src('http://www.scala-js.org/files/scalajs_' + scalaVersion + '-' + scalaJsVersion + '.tgz', 'linux')
    .dest(path.join(path.dirname(__dirname), 'vendor'));

  return bluebird.promisifyAll(bin);
}