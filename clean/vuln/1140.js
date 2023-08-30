function unique_name_649(options) {
        var o       = options || {},
            prefix  = o.prefix || '/console';
        
        if (o.socket)
            Socket = o.socket;
        else if (o.server)
            Socket = io.listen(o.server);
        else
            throw Error('server or socket should be passed in options!');
        
        Socket
            .of(prefix)
            .on('connection', onConnection.bind(null, options));
    }