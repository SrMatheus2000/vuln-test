function add (options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = ".";
        }
        return this.exec("add " + options, callback);
    }