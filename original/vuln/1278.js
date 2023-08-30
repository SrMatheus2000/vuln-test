function (files, options, callback) {
	if (!options.trim) return callback(null);
	
	var uuid = crypto.randomBytes(16).toString("hex");
	var i = 0;
	async.eachSeries(files, function (file, next) {
		file.originalPath = file.path;
		i++;
		file.path = path.join(os.tmpdir(), 'spritesheet_js_' + uuid + "_" + (new Date()).getTime() + '_image_' + i + '.png');

		var scale = options.scale && (options.scale !== '100%') ? ' -resize ' + options.scale : '';
		var fuzz = options.fuzz ? ' -fuzz ' + options.fuzz : '';
		//have to add 1px transparent border because imagemagick does trimming based on border pixel's color
		exec('convert' + scale + ' ' + fuzz + ' -define png:exclude-chunks=date "' + file.originalPath + '" -bordercolor transparent -border 1 -trim "' + file.path + '"', next);
	}, callback);
}