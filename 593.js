function encrypt(value) {
        if (value == null) {
            throw new Error('value must not be null or undefined');
        }

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = cipher.update(String(value), 'utf8', 'hex') + cipher.final('hex');

        return iv.toString('hex') + encrypted;
    }