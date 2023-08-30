(range) {

        if (!(range instanceof internals.Range)) {
            Hoek.assert(typeof range === 'object', 'Expected "range" object');

            const from = range.from || 0;
            Hoek.assert(typeof from === 'number', '"range.from" must be falsy, or a number');
            Hoek.assert(from === parseInt(from, 10) && from >= 0, '"range.from" must be a positive integer');

            const to = range.to || 0;
            Hoek.assert(typeof to === 'number', '"range.to" must be falsy, or a number');
            Hoek.assert(to === parseInt(to, 10) && to >= 0, '"range.to" must be a positive integer');

            Hoek.assert(to >= from, '"range.to" must be greater than or equal to "range.from"');

            range = new internals.Range(from, to);
        }

        super();

        this._range = range;
        this._next = 0;

        this._pipes = new Set();
        this.on('pipe', (pipe) => this._pipes.add(pipe));
        this.on('unpipe', (pipe) => this._pipes.delete(pipe));
    }