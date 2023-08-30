function(key, props) {
    key = key || {};
    props = props || {};

    var keyLen = props.length || 0,
        algParams = merge(clone(alg), {
          namedCurve: key.crv
        });

    // assume {key} is privateKey
    if (!keyLen) {
      // calculate key length from private key size
      keyLen = key.d.length;
    }
    var privKey = ecUtil.convertToJWK(key, false);
    privKey = helpers.subtleCrypto.importKey("jwk",
                                             privKey,
                                             algParams,
                                             false,
                                             [ "deriveBits" ]);

    // assume {props.public} is publicKey
    if (!props.public) {
      return Promise.reject(new Error("invalid EC public key"));
    }
    var pubKey = ecUtil.convertToJWK(props.public, true);
    pubKey = helpers.subtleCrypto.importKey("jwk",
                                            pubKey,
                                            algParams,
                                            false,
                                            []);

    var promise = Promise.all([privKey, pubKey]);
    promise = promise.then(function(keypair) {
      var privKey = keypair[0],
          pubKey = keypair[1];

      var algParams = merge(clone(alg), {
        public: pubKey
      });
      return helpers.subtleCrypto.deriveBits(algParams, privKey, keyLen * 8);
    });
    promise = promise.then(function(result) {
      result = new Buffer(result);
      return result;
    });
    return promise;
  }