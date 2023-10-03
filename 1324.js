function unique_name_770(options) {
  var compassOptions = merge(this.defaultOptions, options || {});
  var command = generateCommand(compassOptions);

  return new RSVP.Promise(function(resolve, reject) {
    exec(command, function(error, stdout, stderr) {
      if (error) {
        if (stdout) { console.log(stdout); }
        if (stderr) { console.log(stderr); }
        reject(error);
      } else {
        resolve(compassOptions.cssDir);
      }
    });
  });
}