function htmlEncode(text) {
  return document.createElement('a').appendChild( document.createTextNode(text) ).parentNode.innerHTML;
}