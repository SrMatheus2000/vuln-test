function unique_name_712 (name, value) {
            if (name == 'user_host') {
                return value.replace(/(\[.*?\])+/g, '');
            }
            return value;
        }