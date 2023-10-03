function unique_name_433 (path) {
        var last        = null,
            splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;

        if (!path.match('.')) {
            return path;
        }

        path = splitPathRe.exec(path).slice(1);
        last = path[path.length - 1];

        return (last !== '') ? last : path[path.length - 2];
    }