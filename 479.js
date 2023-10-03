function * unique_name_227 (next) {

    const directory = config.get(configKey.DIRECTORY);

    // decode for chinese character
    let requestPath = decodeURIComponent(this.request.path);
    let fullRequestPath = path.join(directory, requestPath);
    let stat = yield getFileStat(fullRequestPath);

    if (stat.isDirectory()) {

        let files = yield readFolder(fullRequestPath);

        if (files.indexOf(INDEX_PAGE) !== NOT_FOUNT_INDEX) {

            this.redirect(path.join(requestPath, INDEX_PAGE), '/');

        } else {

            this.body = buildFileBrowser(files, requestPath, directory);
            this.type = mime.lookup(INDEX_PAGE);

        }

    } else if (stat.isFile()) {

        this.body = yield readFile(fullRequestPath);
        let type = mime.lookup(fullRequestPath);

        if (path.extname(fullRequestPath) === '') {

            type = FALLBACK_CONTENT_TYPE;

        }

        this.type = type;
        log.verbose(logPrefix.RESPONSE, this.request.method, requestPath, 'as', type);

    }

    yield next;

}