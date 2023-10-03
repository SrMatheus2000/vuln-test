function onConnection(options, socket) {
        var msg, onDisconnect, onMessage,
            execute     = options.execute,
            indexEmpty  = Clients.indexOf(null),
            ERROR_MSG   = 'could not be empty!';
        
        if (!socket)
            throw Error('socket ' + ERROR_MSG);
        
        logClients('add before:', Clients);
        
        if (indexEmpty >= 0)
            ConNum = indexEmpty;
        else
            ConNum = Clients.length;
        
        msg = log(ConNum + 1, 'console connected\n');
        
        socket.emit('data', msg);
        
        socket.emit('path', options.prompt || CWD);
        socket.emit('prompt');
        
        Clients[ConNum] = {
            cwd : CWD
        };
        
        logClients('add after:', Clients);
        
        onMessage                   = processing.bind(null, socket, ConNum, execute),
        
        onDisconnect                = function(conNum) {
            logClients('remove before:', Clients);
            
            if (Clients.length !== conNum + 1) {
                Clients[conNum] = null;
            } else {
                Clients.pop();
                --ConNum;
            }
            
            logClients('remove after:', Clients);
            
            log(conNum, 'console disconnected');
            
            socket.removeListener('command', onMessage);
            socket.removeListener('disconnect', onDisconnect);
        }.bind(null, ConNum);
        
        socket.on('command', onMessage);
        socket.on('disconnect', onDisconnect);
    }