function ()  {

		if (this.tracks === undefined) {
			return;
		}

		let
			t = this,
			track = t.selectedTrack,
			i
		;

		if (track !== null && track.isLoaded) {
			i = t.searchTrackPosition(track.entries, t.media.currentTime);
			if (i > -1) {
				// Set the line before the timecode as a class so the cue can be targeted if needed
				t.captionsText.html(track.entries[i].text)
				.attr('class', `${t.options.classPrefix}captions-text ${(track.entries[i].identifier || '')}`);
				t.captions.show().height(0);
				return; // exit out if one is visible;
			}

			t.captions.hide();
		} else {
			t.captions.hide();
		}
	}