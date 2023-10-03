function runNpmCommand(command, callback) {
		require('child_process').exec(command, function (err, stdout) {
			if (err) {
				return callback(err);
			}
			winston.verbose('[plugins] ' + stdout);
			callback();
		 });
	}