function validator(compatibility) {
  var validUnits = Units.slice(0).filter(function (value) {
    return !(value in compatibility.units) || compatibility.units[value] === true;
  });

  var compatibleCssUnitRegex = new RegExp('^(\\-?\\.?\\d+\\.?\\d*(' + validUnits.join('|') + '|)|auto|inherit)$', 'i');

  return {
    colorOpacity: compatibility.colors.opacity,
    isAnimationDirectionKeyword: isKeyword('animation-direction'),
    isAnimationFillModeKeyword: isKeyword('animation-fill-mode'),
    isAnimationIterationCountKeyword: isKeyword('animation-iteration-count'),
    isAnimationNameKeyword: isKeyword('animation-name'),
    isAnimationPlayStateKeyword: isKeyword('animation-play-state'),
    isTimingFunction: isTimingFunction(),
    isBackgroundAttachmentKeyword: isKeyword('background-attachment'),
    isBackgroundClipKeyword: isKeyword('background-clip'),
    isBackgroundOriginKeyword: isKeyword('background-origin'),
    isBackgroundPositionKeyword: isKeyword('background-position'),
    isBackgroundRepeatKeyword: isKeyword('background-repeat'),
    isBackgroundSizeKeyword: isKeyword('background-size'),
    isColor: isColor,
    isColorFunction: isColorFunction,
    isDynamicUnit: isDynamicUnit,
    isFontKeyword: isKeyword('font'),
    isFontSizeKeyword: isKeyword('font-size'),
    isFontStretchKeyword: isKeyword('font-stretch'),
    isFontStyleKeyword: isKeyword('font-style'),
    isFontVariantKeyword: isKeyword('font-variant'),
    isFontWeightKeyword: isKeyword('font-weight'),
    isFunction: isFunction,
    isGlobal: isKeyword('^'),
    isHslColor: isHslColor,
    isIdentifier: isIdentifier,
    isImage: isImage,
    isKeyword: isKeyword,
    isLineHeightKeyword: isKeyword('line-height'),
    isListStylePositionKeyword: isKeyword('list-style-position'),
    isListStyleTypeKeyword: isKeyword('list-style-type'),
    isPrefixed: isPrefixed,
    isPositiveNumber: isPositiveNumber,
    isRgbColor: isRgbColor,
    isStyleKeyword: isKeyword('*-style'),
    isTime: isTime,
    isUnit: isUnit.bind(null, compatibleCssUnitRegex),
    isUrl: isUrl,
    isVariable: isVariable,
    isWidth: isKeyword('width'),
    isZIndex: isZIndex
  };
}