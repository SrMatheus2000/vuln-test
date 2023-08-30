function (name, value) {
            if (name == 'user_host') {
                return value.replace(/(\[.*?\])+/g, '');
            }
            return escapeHtml(value);
        }