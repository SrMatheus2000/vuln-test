function json2html(json, options) {
    var html = '';
    if (typeof json === 'string') {
      // Escape tags
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (options.withLinks && isUrl(json)) {
        html += '<a href="' + json + '" class="json-string" target="_blank">' + json + '</a>';
      } else {
        html += '<span class="json-string">"' + json + '"</span>';
      }
    } else if (typeof json === 'number') {
      html += '<span class="json-literal">' + json + '</span>';
    } else if (typeof json === 'boolean') {
      html += '<span class="json-literal">' + json + '</span>';
    } else if (json === null) {
      html += '<span class="json-literal">null</span>';
    } else if (json instanceof Array) {
      if (json.length > 0) {
        html += '[<ol class="json-array">';
        for (var i = 0; i < json.length; ++i) {
          html += '<li>';
          // Add toggle button if item is collapsable
          if (isCollapsable(json[i])) {
            html += '<a href class="json-toggle"></a>';
          }
          html += json2html(json[i], options);
          // Add comma if item is not last
          if (i < json.length - 1) {
            html += ',';
          }
          html += '</li>';
        }
        html += '</ol>]';
      } else {
        html += '[]';
      }
    } else if (typeof json === 'object') {
      var keyCount = Object.keys(json).length;
      if (keyCount > 0) {
        html += '{<ul class="json-dict">';
        for (var key in json) {
          if (Object.prototype.hasOwnProperty.call(json, key)) {
            html += '<li>';
            var keyRepr = options.withQuotes ?
              '<span class="json-string">"' + key + '"</span>' : key;
            // Add toggle button if item is collapsable
            if (isCollapsable(json[key])) {
              html += '<a href class="json-toggle">' + keyRepr + '</a>';
            } else {
              html += keyRepr;
            }
            html += ': ' + json2html(json[key], options);
            // Add comma if item is not last
            if (--keyCount > 0) {
              html += ',';
            }
            html += '</li>';
          }
        }
        html += '</ul>}';
      } else {
        html += '{}';
      }
    }
    return html;
  }