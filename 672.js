() => {
      if (map)
        for (const upload of map.values())
          if (!upload.file)
            upload.reject(
              new UploadPromiseDisconnectUploadError(
                'Request disconnected before file upload stream parsing.'
              )
            )
          else if (!upload.done) {
            upload.file.stream.truncated = true
            upload.file.stream.emit(
              'error',
              new FileStreamDisconnectUploadError(
                'Request disconnected during file upload stream parsing.'
              )
            )
          }
    }