function unique_name_474(text) {
    var html = '';
    if(typeof text !== undefined) {
      if(typeof text.title !== undefined && text.title) {
        html += '<div class="header">' + text.title + '</div class="header">';
      }
      if(typeof text.content !== undefined && text.content) {
        html += '<div class="content">' + text.content + '</div>';
      }
    }
    return html;
  }