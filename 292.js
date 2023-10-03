function unique_name_138 (options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = ".";
        }
        return this.exec("add " + options, callback);
    }