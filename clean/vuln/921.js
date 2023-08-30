function handleSource(req, res, next) {
    req.body.subscribed_url = req.body.location;
    req.body.subscribed_referrer = req.body.referrer;
    delete req.body.location;
    delete req.body.referrer;

    postlookup(req.body.subscribed_url)
        .then(function (result) {
            if (result && result.post) {
                req.body.post_id = result.post.id;
            }

            next();
        })
        .catch(function (err) {
            if (err instanceof errors.NotFoundError) {
                return next();
            }

            next(err);
        });
}