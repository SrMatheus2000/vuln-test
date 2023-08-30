function(t) {
    if (t.matched) {
      htmlText += '<strong class="' + SearchPad.RESULT_HIGHLIGHT_CLASS + '">' + t.matched + '</strong>';
    } else {
      htmlText += t.normal;
    }
  }