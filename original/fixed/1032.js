function (value) {
  if (!Buffer.isBuffer(value)) {
    value = new Buffer(value.toString());
  }
  var hex = value.toString('hex');

  return this.$hexify(hex);
}