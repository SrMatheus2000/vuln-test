svg => {
	const entityRegex = /\s*<!Entity\s+\S*\s*(?:"|')[^"]+(?:"|')\s*>/img;
	// Remove entities
	return svg.replace(entityRegex, '');
}