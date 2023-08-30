(req, res) => {
      console.log(req.query)
      let curl = `curl -m 3 -s '${req.query.url}'`
      let t0 = Date.now()
      exec(curl, (err, stdout, stderr) => {
        let sample = {
          exit: err ? err.code : 0,
          time: Date.now() - t0,
          stdout: stdout.length,
          stderr: stderr.length
        }
        res.send(JSON.stringify(sample))
      })
    }