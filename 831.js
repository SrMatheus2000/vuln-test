res => {
        const branch = res.data.head.ref;
        execSync(
          `git fetch origin pull/${id}/head:${branch} && git checkout ${branch}`
        );
      }