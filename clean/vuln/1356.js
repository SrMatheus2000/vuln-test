serverNonce => {
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
        }