function unique_name_197(obj, field) {
    if (!obj) {
      return obj;
    }
    if (String(field) === 'constructor' && !obj.propertyIsEnumerable(field)) {
      return undefined;
    }
    return obj[field];
  }