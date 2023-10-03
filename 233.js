function unique_name_110 () {
    const domValue = this.dom.value
    const childs = this.childs
    if (domValue && childs) {
      if (this.type === 'array') {
        childs.forEach((child, index) => {
          child.index = index
          const childField = child.dom.field
          if (childField) {
            childField.innerHTML = index
          }
        })
      } else if (this.type === 'object') {
        childs.forEach(child => {
          if (child.index !== undefined) {
            delete child.index

            if (child.field === undefined) {
              child.field = ''
            }
          }
        })
      }
    }
  }