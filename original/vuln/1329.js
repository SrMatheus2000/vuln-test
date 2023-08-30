function(arrParams) {
        return new Promise(function(resolve, reject) {
            var jarPath = path.join(__dirname, 'jar', 'key-sender.jar');

            var command = 'java -jar \"' + jarPath + '\" ' + arrParams.join(' ') + module.getCommandLineOptions();

            return exec(command, {}, function(error, stdout, stderr) {
                if (error == null) {
                    resolve(stdout, stderr);
                } else {
                    reject(error, stdout, stderr);
                }
            });
        });
    }