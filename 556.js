function unique_name_281 (capture, parse, state) {
        const [, whitespace] = capture[3].match(HTML_LEFT_TRIM_AMOUNT_R);
        const trimmer = new RegExp(`^${whitespace}`, 'gm');
        const trimmed = capture[3].replace(trimmer, '');

        const parseFunc = containsBlockSyntax(trimmed)
          ? parseBlock
          : parseInline;

        const noInnerParse =
          DO_NOT_PROCESS_HTML_ELEMENTS.indexOf(capture[1]) !== -1;

        return {
          attrs: attrStringToMap(capture[2]),
          /**
           * if another html block is detected within, parse as block,
           * otherwise parse as inline to pick up any further markdown
           */
          content: noInnerParse ? capture[3] : parseFunc(parse, trimmed, state),

          noInnerParse,

          tag: capture[1],
        };
      }