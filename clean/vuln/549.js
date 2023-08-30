function unique_name_274 (ids, linkStr, tooltip) {
  ids.split(',').forEach(function (id) {
    if (typeof vertices[id] !== 'undefined') {
      vertices[id].link = linkStr
    }
  })
  setTooltip(ids, tooltip)
  setClass(ids, 'clickable')
}