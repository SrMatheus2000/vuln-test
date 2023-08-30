function(key, value, callback) {
                if (key !== undefined && value !== undefined) {
                    // set variable to plist
                    var setCommand = utils.format('/usr/libexec/PlistBuddy -c "Set :variables:%s \"%s\"" info.plist', key, value);
                    exec(setCommand, function(err, stdout, stderr) {
                        // if variable is not in plist => add it to plist
                        if (err) {
                            var addCommand = utils.format('/usr/libexec/PlistBuddy -c "Add :variables:%s string \"%s\"" info.plist', key, value);
                            exec(addCommand, function(err, stdout, stderr) {
                                if (callback) {
                                    callback(_toUndefinedIfNull(err));
                                };
                            });
                        } else {
                            if (callback) {
                                callback(undefined);
                            };
                        }
                    })
                }
            }