function branch (options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = "";
        }
        return this.exec("branch " + options, callback);
    }