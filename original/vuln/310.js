function setDeepProperty(obj, propertyPath, value) {
    const a = splitPath(propertyPath);
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        const k = a[i];
        if (!(k in obj)) {
            obj[k] = {};
        }
        obj = obj[k];
    }
    obj[a[n - 1]] = value;
    return;
}