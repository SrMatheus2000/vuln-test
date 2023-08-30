function unique_name_783 (filename, task) {
  var deferred = Q.defer(),
      self = this;
  
  temp.open('PULVERIZR', function (err, info) {
    var scratchSpace = info.path;
    
    // Copy the old file to a temporary spot
    exec('cp "' + filename + '" ' + scratchSpace, function (error, stdout, stderr) {
      task.call(this, {
        original: filename,
        filename: scratchSpace,
        settings: self.settings,
        deferred: deferred,
        job: self
      }).then(function (newStats) {
        var oldStats = fs.statSync(filename);
        
        self.report.size.start += oldStats.size;
        self.report.size.end += newStats.size;
        
        self.emit('compression', {
          filename: filename,
          oldSize: oldStats.size,
          newSize: newStats.size
        });
        
        // If optimizations were made and this isn't a dry run, copy the new file over
        if (!self.settings.dryRun && newStats.size < oldStats.size) {
          fs.renameSync(scratchSpace, filename);
        } else {
          // Remove the temporary file
          fs.unlinkSync(scratchSpace);
        }
      });
    });
  });
  
  return deferred.promise;
}