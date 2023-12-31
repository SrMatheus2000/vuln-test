({ host, port, middleware }) => {
  const assets = new Koa();
  assets.use(koaStatic(path.join(__dirname, "assets")));

  const app = new Koa();

  app.on("error", (err) => {
    // Output full error objects
    err.message = err.stack;
    console.error(err);
    err.expose = true;
    return null;
  });

  app.use(mount("/assets", assets));

  // headers
  app.use(async (ctx, next) => {
    await next();

    const csp = [
      "default-src 'none'",
      "img-src 'self'",
      "form-action 'self'",
      "media-src 'self'",
      "style-src 'self'",
    ].join("; ");

    // Disallow scripts.
    ctx.set("Content-Security-Policy", csp);

    // Disallow <iframe> embeds from other domains.
    ctx.set("X-Frame-Options", "SAMEORIGIN");

    const isBlobPath = ctx.path.startsWith("/blob/");

    if (isBlobPath === false) {
      // Disallow browsers overwriting declared media types.
      //
      // This should only happen on non-blob URLs.
      // See: https://github.com/fraction/oasis/issues/138
      ctx.set("X-Content-Type-Options", "nosniff");
    }

    // Disallow sharing referrer with other domains.
    ctx.set("Referrer-Policy", "same-origin");

    // Disallow extra browser features except audio output.
    ctx.set("Feature-Policy", "speaker 'self'");

    if (ctx.method !== "GET") {
      const referer = ctx.request.header.referer;
      ctx.assert(
        referer != null,
        400,
        `HTTP ${ctx.method} must include referer`
      );
      const refererUrl = new URL(referer);
      const isBlobReferer = refererUrl.pathname.startsWith("/blob/");
      ctx.assert(
        isBlobReferer === false,
        400,
        `HTTP ${ctx.method} from blob URL not allowed`
      );
    }
  });

  middleware.forEach((m) => app.use(m));
  return app.listen({ host, port });
}