function (response) {

    const request = response.request;
    if (!request.connection.settings.compression) {
        return null;
    }

    const mime = request.server.mime.type(response.headers['content-type'] || 'application/octet-stream');
    if (!mime.compressible) {
        return null;
    }

    response.vary('accept-encoding');

    if (response.headers['content-encoding']) {
        return null;
    }

    return (request.info.acceptEncoding === 'identity' ? null : request.info.acceptEncoding);
}