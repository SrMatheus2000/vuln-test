function p(e,t,n){if(void 0===n&&(n={}),!1===c.events.trigger("link.beforeInsert",[e,t,n]))return!1;var i=c.image?c.image.get():null;i||"A"==c.el.tagName?"A"==c.el.tagName&&c.$el.focus():(c.selection.restore(),c.popups.hide("link.insert"));var r=e;c.opts.linkConvertEmailAddress&&c.helpers.isEmail(e)&&!/^mailto:.*/i.test(e)&&(e="mailto:"+e);if(""===c.opts.linkAutoPrefix||new RegExp("^("+m.LinkProtocols.join("|")+"):.","i").test(e)||/^data:image.*/i.test(e)||/^(https?:|ftps?:|file:|)\/\//i.test(e)||/^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e)||["/","{","[","#","(","."].indexOf((e||"")[0])<0&&(e=c.opts.linkAutoPrefix+c.helpers.sanitizeURL(e)),e=c.helpers.sanitizeURL(e),c.opts.linkAlwaysBlank&&(n.target="_blank"),c.opts.linkAlwaysNoFollow&&(n.rel="nofollow"),c.helpers.isEmail(r)&&(n.target=null,n.rel=null),"_blank"==n.target?(c.opts.linkNoOpener&&(n.rel?n.rel+=" noopener":n.rel="noopener"),c.opts.linkNoReferrer&&(n.rel?n.rel+=" noreferrer":n.rel="noreferrer")):null==n.target&&(n.rel?n.rel=n.rel.replace(/noopener/,"").replace(/noreferrer/,""):n.rel=null),t=t||"",e===c.opts.linkAutoPrefix)return c.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"),c.events.trigger("link.bad",[r]),!1;var l,a=u();if(a){if((l=d(a)).attr("href",e),0<t.length&&l.text()!=t&&!i){for(var s=l.get(0);1===s.childNodes.length&&s.childNodes[0].nodeType==Node.ELEMENT_NODE;)s=s.childNodes[0];d(s).text(t)}i||l.prepend(m.START_MARKER).append(m.END_MARKER),l.attr(n),i||c.selection.restore()}else{i?i.wrap('<a href="'+e+'"></a>'):(c.format.remove("a"),c.selection.isCollapsed()?(t=0===t.length?r:t,c.html.insert('<a href="'+e+'">'+m.START_MARKER+t.replace(/&/g,"&amp;")+m.END_MARKER+"</a>"),c.selection.restore()):0<t.length&&t!=c.selection.text().replace(/\n/g,"")?(c.selection.remove(),c.html.insert('<a href="'+e+'">'+m.START_MARKER+t.replace(/&/g,"&amp;")+m.END_MARKER+"</a>"),c.selection.restore()):(!function(){if(!c.selection.isCollapsed()){c.selection.save();for(var e=c.$el.find(".fr-marker").addClass("fr-unprocessed").toArray();e.length;){var t=d(e.pop());t.removeClass("fr-unprocessed");var n=c.node.deepestParent(t.get(0));if(n){for(var i=t.get(0),r="",l="";i=i.parentNode,c.node.isBlock(i)||(r+=c.node.closeTagString(i),l=c.node.openTagString(i)+l),i!=n;);var a=c.node.openTagString(t.get(0))+t.html()+c.node.closeTagString(t.get(0));t.replaceWith('<span id="fr-break"></span>');var s=n.outerHTML;s=(s=s.replace(/<span id="fr-break"><\/span>/g,r+a+l)).replace(l+r,""),n.outerHTML=s}e=c.$el.find(".fr-marker.fr-unprocessed").toArray()}c.html.cleanEmptyTags(),c.selection.restore()}}(),c.format.apply("a",{href:e})));for(var o=k(),p=0;p<o.length;p++)(l=d(o[p])).attr(n),l.removeAttr("_moz_dirty");1==o.length&&c.$wp&&!i&&(d(o[0]).prepend(m.START_MARKER).append(m.END_MARKER),c.selection.restore())}if(i){var f=c.popups.get("link.insert");f&&f.find("input:focus").blur(),c.image.edit(i)}else g()}