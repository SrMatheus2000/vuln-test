function uncapitalise(req, res, next) {
    /*jslint unparam:true*/
    var pathToTest = req.path,
        isSignupOrReset = req.path.match(/(\/ghost\/(signup|reset)\/)/i),
        isAPI = req.path.match(/(\/ghost\/api\/v[\d\.]+\/.*?\/)/i);

    if (isSignupOrReset) {
        pathToTest = isSignupOrReset[1];
    }

    // Do not lowercase anything after /api/v0.1/ to protect :key/:slug
    if (isAPI) {
        pathToTest = isAPI[1];
    }

    /**
     * In node < 0.11.1 req.path is not encoded, afterwards, it is always encoded such that | becomes %7C etc.
     * That encoding isn't useful here, as it triggers an extra uncapitalise redirect, so we decode the path first
     */
    if (/[A-Z]/.test(decodeURIComponent(pathToTest))) {
        res.set('Cache-Control', 'public, max-age=' + utils.ONE_YEAR_S);
        // Adding baseUrl ensures subdirectories are kept
        res.redirect(301, (req.baseUrl ? req.baseUrl : '') + req.url.replace(pathToTest, pathToTest.toLowerCase()));
    } else {
        next();
    }
}