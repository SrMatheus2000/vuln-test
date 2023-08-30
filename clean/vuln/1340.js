function unique_name_778 (dir, options, callback) {
    this.execGitCommand('init', dir, options, getCallback(options, callback));
}