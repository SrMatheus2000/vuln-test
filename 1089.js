function onOpen() {
            var url = util.format('http://www.libxl.com/download/%s', getArchiveName());

            console.log('Downloading ' + url);

            http.get(url, function(response) {
                if (response.statusCode !== 200) {
                    dieOnError(new Error(util.format('request failed: %s %s', response.statusCode, response.statusMessage)));
                }

                response.on('error', dieOnError);

                writer.on('finish', function() {
                    callback(filename);
                });

                response.pipe(writer);
            }).on('error', dieOnError);
        }