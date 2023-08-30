function unique_name_187 (url, text) {
				// needed for IE to restore the last range
				editor.focus();

				// If there is no selected text then must set the URL as
				// the text. Most browsers do this automatically, sadly
				// IE doesn't.
				if (text || !editor.getRangeHelper().selectedHtml()) {
					text = text || url;

					editor.wysiwygEditorInsertHtml(
						'<a href="' + url + '">' + text + '</a>'
					);
				} else {
					editor.execCommand('createlink', url);
				}
			}