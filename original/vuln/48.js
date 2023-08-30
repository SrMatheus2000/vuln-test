function loadProject(name) {
    var projectPath = name;
    if (projectPath.indexOf(fspath.sep) === -1) {
        projectPath = fspath.join(projectsDir,name);
    }
    return Projects.load(projectPath).then(function(project) {
        activeProject = project;
        flowsFullPath = project.getFlowFile();
        flowsFileBackup = project.getFlowFileBackup();
        credentialsFile = project.getCredentialsFile();
        credentialsFileBackup = project.getCredentialsFileBackup();
        return project;
    })
}