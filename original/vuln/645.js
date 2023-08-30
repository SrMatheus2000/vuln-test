function (cookie, isSignedCookie, next) {
  if (!cookie) {
    return next(new Error('cookie was empty.'))
  }

  var cookieSegments = cookie.split('--');
  if (cookieSegments.length != 2) {
    return next(new Error('invalid cookie format.'));
  }

  var sessionData = new Buffer(cookieSegments[0], 'base64');
  // var signature = cookieSegments[1];

  var sessionDataSegments = sessionData.toString('utf8').split('--');
  if (sessionDataSegments.length != 2) {
    return next(new Error('invalid cookie format.'));
  }

  var data = new Buffer(sessionDataSegments[0], 'base64');
  var iv = new Buffer(sessionDataSegments[1], 'base64');
  var salt = isSignedCookie ? this.signedCookieSalt : this.cookieSalt;

  crypto.pbkdf2(this.secret, salt, this.iterations, this.keyLength, this.digest, function(err, derivedKey) {
    if (err) return next(err);

    try {
      var decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey.slice(0, 32), iv.slice(0, 16));
      var decryptedData = decipher.update(data, 'binary', 'utf8') + decipher.final('utf8');

      next(null, decryptedData);
    } catch(e) {
      next(e);
    }
  });
}