function(value) {
  return (value !== '*' ? '"' + value + '"' : '*');
}