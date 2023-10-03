er => {
      if (er)
        return this[ONERROR](er, entry)
      fs.lstat(entry.absolute, (er, st) => {
        if (st && (this.keep || this.newer && st.mtime > entry.mtime))
          this[SKIP](entry)
        else if (er || (entry.type === 'File' && !this.unlink && st.isFile()))
          this[MAKEFS](null, entry)
        else if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            if (!entry.mode || (st.mode & 0o7777) === entry.mode)
              this[MAKEFS](null, entry)
            else
              fs.chmod(entry.absolute, entry.mode, er => this[MAKEFS](er, entry))
          } else
            fs.rmdir(entry.absolute, er => this[MAKEFS](er, entry))
        } else
          fs.unlink(entry.absolute, er => this[MAKEFS](er, entry))
      })
    }