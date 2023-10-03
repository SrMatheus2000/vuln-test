function getRedirectUrl(query) {
    try {
        const redirect = decodeURIComponent(query.r || '/');
        return url.parse(redirect).pathname;
    } catch (e) {
        return '/';
    }
}