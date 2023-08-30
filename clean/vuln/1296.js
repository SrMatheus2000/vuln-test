function handleGETandHEAD(req, res) {
  const URI = decodeURIComponent(req.url);

  if (config.public && !cookies.get(req.headers.cookie)) {
    cookies.free(req, res);
  }

  // unauthenticated GETs
  if (URI === "/") {
    if (validateRequest(req)) {
      handleResourceRequest(req, res, "main.html");
      const sessions = db.get("sessions");
      if (sessions[cookies.get(req.headers.cookie)]) {
        sessions[cookies.get(req.headers.cookie)].lastSeen = Date.now();
      }
      db.set("sessions", sessions);
    } else if (firstRun) {
      handleResourceRequest(req, res, "first.html");
    } else {
      handleResourceRequest(req, res, "auth.html");
    }
    return;
  } else if (URI === "/robots.txt") {
    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    res.end("User-agent: *\nDisallow: /\n");
    return log.info(req, res);
  } else if (URI === "/favicon.ico") {
    res.statusCode = 404;
    res.end();
    return log.info(req, res);
  } else if (/^\/!\/res\/[\s\S]+/.test(URI)) {
    return handleResourceRequest(req, res, URI.substring(7));
  }

  if (/^\/!\/dl\/[\s\S]+/.test(URI) || /^\/\$\/[\s\S]+$/.test(URI)) {
    return handleFileRequest(req, res, true);
  }

  // validate requests below
  if (!validateRequest(req)) {
    res.statusCode = 401;
    res.end();
    log.info(req, res);
    return;
  }

  if (/^\/!\/token$/.test(URI)) {
    if (req.headers["x-app"] === "droppy") {
      res.writeHead(200, {
        "Cache-Control": "private, no-store, max-age=0",
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end(csrf.create(req));
    } else {
      res.statusCode = 401;
      res.end();
    }
    log.info(req, res);
  } else if (/^\/!\/type\/[\s\S]+/.test(URI)) {
    handleTypeRequest(req, res, utils.addFilesPath(URI.substring(7)));
  } else if (/^\/!\/file\/[\s\S]+/.test(URI)) {
    handleFileRequest(req, res, false);
  } else if (/^\/!\/zip\/[\s\S]+/.test(URI)) {
    const zipPath = utils.addFilesPath(URI.substring(6));
    fs.stat(zipPath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        streamArchive(req, res, zipPath, true, stats, false);
      } else {
        if (err) log.error(err);
        res.statusCode = 404;
        res.end();
        log.info(req, res);
      }
    });
  } else {
    redirectToRoot(req, res);
  }
}