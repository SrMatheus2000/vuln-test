function unique_name_141 (gitUrl, options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = "";
        }
        return this.exec("clone " + gitUrl + " " + options, callback);
    }