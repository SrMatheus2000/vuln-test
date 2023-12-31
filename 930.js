function unique_name_493(_dereq_,module,exports){
'use strict';

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _time = _dereq_(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Closed Captions (CC) button
 *
 * This feature enables the displaying of a CC button in the control bar, and also contains the methods to start media
 * with a certain language (if available), toggle captions, etc.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * Default language to start media using ISO 639-2 Language Code List (en, es, it, etc.)
  * If there are multiple tracks for one language, the last track node found is activated
  * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
  * @type {String}
  */
	startLanguage: '',
	/**
  * @type {String}
  */
	tracksText: '',
	/**
  * Avoid to screen reader speak captions over an audio track.
  *
  * @type {Boolean}
  */
	tracksAriaLive: false,
	/**
  * Remove the [cc] button when no track nodes are present
  * @type {Boolean}
  */
	hideCaptionsButtonWhenEmpty: true,
	/**
  * Change captions to pop-up if true and only one track node is found
  * @type {Boolean}
  */
	toggleCaptionsButtonWhenOnlyOne: false,
	/**
  * @type {String}
  */
	slidesSelector: ''
});

Object.assign(_player2.default.prototype, {

	/**
  * @type {Boolean}
  */
	hasChapters: false,

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildtracks: function buildtracks(player, controls, layers, media) {
		if (player.tracks.length === 0) {
			return;
		}

		var t = this,
		    attr = t.options.tracksAriaLive ? ' role="log" aria-live="assertive" aria-atomic="false"' : '',
		    tracksTitle = t.options.tracksText ? t.options.tracksText : _i18n2.default.t('mejs.captions-subtitles'),
		    i = void 0,
		    kind = void 0;

		// If browser will do native captions, prefer mejs captions, loop through tracks and hide
		if (t.domNode.textTracks) {
			for (i = t.domNode.textTracks.length - 1; i >= 0; i--) {
				t.domNode.textTracks[i].mode = 'hidden';
			}
		}

		t.cleartracks(player);
		player.chapters = $('<div class="' + t.options.classPrefix + 'chapters ' + t.options.classPrefix + 'layer"></div>').prependTo(layers).hide();
		player.captions = $('<div class="' + t.options.classPrefix + 'captions-layer ' + t.options.classPrefix + 'layer">' + ('<div class="' + t.options.classPrefix + 'captions-position ' + t.options.classPrefix + 'captions-position-hover"' + attr + '>') + ('<span class="' + t.options.classPrefix + 'captions-text"></span>') + '</div>' + '</div>').prependTo(layers).hide();
		player.captionsText = player.captions.find('.' + t.options.classPrefix + 'captions-text');
		player.captionsButton = $('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'captions-button">' + ('<button type="button" aria-controls="' + t.id + '" title="' + tracksTitle + '" aria-label="' + tracksTitle + '"></button>') + ('<div class="' + t.options.classPrefix + 'captions-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'captions-selector-list">') + ('<li class="' + t.options.classPrefix + 'captions-selector-list-item">') + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + player.id + '_captions" id="' + player.id + '_captions_none" ') + 'value="none" checked="checked" />' + ('<label class="' + t.options.classPrefix + 'captions-selector-label ') + (t.options.classPrefix + 'captions-selected" ') + ('for="' + player.id + '_captions_none">' + _i18n2.default.t('mejs.none') + '</label>') + '</li>' + '</ul>' + '</div>' + '</div>').appendTo(controls);

		var subtitleCount = 0,
		    total = player.tracks.length;

		for (i = 0; i < total; i++) {
			kind = player.tracks[i].kind;
			if (kind === 'subtitles' || kind === 'captions') {
				subtitleCount++;
			}
		}

		// if only one language then just make the button a toggle
		if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount === 1) {
			// click
			player.captionsButton.on('click', function () {
				var trackId = 'none';
				if (player.selectedTrack === null) {
					trackId = player.tracks[0].trackId;
				}
				player.setTrack(trackId);
			});
		} else {
			// hover or keyboard focus
			player.captionsButton.on('mouseenter focusin', function () {
				$(this).find('.' + t.options.classPrefix + 'captions-selector').removeClass(t.options.classPrefix + 'offscreen');
			}).on('mouseleave focusout', function () {
				$(this).find('.' + t.options.classPrefix + 'captions-selector').addClass(t.options.classPrefix + 'offscreen');
			})
			// handle clicks to the language radio buttons
			.on('click', 'input[type=radio]', function () {
				// value is trackId, same as the actual id, and we're using it here
				// because the "none" checkbox doesn't have a trackId
				// to use, but we want to know when "none" is clicked
				player.setTrack(this.value);
			}).on('click', '.' + t.options.classPrefix + 'captions-selector-label', function () {
				$(this).siblings('input[type="radio"]').trigger('click');
			})
			//Allow up/down arrow to change the selected radio without changing the volume.
			.on('keydown', function (e) {
				e.stopPropagation();
			});
		}

		if (!player.options.alwaysShowControls) {
			// move with controls
			player.container.on('controlsshown', function () {
				// push captions above controls
				player.container.find('.' + t.options.classPrefix + 'captions-position').addClass(t.options.classPrefix + 'captions-position-hover');
			}).on('controlshidden', function () {
				if (!media.paused) {
					// move back to normal place
					player.container.find('.' + t.options.classPrefix + 'captions-position').removeClass(t.options.classPrefix + 'captions-position-hover');
				}
			});
		} else {
			player.container.find('.' + t.options.classPrefix + 'captions-position').addClass(t.options.classPrefix + 'captions-position-hover');
		}

		player.trackToLoad = -1;
		player.selectedTrack = null;
		player.isLoadingTrack = false;

		// add to list
		for (i = 0; i < total; i++) {
			kind = player.tracks[i].kind;
			if (kind === 'subtitles' || kind === 'captions') {
				player.addTrackButton(player.tracks[i].trackId, player.tracks[i].srclang, player.tracks[i].label);
			}
		}

		// start loading tracks
		player.loadNextTrack();

		media.addEventListener('timeupdate', function () {
			player.displayCaptions();
		}, false);

		if (player.options.slidesSelector !== '') {
			player.slidesContainer = $(player.options.slidesSelector);

			media.addEventListener('timeupdate', function () {
				player.displaySlides();
			}, false);
		}

		media.addEventListener('loadedmetadata', function () {
			player.displayChapters();
		}, false);

		player.container.hover(function () {
			// chapters
			if (player.hasChapters) {
				player.chapters.removeClass(t.options.classPrefix + 'offscreen');
				player.chapters.fadeIn(200, function () {
					var self = $(this);
					self.height(self.find('.' + t.options.classPrefix + 'chapter').outerHeight());
				});
			}
		}, function () {
			if (player.hasChapters) {
				if (media.paused) {
					player.chapters.fadeOut(200, function () {
						$(this).addClass(t.options.classPrefix + 'offscreen');
					});
				} else {
					player.chapters.show();
				}
			}
		});

		t.container.on('controlsresize', function () {
			t.adjustLanguageBox();
		});

		// check for autoplay
		if (player.node.getAttribute('autoplay') !== null) {
			player.chapters.addClass(t.options.classPrefix + 'offscreen');
		}
	},

	/**
  * Feature destructor.
  *
  * Always has to be prefixed with `clean` and the name that was used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  */
	cleartracks: function cleartracks(player) {
		if (player) {
			if (player.captions) {
				player.captions.remove();
			}
			if (player.chapters) {
				player.chapters.remove();
			}
			if (player.captionsText) {
				player.captionsText.remove();
			}
			if (player.captionsButton) {
				player.captionsButton.remove();
			}
		}
	},

	rebuildtracks: function rebuildtracks() {
		var t = this;
		t.findTracks();
		t.buildtracks(t, t.controls, t.layers, t.media);
	},

	findTracks: function findTracks() {
		var t = this,
		    tracktags = t.$media.find('track');

		// store for use by plugins
		t.tracks = [];
		tracktags.each(function (index, track) {

			track = $(track);

			var srclang = track.attr('srclang') ? track.attr('srclang').toLowerCase() : '';
			var trackId = t.id + '_track_' + index + '_' + track.attr('kind') + '_' + srclang;
			t.tracks.push({
				trackId: trackId,
				srclang: srclang,
				src: track.attr('src'),
				kind: track.attr('kind'),
				label: track.attr('label') || '',
				entries: [],
				isLoaded: false
			});
		});
	},

	/**
  *
  * @param {String} trackId, or "none" to disable captions
  */
	setTrack: function setTrack(trackId) {
		var t = this,
		    i = void 0;

		t.captionsButton.find('input[type="radio"]').prop('checked', false).end().find('.' + t.options.classPrefix + 'captions-selected').removeClass(t.options.classPrefix + 'captions-selected').end().find('input[value="' + trackId + '"]').prop('checked', true).siblings('.' + t.options.classPrefix + 'captions-selector-label').addClass(t.options.classPrefix + 'captions-selected');

		if (trackId === 'none') {
			t.selectedTrack = null;
			t.captionsButton.removeClass(t.options.classPrefix + 'captions-enabled');
			return;
		}

		for (i = 0; i < t.tracks.length; i++) {
			var track = t.tracks[i];
			if (track.trackId === trackId) {
				if (t.selectedTrack === null) {
					t.captionsButton.addClass(t.options.classPrefix + 'captions-enabled');
				}
				t.selectedTrack = track;
				t.captions.attr('lang', t.selectedTrack.srclang);
				t.displayCaptions();
				break;
			}
		}
	},

	/**
  *
  */
	loadNextTrack: function loadNextTrack() {
		var t = this;

		t.trackToLoad++;
		if (t.trackToLoad < t.tracks.length) {
			t.isLoadingTrack = true;
			t.loadTrack(t.trackToLoad);
		} else {
			// add done?
			t.isLoadingTrack = false;

			t.checkForTracks();
		}
	},

	/**
  *
  * @param index
  */
	loadTrack: function loadTrack(index) {
		var t = this,
		    track = t.tracks[index],
		    after = function after() {

			track.isLoaded = true;

			t.enableTrackButton(track);

			t.loadNextTrack();
		};

		if (track !== undefined && (track.src !== undefined || track.src !== "")) {
			$.ajax({
				url: track.src,
				dataType: 'text',
				success: function success(d) {

					// parse the loaded file
					if (typeof d === 'string' && /<tt\s+xml/ig.exec(d)) {
						track.entries = _mejs2.default.TrackFormatParser.dfxp.parse(d);
					} else {
						track.entries = _mejs2.default.TrackFormatParser.webvtt.parse(d);
					}

					after();

					if (track.kind === 'chapters') {
						t.media.addEventListener('play', function () {
							if (t.media.duration > 0) {
								t.displayChapters();
							}
						}, false);
					}

					if (track.kind === 'slides') {
						t.setupSlides(track);
					}
				},
				error: function error() {
					t.removeTrackButton(track.trackId);
					t.loadNextTrack();
				}
			});
		}
	},

	/**
  *
  * @param {String} track - The language code
  */
	enableTrackButton: function enableTrackButton(track) {
		var t = this,
		    lang = track.srclang,
		    label = track.label,
		    target = $('#' + track.trackId);

		if (label === '') {
			label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
		}

		target.prop('disabled', false).siblings('.' + t.options.classPrefix + 'captions-selector-label').html(label);

		// auto select
		if (t.options.startLanguage === lang) {
			target.prop('checked', true).trigger('click');
		}

		t.adjustLanguageBox();
	},

	/**
  *
  * @param {String} trackId
  */
	removeTrackButton: function removeTrackButton(trackId) {
		var t = this;

		t.captionsButton.find('input[id=' + trackId + ']').closest('li').remove();

		t.adjustLanguageBox();
	},

	/**
  *
  * @param {String} trackId
  * @param {String} lang - The language code
  * @param {String} label
  */
	addTrackButton: function addTrackButton(trackId, lang, label) {
		var t = this;
		if (label === '') {
			label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
		}

		// trackId is used in the value, too, because the "none"
		// caption option doesn't have a trackId but we need to be able
		// to set it, too
		t.captionsButton.find('ul').append($('<li class="' + t.options.classPrefix + 'captions-selector-list-item">' + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input"') + ('name="' + t.id + '_captions" id="' + trackId + '" value="' + trackId + '" disabled="disabled" />') + ('<label class="' + t.options.classPrefix + 'captions-selector-label">' + label + ' (loading)</label>') + '</li>'));

		t.adjustLanguageBox();

		// remove this from the dropdownlist (if it exists)
		t.container.find('.' + t.options.classPrefix + 'captions-translations option[value=' + lang + ']').remove();
	},

	/**
  *
  */
	adjustLanguageBox: function adjustLanguageBox() {
		var t = this;
		// adjust the size of the outer box
		t.captionsButton.find('.' + t.options.classPrefix + 'captions-selector').height(t.captionsButton.find('.' + t.options.classPrefix + 'captions-selector-list').outerHeight(true) + t.captionsButton.find('.' + t.options.classPrefix + 'captions-translations').outerHeight(true));
	},

	/**
  *
  */
	checkForTracks: function checkForTracks() {
		var t = this,
		    hasSubtitles = false;

		// check if any subtitles
		if (t.options.hideCaptionsButtonWhenEmpty) {
			for (var i = 0, total = t.tracks.length; i < total; i++) {
				var kind = t.tracks[i].kind;
				if ((kind === 'subtitles' || kind === 'captions') && t.tracks[i].isLoaded) {
					hasSubtitles = true;
					break;
				}
			}

			if (!hasSubtitles) {
				t.captionsButton.hide();
				t.setControlsSize();
			}
		}
	},

	/**
  *
  */
	displayCaptions: function displayCaptions() {

		if (this.tracks === undefined) {
			return;
		}

		var t = this,
		    track = t.selectedTrack,
		    i = void 0;

		if (track !== null && track.isLoaded) {
			i = t.searchTrackPosition(track.entries, t.media.currentTime);
			if (i > -1) {
				// Set the line before the timecode as a class so the cue can be targeted if needed
				t.captionsText.html(track.entries[i].text).attr('class', t.options.classPrefix + 'captions-text ' + (track.entries[i].identifier || ''));
				t.captions.show().height(0);
				return; // exit out if one is visible;
			}

			t.captions.hide();
		} else {
			t.captions.hide();
		}
	},

	/**
  *
  * @param {HTMLElement} track
  */
	setupSlides: function setupSlides(track) {
		var t = this;

		t.slides = track;
		t.slides.entries.imgs = [t.slides.entries.length];
		t.showSlide(0);
	},

	/**
  *
  * @param {Number} index
  */
	showSlide: function showSlide(index) {
		if (this.tracks === undefined || this.slidesContainer === undefined) {
			return;
		}

		var t = this,
		    url = t.slides.entries[index].text,
		    img = t.slides.entries[index].imgs;

		if (img === undefined || img.fadeIn === undefined) {

			t.slides.entries[index].imgs = img = $('<img src="' + url + '">').on('load', function () {
				img.appendTo(t.slidesContainer).hide().fadeIn().siblings(':visible').fadeOut();
			});
		} else {

			if (!img.is(':visible') && !img.is(':animated')) {
				img.fadeIn().siblings(':visible').fadeOut();
			}
		}
	},

	/**
  *
  */
	displaySlides: function displaySlides() {

		if (this.slides === undefined) {
			return;
		}

		var t = this,
		    slides = t.slides,
		    i = t.searchTrackPosition(slides.entries, t.media.currentTime);

		if (i > -1) {
			t.showSlide(i);
			return; // exit out if one is visible;
		}
	},

	/**
  *
  */
	displayChapters: function displayChapters() {
		var t = this;

		for (var i = 0, total = t.tracks.length; i < total; i++) {
			if (t.tracks[i].kind === 'chapters' && t.tracks[i].isLoaded) {
				t.drawChapters(t.tracks[i]);
				t.hasChapters = true;
				break;
			}
		}
	},

	/**
  *
  * @param {Object} chapters
  */
	drawChapters: function drawChapters(chapters) {
		var t = this,
		    i = void 0,
		    dur = void 0,
		    percent = 0,
		    usedPercent = 0,
		    total = chapters.entries.length;

		t.chapters.empty();

		for (i = 0; i < total; i++) {
			dur = chapters.entries[i].stop - chapters.entries[i].start;
			percent = Math.floor(dur / t.media.duration * 100);

			// too large or not going to fill it in
			if (percent + usedPercent > 100 || i === chapters.entries.length - 1 && percent + usedPercent < 100) {
				percent = 100 - usedPercent;
			}

			t.chapters.append($('<div class="' + t.options.classPrefix + 'chapter" rel="' + chapters.entries[i].start + '" style="left: ' + usedPercent.toString() + '%; width: ' + percent.toString() + '%;">' + ('<div class="' + t.options.classPrefix + 'chapter-block') + ((i === chapters.entries.length - 1 ? ' ' + t.options.classPrefix + 'chapter-block-last' : '') + '">') + ('<span class="ch-title">' + chapters.entries[i].text + '</span>') + '<span class="ch-time">' + ('' + (0, _time.secondsToTimeCode)(chapters.entries[i].start, t.options.alwaysShowHours)) + '&ndash;' + ('' + (0, _time.secondsToTimeCode)(chapters.entries[i].stop, t.options.alwaysShowHours)) + '</span>' + '</div>' + '</div>'));
			usedPercent += percent;
		}

		t.chapters.find('.' + t.options.classPrefix + 'chapter').click(function () {
			t.media.setCurrentTime(parseFloat($(this).attr('rel')));
			if (t.media.paused) {
				t.media.play();
			}
		});

		t.chapters.show();
	},
	/**
  * Perform binary search to look for proper track index
  *
  * @param {Object[]} tracks
  * @param {Number} currentTime
  * @return {Number}
  */
	searchTrackPosition: function searchTrackPosition(tracks, currentTime) {
		var lo = 0,
		    hi = tracks.length - 1,
		    mid = void 0,
		    start = void 0,
		    stop = void 0;

		while (lo <= hi) {
			mid = lo + hi >> 1;
			start = tracks[mid].start;
			stop = tracks[mid].stop;

			if (currentTime >= start && currentTime < stop) {
				return mid;
			} else if (start < currentTime) {
				lo = mid + 1;
			} else if (start > currentTime) {
				hi = mid - 1;
			}
		}

		return -1;
	}
});

