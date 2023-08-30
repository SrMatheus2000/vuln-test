(nonce, qop, nc) {
        let found = false;

        // Current time.
        let now = Date.now();

        // Nonces for removal.
        let noncesToRemove = [];

        // Searching for not expired ones.
        this.nonces.forEach(serverNonce => {
            if ((serverNonce[1] + 3600000) > now) {
                if (serverNonce[0] === nonce) {
                    if (qop) {
                        if (nc > serverNonce[2]) {
                            found = true;
                            ++ serverNonce[2];
                        }
                    } else {
                        found = true;
                    }
                }
            } else {
                noncesToRemove.push(serverNonce);
            }
        });

        // Remove expired nonces.
        this.removeNonces(noncesToRemove);

        return found;
    }