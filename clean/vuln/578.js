function unique_name_295  (entry) {
    const er = this[MKDIR](path.dirname(entry.absolute), this.dmode)
    if (er)
      return this[ONERROR](er, entry)
    try {
      const st = fs.lstatSync(entry.absolute)
      if (this.keep || this.newer && st.mtime > entry.mtime)
        return this[SKIP](entry)
      else if (entry.type === 'File' && !this.unlink && st.isFile())
        return this[MAKEFS](null, entry)
      else {
        try {
          if (st.isDirectory()) {
            if (entry.type === 'Directory') {
              if (entry.mode && (st.mode & 0o7777) !== entry.mode)
                fs.chmodSync(entry.absolute, entry.mode)
            } else
              fs.rmdirSync(entry.absolute)
          } else
            fs.unlinkSync(entry.absolute)
          return this[MAKEFS](null, entry)
        } catch (er) {
          return this[ONERROR](er, entry)
        }
      }
    } catch (er) {
      return this[MAKEFS](null, entry)
    }
  }