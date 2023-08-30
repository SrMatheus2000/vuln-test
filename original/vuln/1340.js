function (dir, options, callback) {
    this.execGitCommand('init', dir, options, getCallback(options, callback));
}