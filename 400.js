function sanitizePath(id, name, callback) {
    if (name[0] === '/') name = name.substring(1);

    if (!id) {
        if (typeof callback === 'function') {
            callback('Empty ID');
        }
        return;
    }

    if (id) {
        id = id.replace(/\.\./g, ''); // do not allow to write in parent directories
    }

    if (name.indexOf('..') !== -1) {
        name = path.normalize(name);
        name = name.replace(/\\/g, '/');
    }
    if (name[0] === '/') name = name.substring(1); // do not allow absolute paths

    return {id: id, name: name};
}