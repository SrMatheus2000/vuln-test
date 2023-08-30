function unique_name_715(cb){

    // Get the Pad available content keys
    db.findKeys("pad:"+padId+"*", null, function(err,records){
      if(!err){
        cb(err, records);
      }
    })
  }