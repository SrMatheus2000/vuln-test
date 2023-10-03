function decode(jpegData, userOpts = {}) {
  var defaultOpts = {
    useTArray: false,
    // "undefined" means "Choose whether to transform colors based on the image’s color model."
    colorTransform: undefined,
    formatAsRGBA: true,
    tolerantDecoding: false,
  };

  var opts = {...defaultOpts, ...userOpts};
  var arr = new Uint8Array(jpegData);
  var decoder = new JpegImage();
  decoder.opts = opts;
  decoder.parse(arr);
  decoder.colorTransform = opts.colorTransform;

  var channels = (opts.formatAsRGBA) ? 4 : 3;
  var bytesNeeded = decoder.width * decoder.height * channels;
  try {
    var image = {
      width: decoder.width,
      height: decoder.height,
      exifBuffer: decoder.exifBuffer,
      data: opts.useTArray ?
        new Uint8Array(bytesNeeded) :
        new Buffer(bytesNeeded)
    };
  } catch (err){
    if (err instanceof RangeError){
      throw new Error("Could not allocate enough memory for the image. " +
                      "Required: " + bytesNeeded);
    } else {
      throw err;
    }
  }

  decoder.copyToImageData(image, opts.formatAsRGBA);

  return image;
}