({ source, className = "" }) => {
  if(typeof source !== "string") {
    return null
  }
  
  if ( source ) {
    const html = parser.render(source)
    const sanitized = sanitizer(html)

    let trimmed

    if(typeof sanitized === "string") {
      trimmed = sanitized.trim()
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: trimmed
        }}
        className={cx(className, "renderedMarkdown")}
      />
    )
  }
  return null
}