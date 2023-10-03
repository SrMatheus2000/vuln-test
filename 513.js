(Options, FilePath) => {

	const Slash = FilePath.split ("")[FilePath.split ("").length - 1] === "/";

	switch (FilePath) {

		case "/": return `${Options.RootFolder}/${Options.IndexFile}`;
		default: return (Slash ? `${Options.RootFolder}${FilePath.slice (0, -1)}` : `${Options.RootFolder}${FilePath}`);
	}
}