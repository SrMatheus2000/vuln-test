function (err, data) {
        if (err) return cb(err)

        if (!isPrivate) {
          if (meta) cb(null, { key, value: data.value, timestamp: data.timestamp })
          else cb(null, data.value)
        }
        else {
          const result = db._unbox(data, unbox)

          if (meta) cb(null, { key, value: result.value, timestamp: result.timestamp })
          else cb(null, result.value)
        }
      }