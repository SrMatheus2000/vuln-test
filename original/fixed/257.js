function h(a){var b=a.currentTarget,c=b.getAttribute("data-youtube"),d=b.getAttribute("data-ytparams")||"";b.removeEventListener("click",h),c&&n.test(c)&&(!d||n.test(d))&&(d&&!m.test(d)&&(d="&"+d),a.preventDefault(),b.innerHTML='<iframe src="'+p.replace(k,c)+d+'" frameborder="0" allowfullscreen="" width="640" height="390"></iframe>')}