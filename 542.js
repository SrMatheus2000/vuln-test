function unique_name_269(credentials, include, fn) {
    var self = this;
    if (typeof include === 'function') {
      fn = include;
      include = undefined;
    }

    fn = fn || utils.createPromiseCallback();

    include = (include || '');
    if (Array.isArray(include)) {
      include = include.map(function(val) {
        return val.toLowerCase();
      });
    } else {
      include = include.toLowerCase();
    }

    var realmDelimiter;
    // Check if realm is required
    var realmRequired = !!(self.settings.realmRequired ||
      self.settings.realmDelimiter);
    if (realmRequired) {
      realmDelimiter = self.settings.realmDelimiter;
    }
    var query = self.normalizeCredentials(credentials, realmRequired,
      realmDelimiter);

    if (realmRequired && !query.realm) {
      var err1 = new Error(g.f('{{realm}} is required'));
      err1.statusCode = 400;
      err1.code = 'REALM_REQUIRED';
      fn(err1);
      return fn.promise;
    }
    if (!query.email && !query.username) {
      var err2 = new Error(g.f('{{username}} or {{email}} is required'));
      err2.statusCode = 400;
      err2.code = 'USERNAME_EMAIL_REQUIRED';
      fn(err2);
      return fn.promise;
    }

    self.findOne({where: query}, function(err, user) {
      var defaultError = new Error(g.f('login failed'));
      defaultError.statusCode = 401;
      defaultError.code = 'LOGIN_FAILED';

      function tokenHandler(err, token) {
        if (err) return fn(err);
        if (Array.isArray(include) ? include.indexOf('user') !== -1 : include === 'user') {
          // NOTE(bajtos) We can't set token.user here:
          //  1. token.user already exists, it's a function injected by
          //     "AccessToken belongsTo User" relation
          //  2. ModelBaseClass.toJSON() ignores own properties, thus
          //     the value won't be included in the HTTP response
          // See also loopback#161 and loopback#162
          token.__data.user = user;
        }
        fn(err, token);
      }

      if (err) {
        debug('An error is reported from User.findOne: %j', err);
        fn(defaultError);
      } else if (user) {
        user.hasPassword(credentials.password, function(err, isMatch) {
          if (err) {
            debug('An error is reported from User.hasPassword: %j', err);
            fn(defaultError);
          } else if (isMatch) {
            if (self.settings.emailVerificationRequired && !user.emailVerified) {
              // Fail to log in if email verification is not done yet
              debug('User email has not been verified');
              err = new Error(g.f('login failed as the email has not been verified'));
              err.statusCode = 401;
              err.code = 'LOGIN_FAILED_EMAIL_NOT_VERIFIED';
              err.details = {
                userId: user.id,
              };
              fn(err);
            } else {
              if (user.createAccessToken.length === 2) {
                user.createAccessToken(credentials.ttl, tokenHandler);
              } else {
                user.createAccessToken(credentials.ttl, credentials, tokenHandler);
              }
            }
          } else {
            debug('The password is invalid for user %s', query.email || query.username);
            fn(defaultError);
          }
        });
      } else {
        debug('No matching record is found for user %s', query.email || query.username);
        fn(defaultError);
      }
    });
    return fn.promise;
  }