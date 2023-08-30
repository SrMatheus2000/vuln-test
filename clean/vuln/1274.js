function say(text, lang, cb) {
	var file = getTmpFile(),
		command = commandTmpl.replace('{{lang}}', lang).replace('{{text}}', text).replace(/\{\{file\}\}/g, file)
	exec(command, function(err) {
		cb && cb(err)
		fs.unlink(file)
	})
}