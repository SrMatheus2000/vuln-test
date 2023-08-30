function decodeMap (buf, offset, length, headerLength) {
    var result = {}
    var key
    var i
    var totalBytesConsumed = 0

    offset += headerLength
    for (i = 0; i < length; i++) {
      var keyResult = tryDecode(buf, offset)
      if (keyResult) {
        offset += keyResult.bytesConsumed
        var valueResult = tryDecode(buf, offset)
        if (valueResult) {
          key = keyResult.value
          result[key] = valueResult.value
          offset += valueResult.bytesConsumed
          totalBytesConsumed += (keyResult.bytesConsumed + valueResult.bytesConsumed)
        } else {
          return null
        }
      } else {
        return null
      }
    }
    return buildDecodeResult(result, headerLength + totalBytesConsumed)
  }