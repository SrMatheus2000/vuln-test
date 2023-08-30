function deleteProject(user, name) {
    if (activeProject && activeProject.name === name) {
        var e = new Error("NLS: Can't delete the active project");
        e.code = "cannot_delete_active_project";
        throw e;
    }
    var projectPath = fspath.join(projectsDir,name);
    return Projects.delete(user, projectPath);
}