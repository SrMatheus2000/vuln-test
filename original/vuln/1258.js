function(e) {
                // Allow the default browser action when the user holds a modifier (e.g., Ctrl-Click)
                if(e.altKey || e.metaKey || e.shiftKey) {
                    return true;
                }
                window.history.pushState({
                    path: path
                }, path, url);
                that.update_location(path);
                return false;
            }