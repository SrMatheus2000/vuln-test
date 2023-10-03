(err) => {
    // Output full error objects
    err.message = err.stack;
    console.error(err);
    err.expose = true;
    return null;
  }