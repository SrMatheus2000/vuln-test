(value) {
    return value !== '*' ? `[${value.replace(/\[/g, '[')}]` : '*';
  }