function createProject(user, metadata) {
    if (metadata.files && metadata.migrateFiles) {
        // We expect there to be no active project in this scenario
        if (activeProject) {
            throw new Error("Cannot migrate as there is an active project");
        }
        var currentEncryptionKey = settings.get('credentialSecret');
        if (currentEncryptionKey === undefined) {
            currentEncryptionKey = settings.get('_credentialSecret');
        }
        if (!metadata.hasOwnProperty('credentialSecret')) {
            metadata.credentialSecret = currentEncryptionKey;
        }
        if (!metadata.files.flow) {
            metadata.files.flow = fspath.basename(flowsFullPath);
        }
        if (!metadata.files.credentials) {
            metadata.files.credentials = fspath.basename(credentialsFile);
        }

        metadata.files.oldFlow = flowsFullPath;
        metadata.files.oldCredentials = credentialsFile;
        metadata.files.credentialSecret = currentEncryptionKey;
    }
    metadata.path = fspath.join(projectsDir,metadata.name);
    return Projects.create(user, metadata).then(function(p) {
        return setActiveProject(user, p.name);
    }).then(function() {
        return getProject(user, metadata.name);
    })
}