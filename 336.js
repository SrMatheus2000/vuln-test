function unique_name_154 (key, index) {
      if (typeof o === 'object' && o[key] === undefined) {
        o[key] = {}
      }

      if (typeof o[key] !== 'object' || Array.isArray(o[key])) {
        // ensure that o[key] is an array, and that the last item is an empty object.
        if (Array.isArray(o[key])) {
          o[key].push({})
        } else {
          o[key] = [o[key], {}]
        }

        // we want to update the empty object at the end of the o[key] array, so set o to that object
        o = o[key][o[key].length - 1]
      } else {
        o = o[key]
      }
    }