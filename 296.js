function commit (message, options, callback) {
        message = message.replace(/\"/g, "\\");
        if (typeof options === "function") {
            callback = options;
            options = "";
        }
        return this.exec("commit -m \"" + message + "\" " + options, callback)
    }