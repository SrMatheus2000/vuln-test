(id) {
    return this.github.pullRequests
      .get({
        owner: this.owner,
        repo: this.repo,
        number: id
      })
      .then(res => {
        const branch = res.data.head.ref;
        execSync(
          `git fetch origin pull/${id}/head:${branch} && git checkout ${branch}`
        );
      })
      .catch(err => {
        console.log('Error: Could not find the specified pull request.');
      });
  }