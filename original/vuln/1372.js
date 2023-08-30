function getDownloadUrl(process, version) {
  var domain = 'http://chromedriver.storage.googleapis.com';
  var fileName = 'chromedriver_';
  var extension = 'zip';
  var platform = process.platform;
  var arch = process.arch;
  var versionDir = version.match(/^~(\d+.\d+)/)[1];

  // Can't use a global version so start a download.
  if (platform === 'linux') {
    fileName += 'linux';
    if (arch === 'x64') {
      fileName += '64';
    } else {
      fileName += '32';
    }
  } else if (platform === 'darwin' || platform === 'openbsd' || platform === 'freebsd') {
    fileName += 'mac32';
  } else if (platform === 'win32') {
    fileName += 'win32'
  } else {
    console.error('Unexpected platform or architecture.');
    console.error('  Platform:\t' + platform);
    console.error('  Architecture:\t' + arch);
    process.exit(1);
  }

  return domain + '/' + versionDir + '/' + fileName + '.' + extension;
}