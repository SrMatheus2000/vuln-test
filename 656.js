async(request, response) => {
  if (isRestricted(request.params.url)) {
    response.status(403).send('Render request forbidden, domain excluded');
    return;
  }

  try {
    const start = now();
    const result = await renderer.serialize(request.params.url, request.query, config);
    response.status(result.status).send(result.body);
    track('render', now() - start);
  } catch (err) {
    let message = `Cannot render ${request.params.url}`;
    if (err && err.message)
      message += ` - "${err.message}"`;
    response.status(400).send(message);
  }
}