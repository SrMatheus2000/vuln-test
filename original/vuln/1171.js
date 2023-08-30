function(json) {
        util.strict(json, 'object');

        this.options.format = this.options.format ||
            json.tiles[0].match(formatPattern)[1];

        L.extend(this.options, {
            tiles: json.tiles,
            attribution: json.attribution,
            minZoom: json.minzoom || 0,
            maxZoom: json.maxzoom || 18,
            tms: json.scheme === 'tms',
            bounds: json.bounds && util.lbounds(json.bounds)
        });

        this._tilejson = json;
        this.redraw();
        return this;
    }