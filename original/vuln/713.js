_processBodyLine (line) {
    if (this._isMultipart) {
      if (line === '--' + this._multipartBoundary) {
        this.bodystructure += line + '\n'
        if (this._currentChild) {
          this._currentChild.finalize()
        }
        this._currentChild = new MimeNode(this)
        this.childNodes.push(this._currentChild)
      } else if (line === '--' + this._multipartBoundary + '--') {
        this.bodystructure += line + '\n'
        if (this._currentChild) {
          this._currentChild.finalize()
        }
        this._currentChild = false
      } else if (this._currentChild) {
        this._currentChild.writeLine(line)
      } else {
        // Ignore multipart preamble
      }
    } else if (this._isRfc822) {
      this._currentChild.writeLine(line)
    } else {
      this._lineCount++

      switch (this.contentTransferEncoding.value) {
        case 'base64':
          this._bodyBuffer += line
          break
        case 'quoted-printable': {
          let curLine = this._lineRemainder + (this._lineCount > 1 ? '\n' : '') + line
          const match = curLine.match(/=[a-f0-9]{0,1}$/i)
          if (match) {
            this._lineRemainder = match[0]
            curLine = curLine.substr(0, curLine.length - this._lineRemainder.length)
          } else {
            this._lineRemainder = ''
          }
          this._bodyBuffer += curLine
          break
        }
        case '7bit':
        case '8bit':
        default:
          this._bodyBuffer += (this._lineCount > 1 ? '\n' : '') + line
          break
      }
    }
  }