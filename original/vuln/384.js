function (url, width, height) {
					var attrs  = '';

					if (width) {
						attrs += ' width="' + width + '"';
					}

					if (height) {
						attrs += ' height="' + height + '"';
					}

					editor.wysiwygEditorInsertHtml(
						'<img' + attrs + ' src="' + url + '" />'
					);
				}