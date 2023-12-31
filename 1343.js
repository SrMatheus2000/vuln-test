function unique_name_781(options) {
    var cwd = __dirname;
    
    if(typeof options.cwd == "string")
        cwd = options.cwd;
        
    return {
        /**
         * @see https://docs.docker.com/compose/reference/build/
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void 
         */
        build: function(fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose build", { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Creates containers for a service.
         * @see https://docs.docker.com/compose/reference/create/
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        create: function(fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose create --force-recreate --build", { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Validate and view the compose file.
         * @return object
         */
        config: function(){
            return yaml.safeLoad(fs.readFileSync(cwd + "/docker-compose.yml", 'utf8'));
        },
        
        /**
         * Stops containers and removes containers, networks, volumes, and images created by up.
         * @see https://docs.docker.com/compose/reference/down/
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        down: function(fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose down --remove-orphans", { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Stream container events for every container in the project.
         * @see https://docs.docker.com/compose/reference/events/
         * 
         */
        events: function(fnStdout, fnStderr, fnExit){
            var spawnDockerCompose  = spawn("docker-compose", ["events", "--json"], { cwd: cwd });
            spawnDockerCompose.stdout.on('data', function (data) { fnStdout(JSON.parse(data.toString())); });
            spawnDockerCompose.stderr.on('data', function (data) { fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Runs a one-time command against a service. For example, the following command starts the web service and runs bash as its command.
         * @see https://docs.docker.com/compose/reference/exec/
         * @param string containerName
         * @param string cmd
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        exec: function(serviceName, cmd, fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose exec " + serviceName + " " + cmd, { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Forces running containers to stop by sending a SIGKILL signal. Optionally the signal can be passed.
         * @see https://docs.docker.com/compose/reference/kill/
         * @param string containerName
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        kill: function(serviceName, fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose kill -s SIGINT " + serviceName, { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Restarts services.
         * @see https://docs.docker.com/compose/reference/restart/
         * @param string containerName
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        restart: function(serviceName, fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose restart " + serviceName, { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Removes stopped service containers.
         * @see https://docs.docker.com/compose/reference/rm/
         * @param string containerName
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        rm: function(serviceName, fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose rm -f " + serviceName, { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Runs a one-time command against a service. For example, the following command starts the web service and runs bash as its command.
         * @see https://docs.docker.com/compose/reference/run/
         * @param string containerName
         * @param string cmd
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        run: function(serviceName, cmd, fnStdout, fnStderr, fnExit){
            var execDockerCompose  = exec("docker-compose run " + serviceName + " " + cmd, { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * Lists containers.
         * @param function cb
         * @return object
         */
        ps: function(cb){
            var ps = "";
            var execDockerCompose = exec("docker-compose ps", { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { ps += data.toString() });
            execDockerCompose.on('exit', function(data) { 
                var lines = ps.split("\n");
                
                if(lines.length > 2){
                    var containers = [];
                    
                    for(var key=2; key < lines.length; key++){
                        var stats = lines[key].replace("\r").split("   ");
                        
                        if(stats[0] && stats[1])
                            containers.push({name: stats[0], command: stats[1], state: stats[2], ports: stats[3]})
                    }
                    
                    cb(containers);
                }
                else{
                    cb([]);
                }
            });
        },
        
        /**
         * Builds, (re)creates, starts, and attaches to containers for a service.
         * @see https://docs.docker.com/compose/reference/up/
         * @param function fnStdout
         * @param function fnStderr
         * @param function fnExit
         * @return void
         */
        up: function(fnStdout, fnStderr, fnExit){
            var execDockerCompose = exec("docker-compose up -d --remove-orphans", { cwd: cwd });
            execDockerCompose.stdout.on('data', function(data) { if(typeof fnStdout == "function") fnStdout(data.toString()); });
            execDockerCompose.stderr.on('data', function(data) { if(typeof fnStderr == "function") fnStderr(data.toString()); });
            execDockerCompose.on("exit", fnExit);
        },
        
        /**
         * 
         * @see https://www.npmjs.com/package/dockerode
         * @returns {nm$_index.module.exports.RemoteAPIModel.indexAnonym$0}
         */
        DockerRemoteAPI: function(options){
            if(typeof options == "object")
                options.cwd = cwd;
            else
                options = {cwd: cwd};
            
            return RemoteAPIModel(options);
        }
    };
    
    function RemoteAPIModel(options){ 
        return {
            /**
             * .yml file settings
             * @type object
             */
            settings: yaml.safeLoad(fs.readFileSync(options.cwd + "/docker-compose.yml", 'utf8')),
            
            /**
             * Dockerode module
             * @type object
             * @see https://www.npmjs.com/package/dockerode
             */
            dockerode: new Docker(options),
            
            /**
             * Function to return container id in docker-compose for use in Docker Remote Api
             * 
             * @param string containerName
             * @param function fn
             * @return void
             */
            getContainerId: function(containerName, fn){
                exec("docker-compose ps -q " + containerName, { cwd: options.cwd }, function(err, stdout, stderr){
                    if(err) fn(err, null);
                    else if(stderr) fn(stderr, null);
                    else if(stdout) fn(null, stdout.replace("\r", "").replace("\n", "").substr(0, 12));
                    else fn("The requested container does not exist or is not currently active", null);
                });
            }
        };
    }
}