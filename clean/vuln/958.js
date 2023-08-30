function tag(tagName, attrsMap, content) {
    var safeTagName = htmlEscape(tagName);
    var attrsHTML = !is.array(attrsMap) ? attrs(attrsMap) : attrsMap.reduce(function (html, map) {
        return html + attrs(map);
    }, '');
    return '<' + safeTagName + attrsHTML + (isSelfClosing(safeTagName) ? ' />' : '>' + content + '</' + safeTagName + '>');
}