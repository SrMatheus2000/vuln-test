function attemptDownload(attemptsLeft) {
    var url = "http://dl-ssl.google.com/android/repository/platform-tools_r16-" + platform + ".zip";
    var tempFile = "/tmp/platform-tools-" + (new Date().getTime()) + ".zip";

    var file = fs.createWriteStream(tempFile);
    var request = http.get(url, function (response) {
        response.pipe(file);
        response.on('end', function () {
            exec("unzip -j -o " + tempFile + " platform-tools/aapt -d tools/", function (err) {
                if (err) {
                    if (attemptsLeft === 0) {
                        throw err;
                    } else {
                        attemptDownload(attemptsLeft - 1);
                        return;
                    }
                }
                fs.chmodSync('tools/aapt', '755');
                fs.unlinkSync(tempFile);
                process.exit();
            });
        });
    });
}