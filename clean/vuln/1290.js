function deepSet (obj, path, value, create) {
  var properties = path.split('.')
  var currentObject = obj
  var property

  create = create === undefined ? true : create

  while (properties.length) {
    property = properties.shift()
    
    if (!currentObject) break;
    
    if (!isObject(currentObject[property]) && create) {
      currentObject[property] = {}
    }

    if (!properties.length){
      currentObject[property] = value
    }
    currentObject = currentObject[property]
  }

  return obj
}