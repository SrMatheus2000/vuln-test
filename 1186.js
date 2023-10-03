function unique_name_683() {
        /** load the file */
        var that = this;
        var cm = this.codemirror;
        return this.contents.get(this.file_path, {type: 'file', format: 'text'})
            .then(function(model) {
                cm.setValue(model.content);

                // Setting the file's initial value creates a history entry,
                // which we don't want.
                cm.clearHistory();
                that._set_mode_for_model(model);
                that.save_enabled = true;
                that.generation = cm.changeGeneration();
                that.events.trigger("file_loaded.Editor", model);
                that._clean_state();
            }).catch(
            function(error) {
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
        );
    }