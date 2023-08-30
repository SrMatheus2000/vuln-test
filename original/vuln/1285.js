function set (obj, path, value) {
  if(!obj) throw new Error('libnested.set: first arg must be an object')
  if(isBasic(path)) return obj[path] = value
  for(var i = 0; i < path.length; i++)
    if(i === path.length - 1)
      obj[path[i]] = value
    else if(null == obj[path[i]])
      obj = (obj[path[i]] = isNonNegativeInteger(path[i+1]) ? [] : {})
    else
      obj = obj[path[i]]
  return value
}