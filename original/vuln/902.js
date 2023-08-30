function verifyHMAC(parsedSignature, secret) {
    assert.object(parsedSignature, 'parsedHMAC');
    assert.string(secret, 'secret');

    var alg = parsedSignature.algorithm.match(/^HMAC-(\w+)/);
    if (!alg || alg.length !== 2)
      throw new TypeError('parsedSignature: unsupported algorithm ' +
                          parsedSignature.algorithm);

    var hmac = crypto.createHmac(alg[1].toUpperCase(), secret);
    hmac.update(parsedSignature.signingString);
    return (hmac.digest('base64') === parsedSignature.params.signature);
  }