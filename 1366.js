function installChromeDr(to, version, cb) {
  var path = require('path');
  var util = require('util');
  var request = require('request');

  var chromedriverUrl = 'http://chromedriver.storage.googleapis.com/%s/chromedriver_%s.zip';
  var platform = getChromeDriverPlatform();

  if(platform instanceof Error) {
    return cb(platform);
  }

  var dl = util.format(chromedriverUrl, version, platform);

  console.log('Downloading ' + dl);
  downloadAndExtractZip(dl, to, function(err) {
    if (err) {
      return cb(err);
    }

    var fs = require('fs');
    fs.chmod(to, '0755', cb);
  });
}