function unique_name_18 (user, data) {
    var username;
    if (!user) {
        username = "_";
    } else {
        username = user.username;
    }

    var promises = [];
    var project = this;
    var saveSettings = false;
    var saveREADME = false;
    var savePackage = false;
    var flowFilesChanged = false;
    var credentialSecretChanged = false;
    var reloadProject = false;

    var globalProjectSettings = settings.get("projects");
    if (!globalProjectSettings.projects.hasOwnProperty(this.name)) {
        globalProjectSettings.projects[this.name] = {};
        saveSettings = true;
    }

    if (data.credentialSecret && data.credentialSecret !== this.credentialSecret) {
        var existingSecret = data.currentCredentialSecret;
        var isReset = data.resetCredentialSecret;
        var secret = data.credentialSecret;

        // console.log("updating credentialSecret");
        // console.log("request:");
        // console.log(JSON.stringify(data,"",4));
        // console.log(" this.credentialSecret",this.credentialSecret);
        // console.log(" this.info", this.info);

        if (!isReset && // not a reset
            this.credentialSecret && // key already set
            !this.credentialSecretInvalid && // key not invalid
            this.credentialSecret !== existingSecret) { // key doesn't match provided existing key
                var e = new Error("Cannot change credentialSecret without current key");
                e.code = "missing_current_credential_key";
                return when.reject(e);
        }
        this.credentialSecret = secret;

        globalProjectSettings.projects[this.name].credentialSecret = project.credentialSecret;
        delete this.credentialSecretInvalid;
        saveSettings = true;
        credentialSecretChanged = true;
    }

    if (this.missingFiles.indexOf('package.json') !== -1) {
        if (!data.files || !data.files.package) {
            // Cannot update a project that doesn't have a known package.json
            return Promise.reject("Cannot update project with missing package.json");
        }
    }

    if (data.hasOwnProperty('files')) {
        this.package['node-red'] = this.package['node-red'] || { settings: {}};
        if (data.files.hasOwnProperty('package') && (data.files.package !== fspath.join(this.paths.root,"package.json") || !this.paths['package.json'])) {
            // We have a package file. It could be one that doesn't exist yet,
            // or it does exist and we need to load it.
            if (!/package\.json$/.test(data.files.package)) {
                return Promise.reject("Invalid package file: "+data.files.package)
            }
            var root = data.files.package.substring(0,data.files.package.length-12);
            this.paths.root = root;
            this.paths['package.json'] = data.files.package;
            globalProjectSettings.projects[this.name].rootPath = root;
            saveSettings = true;
            // 1. check if it exists
            if (fs.existsSync(fspath.join(this.path,this.paths['package.json']))) {
                // Load the existing one....
            } else {
                var newPackage = defaultFileSet["package.json"](this);
                fs.writeFileSync(fspath.join(this.path,this.paths['package.json']),newPackage);
                this.package = JSON.parse(newPackage);
            }
            reloadProject = true;
            flowFilesChanged = true;
        }

        if (data.files.hasOwnProperty('flow') && this.package['node-red'].settings.flowFile !== data.files.flow.substring(this.paths.root.length)) {
            this.paths.flowFile = data.files.flow;
            this.package['node-red'].settings.flowFile = data.files.flow.substring(this.paths.root.length);
            savePackage = true;
            flowFilesChanged = true;
        }
        if (data.files.hasOwnProperty('credentials') && this.package['node-red'].settings.credentialsFile !== data.files.credentials.substring(this.paths.root.length)) {
            this.paths.credentialsFile = data.files.credentials;
            this.package['node-red'].settings.credentialsFile = data.files.credentials.substring(this.paths.root.length);
            // Don't know if the credSecret is invalid or not so clear the flag
            delete this.credentialSecretInvalid;
            savePackage = true;
            flowFilesChanged = true;
        }
    }

    if (data.hasOwnProperty('description')) {
        saveREADME = true;
        this.description = data.description;
    }
    if (data.hasOwnProperty('dependencies')) {
        savePackage = true;
        this.package.dependencies = data.dependencies;
    }
    if (data.hasOwnProperty('summary')) {
        savePackage = true;
        this.package.description = data.summary;
    }
    if (data.hasOwnProperty('version')) {
        savePackage = true;
        this.package.version = data.version;
    }

    if (data.hasOwnProperty('git')) {
        if (data.git.hasOwnProperty('user')) {
            globalProjectSettings.projects[this.name].git = globalProjectSettings.projects[this.name].git || {};
            globalProjectSettings.projects[this.name].git.user = globalProjectSettings.projects[this.name].git.user || {};
            globalProjectSettings.projects[this.name].git.user[username] = {
                name: data.git.user.name,
                email: data.git.user.email
            }
            this.git.user[username] = {
                name: data.git.user.name,
                email: data.git.user.email
            }
            saveSettings = true;
        }
        if (data.git.hasOwnProperty('remotes')) {
            var remoteNames = Object.keys(data.git.remotes);
            var remotesChanged = false;
            var modifyRemotesPromise = Promise.resolve();
            remoteNames.forEach(function(name) {
                if (data.git.remotes[name].removed) {
                    remotesChanged = true;
                    modifyRemotesPromise = modifyRemotesPromise.then(function() { gitTools.removeRemote(project.path,name) });
                } else {
                    if (data.git.remotes[name].url) {
                        remotesChanged = true;
                        modifyRemotesPromise = modifyRemotesPromise.then(function() { gitTools.addRemote(project.path,name,data.git.remotes[name])});
                    }
                    if (data.git.remotes[name].username && data.git.remotes[name].password) {
                        var url = data.git.remotes[name].url || project.remotes[name].fetch;
                        authCache.set(project.name,url,username,data.git.remotes[name]);
                    }
                }
            })
            if (remotesChanged) {
                modifyRemotesPromise = modifyRemotesPromise.then(function() {
                    return project.loadRemotes();
                });
                promises.push(modifyRemotesPromise);
            }
        }
    }


    if (saveSettings) {
        promises.push(settings.set("projects",globalProjectSettings));
    }

    var modifiedFiles = [];

    if (saveREADME) {
        promises.push(util.writeFile(fspath.join(this.path,this.paths['README.md']), this.description));
        modifiedFiles.push('README.md');
    }
    if (savePackage) {
        promises.push(fs.readFile(fspath.join(this.path,this.paths['package.json']),"utf8").then(content => {
            var currentPackage = {};
            try {
                currentPackage = util.parseJSON(content);
            } catch(err) {
            }
            this.package = Object.assign(currentPackage,this.package);
            return util.writeFile(fspath.join(project.path,this.paths['package.json']), JSON.stringify(this.package,"",4));
        }));
        modifiedFiles.push('package.json');
    }
    return when.settle(promises).then(function(res) {
        var gitSettings = getUserGitSettings(user) || {};
        var workflowMode = (gitSettings.workflow||{}).mode || "manual";
        if (workflowMode === 'auto') {
            return project.stageFile(modifiedFiles.map(f => project.paths[f])).then(() => {
                return project.commit(user,{message:"Update "+modifiedFiles.join(", ")})
            })
        }
    }).then(res => {
        if (reloadProject) {
            return this.load()
        }
    }).then(function() {
        return {
            flowFilesChanged: flowFilesChanged,
            credentialSecretChanged: credentialSecretChanged
        }})
}