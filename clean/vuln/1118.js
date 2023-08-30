function unique_name_631(sJWS, key) {
	this.parseJWS(sJWS, !key.verifyString);
    var headP = this.parsedJWS.headP;
    var alg = headP.alg;
    if (alg === 'none') {
        return true;
    }
	var hashAlg = _jws_getHashAlgFromParsedHead(headP);
    alg = alg.substr(0, 2);
    var isPSS = alg === "PS";

	if (key.hashAndVerify) {
	    return key.hashAndVerify(hashAlg,
				     new Buffer(this.parsedJWS.si, 'utf8'),
				     new Buffer(b64utob64(this.parsedJWS.sigvalB64U), 'base64'),
				     null,
				     isPSS);
	} else if (isPSS) {
	    return key.verifyStringPSS(this.parsedJWS.si,
				       this.parsedJWS.sigvalH, hashAlg);
	} else if (alg === "HS") {
        return const_time_equal(hmac(hashAlg, key, this.parsedJWS.si), b64utob64(this.parsedJWS.sigvalB64U));
    } else {
	    return key.verifyString(this.parsedJWS.si,
				    this.parsedJWS.sigvalH);
	}
    }