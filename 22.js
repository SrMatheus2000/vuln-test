function unique_name_6 (port) {
  var processId = null
  try {
    processId = exec(`lsof -t -i:${port}`)
  } catch (e) {

  }

  if (processId !== null) { // if exists kill
    exec(`kill ${processId}`)
  }
}