/**
 * Map all possible languages with their respective code
 *
 * @constructor
 */
_mejs2.default.language = {
	codes: {
		af: 'mejs.afrikaans',
		sq: 'mejs.albanian',
		ar: 'mejs.arabic',
		be: 'mejs.belarusian',
		bg: 'mejs.bulgarian',
		ca: 'mejs.catalan',
		zh: 'mejs.chinese',
		'zh-cn': 'mejs.chinese-simplified',
		'zh-tw': 'mejs.chines-traditional',
		hr: 'mejs.croatian',
		cs: 'mejs.czech',
		da: 'mejs.danish',
		nl: 'mejs.dutch',
		en: 'mejs.english',
		et: 'mejs.estonian',
		fl: 'mejs.filipino',
		fi: 'mejs.finnish',
		fr: 'mejs.french',
		gl: 'mejs.galician',
		de: 'mejs.german',
		el: 'mejs.greek',
		ht: 'mejs.haitian-creole',
		iw: 'mejs.hebrew',
		hi: 'mejs.hindi',
		hu: 'mejs.hungarian',
		is: 'mejs.icelandic',
		id: 'mejs.indonesian',
		ga: 'mejs.irish',
		it: 'mejs.italian',
		ja: 'mejs.japanese',
		ko: 'mejs.korean',
		lv: 'mejs.latvian',
		lt: 'mejs.lithuanian',
		mk: 'mejs.macedonian',
		ms: 'mejs.malay',
		mt: 'mejs.maltese',
		no: 'mejs.norwegian',
		fa: 'mejs.persian',
		pl: 'mejs.polish',
		pt: 'mejs.portuguese',
		ro: 'mejs.romanian',
		ru: 'mejs.russian',
		sr: 'mejs.serbian',
		sk: 'mejs.slovak',
		sl: 'mejs.slovenian',
		es: 'mejs.spanish',
		sw: 'mejs.swahili',
		sv: 'mejs.swedish',
		tl: 'mejs.tagalog',
		th: 'mejs.thai',
		tr: 'mejs.turkish',
		uk: 'mejs.ukrainian',
		vi: 'mejs.vietnamese',
		cy: 'mejs.welsh',
		yi: 'mejs.yiddish'
	}
};

