function unique_name_334(max) {
	// gives a number between 0 (inclusive) and max (exclusive)
	return crypto.randomBytes(1)[0] % max;
}