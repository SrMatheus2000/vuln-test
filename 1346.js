function unique_name_784(dir) {
	var cmd = null;
	switch(process.platform) {
	    case "win32":
	        cmd = 'start "' + dir + '" /D "' + dir + '"';
	        break;
	    case "win64":
	        cmd = 'start "' + dir + '" /D "' + dir + '"';
	        break;
	    default:
	        throw new Error(process.platform + " is not supported. Please CONTRIBUTE at https://github.com/s-a/node-prompt-here.");
	}
	child_process.exec(cmd);
}