function unique_name_682(error) {
                that.events.trigger("file_load_failed.Editor", error);
                if (((error.xhr||{}).responseJSON||{}).reason === 'bad format') {
                    window.location = utils.url_path_join(
                        that.base_url,
                        'files',
                        that.file_path
                    );
                } else {
                    console.warn('Error while loading: the error was:')
                    console.warn(error)
                }
                cm.setValue("Error! " + error.message +
                                "\nSaving disabled.\nSee Console for more details.");
                cm.setOption('readOnly','nocursor')
                that.save_enabled = false;
            }