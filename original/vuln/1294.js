function (keyword, key, additional) {
    var schema = this.schema,
        path = this.path,
        errorPath = path !== 'data' || key ?
            '(path ? path + "." : "") + ' + getPathExpression(path, key) + ',' :
            'path,',
        res = key && schema.properties && schema.properties[key] ?
            this.resolver.resolve(schema.properties[key]) : null,
        message = res ? res.requiredMessage : schema.invalidMessage;

    if (!message) {
        message = (res && res.messages && res.messages[keyword]) ||
            (schema.messages && schema.messages[keyword]);
    }

    this.code('errors.push({');

    if (message) {
        this.code('message: ' + encodeStr(message) + ',');
    }

    if (additional) {
        this.code('additionalProperties: ' + additional + ',');
    }

    this.code('path: ' + errorPath)
        ('keyword: ' + encodeStr(keyword))
    ('})');

    if (!this.greedy) {
        this.code('return');
    }
}