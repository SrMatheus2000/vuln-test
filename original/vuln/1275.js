(port) => {

  new Promise(( resolve,reject ) => {

    exec(`lsof -i :${port} | grep LISTEN`, (err, out, stderr) => {
      const match = out.split(' ').filter(m => m.length)
      
      if ( match.length) {
        resolve(match[1])
      } else {
        console.log(`port ${port} is not open.`)
      }
    })

  }).then(pid => {
    
    exec(`kill ${pid}`,(err, out, stderr) => {
      if( err ) throw err

      console.log(`port ${port} was closed.`)
    })

  })

}