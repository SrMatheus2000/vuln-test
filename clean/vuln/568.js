function unique_name_289(instance) {
  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
}