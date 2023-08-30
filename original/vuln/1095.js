function getLatestVersion(callback) {
  function onBody(error, response, body) {
    if (error != null) {
      return callback(error);
    }
    return callback(null, body);
  }
  return request('http://chromedriver.storage.googleapis.com/LATEST_RELEASE', onBody);
}