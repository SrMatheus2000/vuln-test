function unique_name_716(padId, callback){
  async.waterfall([
  function(cb){

    // Get the Pad available content keys
    db.findKeys("pad:"+padId+"*", null, function(err,records){
      if(!err){
        cb(err, records);
      }
    })
  },
  function(records, cb){
    var data = {};

    async.forEachSeries(Object.keys(records), function(key, r){

      // For each piece of info about a pad.
      db.get(records[key], function(err, entry){
        data[records[key]] = entry;

        // Get the Pad Authors
        if(entry.pool && entry.pool.numToAttrib){
          var authors = entry.pool.numToAttrib;
          async.forEachSeries(Object.keys(authors), function(k, c){
            if(authors[k][0] === "author"){
              var authorId = authors[k][1];

              // Get the author info
              db.get("globalAuthor:"+authorId, function(e, authorEntry){
                if(authorEntry && authorEntry.padIDs) authorEntry.padIDs = padId;
                if(!e) data["globalAuthor:"+authorId] = authorEntry;
              });

            }
            // console.log("authorsK", authors[k]);
            c(null);
          });
        }
        r(null); // callback;
      });
    }, function(err){ 
      cb(err, data);
    })
  }
  ], function(err, data){
    callback(null, data);
  });
}