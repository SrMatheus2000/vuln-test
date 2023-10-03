(dir) => {
            return (path.normalize(dir ? path.resolve(repoDir, dir) : repoDir));
        }