/*
 Parses WebVTT format which should be formatted as
 ================================
 WEBVTT

 1
 00:00:01,1 --> 00:00:05,000
 A line of text

 2
 00:01:15,1 --> 00:02:05,000
 A second line of text

 ===============================

 Adapted from: http://www.delphiki.com/html5/playr
 */
_mejs2.default.TrackFormatParser = {
	webvtt: {
		/**
   * @type {String}
   */
		pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

		/**
   *
   * @param {String} trackText
   * @returns {{text: Array, times: Array}}
   */
		parse: function parse(trackText) {
			var i = 0,
			    lines = _mejs2.default.TrackFormatParser.split2(trackText, /\r?\n/),
			    entries = [],
			    timecode = void 0,
			    text = void 0,
			    identifier = void 0;
			for (; i < lines.length; i++) {
				timecode = this.pattern_timecode.exec(lines[i]);

				if (timecode && i < lines.length) {
					if (i - 1 >= 0 && lines[i - 1] !== '') {
						identifier = lines[i - 1];
					}
					i++;
					// grab all the (possibly multi-line) text that follows
					text = lines[i];
					i++;
					while (lines[i] !== '' && i < lines.length) {
						text = text + '\n' + lines[i];
						i++;
					}
					text = $.trim(text).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
					entries.push({
						identifier: identifier,
						start: (0, _time.convertSMPTEtoSeconds)(timecode[1]) === 0 ? 0.200 : (0, _time.convertSMPTEtoSeconds)(timecode[1]),
						stop: (0, _time.convertSMPTEtoSeconds)(timecode[3]),
						text: text,
						settings: timecode[5]
					});
				}
				identifier = '';
			}
			return entries;
		}
	},
	// Thanks to Justin Capella: https://github.com/johndyer/mediaelement/pull/420
	dfxp: {
		/**
   *
   * @param {String} trackText
   * @returns {{text: Array, times: Array}}
   */
		parse: function parse(trackText) {
			trackText = $(trackText).filter('tt');
			var container = trackText.children('div').eq(0),
			    lines = container.find('p'),
			    styleNode = trackText.find('#' + container.attr('style')),
			    styles = void 0,
			    entries = [],
			    i = void 0;

			if (styleNode.length) {
				var attributes = styleNode.removeAttr('id').get(0).attributes;
				if (attributes.length) {
					styles = {};
					for (i = 0; i < attributes.length; i++) {
						styles[attributes[i].name.split(":")[1]] = attributes[i].value;
					}
				}
			}

			for (i = 0; i < lines.length; i++) {
				var style = void 0,
				    _temp = {
					start: null,
					stop: null,
					style: null,
					text: null
				};

				if (lines.eq(i).attr('begin')) {
					_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(i).attr('begin'));
				}
				if (!_temp.start && lines.eq(i - 1).attr('end')) {
					_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(i - 1).attr('end'));
				}
				if (lines.eq(i).attr('end')) {
					_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(i).attr('end'));
				}
				if (!_temp.stop && lines.eq(i + 1).attr('begin')) {
					_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(i + 1).attr('begin'));
				}

				if (styles) {
					style = '';
					for (var _style in styles) {
						style += _style + ':' + styles[_style] + ';';
					}
				}
				if (style) {
					_temp.style = style;
				}
				if (_temp.start === 0) {
					_temp.start = 0.200;
				}
				_temp.text = $.trim(lines.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
				entries.push(_temp);
			}
			return entries;
		}
	},
	/**
  *
  * @param {String} text
  * @param {String} regex
  * @returns {Array}
  */
	split2: function split2(text, regex) {
		// normal version for compliant browsers
		// see below for IE fix
		return text.split(regex);
	}
};

// test for browsers with bad String.split method.
if ('x\n\ny'.split(/\n/gi).length !== 3) {
	// add super slow IE8 and below version
	_mejs2.default.TrackFormatParser.split2 = function (text, regex) {
		var parts = [],
		    chunk = '',
		    i = void 0;

		for (i = 0; i < text.length; i++) {
			chunk += text.substring(i, i + 1);
			if (regex.test(chunk)) {
				parts.push(chunk.replace(regex, ''));
				chunk = '';
			}
		}
		parts.push(chunk);
		return parts;
	};
}

}