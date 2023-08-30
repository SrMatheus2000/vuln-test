function(html) {
  if (!SAFE_PARSING_SUPPORTED) {
    return '';
  }

  var newTree = this.processToTree(html);
  if (noclobber.getElementAttributes(newTree).length > 0) {
    // We want to preserve the outer SPAN tag, because the processor has
    // attached attributes to it. To do so, we make a new SPAN tag the parent of
    // the existing root span tag, so that the rest of the function will remove
    // that one instead.
    var newRoot = googDom.createElement(TagName.SPAN);
    newRoot.appendChild(newTree);
    newTree = newRoot;
  }
  // The XMLSerializer will add a spurious xmlns attribute to the root node.
  var serializedNewTree = new XMLSerializer().serializeToString(newTree);
  // Remove the outer span before returning the string representation of the
  // processed copy.
  return serializedNewTree.slice(
      serializedNewTree.indexOf('>') + 1, serializedNewTree.lastIndexOf('</'));
}