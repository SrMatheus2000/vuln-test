function embedYoutubeIframe(e){
		var elem = e.currentTarget;
		var id = elem.getAttribute('data-youtube');
		var youtubeParams = elem.getAttribute('data-ytparams') || '';

		if(youtubeParams && !regAmp.test(youtubeParams)){
			youtubeParams = '&'+ youtubeParams;
		}

		e.preventDefault();

		elem.innerHTML = '<iframe src="' + (youtubeIframe.replace(regId, id)) + youtubeParams +'" ' +
			'frameborder="0" allowfullscreen="" width="640" height="390"></iframe>'
		;

		elem.removeEventListener('click', embedYoutubeIframe);
	}