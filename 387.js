function unique_name_188 (caller) {
			var	editor  = this;

			defaultCmds.image._dropDown(
				editor,
				caller,
				'',
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
			);
		}