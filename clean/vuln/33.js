function unique_name_11 (e) {
    e.preventDefault();
    e.stopPropagation();

    const target = $(this);
    const _id = target.attr('doc_id');
    const prop = target.attr('doc_prop');
    const spinner = `<img src="${ME_SETTINGS.baseHref}public/img/gears.gif" />`;
    const leftScroll = $tableWrapper.scrollLeft();

    // Set the element with spinner for now
    target.html(spinner);

    $.get(`${makeCollectionUrl()}${encodeURIComponent(_id)}/${prop}`, function (input) {
      // Images inline
      if (
        typeof input === 'string'
        && (
          input.substr(0, 22) === 'data:image/png;base64,'
          || input.substr(0, 22) === 'data:image/gif;base64,'
          || input.substr(0, 22) === 'data:image/jpg;base64,'
          || input.substr(0, 23) === 'data:image/jpeg;base64,'
        )
      )  {
        input = '<img src="' + input + '" style="max-height:100%; max-width:100%; "/>';
      }

      // Audio inline
      if (
        typeof input === 'string'
        && (
          input.substr(0, 22) === 'data:audio/ogg;base64,'
          || input.substr(0, 22) === 'data:audio/wav;base64,'
          || input.substr(0, 22) === 'data:audio/mp3;base64,'
        )
      )  {
        input = '<audio controls style="width:45px;" src="' + input + '">Your browser does not support the audio element.</audio>';
      }

      // Video inline
      if (
        typeof input === 'string'
        && (
          input.substr(0, 23) === 'data:video/webm;base64,'
          || input.substr(0, 22) === 'data:video/mp4;base64,'
          ||  input.substr(0, 22) === 'data:video/ogv;base64,'
        )
      )  {
        input = '<video controls><source type="' + input.substring(input.indexOf(':') + 1, input.indexOf(';')) + '" src="' + input + '"/>'
          + 'Your browser does not support the video element.</video>';
      }

      if (typeof input === 'object' && (input.toString() === '[object Object]' || input.toString().substr(0, 7) === '[object')) {
        input = renderjson(input);
      }

      // Set the element with gotten datas
      target.parent().html(input);

      // Set original scroll position
      $('.tableWrapper').scrollLeft(leftScroll);
    });
  }