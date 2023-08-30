function unique_name_661(repo) {
          repoUrl = repo;
          log('Cloning ' + repo + ' into ' + options.clone);
          return git.clone(repo, options.clone, options.branch, options);
        }