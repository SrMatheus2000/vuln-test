function (msg) {
      var $container = $("<div></div>");
      $container.text(msg);
      this.$region.html($container);
    }