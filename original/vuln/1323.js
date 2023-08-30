function(options) {
		return new Promise((resolve, reject) => {

			// if the ipc Command was set by the user, use that
			if(options.ipc_command){
				// check if the command is correct
				if(!['--input-ipc-server', '--input-unix-socket'].includes(options.ipc_command)){
					reject(new ErrorHandler().errorMessage(1, 'start()', [options.ipc_command],
							// error message
							`"${options.ipc_command}" is not a valid ipc command`,
							// argument options
							{
								'--input-unix-socket': 'mpv 0.16.0 and below',
								'--input-ipc-server':  'mpv 0.17.0 and above'
							}
					));
				}
				else{
					resolve(options.ipc_command)
				}
			}
			// determine the ipc command according to the version number
			else{
				// the name of the ipc command was changed in mpv version 0.17.0 to '--input-ipc-server'
				// that's why we have to check which mpv version is running
				// asks for the mpv version
				exec((options.binary ? '"' + options.binary + '"' + ' --version' : 'mpv --version'), {encoding: 'utf8'}, (err, stdout, stderr) => {

					// if any error occurs reject it
					if(err){
						return reject(err);
					}

					// Version Number found
					if(stdout.match(/UNKNOWN/) == null){
						// get the version part of the output
						// looking for mpv 0.XX.Y
						const regex_match = (stdout.match(/(mpv) \d+.\d+.\d+/));

						if(regex_match){
							const match = regex_match[0]
							// split at the whitespace to get the numbers
							// split at the dot and look at the middle one to check for the
							// critical version number
							const versionNumber = parseInt(match.split(" ")[1].split(".")[1]);
							// Verison 0.17.0 and higher
							if(versionNumber >= 17){
								resolve('--input-ipc-server');
							}
							// Version 0.16.0 and below
							else{
								resolve('--input-unix-socket');
							}
						}
						// when MPV is built from source it sometimes has a git hash as
						// the version number
						// In this case assume it's a newer version and use the new command
						else{
							resolve("--input-ipc-server");
						}
					}
					// when compiling mpv from source the displayed version number is 'UNKNOWN'
					// I assume that version that is compiled from source is the latest version
					// and use the new command
					else{
						resolve('--input-ipc-server');
					}
				})
			}
		});
	}