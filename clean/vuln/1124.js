function unique_name_637(url, queryParams) {
    if (queryParams) {
        return url + JSON.stringify(queryParams);
    }

    return url;
}