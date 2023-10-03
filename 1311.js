function mergeObjects(origin, add, opts) {
    "use strict";

    var options = opts || {},
        keepReferences = options.keepReferences;

    if (phantom.casperEngine === 'slimerjs') {
        // Because of an issue in the module system of slimerjs (security membranes?)
        // constructor is undefined.
        // let's use an other algorithm
        return mergeObjectsInGecko(origin, add, options);
    }

    for (var p in add) {
        if (add[p] && add[p].constructor === Object) {
            if (origin[p] && origin[p].constructor === Object) {
                origin[p] = mergeObjects(origin[p], add[p]);
            } else {
                origin[p] = keepReferences ? add[p] : clone(add[p]);
            }
        } else {
            origin[p] = add[p];
        }
    }
    return origin;
}