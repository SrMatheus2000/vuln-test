(req, res) => {
                let parts = req.url.split('/');
                parts = parts.splice(2);
                const transport = parts.shift();
                let filename = parts.join('/');
                const config = adapter.systemConfig;
                // detect file log
                if (config && config.log && config.log.transport) {
                    if (config.log.transport.hasOwnProperty(transport) && config.log.transport[transport].type === 'file') {
                        if (config.log.transport[transport].filename) {
                            parts = config.log.transport[transport].filename.replace(/\\/g, '/').split('/');
                            parts.pop();
                            filename = path.join(parts.join('/'), filename);
                        } else {
                            filename = path.join('log/', filename) ;
                        }

                        if (filename[0] !== '/' && !filename.match(/^\W:/)) {
                            filename = path.normalize(__dirname + '/../../../') + filename;
                        }

                        if (fs.existsSync(filename)) {
                            const stat = fs.lstatSync(filename);
                            if (stat.size > 2 * 1024 * 1024) {
                                res.sendFile(filename);
                            } else {
                                res.send(decorateLogFile(filename));
                            }

                            return;
                        }
                    }
                }
                res.status(404).send('File ' + filename + ' not found');
            }