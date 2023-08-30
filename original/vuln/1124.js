function(url, queryParams) {
    if (queryParams) {
        return url + JSON.stringify(queryParams);
    }

    return url;
}