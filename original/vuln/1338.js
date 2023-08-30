function(packages, opts){
		if(packages.length == 0 || !packages || !packages.length){return Promise.reject("No packages found");}
		if(typeof packages == "string") packages = [packages];
		if(!opts) opts = {};
		var cmdString = "npm install " + packages.join(" ") + " "
		+ (opts.global ? " -g":"")
		+ (opts.save   ? " --save":" --no-save")
		+ (opts.saveDev? " --save-dev":"")
		+ (opts.legacyBundling? " --legacy-bundling":"")
		+ (opts.noOptional? " --no-optional":"")
		+ (opts.ignoreScripts? " --ignore-scripts":"");

		return new Promise(function(resolve, reject){
			var cmd = exec(cmdString, {cwd: opts.cwd?opts.cwd:"/", maxBuffer: opts.maxBuffer?opts.maxBuffer:200 * 1024},(error, stdout, stderr) => {
				if (error) {
					reject(error);
				} else {
					resolve(true);
				}
			});

			if(opts.output) {
				var consoleOutput = function(msg) {
					console.log('npm: ' + msg);
				};

				cmd.stdout.on('data', consoleOutput);
				cmd.stderr.on('data', consoleOutput);
			}
		});
	}