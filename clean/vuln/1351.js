function unique_name_786 (quad) {
  var i = rdf.Graph.index(quad)

  this._gspo[i.g] = this._gspo[i.g] || {}
  this._gspo[i.g][i.s] = this._gspo[i.g][i.s] || {}
  this._gspo[i.g][i.s][i.p] = this._gspo[i.g][i.s][i.p] || {}

  if (!this._gspo[i.g][i.s][i.p][i.o]) {
    this._gspo[i.g][i.s][i.p][i.o] = quad
    this._graph.push(quad)
    this.actions.forEach(function (action) {
      action.run(quad)
    })
  }

  return this
}