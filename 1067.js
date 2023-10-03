async error => {
  log.warn(error.message);
  log.warn('dwebp pre-build test failed');
  log.info('compiling from source');

  try {
    await binBuild.url('http://downloads.webmproject.org/releases/webp/libwebp-1.1.0.tar.gz', [
      `./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
      'make && make install'
    ]);

    log.success('dwebp built successfully');
  } catch (error) {
    log.error(error.stack);

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
}