function unique_name_32(obj, name, loc) {
      if (!obj || !(name in obj)) {
        throw new Exception('"' + name + '" not defined in ' + obj, {
          loc: loc
        });
      }
      return obj[name];
    }