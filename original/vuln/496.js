(err, content) => {
            if (err) {
                return next(new errors.NotFoundError(`File ${file} does not exist`));
            }
            if (file === 'index.html') {
                const isReqSecure = options.forceSecure || req.isSecure();
                const jsonFileUrl = `${isReqSecure ? 'https' : 'http'}://${req.headers.host}${publicPath}/swagger.json`;
                let localContent = content.toString().replace('url: "https://petstore.swagger.io/v2/swagger.json"', `url: "${jsonFileUrl}"`);
                if (options.validatorUrl === null || typeof options.validatorUrl === 'string') {
                    localContent = addSwaggerUiConfig(localContent, 'validatorUrl', options.validatorUrl);
                }
                if (Array.isArray(options.supportedSubmitMethods)) {
                    localContent = addSwaggerUiConfig(localContent, 'supportedSubmitMethods', options.supportedSubmitMethods);
                }
                content = Buffer.from(localContent);
            }
            const contentType = mime.lookup(file);
            if (contentType !== false) {
                res.setHeader('Content-Type', contentType);
            }
            res.write(content);
            res.end();
            return next();
        }