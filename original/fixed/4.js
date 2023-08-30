function(name) {
    return [
      this.aliasable('container.lookup'),
      '(depths, ',
      JSON.stringify(name),
      ')'
    ];
  }