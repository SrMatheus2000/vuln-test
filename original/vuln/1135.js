function(data){
    if (data === undefined) {
      data = '';
    }
    $('#message-bar').removeClass('message-success');
    $('#message-bar').addClass('message-fail');

    var val = $('#message-bar').html(data);

    if (this.options.onFailure) {
      this.options.onFailure(data);
    }

    return val;
  }