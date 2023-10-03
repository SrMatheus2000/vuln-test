function diskusage(path, cb) {
    if (path.indexOf('"') !== -1) {
        return cb(new Error('Paths with double quotes are not supported yet'));
    }

    exec('df -k "' + path + '"', function(err, stdout) {
        if (err) {
            return cb(err);
        }

        try {
            cb(null, parse(stdout));
        } catch (e) {
            cb(e);
        }
    });
}