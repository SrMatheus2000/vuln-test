function Markdown({ source, className = "" }) {
  if (typeof source !== "string") {
    return null
  }

  const md = new Remarkable({
    html: true,
    typographer: true,
    breaks: true,
    linkTarget: "_blank"
  }).use(linkify)

  md.core.ruler.disable(["replacements", "smartquotes"])

  const html = md.render(source)
  const sanitized = sanitizer(html)

  if (!source || !html || !sanitized) {
    return null
  }

  return (
    <div className={cx(className, "markdown")} dangerouslySetInnerHTML={{ __html: sanitized }}></div>
  )
}