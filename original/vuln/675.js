() => {
      request.unpipe(parser)
      request.resume()

      if (map)
        for (const upload of map.values())
          if (!upload.file)
            upload.reject(createError(400, 'File missing in the request.'))
    }