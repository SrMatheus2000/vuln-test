async(request, response) => {
  if (isRestricted(request.params.url)) {
    response.status(403).send('Render request forbidden, domain excluded');
    return;
  }

  try {
    const start = now();
    const result = await renderer.captureScreenshot(request.params.url, request.query, config).catch((err) => console.error(err));
    const img = new Buffer(result, 'base64');
    response.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': img.length
    });
    response.end(img);
    track('screenshot', now() - start);
  } catch (err) {
    let message = `Cannot render ${request.params.url}`;
    if (err && err.message)
      message += ` - "${err.message}"`;
    response.status(400).send(message);
  }
}