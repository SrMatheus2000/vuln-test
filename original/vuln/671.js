(fieldName, stream, filename, encoding, mimetype) => {
      if (!map)
        return reject(
          new FilesBeforeMapUploadError(
            `Misordered multipart fields; files should follow “map” (${SPEC_URL}).`,
            400
          )
        )

      if (map.has(fieldName))
        // File is expected.
        map.get(fieldName).resolve({
          stream,
          filename,
          mimetype,
          encoding
        })
      // Discard the unexpected file.
      else stream.resume()
    }