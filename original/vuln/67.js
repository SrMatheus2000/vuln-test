function (child) {
					if (child.isDirectory) return;
					var content = child.getData();
					if (!content) {
						throw new Error(Utils.Errors.CANT_EXTRACT_FILE);
					}
					var childName = sanitize(targetPath, maintainEntryPath ? child.entryName : pth.basename(child.entryName));

					Utils.writeFileTo(childName, content, overwrite);
				}