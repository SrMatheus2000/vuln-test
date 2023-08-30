function unique_name_531(key, props) {
    props = props || {};
    var keyLen = props.length || 0;
    // assume {key} is privateKey
    var privKey = ecUtil.convertToForge(key, false);
    // assume {props.public} is publicKey
    if (!props.public) {
      return Promise.reject(new Error("invalid EC public key"));
    }
    var pubKey = ecUtil.convertToForge(props.public, true);
    var secret = privKey.computeSecret(pubKey);
    if (keyLen) {
      // truncate to requested key length
      if (secret.length < keyLen) {
        return Promise.reject(new Error("key length too large: " + keyLen));
      }
      secret = secret.slice(0, keyLen);
    }
    return Promise.resolve(secret);
  }