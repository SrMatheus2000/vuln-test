function reducer(result, arg)
{
  arg = arg.split('=')

  // Get key node
  const keypath = arg.shift().split('.')

  let key = keypath.shift()
  let node = result

  while(keypath.length)
  {
    node[key] = node[key] || {}
    node = node[key]

    key = keypath.shift()
  }

  // Get value
  let val = true
  if(arg.length)
  {
    val = arg.join('=').split(',')
    if(val.length === 1) val = val[0]
  }

  // Store value
  node[key] = val

  return result
}