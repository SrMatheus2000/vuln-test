function acceptHtmlAndProvidePdf(request, response) {
    console.log('Request received: ' + request);

    request.content = '';

    request.addListener("data", function (chunk) {
        if (chunk) {
            request.content += chunk;
        }
    });

    request.addListener("end", function () {

        var options = {
            encoding: 'utf-8',
            pageSize: request.headers['x-page-size'] || 'Letter'
        };

        response.writeHead(200, { 'Content-Type': 'application/pdf' });

        htmlToPdf(request.content, options)
            .pipe(response);

        console.log('Processed HTML to PDF: ' + response);
    });
}