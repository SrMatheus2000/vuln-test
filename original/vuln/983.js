function(html) {
    // Strip the script tags from the html and inline evenhandlers
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    html = html.replace(/(on\w+="[^"]*")*(on\w+='[^']*')*(on\w+=\w*\(\w*\))*/gi, '');

    return html;
}