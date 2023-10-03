function validateStdin() {
    var command = this;
    var config = getConfig();
    var rl = readline.createInterface({
        input: process.stdin
    });
    var commits = [];
    var started = false;
    var sha, cmd, message, output;
    var validateSha = function() {
        sha = commits.shift();
        if (!sha) return;

        cmd = util.format('git show -s --format=%B %s', sha);

        try {
            message = execSync(cmd, {
                cwd: process.cwd(),
                encoding: 'utf8',
                stdio: [null]
            });
        } catch(e) {
            console.error(e.toString());
            console.error('Make sure the commit hash is found at the beginning of each line');
            process.exit(1);
        }

        cmd = util.format('git log %s -1 %s', command.logOptions, sha);
        try {
            output = execSync(cmd, {
                cwd: process.cwd(),
                encoding: 'utf8',
                stdio: [null]
            });
        } catch(e) {
            console.error(e.toString());
            process.exit(1);
        }

        CommitMessage.parse(message, config, function(err, validator) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            outputCommit(validator, output);
            validateSha(); // continue
        });
    }

    rl.on('line', function (line) {
        line.split(' ').forEach(function(c) {
            commits.push(c);
        });
        if (!started) {
            validateSha();
            started = true;
        }
    });
}