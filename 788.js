function mimeWordsEncode (data = '', mimeWordEncoding = 'Q', fromCharset = 'UTF-8') {
  const regex = /([^\s\u0080-\uFFFF]*[\u0080-\uFFFF]+[^\s\u0080-\uFFFF]*(?:\s+[^\s\u0080-\uFFFF]*[\u0080-\uFFFF]+[^\s\u0080-\uFFFF]*\s*)?)+(?=\s|$)/g
  return decode(convert(data, fromCharset)).replace(regex, match => match.length ? mimeWordEncode(match, mimeWordEncoding, fromCharset) : '')
}