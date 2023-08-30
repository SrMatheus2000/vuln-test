function unique_name_471 () {
    const api_key_base64 = new Buffer(this.options.api_key).toString('base64')
    return `Basic ${api_key_base64}`
  }