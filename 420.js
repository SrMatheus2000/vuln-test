function unique_name_202 (value) {
    return value !== '*' ? `[${value.replace(/\[/g, '[')}]` : '*';
  }