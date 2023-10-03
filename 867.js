(env, key) => {
      env[key] = process.env[key]
      return env
    }