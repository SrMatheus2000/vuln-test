function pull (options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = "";
        }
        return this.exec("pull " + options, callback);
    }