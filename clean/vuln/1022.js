function unique_name_560(key, value) {
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
    }