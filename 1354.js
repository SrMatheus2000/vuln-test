function unique_name_789(port, fn) {
    cp.exec('lsof -i tcp:' + port, function(err, d) {
        d = d.split('\n');
        var data = [];
        var headers = d[0].toLowerCase().split(/\s+/);
        headers.forEach(function(v, k) {
            /*istanbul ignore next*/
            if (v === '') {
                delete headers[k];
            }
        });
        delete d[0]; //Remove the headers
        d.pop(); //Remove the last dead space
        d.forEach(function(v) {
            v = v.split(/\s+/);
            var k = {};
            var finalField = v[headers.length];
            /*istanbul ignore else*/
            if (finalField) {
	            // There is one more field than there are headers. Interpret that state info.
	            // These are things like '(LISTEN)' or '(ESTABLISHED)'. Save it into the state
	            // field minus the parenthesis and lowercased
	            k['state'] = finalField.substring(1, finalField.length-1).toLowerCase();
	            v.pop();
            }
            v.forEach(function(s, i) {
                k[headers[i]] = s;
            });
            data.push(k);
        });
        fn(data);
    });
}