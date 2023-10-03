(fieldName, value) => {
      switch (fieldName) {
        case 'operations':
          operations = JSON.parse(value)
          operationsPath = objectPath(operations)
          break
        case 'map': {
          if (!operations)
            return reject(
              new MapBeforeOperationsUploadError(
                `Misordered multipart fields; “map” should follow “operations” (${SPEC_URL}).`,
                400
              )
            )

          const mapEntries = Object.entries(JSON.parse(value))

          // Check max files is not exceeded, even though the number of files
          // to parse might not match the map provided by the client.
          if (mapEntries.length > maxFiles)
            return reject(
              new MaxFilesUploadError(
                `${maxFiles} max file uploads exceeded.`,
                413
              )
            )

          map = new Map()
          for (const [fieldName, paths] of mapEntries) {
            map.set(fieldName, new Upload())

            // Repopulate operations with the promise wherever the file occurred
            // for use by the Upload scalar.
            for (const path of paths)
              operationsPath.set(path, map.get(fieldName).promise)
          }

          resolve(operations)
        }
      }
    }