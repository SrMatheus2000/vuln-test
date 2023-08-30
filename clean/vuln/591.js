function unique_name_303 () {
    const apiRoute = '/embark-api/process-logs/' + this.processName;
    this.embark.registerAPICall(
      'ws',
      apiRoute,
      (ws, _req) => {
        this.events.on('process-log-' + this.processName, function (log) {
          ws.send(JSON.stringify(log), () => {});
        });
      }
    );
    this.embark.registerAPICall(
      'get',
      '/embark-api/process-logs/' + this.processName,
      (req, res) => {
        let limit = parseInt(req.query.limit, 10);
        if (!Number.isInteger(limit)) limit = 0;
        const result = this.logHandler.logs.slice(limit * -1);
        res.send(JSON.stringify(result));
      }
    );
  }