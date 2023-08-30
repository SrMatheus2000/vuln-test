(err) => {
    const sockServer = sockjs.createServer({
      // Use provided up-to-date sockjs-client
      sockjs_url: '/__webpack_dev_server__/sockjs.bundle.js',
      // Limit useless logs
      log: (severity, line) => {
        if (severity === 'error') {
          this.log.error(line);
        } else {
          this.log.debug(line);
        }
      }
    });

    sockServer.on('connection', (conn) => {
      if (!conn) return;
      if (!this.checkHost(conn.headers)) {
        this.sockWrite([conn], 'error', 'Invalid Host header');
        conn.close();
        return;
      }
      this.sockets.push(conn);

      conn.on('close', () => {
        const connIndex = this.sockets.indexOf(conn);
        if (connIndex >= 0) {
          this.sockets.splice(connIndex, 1);
        }
      });

      if (this.clientLogLevel) { this.sockWrite([conn], 'log-level', this.clientLogLevel); }

      if (this.progress) { this.sockWrite([conn], 'progress', this.progress); }

      if (this.clientOverlay) { this.sockWrite([conn], 'overlay', this.clientOverlay); }

      if (this.hot) this.sockWrite([conn], 'hot');

      if (!this._stats) return;
      this._sendStats([conn], this._stats.toJson(clientStats), true);
    });

    sockServer.installHandlers(this.listeningApp, {
      prefix: '/sockjs-node'
    });

    if (fn) {
      fn.call(this.listeningApp, err);
    }
  }