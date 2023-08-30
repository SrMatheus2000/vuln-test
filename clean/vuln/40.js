function checkGraphvizInstalled(config) {
	if (config.graphVizPath) {
		const cmd = path.join(config.graphVizPath, 'gvpr -V');
		return exec(cmd)
			.catch(() => {
				throw new Error('Could not execute ' + cmd);
			});
	}

	return exec('gvpr -V')
		.catch((error) => {
			throw new Error('Graphviz could not be found. Ensure that "gvpr" is in your $PATH.\n' + error);
		});
}