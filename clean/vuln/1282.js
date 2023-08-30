function unique_name_748(obj, key) {
    // Prevent prototype pollution
    // https://snyk.io/vuln/SNYK-JS-JSON8MERGEPATCH-1038399
    if (key === 'constructor' && typeof obj[key] === 'function') {
        return false;
    }
    if (key === '__proto__') {
        return false;
    }
    return true;
}