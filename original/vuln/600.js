setElementContent($element, content) {
    const html = this.config.html
    if (typeof content === 'object' && (content.nodeType || content.jquery)) {
      // Content is a DOM node or a jQuery
      if (html) {
        if (!$(content).parent().is($element)) {
          $element.empty().append(content)
        }
      } else {
        $element.text($(content).text())
      }
    } else {
      $element[html ? 'html' : 'text'](content)
    }
  }