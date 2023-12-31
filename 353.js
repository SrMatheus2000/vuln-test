function render(markup, theme, options) {
		const html = htmlUtils.processImageTags(markup, data => {
			if (!data.src) return null;

			const r = utils.imageReplacement(this.ResourceModel_, data.src, options.resources, this.resourceBaseUrl_);
			if (!r) return null;

			if (typeof r === 'string') {
				return {
					type: 'replaceElement',
					html: r,
				};
			} else {
				return {
					type: 'setAttributes',
					attrs: r,
				};
			}
		});

		const cssStrings = noteStyle(theme, options);
		const styleHtml = `<style>${cssStrings.join('\n')}</style>`;

		return {
			html: styleHtml + html,
			pluginAssets: [],
		};
	}