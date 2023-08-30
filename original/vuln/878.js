function (req, res) {
    // set appropriate Vary header
    vary(res, str)

    // multiple headers get joined with comma by node.js core
    return (req.headers[header] || '').split(/ *, */)
  }