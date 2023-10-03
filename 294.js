function unique_name_140 (options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = "";
        }
        return this.exec("checkout " + options, callback);
    }