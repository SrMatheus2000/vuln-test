() {
    const url = execSync(`git config --get remote.origin.url`, {
      encoding: 'utf8'
    }).trim();

    return this.parsedGithubUrl(url);
  }