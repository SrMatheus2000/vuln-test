function unique_name_49 (formatString) {
        var re = /\[([^\[\]]*|\[[^\[\]]*\])*\]|([A-Za-z])\2+|\.{3}|./g, keys, pattern = [formatString];

        while ((keys = re.exec(formatString))) {
            pattern[pattern.length] = keys[0];
        }
        return pattern;
    }