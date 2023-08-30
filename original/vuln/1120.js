function (jwt, options, key, allowed_algs)
{
    if (allowed_algs === undefined)
    {
        allowed_algs = key;
        key = options;
        options = null;
    }

    if (key)
    {
        this.verifyJWSByKey(jwt, key);
    }
    else
    {
        this.processJWS(jwt);
    }

    options = options || {};
    allowed_algs = allowed_algs || [];

    var header = this.getParsedHeader(),
        claims = this.getParsedPayload(),
        now = Math.floor(new Date().getTime() / 1000),
        iat_skew = options.iat_skew || 0,
        is_allowed;

    if (!header)
    {
        throw new Error('no header');
    }

    if (!claims)
    {
        throw new Error('no claims');
    }

    if (header.alg === undefined)
    {
        throw new Error('alg not present');
    }

    if (allowed_algs.indexOf !== undefined)
    {
        is_allowed = allowed_algs.indexOf(header.alg) >= 0;
    }
    else
    {
        is_allowed = allowed_algs[header.alg] !== undefined;
    }

    if (!is_allowed)
    {
        throw new Error('algorithm not allowed: ' + header.alg);
    }

    if (header.typ === undefined)
    {
        if (!options.checks_optional)
        {
            throw new Error('no type claim');
        }
    }
    else if (header.typ !== 'JWT')
    {
        throw new Error('type is not JWT');
    }

    if (claims.iat === undefined)
    {
        if (!options.checks_optional)
        {
            throw new Error('no issued at claim');
        }
    }
    else if (claims.iat > (now + iat_skew))
    {
        throw new Error('issued in the future');
    }

    if (claims.nbf === undefined)
    {
        if (!options.checks_optional)
        {
            throw new Error('no not before claim');
        }
    }
    else if (claims.nbf > now)
    {
        throw new Error('not yet valid');
    }

    if (claims.exp === undefined)
    {
        if (!options.checks_optional)
        {
            throw new Error("no expires claim");
        }
    }
    else if (claims.exp <= now)
    {
        throw new Error("expired");
    }

    return true;
}