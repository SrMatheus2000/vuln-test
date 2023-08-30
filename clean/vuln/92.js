async function unique_name_42(destination, { hard = true } = {}) {
	if (destination && typeof destination === 'string') {
		return await exec(`git reset ${JSON.stringify(destination)} ${hard ? '--hard' : ''}`);
	}

	if (destination && typeof destination === 'number') {
		return await exec(`git reset HEAD~${Math.abs(destination)} ${hard ? '--hard' : ''}`);
	}

	throw new TypeError(`No case for handling destination ${destination} (${typeof destination})`);
}