function unique_name_159 (i) {
    const s = this.source
    const l = s.length
    if (i >= l) {
      return l
    }
    const c = s.charCodeAt(i)
    if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
      return i + 1
    }
    return i + 2
  }