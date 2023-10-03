function unique_name_647(data){
    if (data === undefined) {
      data = '';
    }
    $('#message-bar').removeClass('message-fail');
    $('#message-bar').addClass('message-success');
    $('#message-bar').html(data);
  }