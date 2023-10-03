function unique_name_598() {
      var opts = this.options;
      if( ! opts.tag || ! opts.show_no_data_row) return [];
      var empty_row = '<' + opts.tag + ' class="' + opts.no_data_class + '">';
      switch(opts.tag) {
        case 'tr':
          empty_row += '<td>' + opts.no_data_text + '</td>';
          break;
        default:
          empty_row += opts.no_data_text;
      }
      empty_row += '</' + opts.tag + '>';
      return [empty_row];
    }