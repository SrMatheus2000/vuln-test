function onsocket(socket) {
    // replay the "buffers" Buffer onto the `socket`, since at this point
    // the HTTP module machinery has been hooked up for the user
    if (socket.listenerCount('data') > 0) {
      socket.emit('data', buffers);
    } else {
      // never?
      throw new Error('should not happen...');
    }

    socket.resume();
    // nullify the cached Buffer instance
    buffers = null;
  }