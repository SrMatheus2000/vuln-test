function unique_name_510(currentNode) {
            var regex = /^(\w+script|data):/gi,
                clonedNode = currentNode.cloneNode();

            for (var attr = currentNode.attributes.length-1; attr >= 0; attr--) {
                var tmp = clonedNode.attributes[attr];
                currentNode.removeAttribute(currentNode.attributes[attr].name);

                if (tmp instanceof Attr) {
                    if (
                        (ALLOWED_ATTR.indexOf(tmp.name.toLowerCase()) > -1 ||
                        (ALLOW_DATA_ATTR && tmp.name.match(/^data-[\w-]+/i)))
                        && !tmp.value.replace(/[\x00-\x20]/g,'').match(regex)
                    ) {
                        currentNode.setAttribute(tmp.name, tmp.value);
                    }
                }
            }
        }