function unique_name_445 (host, callback) {


    Dns.lookup(host.toUpperCase(), (err) => {

        if (err && Net.isIP(host) === 0) {
            return callback(new Error('Invalid host'));
        }

        const command = (internals.isWin ? 'tracert -d ' : 'traceroute -q 1 -n ') + host;
        Child.exec(command, (err, stdout, stderr) => {

            if (err) {
                return callback(err);
            }

            const results = internals.parseOutput(stdout);
            return callback(null, results);
        });
    });
}