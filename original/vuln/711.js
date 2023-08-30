constructor () {
    this.header = [] // An array of unfolded header lines
    this.headers = {} // An object that holds header key=value pairs
    this.bodystructure = ''
    this.childNodes = [] // If this is a multipart or message/rfc822 mime part, the value will be converted to array and hold all child nodes for this node
    this.raw = '' // Stores the raw content of this node

    this._state = 'HEADER' // Current state, always starts out with HEADER
    this._bodyBuffer = '' // Body buffer
    this._lineCount = 0 // Line counter bor the body part
    this._currentChild = false // Active child node (if available)
    this._lineRemainder = '' // Remainder string when dealing with base64 and qp values
    this._isMultipart = false // Indicates if this is a multipart node
    this._multipartBoundary = false // Stores boundary value for current multipart node
    this._isRfc822 = false // Indicates if this is a message/rfc822 node
  }