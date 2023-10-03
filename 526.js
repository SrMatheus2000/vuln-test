function createHtmlText(tokens) {
  var htmlText = '';

  tokens.forEach(function(t) {
    if (t.matched) {
      htmlText += '<strong class="' + SearchPad.RESULT_HIGHLIGHT_CLASS + '">' + t.matched + '</strong>';
    } else {
      htmlText += t.normal;
    }
  });

  return htmlText !== '' ? htmlText : null;
}