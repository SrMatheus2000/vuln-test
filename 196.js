function unique_name_100(error) {
  if (!error.response || !error.response.request || !error.response.request._data) {
    return error;
  }

  Object.keys(error.response.request._data).forEach(function(key) {
    if (key.toLowerCase().match('password|secret')) {
      error.response.request._data[key] = '[SANITIZED]';
    }
  });

  return error;
}