function (header, length) {

    // Parse header

    const parts = header.split('=');
    if (parts.length !== 2 ||
        parts[0] !== 'bytes') {

        return null;
    }

    const lastPos = length - 1;

    const result = [];
    const ranges = parts[1].match(/\d*\-\d*/g);

    // Handle headers with multiple ranges

    for (let range of ranges) {
        if (range.length === 1) {               // '-'
            return null;
        }

        let from;
        let to;
        range = range.split('-');
        if (range[0]) {
            from = parseInt(range[0], 10);
        }

        if (range[1]) {
            to = parseInt(range[1], 10);
            if (from !== undefined) {      // Can be 0
                // From-To
                if (to > lastPos) {
                    to = lastPos;
                }
            }
            else {
                // -To
                from = length - to;
                to = lastPos;
            }
        }
        else {
            // From-
            to = lastPos;
        }

        if (from > to) {
            return null;
        }

        result.push(new internals.Range(from, to));
    }

    if (result.length === 1) {
        return result;
    }

    // Sort and consolidate ranges

    result.sort((a, b) => a.from - b.from);

    const consolidated = [];
    for (let i = result.length - 1; i > 0; --i) {
        const current = result[i];
        const before = result[i - 1];
        if (current.from <= before.to + 1) {
            before.to = current.to;
        }
        else {
            consolidated.unshift(current);
        }
    }

    consolidated.unshift(result[0]);

    return consolidated;
}