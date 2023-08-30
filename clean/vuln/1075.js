function unique_name_600(data) {
      var contentElem = this.contentElem;
      if(ie && ie <= 9 && this.options.tag == 'tr') {
        var div = document.createElement('div'), last;
        div.innerHTML = '<table><tbody>' + data + '</tbody></table>'
        while((last = contentElem.lastChild)) {
          contentElem.removeChild(last)
        }
        var rows = Array.prototype.slice.call(div.firstChild.firstChild.childNodes);
        while (rows.length) {
          contentElem.appendChild(rows.shift());
        }
      } else {
        contentElem.innerHTML = data;
      }
    }