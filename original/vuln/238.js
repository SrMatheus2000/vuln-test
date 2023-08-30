function(i, option) {
      var item = this.items[option.idx];
      var includes = util.includes(option.textContent.toLowerCase(), string.toLowerCase());

      if (includes && !option.disabled) {

        appendItem(item, f, this.customOption);

        util.removeClass(item, "excluded");

        // Underline the matching results
        if (!this.customOption) {
          item.innerHTML = match(string, option);
        }
      } else {
        util.addClass(item, "excluded");
      }
    }