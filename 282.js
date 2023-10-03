function embedVimeoIframe(e){
		var elem = e.currentTarget;
		var id = elem.getAttribute('data-vimeo');
		var vimeoParams = elem.getAttribute('data-vimeoparams') || '';

		if(vimeoParams && !regAmp.test(vimeoParams)){
			vimeoParams = '&'+ vimeoParams;
		}

		e.preventDefault();

		elem.innerHTML = '<iframe src="' + (vimeoIframe.replace(regId, id)) + vimeoParams +'" ' +
			'frameborder="0" allowfullscreen="" width="640" height="390"></iframe>'
		;

		elem.removeEventListener('click', embedVimeoIframe);
	}