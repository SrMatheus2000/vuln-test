(req, res) => {
        let limit = parseInt(req.query.limit, 10);
        if (!Number.isInteger(limit)) limit = 0;
        const result = this.logHandler.logs.slice(limit * -1);
        res.send(JSON.stringify(result));
      }