function unique_name_498(e,t){var n,r,o,i,a,s,d,l=this.getSelection(),f=this._doc;"undefined"!=typeof DOMPurify&&DOMPurify.isSupported?(i=DOMPurify.sanitize(e,{WHOLE_DOCUMENT:!1,RETURN_DOM:!0,RETURN_DOM_FRAGMENT:!0}),i=f.importNode(i,!0)):(t&&(n=e.indexOf("<!--StartFragment-->"),r=e.lastIndexOf("<!--EndFragment-->"),n>-1&&r>-1&&(e=e.slice(n+20,r))),o=this.createElement("DIV"),o.innerHTML=e,i=f.createDocumentFragment(),i.appendChild(N(o))),this.saveUndoState(l);try{for(a=this._root,s=i,d={fragment:i,preventDefault:function(){this.defaultPrevented=!0},defaultPrevented:!1},gn(i,i,this),Ht(i),Kt(i,null),Wt(i),i.normalize();s=c(s,i);)_(s,null);t&&this.fireEvent("willPaste",d),d.defaultPrevented||(mt(l,d.fragment,a),it||this._docWasChanged(),l.collapse(!1),this._ensureBottomLine()),this.setSelection(l),this._updatePath(l,!0)}catch(h){this.didError(h)}return this}