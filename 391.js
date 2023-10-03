(obj1, obj2, valid, cb) => {
    /*
    * Already not valid
    * */
    if (!valid) return false;

    /*
    * Is Pattern(obj2) Primitive type
    * */
    if( obj2 !== Object(obj2) ){
        return valid = cb(obj1, obj2);
    }

    /*
    * Iterate through obj1
    * */
    for (var property in obj1) {
        if (obj1.hasOwnProperty(property)) {
            // case with null or undefined
            if (obj1[property] === null || obj2[property] === null || typeof obj1[property] === 'undefined' || typeof obj2[property] === 'undefined') {
                if (!(valid = cb(obj1[property], obj2[property]))) {
                    return false
                }
            }
            // iterate if pattern is a array
            else if ((obj2[property].constructor === Array) && (obj2[property].length > 0)) {
                if (obj1[property].constructor !== Array) {
                    if (!(valid = cb(obj1[property], obj2[property]))) {
                        return false;
                    }
                    continue;
                }
                for (let i = 0; i < obj1[property].length; i++) {
                    if (!(valid = iterate(obj1[property][i], obj2[property][0], valid, cb))) {
                        return false
                    }
                }
            }

            // iterate recursavely when object and json are objects / and when pattern has other keys
            else if ((obj1[property].constructor === Object) && (obj2[property].constructor === Object) && (Object.keys(obj2[property]).length !== 0)) {
                if (!(valid = iterate(obj1[property], obj2[property], valid, cb))) {
                    return false
                }
            }
            //
            else {
                if (!(valid = cb(obj1[property], obj2[property]))) {
                    return false
                }
            }
        }
    }

    return valid
}