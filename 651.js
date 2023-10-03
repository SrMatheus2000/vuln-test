function findIndexes(code, identifiers) {
    const indexes = []

    if (identifiers.length === 0) {
      return indexes
    }

    const pattern = new RegExp("\\b(?:" + identifiers.join("|") + ")\\b", "g")

    let match

    while ((match = pattern.exec(code))) {
      const { index } = match

      // Make sure the match isn't preceded by a `.` character, since that
      // probably means the identifier is a property access rather than a
      // variable reference.
      if (index === 0 ||
          code.charCodeAt(index - 1) !== DOT) {
        indexes.push(index)
      }
    }

    return indexes
  }