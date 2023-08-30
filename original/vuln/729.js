function (afterSize) {
  if (this._size >= afterSize) {
    return;
  }
  var old = this._size;
  this._size = afterSize * 2;
  this._limit = this._size;
  debug('allocate new Buffer: from %d to %d bytes', old, this._size);
  var bytes;
  if (Buffer.allocUnsafe) {
    bytes = Buffer.allocUnsafe(this._size);
  } else {
    bytes = new Buffer(this._size);
  }
  this._bytes.copy(bytes, 0);
  this._bytes = bytes;
}