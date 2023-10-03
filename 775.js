function parseFileHeader(index) {
    const headerPattern = /^(---|\+\+\+)\s+([\S ]*)(?:\t(.*?)\s*)?$/;
    const fileHeader = headerPattern.exec(diffstr[i]);
    if (fileHeader) {
      let keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
      let fileName = fileHeader[2].replace(/\\\\/g, '\\');
      if (/^".*"$/.test(fileName)) {
        fileName = fileName.substr(1, fileName.length - 2);
      }
      index[keyPrefix + 'FileName'] = fileName;
      index[keyPrefix + 'Header'] = fileHeader[3];

      i++;
    }
  }