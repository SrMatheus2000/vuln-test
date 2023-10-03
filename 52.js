function _recursiveMerge(base, extend) {
    if (!isPlainObject(base))
        return extend;
    for (var key in extend)
        base[key] = (isPlainObject(base[key]) && isPlainObject(extend[key])) ?
            _recursiveMerge(base[key], extend[key]) :
            extend[key];
    return base;
}