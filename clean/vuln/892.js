function unique_name_468(length) {
  var response = new Buffer(length);
  this._buffer.copy(response, 0, this._offset, this._offset + length);

  this._offset += length;
  return response;
}