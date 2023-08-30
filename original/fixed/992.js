function (reason, description) {
  if ('closed' != this.readyState) {
    clearTimeout(this.pingTimeoutTimer);
    clearInterval(this.checkIntervalTimer);
    this.checkIntervalTimer = null;
    clearTimeout(this.upgradeTimeoutTimer);
    var self = this;
    // clean writeBuffer in next tick, so developers can still
    // grab the writeBuffer on 'close' event
    setImmediate(function() {
      self.writeBuffer = [];
    });
    this.packetsFn = [];
    this.sentCallbackFn = [];
    this.clearTransport();
    this.readyState = 'closed';
    this.emit('close', reason, description);
  }
}