function(){if(void 0!==this.tracks){var a=this,b=a.selectedTrack,c=void 0,d=function(a){var b=document.createElement("div");b.innerHTML=a;for(var c=b.getElementsByTagName("script"),d=c.length;d--;)c[d].parentNode.removeChild(c[d]);for(var e=b.getElementsByTagName("*"),f=0,g=e.length;g>f;f++)for(var h=e[f].attributes,i=Array.prototype.slice.call(h),j=0,k=i.length;k>j;j++)i[j].name.startsWith("on")||i[j].value.startsWith("javascript")?e[f].parentNode.removeChild(e[f]):"style"===i[j].name&&e[f].removeAttribute(i[j].name);return b.innerHTML};if(null!==b&&b.isLoaded){if(c=a.searchTrackPosition(b.entries,a.media.currentTime),c>-1)return a.captionsText.html(d(b.entries[c].text)).attr("class",a.options.classPrefix+"captions-text "+(b.entries[c].identifier||"")),void a.captions.show().height(0);a.captions.hide()}else a.captions.hide()}}