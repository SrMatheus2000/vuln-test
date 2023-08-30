(value) {
    if (value === '*') {
      return '*';
    }

    return `[${value.replace(/[[\]']+/g, '')}]`;
  }