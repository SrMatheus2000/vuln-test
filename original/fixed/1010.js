function(url, queryParams) {
    if (queryParams) {
        return url + encodeURIComponent(JSON.stringify(queryParams));
    }

    return url;
}