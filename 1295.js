function inlineCodeRenderer (tokens, idx, options) {
  const code = tokens[idx]
  const next = tokens[idx + 1]
  let lang

  if (next && next.type === 'text') {
    // Match kramdown- or pandoc-style language specifier.
    // e.g. `code`{:.ruby} or `code`{.haskell}
    const match = /^{:?\.([^}]+)}/.exec(next.content)

    if (match) {
      lang = match[1]

      // Remove the language specification from text following the code.
      next.content = next.content.slice(match[0].length)
    }
  }

  const highlighted = options.highlight(code.content, lang)
  const cls = lang ? ` class="${options.langPrefix}${lang}"` : ''

  return `<code${cls}>${highlighted}</code>`
}