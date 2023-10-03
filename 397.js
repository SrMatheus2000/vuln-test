function sanitizeURL(url) {
    if (url.trim().toLowerCase().indexOf('javascript:') === 0) {
        return 'about:blank';
    }
    return url;
}