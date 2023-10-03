function calculateWidthForText (text) {
    if (spacer === undefined) { // on first call only.
      spacer = document.createElement('span')
      spacer.style.visibility = 'hidden'
      spacer.style.position = 'fixed'
      spacer.style.outline = '0'
      spacer.style.margin = '0'
      spacer.style.padding = '0'
      spacer.style.border = '0'
      spacer.style.left = '0'
      spacer.style.whiteSpace = 'pre'
      spacer.style.fontSize = fontSize
      spacer.style.fontFamily = fontFamily
      spacer.style.fontWeight = 'normal'
      document.body.appendChild(spacer)
    }

    // Used to encode an HTML string into a plain text.
    // taken from http://stackoverflow.com/questions/1219860/javascript-jquery-html-encoding
    spacer.innerHTML = String(text).replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return spacer.getBoundingClientRect().right
  }