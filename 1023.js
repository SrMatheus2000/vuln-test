function applyReplacement(str, replacementHash, nestedKey, options) {
    if (!str) return str;

    options = options || replacementHash; // first call uses replacement hash combined with options
    if (str.indexOf(options.interpolationPrefix || o.interpolationPrefix) < 0) return str;

    var prefix = options.interpolationPrefix ? f.regexEscape(options.interpolationPrefix) : o.interpolationPrefixEscaped
      , suffix = options.interpolationSuffix ? f.regexEscape(options.interpolationSuffix) : o.interpolationSuffixEscaped
      , unEscapingSuffix = 'HTML'+suffix;

    var hash = replacementHash.replace && typeof replacementHash.replace === 'object' ? replacementHash.replace : replacementHash;
    f.each(hash, function(key, value) {
        var nextKey = nestedKey ? nestedKey + o.keyseparator + key : key;
        if (typeof value === 'object' && value !== null) {
            str = applyReplacement(str, value, nextKey, options);
        } else {
            if (options.escapeInterpolation || o.escapeInterpolation) {
                str = str.replace(new RegExp([prefix, nextKey, unEscapingSuffix].join(''), 'g'), f.regexReplacementEscape(value));
                str = str.replace(new RegExp([prefix, nextKey, suffix].join(''), 'g'), f.regexReplacementEscape(f.escape(value)));
            } else {
                str = str.replace(new RegExp([prefix, nextKey, suffix].join(''), 'g'), f.regexReplacementEscape(value));
            }
            // str = options.escapeInterpolation;
        }
    });
    return str;
}