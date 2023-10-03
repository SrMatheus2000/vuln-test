function unique_name_129(message, local, callback, context) {
    var method = Faye.Channel.parse(message.channel)[1],
        response;

    if (Faye.indexOf(this.META_METHODS, method) < 0) {
      response = this._makeResponse(message);
      response.error = Faye.Error.channelForbidden(message.channel);
      response.successful = false;
      return callback.call(context, [response]);
    }

    this[method](message, local, function(responses) {
      responses = [].concat(responses);
      for (var i = 0, n = responses.length; i < n; i++) this._advize(responses[i], message.connectionType);
      callback.call(context, responses);
    }, this);
  }