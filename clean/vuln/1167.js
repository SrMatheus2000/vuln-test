function unique_name_668 (entry) {
    // if there's a "strip" argument, then strip off that many
    // path components.
    if (opts.strip) {
      var p = entry.path.split("/").slice(opts.strip).join("/")
      entry.path = entry.props.path = p
      if (entry.linkpath) {
        var lp = entry.linkpath.split("/").slice(opts.strip).join("/")
        entry.linkpath = entry.props.linkpath = lp
      }
    }
    if (entry.type !== "Link") return
    entry.linkpath = entry.props.linkpath =
      path.join(opts.path, path.join("/", entry.props.linkpath))
  }