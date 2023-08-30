function (ids, linkStr) {
  ids.split(',').forEach(function (id) {
    let rawTask = findTaskById(id)
    if (typeof rawTask !== 'undefined') {
      pushFun(id, () => { window.open(linkStr, '_self') })
    }
  })
  setClass(ids, 'clickable')
}