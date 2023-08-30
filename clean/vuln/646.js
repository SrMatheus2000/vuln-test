(state, silent) => {
    let token;
    let match;

    while (
      state.src.indexOf("\n") >= 0 &&
      state.src.indexOf("\n") < state.src.indexOf(TOC)
    ) {
      if (state.tokens.slice(-1)[0].type === "softbreak") {
        state.src = state.src
          .split("\n")
          .slice(1)
          .join("\n");
        state.pos = 0;
      }
    }

    if (
      // Reject if the token does not start with @[
      state.src.charCodeAt(state.pos) !== 0x40 ||
      state.src.charCodeAt(state.pos + 1) !== 0x5b ||
      // Don’t run any pairs in validation mode
      silent
    ) {
      return false;
    }

    // Detect TOC markdown
    match = TOC_RE.exec(state.src);
    match = !match ? [] : match.filter(m => m);
    if (match.length < 1) {
      return false;
    }

    // Build content
    token = state.push("toc_open", "toc", 1);
    token.markup = TOC;
    token = state.push("toc_body", "", 0);
    token = state.push("toc_close", "toc", -1);

    // Update pos so the parser can continue
    const newline = state.src.indexOf("\n");
    if (newline !== -1) {
      state.pos = state.pos + newline;
    } else {
      state.pos = state.pos + state.posMax + 1;
    }

    return true;
  }