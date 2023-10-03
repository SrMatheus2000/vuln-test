function unique_name_160(repo, cb) {
	var self = this;
	var dir = this.checkoutDir(repo.organization, repo.name);
	mkdirp(dir, init);

	function init(err) {
		if (err)
			return cb('mkdirp(' + dir + ') failed');
		debug('mkdirp() ' + dir + ' finished');
		child.exec('git init', {
			cwd : dir
		}, function(err, stdo, stde) {
			if (err)
				return cb(err);
			debug('init() ' + dir + ' finished');
			fetch();
		});
	}

	function fetch() {
		var cmd = ['git', 'fetch', 'file://' + path.resolve(self.repoDir, repo.organization, repo.name), repo.branch].join(' ');

		child.exec(cmd, {
			cwd : dir
		}, function(err) {
			if (err)
				return cb(err);
			debug('fetch() ' + dir + ' finished');
			checkout();
		});
	}

	function checkout() {
		var cmd = ['git', 'checkout', '-b', repo.branch, repo.commit].join(' ');

		child.exec(cmd, {
			cwd : dir
		}, function(err, stdo, stde) {
			cb(err, stdo, stde);
		});
	}

}