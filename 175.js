function unique_name_89(value, prefix) {
      if (!prefix) prefix = [];

      if (Array.isArray(value)) {
        value.forEach(function(arrValue, idx) {
          iter(arrValue, prefix.concat(idx));
        });
      } else if (isPlainObject(value)) {
        Object.keys(value).forEach(function(key) {
          iter(value[key], prefix.concat(key));
        });
      } else {
        entries.push({key: prefix, value: value});
      }
    }