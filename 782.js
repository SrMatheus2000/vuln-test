function isSafe(userAgent) {
  var consecutive = 0
    , code = 0;

  for (var i = 0; i < userAgent.length; i++) {
    code = userAgent.charCodeAt(i);
    // numbers between 0 and 9
    if (code >= 48 && code <= 57) {
      consecutive++;
    } else {
      consecutive = 0;
    }

    if (consecutive >= 100) {
      return false;
    }
  }

  return true
}