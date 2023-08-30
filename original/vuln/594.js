function decrypt(value) {
        if (value == null) {
            throw new Error('value must not be null or undefined');
        }

        const stringValue = String(value);
        const iv = Buffer.from(stringValue.slice(0, 32), 'hex');
        const encrypted = stringValue.slice(32);

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }