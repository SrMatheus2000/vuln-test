function serveIndexPage () {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')

      const listHtml = torrent.files.map((file, i) => `<li><a download="${file.name}" href="/${i}/${file.name}">${file.path}</a> (${file.length} bytes)</li>`).join('<br>')

      const html = getPageHTML(
        `${torrent.name} - WebTorrent`,
        `<h1>${torrent.name}</h1><ol>${listHtml}</ol>`
      )
      res.end(html)
    }