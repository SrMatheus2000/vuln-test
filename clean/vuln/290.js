function unique_name_136(m){"use strict";m=m&&m.hasOwnProperty("default")?m["default"]:m,Object.assign(m.POPUP_TEMPLATES,{"link.edit":"[_BUTTONS_]","link.insert":"[_BUTTONS_][_INPUT_LAYER_]"}),Object.assign(m.DEFAULTS,{linkEditButtons:["linkOpen","linkStyle","linkEdit","linkRemove"],linkInsertButtons:["linkBack","|","linkList"],linkAttributes:{},linkAutoPrefix:"http://",linkStyles:{"fr-green":"Green","fr-strong":"Thick"},linkMultipleStyles:!0,linkConvertEmailAddress:!0,linkAlwaysBlank:!1,linkAlwaysNoFollow:!1,linkNoOpener:!0,linkNoReferrer:!0,linkList:[{text:"Froala",href:"https://froala.com",target:"_blank"},{text:"Google",href:"https://google.com",target:"_blank"},{displayText:"Facebook",href:"https://facebook.com"}],linkText:!0}),m.PLUGINS.link=function(c){var d=c.$;function u(){var e=c.image?c.image.get():null;if(!e&&c.$wp){var t=c.selection.ranges(0).commonAncestorContainer;try{t&&(t.contains&&t.contains(c.el)||!c.el.contains(t)||c.el==t)&&(t=null)}catch(r){t=null}if(t&&"A"===t.tagName)return t;var n=c.selection.element(),i=c.selection.endElement();"A"==n.tagName||c.node.isElement(n)||(n=d(n).parentsUntil(c.$el,"a").first().get(0)),"A"==i.tagName||c.node.isElement(i)||(i=d(i).parentsUntil(c.$el,"a").first().get(0));try{i&&(i.contains&&i.contains(c.el)||!c.el.contains(i)||c.el==i)&&(i=null)}catch(r){i=null}try{n&&(n.contains&&n.contains(c.el)||!c.el.contains(n)||c.el==n)&&(n=null)}catch(r){n=null}return i&&i==n&&"A"==i.tagName?(c.browser.msie||c.helpers.isMobile())&&(c.selection.info(n).atEnd||c.selection.info(n).atStart)?null:n:null}return"A"==c.el.tagName?c.el:e&&e.get(0).parentNode&&"A"==e.get(0).parentNode.tagName?e.get(0).parentNode:void 0}function k(){var e,t,n,i,r=c.image?c.image.get():null,l=[];if(r)"A"==r.get(0).parentNode.tagName&&l.push(r.get(0).parentNode);else if(c.win.getSelection){var a=c.win.getSelection();if(a.getRangeAt&&a.rangeCount){i=c.doc.createRange();for(var s=0;s<a.rangeCount;++s)if((t=(e=a.getRangeAt(s)).commonAncestorContainer)&&1!=t.nodeType&&(t=t.parentNode),t&&"a"==t.nodeName.toLowerCase())l.push(t);else{n=t.getElementsByTagName("a");for(var o=0;o<n.length;++o)i.selectNodeContents(n[o]),i.compareBoundaryPoints(e.END_TO_START,e)<1&&-1<i.compareBoundaryPoints(e.START_TO_END,e)&&l.push(n[o])}}}else if(c.doc.selection&&"Control"!=c.doc.selection.type)if("a"==(t=(e=c.doc.selection.createRange()).parentElement()).nodeName.toLowerCase())l.push(t);else{n=t.getElementsByTagName("a"),i=c.doc.body.createTextRange();for(var p=0;p<n.length;++p)i.moveToElementText(n[p]),-1<i.compareEndPoints("StartToEnd",e)&&i.compareEndPoints("EndToStart",e)<1&&l.push(n[p])}return l}function g(r){if(c.core.hasFocus()){if(a(),r&&"keyup"===r.type&&(r.altKey||r.which==m.KEYCODE.ALT))return!0;setTimeout(function(){if(!r||r&&(1==r.which||"mouseup"!=r.type)){var e=u(),t=c.image?c.image.get():null;if(e&&!t){if(c.image){var n=c.node.contents(e);if(1==n.length&&"IMG"==n[0].tagName){var i=c.selection.ranges(0);return 0===i.startOffset&&0===i.endOffset?d(e).before(m.MARKERS):d(e).after(m.MARKERS),c.selection.restore(),!1}}r&&r.stopPropagation(),l(e)}}},c.helpers.isIOS()?100:0)}}function l(e){var t=c.popups.get("link.edit");t||(t=function(){var e="";1<=c.opts.linkEditButtons.length&&("A"==c.el.tagName&&0<=c.opts.linkEditButtons.indexOf("linkRemove")&&c.opts.linkEditButtons.splice(c.opts.linkEditButtons.indexOf("linkRemove"),1),e='<div class="fr-buttons">'.concat(c.button.buildList(c.opts.linkEditButtons),"</div>"));var t={buttons:e},n=c.popups.create("link.edit",t);c.$wp&&c.events.$on(c.$wp,"scroll.link-edit",function(){u()&&c.popups.isVisible("link.edit")&&l(u())});return n}());var n=d(e);c.popups.isVisible("link.edit")||c.popups.refresh("link.edit"),c.popups.setContainer("link.edit",c.$sc);var i=n.offset().left+n.outerWidth()/2,r=n.offset().top+n.outerHeight();c.popups.show("link.edit",i,r,n.outerHeight(),!0)}function a(){c.popups.hide("link.edit")}function o(){var e=c.popups.get("link.insert"),t=u();if(t){var n,i,r=d(t),l=e.find('input.fr-link-attr[type="text"]'),a=e.find('input.fr-link-attr[type="checkbox"]');for(n=0;n<l.length;n++)(i=d(l[n])).val(r.attr(i.attr("name")||""));for(a.attr("checked",!1),n=0;n<a.length;n++)i=d(a[n]),r.attr(i.attr("name"))==i.data("checked")&&i.attr("checked",!0);e.find('input.fr-link-attr[type="text"][name="text"]').val(r.text())}else e.find('input.fr-link-attr[type="text"]').val(""),e.find('input.fr-link-attr[type="checkbox"]').attr("checked",!1),e.find('input.fr-link-attr[type="text"][name="text"]').val(c.selection.text());e.find("input.fr-link-attr").trigger("change"),(c.image?c.image.get():null)?e.find('.fr-link-attr[name="text"]').parent().hide():e.find('.fr-link-attr[name="text"]').parent().show()}function s(e){if(e)return c.popups.onRefresh("link.insert",o),!0;var t="";1<=c.opts.linkInsertButtons.length&&(t='<div class="fr-buttons fr-tabs">'+c.button.buildList(c.opts.linkInsertButtons)+"</div>");var n="",i=0;for(var r in n='<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-'+c.id+'">',n+='<div class="fr-input-line"><input id="fr-link-insert-layer-url-'+c.id+'" name="href" type="text" class="fr-link-attr" placeholder="'+c.language.translate("URL")+'" tabIndex="'+ ++i+'"></div>',c.opts.linkText&&(n+='<div class="fr-input-line"><input id="fr-link-insert-layer-text-'+c.id+'" name="text" type="text" class="fr-link-attr" placeholder="'+c.language.translate("Text")+'" tabIndex="'+ ++i+'"></div>'),c.opts.linkAttributes)if(c.opts.linkAttributes.hasOwnProperty(r)){var l=c.opts.linkAttributes[r];n+='<div class="fr-input-line"><input name="'+r+'" type="text" class="fr-link-attr" placeholder="'+c.language.translate(l)+'" tabIndex="'+ ++i+'"></div>'}c.opts.linkAlwaysBlank||(n+='<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-'.concat(c.id,'" tabIndex="').concat(++i,'"><span>').concat('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>','</span></span><label id="fr-label-target-').concat(c.id,'">').concat(c.language.translate("Open in new tab"),"</label></div>"));var a={buttons:t,input_layer:n+='<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="'+ ++i+'" type="button">'+c.language.translate("Insert")+"</button></div></div>"},s=c.popups.create("link.insert",a);return c.$wp&&c.events.$on(c.$wp,"scroll.link-insert",function(){(c.image?c.image.get():null)&&c.popups.isVisible("link.insert")&&h(),c.popups.isVisible("link.insert")&&f()}),s}function p(e,t,n){if(void 0===n&&(n={}),!1===c.events.trigger("link.beforeInsert",[e,t,n]))return!1;var i=c.image?c.image.get():null;i||"A"==c.el.tagName?"A"==c.el.tagName&&c.$el.focus():(c.selection.restore(),c.popups.hide("link.insert"));var r=e;c.opts.linkConvertEmailAddress&&c.helpers.isEmail(e)&&!/^mailto:.*/i.test(e)&&(e="mailto:"+e);if(""===c.opts.linkAutoPrefix||new RegExp("^("+m.LinkProtocols.join("|")+"):.","i").test(e)||/^data:image.*/i.test(e)||/^(https?:|ftps?:|file:|)\/\//i.test(e)||/^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e)||["/","{","[","#","(","."].indexOf((e||"")[0])<0&&(e=c.opts.linkAutoPrefix+c.helpers.sanitizeURL(e)),e=c.helpers.sanitizeURL(e),c.opts.linkAlwaysBlank&&(n.target="_blank"),c.opts.linkAlwaysNoFollow&&(n.rel="nofollow"),c.helpers.isEmail(r)&&(n.target=null,n.rel=null),"_blank"==n.target?(c.opts.linkNoOpener&&(n.rel?n.rel+=" noopener":n.rel="noopener"),c.opts.linkNoReferrer&&(n.rel?n.rel+=" noreferrer":n.rel="noreferrer")):null==n.target&&(n.rel?n.rel=n.rel.replace(/noopener/,"").replace(/noreferrer/,""):n.rel=null),t=t||"",e===c.opts.linkAutoPrefix)return c.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"),c.events.trigger("link.bad",[r]),!1;var l,a=u();if(a){if((l=d(a)).attr("href",e),0<t.length&&l.text()!=t&&!i){for(var s=l.get(0);1===s.childNodes.length&&s.childNodes[0].nodeType==Node.ELEMENT_NODE;)s=s.childNodes[0];d(s).text(t)}i||l.prepend(m.START_MARKER).append(m.END_MARKER),l.attr(n),i||c.selection.restore()}else{i?i.wrap('<a href="'+e+'"></a>'):(c.format.remove("a"),c.selection.isCollapsed()?(t=0===t.length?r:t,c.html.insert('<a href="'+e+'">'+m.START_MARKER+t.replace(/&/g,"&amp;")+m.END_MARKER+"</a>"),c.selection.restore()):0<t.length&&t!=c.selection.text().replace(/\n/g,"")?(c.selection.remove(),c.html.insert('<a href="'+e+'">'+m.START_MARKER+t.replace(/&/g,"&amp;")+m.END_MARKER+"</a>"),c.selection.restore()):(!function(){if(!c.selection.isCollapsed()){c.selection.save();for(var e=c.$el.find(".fr-marker").addClass("fr-unprocessed").toArray();e.length;){var t=d(e.pop());t.removeClass("fr-unprocessed");var n=c.node.deepestParent(t.get(0));if(n){for(var i=t.get(0),r="",l="";i=i.parentNode,c.node.isBlock(i)||(r+=c.node.closeTagString(i),l=c.node.openTagString(i)+l),i!=n;);var a=c.node.openTagString(t.get(0))+t.html()+c.node.closeTagString(t.get(0));t.replaceWith('<span id="fr-break"></span>');var s=n.outerHTML;s=(s=s.replace(/<span id="fr-break"><\/span>/g,r+a+l)).replace(l+r,""),n.outerHTML=s}e=c.$el.find(".fr-marker.fr-unprocessed").toArray()}c.html.cleanEmptyTags(),c.selection.restore()}}(),c.format.apply("a",{href:e})));for(var o=k(),p=0;p<o.length;p++)(l=d(o[p])).attr(n),l.removeAttr("_moz_dirty");1==o.length&&c.$wp&&!i&&(d(o[0]).prepend(m.START_MARKER).append(m.END_MARKER),c.selection.restore())}if(i){var f=c.popups.get("link.insert");f&&f.find("input:focus").blur(),c.image.edit(i)}else g()}function f(){a();var e=u();if(e){var t=c.popups.get("link.insert");t||(t=s()),c.popups.isVisible("link.insert")||(c.popups.refresh("link.insert"),c.selection.save(),c.helpers.isMobile()&&(c.events.disableBlur(),c.$el.blur(),c.events.enableBlur())),c.popups.setContainer("link.insert",c.$sc);var n=(c.image?c.image.get():null)||d(e),i=n.offset().left+n.outerWidth()/2,r=n.offset().top+n.outerHeight();c.popups.show("link.insert",i,r,n.outerHeight(),!0)}}function h(){var e=c.image?c.image.getEl():null;if(e){var t=c.popups.get("link.insert");c.image.hasCaption()&&(e=e.find(".fr-img-wrap")),t||(t=s()),o(),c.popups.setContainer("link.insert",c.$sc);var n=e.offset().left+e.outerWidth()/2,i=e.offset().top+e.outerHeight();c.popups.show("link.insert",n,i,e.outerHeight(),!0)}}return{_init:function(){c.events.on("keyup",function(e){e.which!=m.KEYCODE.ESC&&g(e)}),c.events.on("window.mouseup",g),c.events.$on(c.$el,"click","a",function(e){c.edit.isDisabled()&&e.preventDefault()}),c.helpers.isMobile()&&c.events.$on(c.$doc,"selectionchange",g),s(!0),"A"==c.el.tagName&&c.$el.addClass("fr-view"),c.events.on("toolbar.esc",function(){if(c.popups.isVisible("link.edit"))return c.events.disableBlur(),c.events.focus(),!1},!0)},remove:function(){var e=u(),t=c.image?c.image.get():null;if(!1===c.events.trigger("link.beforeRemove",[e]))return!1;t&&e?(t.unwrap(),c.image.edit(t)):e&&(c.selection.save(),d(e).replaceWith(d(e).html()),c.selection.restore(),a())},showInsertPopup:function(){var e=c.$tb.find('.fr-command[data-cmd="insertLink"]'),t=c.popups.get("link.insert");if(t||(t=s()),!t.hasClass("fr-active"))if(c.popups.refresh("link.insert"),c.popups.setContainer("link.insert",c.$tb||c.$sc),e.isVisible()){var n=c.button.getPosition(e),i=n.left,r=n.top;c.popups.show("link.insert",i,r,e.outerHeight())}else c.position.forSelection(t),c.popups.show("link.insert")},usePredefined:function(e){var t,n,i=c.opts.linkList[e],r=c.popups.get("link.insert"),l=r.find('input.fr-link-attr[type="text"]'),a=r.find('input.fr-link-attr[type="checkbox"]');for(n=0;n<l.length;n++)i[(t=d(l[n])).attr("name")]?(t.val(i[t.attr("name")]),t.toggleClass("fr-not-empty",!0)):"text"!=t.attr("name")&&t.val("");for(n=0;n<a.length;n++)(t=d(a[n])).attr("checked",t.data("checked")==i[t.attr("name")]);c.accessibility.focusPopup(r)},insertCallback:function(){var e,t,n=c.popups.get("link.insert"),i=n.find('input.fr-link-attr[type="text"]'),r=n.find('input.fr-link-attr[type="checkbox"]'),l=(i.filter('[name="href"]').val()||"").trim(),a=i.filter('[name="text"]').val(),s={};for(t=0;t<i.length;t++)e=d(i[t]),["href","text"].indexOf(e.attr("name"))<0&&(s[e.attr("name")]=e.val());for(t=0;t<r.length;t++)(e=d(r[t])).is(":checked")?s[e.attr("name")]=e.data("checked"):s[e.attr("name")]=e.data("unchecked")||null;var o=c.helpers.scrollTop();p(l,a,s),d(c.o_win).scrollTop(o)},insert:p,update:f,get:u,allSelected:k,back:function(){c.image&&c.image.get()?c.image.back():(c.events.disableBlur(),c.selection.restore(),c.events.enableBlur(),u()&&c.$wp?(c.selection.restore(),a(),g()):"A"==c.el.tagName?(c.$el.focus(),g()):(c.popups.hide("link.insert"),c.toolbar.showInline()))},imageLink:h,applyStyle:function(e,t,n){void 0===n&&(n=c.opts.linkMultipleStyles),void 0===t&&(t=c.opts.linkStyles);var i=u();if(!i)return!1;if(!n){var r=Object.keys(t);r.splice(r.indexOf(e),1),d(i).removeClass(r.join(" "))}d(i).toggleClass(e),g()}}},m.DefineIcon("insertLink",{NAME:"link",SVG_KEY:"insertLink"}),m.RegisterShortcut(m.KEYCODE.K,"insertLink",null,"K"),m.RegisterCommand("insertLink",{title:"Insert Link",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("link.insert")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("link.insert")):this.link.showInsertPopup()},plugin:"link"}),m.DefineIcon("linkOpen",{NAME:"external-link",FA5NAME:"external-link-alt",SVG_KEY:"openLink"}),m.RegisterCommand("linkOpen",{title:"Open Link",undo:!1,refresh:function(e){this.link.get()?e.removeClass("fr-hidden"):e.addClass("fr-hidden")},callback:function(){var e=this.link.get();e&&(-1!==e.href.indexOf("mailto:")?this.o_win.open(e.href).close():this.o_win.open(e.href,"_blank","noopener"),this.popups.hide("link.edit"))},plugin:"link"}),m.DefineIcon("linkEdit",{NAME:"edit",SVG_KEY:"editLink"}),m.RegisterCommand("linkEdit",{title:"Edit Link",undo:!1,refreshAfterCallback:!1,popup:!0,callback:function(){this.link.update()},refresh:function(e){this.link.get()?e.removeClass("fr-hidden"):e.addClass("fr-hidden")},plugin:"link"}),m.DefineIcon("linkRemove",{NAME:"unlink",SVG_KEY:"unlink"}),m.RegisterCommand("linkRemove",{title:"Unlink",callback:function(){this.link.remove()},refresh:function(e){this.link.get()?e.removeClass("fr-hidden"):e.addClass("fr-hidden")},plugin:"link"}),m.DefineIcon("linkBack",{NAME:"arrow-left",SVG_KEY:"back"}),m.RegisterCommand("linkBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.link.back()},refresh:function(e){var t=this.link.get()&&this.doc.hasFocus();(this.image?this.image.get():null)||t||this.opts.toolbarInline?(e.removeClass("fr-hidden"),e.next(".fr-separator").removeClass("fr-hidden")):(e.addClass("fr-hidden"),e.next(".fr-separator").addClass("fr-hidden"))},plugin:"link"}),m.DefineIcon("linkList",{NAME:"search",SVG_KEY:"search"}),m.RegisterCommand("linkList",{title:"Choose Link",type:"dropdown",focus:!1,undo:!1,refreshAfterCallback:!1,html:function(){for(var e='<ul class="fr-dropdown-list" role="presentation">',t=this.opts.linkList,n=0;n<t.length;n++)e+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="'+n+'">'+(t[n].displayText||t[n].text)+"</a></li>";return e+="</ul>"},callback:function(e,t){this.link.usePredefined(t)},plugin:"link"}),m.RegisterCommand("linkInsert",{focus:!1,refreshAfterCallback:!1,callback:function(){this.link.insertCallback()},refresh:function(e){this.link.get()?e.text(this.language.translate("Update")):e.text(this.language.translate("Insert"))},plugin:"link"}),m.DefineIcon("imageLink",{NAME:"link",SVG_KEY:"insertLink"}),m.RegisterCommand("imageLink",{title:"Insert Link",undo:!1,focus:!1,popup:!0,callback:function(){this.link.imageLink()},refresh:function(e){var t;this.link.get()?((t=e.prev()).hasClass("fr-separator")&&t.removeClass("fr-hidden"),e.addClass("fr-hidden")):((t=e.prev()).hasClass("fr-separator")&&t.addClass("fr-hidden"),e.removeClass("fr-hidden"))},plugin:"link"}),m.DefineIcon("linkStyle",{NAME:"magic",SVG_KEY:"linkStyles"}),m.RegisterCommand("linkStyle",{title:"Style",type:"dropdown",html:function(){var e='<ul class="fr-dropdown-list" role="presentation">',t=this.opts.linkStyles;for(var n in t)t.hasOwnProperty(n)&&(e+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="'+n+'">'+this.language.translate(t[n])+"</a></li>");return e+="</ul>"},callback:function(e,t){this.link.applyStyle(t)},refreshOnShow:function(e,t){var n=this.$,i=this.link.get();if(i){var r=n(i);t.find(".fr-command").each(function(){var e=n(this).data("param1"),t=r.hasClass(e);n(this).toggleClass("fr-active",t).attr("aria-selected",t)})}},refresh:function(e){this.link.get()?e.removeClass("fr-hidden"):e.addClass("fr-hidden")},plugin:"link"})}