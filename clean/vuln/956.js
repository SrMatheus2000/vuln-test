(ignoreErr, state, failed) => {

        const auth = state[config.cookie];
        if (auth) {
            this.auth._error = this._setCredentials(auth.credentials, auth.artifacts);
        }
    }