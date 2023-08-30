function unique_name_758 (option, cb) {
    var foption = "-l ";

    if (option) {
	foption += option;
    }

    exec(this._build_cmd(foption), function (err, stdout, stderr) {
	if(err) {
	    cb(err, stdout);
	} else {
	    var apps = stdout.split('\n'),
		res = [];
	    for (var i = 0; i < apps.length; i++) {
               // handle old-style output
		var info = apps[i].split(' - ');
		if (info.length === 2) {
		    res.push({name: info[1], fullname: info[0]});
		}

               // handle new-style output
               info = apps[i].replace(/"/g, "").split(",");
               if (info.length === 3) {
                   var name = info[2].trim() + " " + info[1].trim();
                   res.push({name: name, fullname: info[0]});
               }
	    }
	    cb(null, res);
	}
    });
}