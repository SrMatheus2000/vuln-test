function (error, list) {
                    if (error) {
                        console.log(error);
                        res.end(error.toString())
                    }
                    var dirs = [];
                    var files = [];
                    list.forEach(function (val) {
                        var file = fs.lstatSync(path.join(targetPath, val));
                        if (file.isFile()) {
                            files.push(val)
                        } else if (file.isDirectory()) {
                            dirs.push(val);
                        }
                    });
                    res.writeHead(200);
                    res.write(utils.render(req.url, dirs, files));
                    res.end()
                }