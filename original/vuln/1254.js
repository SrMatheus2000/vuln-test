function (response) {
    response = JSON.stringify(response);
    apiLogger.info("RESPONSE, " + req.params.func + ", " + response);

    //is this a jsonp call, if yes, add the function call
    if(req.query.jsonp)
      response = req.query.jsonp + "(" + response + ")";

    res._____send(response);
  }