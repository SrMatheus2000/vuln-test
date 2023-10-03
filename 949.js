function getSizeFromRatio(options) {
  var ratio = eval(options.ratio); // Yeah, eval... Deal with it!
  return Math.floor(options.size * ratio);
}