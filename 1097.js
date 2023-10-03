function buildDownloadUrl(version, minorVersion) {
  return 'http://selenium-release.storage.googleapis.com/' + minorVersion +
    '/selenium-server-standalone-' + version + '.jar';
}