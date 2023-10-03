function unique_name_230(dir,callback)
	{
        var split_dir = dir.split('/'),
            curr_dir = '';
        for (var i in split_dir) {
            curr_dir += split_dir[i] + '/';
            if (!_fs.existsSync(curr_dir)) {
                _fs.mkdir(curr_dir, 484, function(err) {if (err) {if (err.code != 'EEXIST') callback(err);}});
            }
        }
        callback();
	}