function unique_name_139 (options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = "";
        }
        return this.exec("branch " + options, callback);
    }