function unique_name_470() {
  var buffer = new Buffer(this.scrambleBuff1.length +
                          (typeof this.scrambleBuff2 !== 'undefined' ? this.scrambleBuff2.length : 0));

  this.scrambleBuff1.copy(buffer);
  if (typeof this.scrambleBuff2 !== 'undefined') {
    this.scrambleBuff2.copy(buffer, this.scrambleBuff1.length);
  }

  return buffer;
}