"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/WTFCss/src/core/stylesheet.js
var stylesheet_exports = {};
__export(stylesheet_exports, {
  default: () => stylesheet_default
});
module.exports = __toCommonJS(stylesheet_exports);

// src/WTFCss/src/helpers/@charset.js
var charset = (charsetValue) => `@charset "${charsetValue}";`;
var charset_default = charset;

// src/WTFCss/src/helpers/@colorprofile.js
var defineColorProfile = (name, src, renderingIntent) => {
  let profileRule = `@color-profile ${name} {
  src: url("${src}")`;
  if (renderingIntent) {
    profileRule += `;
  rendering-intent: ${renderingIntent}`;
  }
  profileRule += ";\n}";
  return profileRule;
};
var colorprofile_default = defineColorProfile;

// src/WTFCss/src/helpers/@container.js
var applyContainerStyles = (name, condition, styles) => {
  let containerRule = `@container ${name ? name + " " : ""}(${condition}) {
${styles}
}`;
  return containerRule;
};
var container_default = applyContainerStyles;

// src/WTFCss/src/helpers/@property.js
var registerProperty = (name, syntax, inherits, initialValue) => {
  return {
    [`@property ${name}`]: "{ " + !syntax + !inherits + !initialValue + " }"
  };
};
var property_default = registerProperty;

// src/WTFCss/src/helpers/@counterstyle.js
var defineCounterStyle = (name, rules) => {
  if (["decimal", "disc", "square", "circle", "disclosure-open", "disclosure-closed"].includes(name.toLowerCase())) {
    throw new Error(`The name "${name}" is not allowed for custom counter styles.`);
  }
  const ruleEntries = Object.entries(rules).map(([descriptor, value]) => {
    if (descriptor === "symbols" || descriptor === "additive-symbols") {
      value = value.map((symbol) => `"${symbol}"`).join(" ");
    }
    return `${descriptor}: ${value}`;
  });
  const ruleString = ruleEntries.join("; ");
  const counterRule = `@counter-style ${name} { ${ruleString} }`;
  return counterRule;
};
var counterstyle_default = defineCounterStyle;

// src/WTFCss/src/helpers/@fontface.js
var defineFontFace = (fontFace) => {
  const fontFaceRule = `@font-face {
    font-family: "${fontFace.family}";
    src: ${fontFace.sources.map((source) => {
    if (source.url) {
      return `url("${source.url}") format("${source.format}")`;
    } else if (source.local) {
      return `local("${source.local}")`;
    }
    return "";
  }).join(",\n    ")};
    ${fontFace.descriptors ? Object.entries(fontFace.descriptors).map(([key, value]) => `${key}: ${value}`).join(";\n    ") : ""}
  }`;
  return fontFaceRule;
};
var fontface_default = defineFontFace;

// src/WTFCss/src/helpers/@fontfeaturevalues.js
var defineFontFeatureValues = (familyName, featureValues) => {
  const featureBlocks = Object.entries(featureValues).map(([feature, values]) => {
    const valueString = Array.isArray(values) ? values.join(" ") : values;
    return `@${feature} { ${familyName}: ${valueString}; }`;
  }).join("\n");
  return `@font-feature-values ${familyName} {
${featureBlocks}
}`;
};
var fontfeaturevalues_default = defineFontFeatureValues;

// src/WTFCss/src/helpers/@fontpalletevalues.js
var defineFontPaletteValues = (identifier, familyName, basePalette, overrideColors) => {
  const declarations = [];
  if (familyName)
    declarations.push(`font-family: ${familyName};`);
  if (basePalette)
    declarations.push(`base-palette: ${basePalette};`);
  if (overrideColors) {
    const colorOverrides = overrideColors.map((color) => color.join(" ")).join(",\n    ");
    declarations.push(`override-colors:
    ${colorOverrides};`);
  }
  return `@font-palette-values ${identifier} {
  ${declarations.join("\n  ")}
}`;
};
var fontpalletevalues_default = defineFontPaletteValues;

// src/WTFCss/src/helpers/@import.js
var defineImport = (importPath, mediaQueries = "", supportsCondition = "", layerName = "") => {
  let importRule = `@import url(${importPath})`;
  if (layerName) {
    importRule += ` layer(${layerName})`;
  }
  if (supportsCondition) {
    importRule += ` supports(${supportsCondition})`;
  }
  if (mediaQueries) {
    importRule += ` ${mediaQueries}`;
  }
  importRule += ";";
  return importRule;
};
var import_default = defineImport;

// src/WTFCss/src/helpers/@keyframes.js
var defineKeyframes = (name, frames) => {
  if (typeof name !== "string" || !Array.isArray(frames)) {
    throw new TypeError("Invalid arguments for defineKeyframes.");
  }
  const keyframeRules = frames.map((frame) => {
    const offset = Object.keys(frame)[0];
    const properties = Object.entries(frame[offset]).map(([prop, value]) => {
      return `${prop}: ${value}`;
    }).join("; ");
    return `${offset} { ${properties} }`;
  }).join(" ");
  return `@keyframes ${name} { ${keyframeRules} }`;
};
var keyframes_default = defineKeyframes;

// src/WTFCss/src/helpers/@layer.js
var defineLayer = (name, rules) => {
  if (!name || typeof rules !== "object") {
    throw new TypeError("Invalid arguments for defineLayer.");
  }
  const layerRules = Object.entries(rules).map(([selector, styleRules]) => {
    const styleString = Object.entries(styleRules).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@layer ${name} { ${layerRules} }`;
};
var defineLayerOrder = (...names) => `@layer ` + names.join(" ");
var layer_default = {
  defineLayer,
  defineLayerOrder
};

// src/WTFCss/src/helpers/@media.js
var defineMedia = (mediaQuery, styles) => {
  if (typeof mediaQuery !== "string" || typeof styles !== "object") {
    throw new TypeError("Invalid arguments for defineMedia.");
  }
  const styleEntries = Object.entries(styles).map(([selector, styleRules]) => {
    const styleString = Object.entries(styleRules).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@media ${mediaQuery} { ${styleEntries} }`;
};
var media_default = defineMedia;

// src/WTFCss/src/helpers/@namespace.js
var defineNamespace = (prefix, uri) => {
  if (!uri) {
    throw new Error("URI for namespace is required.");
  }
  const namespacePrefix = prefix ? `${prefix} ` : "";
  return `@namespace ${namespacePrefix}url(${uri});`;
};
var namespace_default = defineNamespace;

// src/WTFCss/src/helpers/@page.js
var definePage = (name, styles) => {
  if (typeof styles !== "object") {
    throw new TypeError("Styles must be an object.");
  }
  const styleEntries = Object.entries(styles).map(([property, value]) => {
    if (!/^margin-|^border-|^padding-|^background-|^font-|^text-|^color$|^outline$|^counter-|^width$|^height$|^line-height$|^quotes$|^visibility$/.test(property)) {
      throw new Error(`Property "${property}" is not allowed within @page rule.`);
    }
    return `${property}: ${value};`;
  }).join(" ");
  const pageRule = `@page ${name} { ${styleEntries} }`;
  return pageRule;
};
var page_default = definePage;

// src/WTFCss/src/helpers/@startingstyle.js
var defineStartingStyle = (selector, properties) => {
  const propertyEntries = Object.entries(properties).map(([property, value]) => {
    return `${property}: ${value};`;
  }).join(" ");
  const startingStyleRule = `@starting-style {
  ${selector} { ${propertyEntries} }
}`;
  return startingStyleRule;
};
var startingstyle_default = defineStartingStyle;

// src/WTFCss/src/helpers/@supports.js
var defineSupports = (supportsCondition, rules) => {
  const conditionString = supportsCondition.map((condition) => `(${condition})`).join(" and ");
  const rulesString = Object.entries(rules).map(([selector, styles]) => {
    const styleString = Object.entries(styles).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@supports ${conditionString} { ${rulesString} }`;
};
var supports_default = defineSupports;

// src/WTFCss/src/helpers/index.js
var helpers_default = {
  charsets: charset_default,
  colorProfiles: colorprofile_default,
  container: container_default,
  property: property_default,
  counterStyles: counterstyle_default,
  fontFaces: fontface_default,
  fontFeatureValues: fontfeaturevalues_default,
  fontPaletteValues: fontpalletevalues_default,
  importer: import_default,
  keyframes: keyframes_default,
  layer: layer_default,
  media: media_default,
  namespace: namespace_default,
  pages: page_default,
  startingStyles: startingstyle_default,
  supports: supports_default
};

// src/WTFCss/src/keywords/types.js
function getTypeKeyword(param = "") {
  switch (param) {
    case "absolute-size":
    case "alpha-value":
    case "angle":
    case "angle-percentage":
    case "basic-shape":
    case "blend-mode":
    case "box-edge":
    case "calc-constant":
    case "calc-sum":
    case "color-interpolation-method":
    case "color":
    case "custom-ident":
    case "dashed-ident":
    case "dimension":
    case "display-box":
    case "display-inside":
    case "display-internal":
    case "display-legacy":
    case "display-listitem":
    case "display-outside":
    case "easing-function":
    case "filter-function":
    case "flex":
    case "frequency":
    case "frequency-percentage":
    case "generic-family":
    case "gradient":
    case "hex-color":
    case "hue":
    case "hue-interpolation-method":
    case "ident":
    case "image":
    case "integer":
    case "length":
    case "length-percentage":
    case "line-style":
    case "named-color":
    case "number":
    case "overflow":
    case "percentage":
    case "position":
    case "ratio":
    case "relative-size":
    case "resolution":
    case "string":
    case "system-color":
    case "time":
    case "time-percentage":
    case "transform-function":
      return `<${param}>`;
    default:
      return null;
  }
}
var types_default = getTypeKeyword;

// src/WTFCss/src/keywords/important.js
var important = (_) => `!important;`;
var important_default = important;

// src/WTFCss/src/keywords/index.js
var keywords_default = {
  important: important_default,
  types: types_default
};

// src/WTFCss/src/functions/abs.js
var abs = (payload) => {
  return `abs(${payload})`;
};
var abs_default = abs;

// src/WTFCss/src/functions/acos.js
var acos = (payload) => `acos(${payload})`;
var acos_default = acos;

// src/WTFCss/src/functions/asin.js
var asin = (payload) => `asin(${payload})`;
var asin_default = asin;

// src/WTFCss/src/functions/atan.js
var atan = (payload) => `atan(${payload})`;
var atan_default = atan;

// src/WTFCss/src/functions/atan2.js
var atan2 = (payload) => `atan2(${payload})`;
var atan2_default = atan2;

// src/WTFCss/src/functions/attr.js
var attr = (payload) => `attr(${payload})`;
var attr_default = attr;

// src/WTFCss/src/functions/calc.js
var calc = (payload) => `calc(${payload})`;
var calc_default = calc;

// src/WTFCss/src/functions/clamp.js
var clamp = (min2, val, max2) => {
  return `clamp(${min2}, ${val}, ${max2})`;
};
var clamp_default = clamp;

// src/WTFCss/src/functions/cos.js
var cos = (angle) => `cos(${angle})`;
var cos_default = cos;

// src/WTFCss/src/functions/counter.js
var counter = (counterName, counterStyle = "decimal") => {
  if (typeof counterName !== "string" || counterName.startsWith("--") || ["none", "unset", "initial", "inherit"].includes(counterName)) {
    throw new Error("Invalid counter name.");
  }
  if (typeof counterStyle !== "string") {
    throw new Error("Invalid counter style.");
  }
  return `counter(${counterName}${counterStyle !== "decimal" ? ", " + counterStyle : ""})`;
};
var counter_default = counter;

// src/WTFCss/src/functions/counters.js
var counters = (counterName, string, counterStyle = "decimal") => {
  if (typeof counterName !== "string" || counterName.startsWith("--") || ["none", "unset", "initial", "inherit"].includes(counterName)) {
    throw new Error("Invalid counter name.");
  }
  if (typeof string !== "string") {
    throw new Error("Invalid string for concatenation.");
  }
  if (typeof counterStyle !== "string") {
    throw new Error("Invalid counter style.");
  }
  return `counters(${counterName}, "${string}"${counterStyle !== "decimal" ? ", " + counterStyle : ""})`;
};
var counters_default = counters;

// src/WTFCss/src/functions/crossfade.js
var crossFade = (...images) => {
  const validImages = images.filter((image) => {
    if (typeof image === "string" && image.startsWith("url(")) {
      return true;
    }
    const [img, percentage] = image;
    return typeof img === "string" && img.startsWith("url(") && typeof percentage === "number" && percentage >= 0 && percentage <= 100;
  });
  if (validImages.length < 2) {
    throw new Error("crossFade function requires at least two images.");
  }
  const crossFadeImages = validImages.map((image) => {
    if (typeof image === "string") {
      return image;
    }
    const [img, percentage] = image;
    return `${img} ${percentage}%`;
  }).join(", ");
  return `cross-fade(${crossFadeImages})`;
};
var crossfade_default = crossFade;

// src/WTFCss/src/functions/element.js
var element = (id) => {
  if (typeof id !== "string" || !id.startsWith("#")) {
    throw new Error('Invalid ID for element function. ID must be a string starting with "#".');
  }
  if (typeof document.mozSetImageElement !== "function") {
    console.warn("The element() function is experimental and not supported in all browsers.");
  }
  return `-moz-element(${id})`;
};
var element_default = element;

// src/WTFCss/src/functions/env.js
var env = (variable, fallback) => {
  const envVar = `env(${variable}${fallback ? `, ${fallback}` : ""})`;
  return envVar;
};
var safeAreaInsets = {
  top: (fallback) => env("safe-area-inset-top", fallback),
  right: (fallback) => env("safe-area-inset-right", fallback),
  bottom: (fallback) => env("safe-area-inset-bottom", fallback),
  left: (fallback) => env("safe-area-inset-left", fallback)
};
var titlebarArea = {
  x: (fallback) => env("titlebar-area-x", fallback),
  y: (fallback) => env("titlebar-area-y", fallback),
  width: (fallback) => env("titlebar-area-width", fallback),
  height: (fallback) => env("titlebar-area-height", fallback)
};
var keyboardInset = {
  top: (fallback) => env("keyboard-inset-top", fallback),
  right: (fallback) => env("keyboard-inset-right", fallback),
  bottom: (fallback) => env("keyboard-inset-bottom", fallback),
  left: (fallback) => env("keyboard-inset-left", fallback),
  width: (fallback) => env("keyboard-inset-width", fallback),
  height: (fallback) => env("keyboard-inset-height", fallback)
};
var env_default = {
  env,
  safeAreaInsets,
  titlebarArea,
  keyboardInset
};

// src/WTFCss/src/functions/exp.js
var exp = (value) => `exp(${value})`;
var exp_default = exp;

// src/WTFCss/src/functions/fitcontent.js
var fitContent = (size) => {
  if (typeof size !== "string") {
    throw new TypeError("Size must be a string representing a length or a percentage.");
  }
  return `fit-content(${size})`;
};
var fitcontent_default = fitContent;

// src/WTFCss/src/functions/hypot.js
var hypot = (...args) => `hypot(${args.join(", ")})`;
var hypot_default = hypot;

// src/WTFCss/src/functions/log.js
var log = (value) => `log(${value})`;
var log_default = log;

// src/WTFCss/src/functions/max.js
var max = (...args) => `max(${args.join(", ")})`;
var max_default = max;

// src/WTFCss/src/functions/min.js
var min = (...args) => `min(${args.join(", ")})`;
var min_default = min;

// src/WTFCss/src/functions/minmax.js
var minmax = (min2, max2) => {
  if (typeof min2 !== "string" || typeof max2 !== "string") {
    throw new TypeError("Parameters min and max must be strings.");
  }
  return `minmax(${min2}, ${max2})`;
};
var minmax_default = minmax;

// src/WTFCss/src/functions/mod.js
var mod = (a, b) => `mod(${a}, ${b})`;
var mod_default = mod;

// src/WTFCss/src/functions/path.js
var path = (fillRule, svgPath) => {
  if (typeof svgPath !== "string") {
    throw new TypeError("The svgPath parameter must be a string.");
  }
  if (fillRule && typeof fillRule !== "string") {
    throw new TypeError("The fillRule parameter must be a string.");
  }
  const validFillRules = ["nonzero", "evenodd"];
  if (fillRule && !validFillRules.includes(fillRule)) {
    throw new Error('The fillRule parameter must be either "nonzero" or "evenodd".');
  }
  return `path(${fillRule ? `${fillRule}, ` : ""}"${svgPath}")`;
};
var path_default = path;

// src/WTFCss/src/functions/pow.js
var pow = (a, b) => `pow(${a}, ${b})`;
var pow_default = pow;

// src/WTFCss/src/functions/ray.js
var ray = (angle, size = "closest-side", contain = false, position = "") => {
  if (typeof angle !== "number" || angle < 0 || angle >= 360) {
    throw new TypeError("The angle must be a number between 0 and 359.");
  }
  const sizeKeywords = ["closest-side", "closest-corner", "farthest-side", "farthest-corner", "sides"];
  if (!sizeKeywords.includes(size)) {
    throw new TypeError("The size must be one of the following values: " + sizeKeywords.join(", ") + ".");
  }
  const positionRegex = /^(left|center|right|top|bottom|(\d+(\.\d+)?(px|%)?))$/;
  if (position && !positionRegex.test(position)) {
    throw new TypeError("The position must be a valid CSS position value.");
  }
  let rayString = `ray(${angle}deg`;
  if (size !== "closest-side") {
    rayString += ` ${size}`;
  }
  if (contain) {
    rayString += " contain";
  }
  if (position) {
    rayString += ` at ${position}`;
  }
  rayString += ")";
  return `offset-path: ${rayString};`;
};
var ray_default = ray;

// src/WTFCss/src/functions/rem.js
var rem = (value, rootValue = 16) => `rem(${value}, ${rootValue})`;
var rem_default = rem;

// src/WTFCss/src/functions/repeat.js
var repeat = (count, ...tracks) => {
  if (!Number.isInteger(count) && count !== "auto-fill" && count !== "auto-fit") {
    throw new TypeError("The repeat count must be an integer or one of the keywords: auto-fill, auto-fit.");
  }
  const trackList = tracks.map((track) => {
    if (Array.isArray(track)) {
      return `[${track.join(" ")}]`;
    }
    return track;
  }).join(" ");
  return `repeat(${count}, ${trackList})`;
};
var repeat_default = repeat;

// src/WTFCss/src/functions/round.js
var round = (value, precision = 0) => `round(${value}, ${precision})`;
var round_default = round;

// src/WTFCss/src/functions/sign.js
var sign = (value) => `sign(${value})`;
var sign_default = sign;

// src/WTFCss/src/functions/sin.js
var sin = (value) => `sin(${value})`;
var sin_default = sin;

// src/WTFCss/src/functions/sqrt.js
var sqrt = (value) => `sqrt(${value})`;
var sqrt_default = sqrt;

// src/WTFCss/src/functions/symbols.js
var symbols = (type, ...values) => {
  const validTypes = ["cyclic", "numeric", "alphabetic", "symbolic", "fixed"];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid symbols type: ${type}. Expected one of ${validTypes.join(", ")}.`);
  }
  const formattedValues = values.map((value) => {
    if (typeof value === "string") {
      return `"${value}"`;
    } else if (value instanceof Image) {
      return value.toString();
    }
    throw new Error("Invalid value type: values must be strings or Image instances.");
  }).join(" ");
  return `symbols(${type} ${formattedValues})`;
};
var symbols_default = symbols;

// src/WTFCss/src/functions/tan.js
var tan = (value) => `tan(${value})`;
var tan_default = tan;

// src/WTFCss/src/functions/url.js
var url = (path2) => {
  if (typeof path2 !== "string") {
    throw new Error("URL must be a string.");
  }
  const isDataUrl = path2.startsWith("data:");
  const isAbsoluteUrl = /^(?:[a-z]+:)?\/\//i.test(path2);
  const isRelativeUrl = !isDataUrl && !isAbsoluteUrl;
  const needsQuotes = /[\s'"()]/.test(path2);
  const quotedPath = needsQuotes ? `"${path2}"` : path2;
  return `url(${quotedPath})`;
};
var url_default = url;

// src/WTFCss/src/functions/var.js
var cssVar = (name, fallback) => {
  if (typeof name !== "string") {
    throw new Error("The custom property name must be a string.");
  }
  if (fallback !== void 0 && typeof fallback !== "string") {
    throw new Error("The fallback value must be a string.");
  }
  return `var(${name}${fallback !== void 0 ? `, ${fallback}` : ""})`;
};
var var_default = cssVar;

// src/WTFCss/src/functions/index.js
var functions_default = {
  abs: abs_default,
  acos: acos_default,
  asin: asin_default,
  atan: atan_default,
  atan2: atan2_default,
  attr: attr_default,
  calc: calc_default,
  clamp: clamp_default,
  cos: cos_default,
  counter: counter_default,
  counters: counters_default,
  crossfade: crossfade_default,
  element: element_default,
  env: env_default,
  exp: exp_default,
  fitcontent: fitcontent_default,
  hypot: hypot_default,
  log: log_default,
  max: max_default,
  min: min_default,
  minmax: minmax_default,
  mod: mod_default,
  path: path_default,
  pow: pow_default,
  ray: ray_default,
  rem: rem_default,
  repeat: repeat_default,
  round: round_default,
  sign: sign_default,
  sin: sin_default,
  sqrt: sqrt_default,
  symbols: symbols_default,
  tan: tan_default,
  url: url_default,
  cssVar: var_default
};

// src/WTFCss/src/handles/or.gate.js
var orGate = (a, b) => {
  const AoverB = (a2, b2) => calc_default(`min(1, max(${a2} - ${b2}, 0))`);
  const BoverA = (a2, b2) => calc_default(`(1 - ${AoverB(a2, b2)})`);
  return [
    `${BoverA(b, a)} * ${a} + ${AoverB(a, b)} * ${b}`,
    // True if either a or b is true
    `${AoverB(a, b)} * ${a} + ${BoverA(b, a)} * ${b}`
    // True if both a and b are true
  ];
};
var or_gate_default = orGate;

// src/WTFCss/src/handles/index.js
var handles_default = {
  orGate: or_gate_default
};

// src/WTFCss/src/magic/rootManipulate.js
var Anoop = async () => {
};
var getRoot = (_) => document.documentElement;
var getRootStyle = (_) => window.getComputedStyle(getRoot());
var getRootStyleProperty = (property) => getRootStyle().getPropertyValue(property);
var getRootStylePropertyWithFallback = async (property, fallbackFn = Anoop) => {
  let rs = getRootStyle();
  return rs.getPropertyValue(property) || await fallbackFn(rs);
};
var setRootProp = (property, value) => {
  const root = getRoot();
  root.style.setProperty(property, value);
};
var deleteRootProp = (property) => {
  const root = getRoot();
  root.style.removeProperty(property);
};
var setRootVar = (property, value) => {
  setRootProp(`--${property}`, value);
};
var deleteRootVar = (property) => {
  deleteRootProp(`--${property}`);
};
var getRootVar = (property) => getRootStyleProperty(`--${property}`);
var setCSSProp = (element2, property, value) => window.getComputedStyle(element2).setProperty(property, value);
var deleteCSSProp = (element2, property) => window.getComputedStyle(element2).removeProperty(property);
var getCSSProp = (element2, property) => window.getComputedStyle(element2).getPropertyValue(property);
var getCSSVar = (element2, property) => getCSSProp(element2, `--${property}`);
var setCSSVar = (element2, property, value) => setCSSProp(element2, `--${property}`, value);
var deleteCSSVar = (element2, property) => deleteCSSProp(element2, `--${property}`);
var runningCSS_Evals = 0;
var evalCSSProp = (css) => {
  const name = "eval-css-" + runningCSS_Evals;
  ++runningCSS_Evals;
  setRootVar(name, css);
  let res = getRootVar(name);
  --runningCSS_Evals;
  deleteRootVar(name);
  return res;
};
var evalCSSHard = (rule, css) => CSSStyleValue.parse(rule, css);
var createCounter = (element2, property, var_) => {
  element2.style.setProperty(property, `counter(${var_})`);
  element2.style.setProperty("counter-reset", `${var_} ${cssVar(var_)}`);
  return element2.style.getPropertyValue(property);
};
var createProperty = (name, data = {}, inherits = false) => {
  let isFF = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  if (!isFF) {
    CSS.registerProperty({
      name,
      syntax: data?.syntax || "<color>",
      inherits: inherits || false,
      initialValue: data?.initialValue || "#c0ffee"
    });
  } else {
    setRootVar(name, data?.initialValue || "#c0ffee");
  }
};
var rootManipulate_default = {
  getRoot,
  getRootStyle,
  getRootStyleProperty,
  getRootStylePropertyWithFallback,
  setRootProp,
  deleteRootProp,
  setRootVar,
  deleteRootVar,
  getRootVar,
  setCSSProp,
  deleteCSSProp,
  getCSSProp,
  getCSSVar,
  setCSSVar,
  deleteCSSVar,
  evalCSSProp,
  evalCSSHard,
  createProperty,
  createCounter
};

// src/WTFCss/src/magic/index.js
var magic_default = {
  rootManipulate: rootManipulate_default
};

// src/WTFCss/src/core/stylesheet.js
var WTFStylesheet = class _WTFStylesheet {
  /**
   * Reference to the helpers module.
   */
  static helpers = helpers_default;
  /**
   * Reference to the keywords module.
   */
  static keywords = keywords_default;
  /**
   * Reference to the functions module.
   */
  static functions = functions_default;
  /**
   * Reference to the handles module.
   */
  static handles = handles_default;
  /**
   * Reference to the magic module.
   */
  static magic = magic_default;
  /**
   * Instance reference to the helpers module.
   */
  helpers = helpers_default;
  /**
   * Instance reference to the keywords module.
   */
  keywords = keywords_default;
  /**
   * Instance reference to the functions module.
   */
  functions = functions_default;
  /**
   * Instance reference to the handles module.
   */
  handles = handles_default;
  /**
   * Instance reference to the magic module.
   */
  magic = magic_default;
  /**
   * Static counter for unique identifier.
   */
  static count = 0;
  /**
   * Unique identifier for the stylesheet instance.
   */
  id = ++_WTFStylesheet.count;
  /**
   * Collection of CSS rules.
   */
  rules = [];
  /**
   * Reference to the browser's CSS object.
   */
  CSS = window.CSS;
  /**
   * Creates an instance of WTFStylesheet.
   * @param {Document} document - The document in which the stylesheet will be created.
   */
  constructor(document2) {
    this.document = document2;
  }
  /**
   * Adds a CSS rule to the stylesheet.
   * @param {string} selector - The CSS selector for the rule.
   * @param {Object} declarations - The CSS declarations for the rule.
   * @param {number} [index] - The position at which to insert the rule.
   */
  addRule(selector, declarations, index) {
    if (index === void 0) {
      index = this.rules.length;
    }
    this.rules.splice(index, 0, {
      selector,
      declarations
    });
  }
  // ---
  /**
   * Creates or retrieves the style element for the stylesheet.
   * @return {HTMLStyleElement} The style element.
   */
  createStylesheet() {
    if (!this.stylesheet) {
      this.stylesheet = this.document.createElement("style");
    }
    return this.stylesheet;
  }
  isInDocument() {
    return this.document.contains(this.stylesheet);
  }
  /**
   * Retrieves the CSSStyleSheet object associated with a given DOM element or rule.
   * @param {HTMLElement|CSSRule} object - The DOM element or CSS rule to get the stylesheet from.
   * @throws {Error} Throws an error if the object type is unsupported.
   * @return {CSSStyleSheet|null} The associated CSSStyleSheet object, or null if not found.
   */
  getSheet(object) {
    switch (true) {
      case object instanceof HTMLLinkElement:
      case object instanceof HTMLStyleElement:
      case object instanceof SVGStyleElement:
      case (object instanceof ProcessingInstruction && object.target === "xml-stylesheet"):
        return object.sheet;
      case object instanceof CSSImportRule:
        return object.styleSheet;
      default:
        throw new Error("Unsupported owner object for getting CSSStyleSheet.");
    }
  }
  deleteLastRule() {
    let ss = this.createStylesheet();
    let s_ = this.getSheet(ss);
    let rules = s_.cssRules;
    let lastRule = rules[rules.length - 1];
    s_.deleteRule(lastRule.index);
  }
  /**
   * Compiles the stylesheet into a style element.
   */
  compile() {
    let ss = this.createStylesheet();
    let s_ = this.getSheet(ss);
    style.setAttribute("type", "text/css");
    let css = this.CSS;
    let allRules = this.rules.map((rule) => {
      const { selector, declarations } = rule;
      declarations.map(([key, value]) => {
        let ruleString = `${key}: ${value}${value?.[1] ? " !important" : ""}`;
        let style2 = `${selector} { ${ruleString} }`;
        s_.insertRule(style2, s_.cssRules.length);
        return style2;
      });
      return {
        [selector]: declarations
      };
    });
    if (!this.isInDocument()) {
      this.document.head.appendChild(style);
    }
    return allRules;
  }
};
var stylesheet_default = WTFStylesheet;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvY29yZS9zdHlsZXNoZWV0LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGNoYXJzZXQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY29sb3Jwcm9maWxlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGNvbnRhaW5lci5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bwcm9wZXJ0eS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bjb3VudGVyc3R5bGUuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udGZhY2UuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udGZlYXR1cmV2YWx1ZXMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udHBhbGxldGV2YWx1ZXMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AaW1wb3J0LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGtleWZyYW1lcy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BsYXllci5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BtZWRpYS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BuYW1lc3BhY2UuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AcGFnZS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BzdGFydGluZ3N0eWxlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQHN1cHBvcnRzLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvaW5kZXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMva2V5d29yZHMvdHlwZXMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMva2V5d29yZHMvaW1wb3J0YW50LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2tleXdvcmRzL2luZGV4LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9hYnMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Fjb3MuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2FzaW4uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2F0YW4uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2F0YW4yLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9hdHRyLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jYWxjLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jbGFtcC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvY29zLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jb3VudGVyLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jb3VudGVycy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvY3Jvc3NmYWRlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9lbGVtZW50LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9lbnYuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2V4cC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvZml0Y29udGVudC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvaHlwb3QuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2xvZy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbWF4LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9taW4uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL21pbm1heC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbW9kLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9wYXRoLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9wb3cuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JheS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcmVtLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9yZXBlYXQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JvdW5kLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9zaWduLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9zaW4uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3NxcnQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3N5bWJvbHMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Rhbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvdXJsLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy92YXIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2luZGV4LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hhbmRsZXMvb3IuZ2F0ZS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oYW5kbGVzL2luZGV4LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL21hZ2ljL3Jvb3RNYW5pcHVsYXRlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL21hZ2ljL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgaGVscGVycyBmcm9tICcuLi9oZWxwZXJzL2luZGV4LmpzJztcbmltcG9ydCBrZXl3b3JkcyBmcm9tICcuLi9rZXl3b3Jkcy9pbmRleC5qcyc7XG5pbXBvcnQgZnVuY3Rpb25zIGZyb20gJy4uL2Z1bmN0aW9ucy9pbmRleC5qcyc7XG5pbXBvcnQgaGFuZGxlcyBmcm9tICcuLi9oYW5kbGVzL2luZGV4LmpzJztcbmltcG9ydCBtYWdpYyBmcm9tICcuLi9tYWdpYy9pbmRleC5qcyc7XG5cbmNsYXNzIFdURlN0eWxlc2hlZXQge1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhlbHBlcnMgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGhlbHBlcnMgPSBoZWxwZXJzO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGtleXdvcmRzIG1vZHVsZS5cbiAgICovXG4gIHN0YXRpYyBrZXl3b3JkcyA9IGtleXdvcmRzO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGZ1bmN0aW9ucyBtb2R1bGUuXG4gICAqL1xuICBzdGF0aWMgZnVuY3Rpb25zID0gZnVuY3Rpb25zO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhhbmRsZXMgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGhhbmRsZXMgPSBoYW5kbGVzO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIG1hZ2ljIG1vZHVsZS5cbiAgICovXG4gIHN0YXRpYyBtYWdpYyA9IG1hZ2ljO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSByZWZlcmVuY2UgdG8gdGhlIGhlbHBlcnMgbW9kdWxlLlxuICAgKi9cbiAgaGVscGVycyA9IGhlbHBlcnM7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIHJlZmVyZW5jZSB0byB0aGUga2V5d29yZHMgbW9kdWxlLlxuICAgKi9cbiAga2V5d29yZHMgPSBrZXl3b3JkcztcblxuICAvKipcbiAgICogSW5zdGFuY2UgcmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbnMgbW9kdWxlLlxuICAgKi9cbiAgZnVuY3Rpb25zID0gZnVuY3Rpb25zO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSByZWZlcmVuY2UgdG8gdGhlIGhhbmRsZXMgbW9kdWxlLlxuICAgKi9cbiAgaGFuZGxlcyA9IGhhbmRsZXM7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIHJlZmVyZW5jZSB0byB0aGUgbWFnaWMgbW9kdWxlLlxuICAgKi9cbiAgbWFnaWMgPSBtYWdpYztcblxuICAvKipcbiAgICogU3RhdGljIGNvdW50ZXIgZm9yIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgKi9cbiAgc3RhdGljIGNvdW50ID0gMDtcblxuICAvKipcbiAgICogVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBzdHlsZXNoZWV0IGluc3RhbmNlLlxuICAgKi9cbiAgaWQgPSArK1dURlN0eWxlc2hlZXQuY291bnQ7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgQ1NTIHJ1bGVzLlxuICAgKi9cbiAgcnVsZXMgPSBbXTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBicm93c2VyJ3MgQ1NTIG9iamVjdC5cbiAgICovXG4gIENTUyA9IHdpbmRvdy5DU1M7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV1RGU3R5bGVzaGVldC5cbiAgICogQHBhcmFtIHtEb2N1bWVudH0gZG9jdW1lbnQgLSBUaGUgZG9jdW1lbnQgaW4gd2hpY2ggdGhlIHN0eWxlc2hlZXQgd2lsbCBiZSBjcmVhdGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIENTUyBydWxlIHRvIHRoZSBzdHlsZXNoZWV0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcnVsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRlY2xhcmF0aW9ucyAtIFRoZSBDU1MgZGVjbGFyYXRpb25zIGZvciB0aGUgcnVsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleF0gLSBUaGUgcG9zaXRpb24gYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBydWxlLlxuICAgKi9cbiAgYWRkUnVsZShzZWxlY3RvciwgZGVjbGFyYXRpb25zLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbmRleCA9IHRoaXMucnVsZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMucnVsZXMuc3BsaWNlKGluZGV4LCAwLCB7XG4gICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIC0tLVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG9yIHJldHJpZXZlcyB0aGUgc3R5bGUgZWxlbWVudCBmb3IgdGhlIHN0eWxlc2hlZXQuXG4gICAqIEByZXR1cm4ge0hUTUxTdHlsZUVsZW1lbnR9IFRoZSBzdHlsZSBlbGVtZW50LlxuICAgKi9cbiAgY3JlYXRlU3R5bGVzaGVldCgpIHtcbiAgICBpZiAoIXRoaXMuc3R5bGVzaGVldCkge1xuICAgICAgdGhpcy5zdHlsZXNoZWV0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG4gIH1cblxuICBpc0luRG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuY29udGFpbnModGhpcy5zdHlsZXNoZWV0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIENTU1N0eWxlU2hlZXQgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIERPTSBlbGVtZW50IG9yIHJ1bGUuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8Q1NTUnVsZX0gb2JqZWN0IC0gVGhlIERPTSBlbGVtZW50IG9yIENTUyBydWxlIHRvIGdldCB0aGUgc3R5bGVzaGVldCBmcm9tLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBvYmplY3QgdHlwZSBpcyB1bnN1cHBvcnRlZC5cbiAgICogQHJldHVybiB7Q1NTU3R5bGVTaGVldHxudWxsfSBUaGUgYXNzb2NpYXRlZCBDU1NTdHlsZVNoZWV0IG9iamVjdCwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAqL1xuICBnZXRTaGVldChvYmplY3QpIHtcbiAgICAvLyBHZXQgdGhlIENTU1N0eWxlU2hlZXQgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgb3duZXIgZWxlbWVudCBvciBydWxlXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG9iamVjdCBpbnN0YW5jZW9mIEhUTUxMaW5rRWxlbWVudDpcbiAgICAgIGNhc2Ugb2JqZWN0IGluc3RhbmNlb2YgSFRNTFN0eWxlRWxlbWVudDpcbiAgICAgIGNhc2Ugb2JqZWN0IGluc3RhbmNlb2YgU1ZHU3R5bGVFbGVtZW50OlxuICAgICAgY2FzZSBvYmplY3QgaW5zdGFuY2VvZiBQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gJiYgb2JqZWN0LnRhcmdldCA9PT0gJ3htbC1zdHlsZXNoZWV0JzpcbiAgICAgICAgcmV0dXJuIG9iamVjdC5zaGVldDtcblxuICAgICAgY2FzZSBvYmplY3QgaW5zdGFuY2VvZiBDU1NJbXBvcnRSdWxlOlxuICAgICAgICByZXR1cm4gb2JqZWN0LnN0eWxlU2hlZXQ7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgb3duZXIgb2JqZWN0IGZvciBnZXR0aW5nIENTU1N0eWxlU2hlZXQuJyk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlTGFzdFJ1bGUoKSB7XG4gICAgbGV0IHNzID0gdGhpcy5jcmVhdGVTdHlsZXNoZWV0KCk7XG4gICAgbGV0IHNfID0gdGhpcy5nZXRTaGVldChzcyk7XG4gICAgbGV0IHJ1bGVzID0gc18uY3NzUnVsZXM7XG4gICAgbGV0IGxhc3RSdWxlID0gcnVsZXNbcnVsZXMubGVuZ3RoIC0gMV07XG4gICAgc18uZGVsZXRlUnVsZShsYXN0UnVsZS5pbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZXMgdGhlIHN0eWxlc2hlZXQgaW50byBhIHN0eWxlIGVsZW1lbnQuXG4gICAqL1xuICBjb21waWxlKCkge1xuICAgIGxldCBzcyA9IHRoaXMuY3JlYXRlU3R5bGVzaGVldCgpO1xuICAgIGxldCBzXyA9IHRoaXMuZ2V0U2hlZXQoc3MpO1xuXG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICBsZXQgY3NzID0gdGhpcy5DU1M7XG5cbiAgICAvLyBBZGQgdGhlIENTUyBydWxlc1xuICAgIGxldCBhbGxSdWxlcyA9IHRoaXMucnVsZXMubWFwKHJ1bGUgPT4ge1xuICAgICAgY29uc3QgeyBzZWxlY3RvciwgZGVjbGFyYXRpb25zIH0gPSBydWxlO1xuXG4gICAgICBkZWNsYXJhdGlvbnMubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgbGV0IHJ1bGVTdHJpbmcgPSBgJHtrZXl9OiAke3ZhbHVlfSR7dmFsdWU/LlsxXSA/ICcgIWltcG9ydGFudCcgOiAnJ31gO1xuICAgICAgICBsZXQgc3R5bGUgPSBgJHtzZWxlY3Rvcn0geyAke3J1bGVTdHJpbmd9IH1gXG4gICAgICAgIHNfLmluc2VydFJ1bGUoc3R5bGUsIHNfLmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBbc2VsZWN0b3JdOiBkZWNsYXJhdGlvbnMsXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghdGhpcy5pc0luRG9jdW1lbnQoKSkge1xuICAgICAgdGhpcy5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxsUnVsZXM7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXVEZTdHlsZXNoZWV0IiwgIi8qKlxuICogRGVmaW5lcyBhIGNoYXJzZXQgZm9yIGEgQ1NTIGZpbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNoYXJzZXRWYWx1ZSAtIFRoZSBjaGFyc2V0IHRvIGJlIHNldCBmb3IgdGhlIENTUyBmaWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAY2hhcnNldCBydWxlLlxuICovXG5leHBvcnQgY29uc3QgY2hhcnNldCA9IGNoYXJzZXRWYWx1ZSA9PiBgQGNoYXJzZXQgXCIke2NoYXJzZXRWYWx1ZX1cIjtgXG5leHBvcnQgZGVmYXVsdCBjaGFyc2V0OyIsICIvKipcbiAqIERlZmluZXMgYSBjb2xvciBwcm9maWxlIGZvciB1c2UgaW4gQ1NTLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY29sb3IgcHJvZmlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgLSBUaGUgVVJMIG9mIHRoZSBjb2xvciBwcm9maWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtyZW5kZXJpbmdJbnRlbnRdIC0gVGhlIHJlbmRlcmluZyBpbnRlbnQgdG8gdXNlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lQ29sb3JQcm9maWxlID0gKG5hbWUsIHNyYywgcmVuZGVyaW5nSW50ZW50KSA9PiB7XG4gIGxldCBwcm9maWxlUnVsZSA9IGBAY29sb3ItcHJvZmlsZSAke25hbWV9IHtcXG4gIHNyYzogdXJsKFxcXCIke3NyY31cXFwiKWA7XG5cbiAgaWYgKHJlbmRlcmluZ0ludGVudCkge1xuICAgIHByb2ZpbGVSdWxlICs9IGA7XFxuICByZW5kZXJpbmctaW50ZW50OiAke3JlbmRlcmluZ0ludGVudH1gO1xuICB9XG5cbiAgcHJvZmlsZVJ1bGUgKz0gJztcXG59JztcblxuICByZXR1cm4gcHJvZmlsZVJ1bGU7XG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb2xvclByb2ZpbGUiLCAiLyoqXG4gKiBBcHBsaWVzIHN0eWxlcyB0byBhIGNvbnRhaW5tZW50IGNvbnRleHQgYmFzZWQgb24gYSBjb25kaXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZGl0aW9uIC0gVGhlIGNvbnRhaW5lciBxdWVyeSBjb25kaXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3R5bGVzIC0gVGhlIENTUyBzdHlsZXMgdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGNvbnRhaW5lciBydWxlLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlDb250YWluZXJTdHlsZXMgPSAobmFtZSwgY29uZGl0aW9uLCBzdHlsZXMpID0+IHtcbiAgbGV0IGNvbnRhaW5lclJ1bGUgPSBgQGNvbnRhaW5lciAke25hbWUgPyBuYW1lICsgJyAnIDogJyd9KCR7Y29uZGl0aW9ufSkge1xcbiR7c3R5bGVzfVxcbn1gO1xuICByZXR1cm4gY29udGFpbmVyUnVsZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGFwcGx5Q29udGFpbmVyU3R5bGVzIiwgIi8qKlxuICogUmVnaXN0ZXJzIGEgY3VzdG9tIENTUyBwcm9wZXJ0eSB1c2luZyB0aGUgQHByb3BlcnR5IHJ1bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjdXN0b20gcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ludGF4IC0gRGVzY3JpYmVzIHRoZSBhbGxvd2FibGUgc3ludGF4IGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRzIC0gQ29udHJvbHMgd2hldGhlciB0aGUgY3VzdG9tIHByb3BlcnR5IGluaGVyaXRzIGJ5IGRlZmF1bHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5pdGlhbFZhbHVlIC0gU2V0cyB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIGZvcm1hdHRlZCBAcHJvcGVydHkgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyUHJvcGVydHkgPSAobmFtZSwgc3ludGF4LCBpbmhlcml0cywgaW5pdGlhbFZhbHVlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgW2BAcHJvcGVydHkgJHtuYW1lfWBdOiAoXG4gICAgICBcInsgXCIgK1xuICAgICAgKCFzeW50YXggPz8gYHN5bnRheDogXCIke3N5bnRheH1cIjsgYCkgK1xuICAgICAgKCFpbmhlcml0cyA/PyBgaW5oZXJpdHM6ICR7aW5oZXJpdHN9OyBgKSArXG4gICAgICAoIWluaXRpYWxWYWx1ZSA/PyBgaW5pdGlhbC12YWx1ZTogJHtpbml0aWFsVmFsdWV9O2ApICtcbiAgICAgIFwiIH1cIlxuICAgIClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJQcm9wZXJ0eSIsICIvKipcbiAqIERlZmluZXMgYSBjdXN0b20gY291bnRlciBzdHlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIgc3R5bGUuXG4gKiBAcGFyYW0ge29iamVjdH0gcnVsZXMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgZGVzY3JpcHRvcnMgYW5kIHZhbHVlcyBmb3IgdGhlIHN0eWxlLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBuYW1lIGlzIG9uZSBvZiB0aGUgcmVzZXJ2ZWQgc3R5bGUgbmFtZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBjb3VudGVyLXN0eWxlIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVDb3VudGVyU3R5bGUgPSAobmFtZSwgcnVsZXMpID0+IHtcbiAgaWYgKFsnZGVjaW1hbCcsICdkaXNjJywgJ3NxdWFyZScsICdjaXJjbGUnLCAnZGlzY2xvc3VyZS1vcGVuJywgJ2Rpc2Nsb3N1cmUtY2xvc2VkJ10uaW5jbHVkZXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIG5hbWUgXCIke25hbWV9XCIgaXMgbm90IGFsbG93ZWQgZm9yIGN1c3RvbSBjb3VudGVyIHN0eWxlcy5gKTtcbiAgfVxuXG4gIGNvbnN0IHJ1bGVFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocnVsZXMpLm1hcCgoW2Rlc2NyaXB0b3IsIHZhbHVlXSkgPT4ge1xuICAgIGlmIChkZXNjcmlwdG9yID09PSAnc3ltYm9scycgfHwgZGVzY3JpcHRvciA9PT0gJ2FkZGl0aXZlLXN5bWJvbHMnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLm1hcChzeW1ib2wgPT4gYFxcXCIke3N5bWJvbH1cXFwiYCkuam9pbignICcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7ZGVzY3JpcHRvcn06ICR7dmFsdWV9YDtcbiAgfSk7XG4gIGNvbnN0IHJ1bGVTdHJpbmcgPSBydWxlRW50cmllcy5qb2luKCc7ICcpO1xuICBjb25zdCBjb3VudGVyUnVsZSA9IGBAY291bnRlci1zdHlsZSAke25hbWV9IHsgJHtydWxlU3RyaW5nfSB9YDtcblxuICByZXR1cm4gY291bnRlclJ1bGVcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvdW50ZXJTdHlsZSIsICIvKipcbiAqIENyZWF0ZXMgYSBDU1MgQGZvbnQtZmFjZSBydWxlIHN0cmluZy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBmb250RmFjZSAtIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGZvbnQgZmFjZSBjb25maWd1cmF0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1mYWNlIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVGb250RmFjZSA9IGZvbnRGYWNlID0+IHtcbiAgY29uc3QgZm9udEZhY2VSdWxlID0gYEBmb250LWZhY2Uge1xuICAgIGZvbnQtZmFtaWx5OiBcIiR7Zm9udEZhY2UuZmFtaWx5fVwiO1xuICAgIHNyYzogJHtmb250RmFjZS5zb3VyY2VzLm1hcChzb3VyY2UgPT4ge1xuICAgICAgaWYgKHNvdXJjZS51cmwpIHtcbiAgICAgICAgcmV0dXJuIGB1cmwoXCIke3NvdXJjZS51cmx9XCIpIGZvcm1hdChcIiR7c291cmNlLmZvcm1hdH1cIilgO1xuICAgICAgfSBlbHNlIGlmIChzb3VyY2UubG9jYWwpIHtcbiAgICAgICAgcmV0dXJuIGBsb2NhbChcIiR7c291cmNlLmxvY2FsfVwiKWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSkuam9pbignLFxcbiAgICAnKX07XG4gICAgJHtmb250RmFjZS5kZXNjcmlwdG9ycyA/IE9iamVjdC5lbnRyaWVzKGZvbnRGYWNlLmRlc2NyaXB0b3JzKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCR7a2V5fTogJHt2YWx1ZX1gKS5qb2luKCc7XFxuICAgICcpIDogJyd9XG4gIH1gO1xuXG4gIHJldHVybiBmb250RmFjZVJ1bGVcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVGb250RmFjZSIsICIvKipcbiAqIERlZmluZXMgZm9udCBmZWF0dXJlIHZhbHVlcyBmb3IgYSBnaXZlbiBmb250IGZhbWlseS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmYW1pbHlOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGZvbnQgZmFtaWx5LlxuICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmVWYWx1ZXMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgZmVhdHVyZSB0YWdzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGZvbnQtZmVhdHVyZS12YWx1ZXMgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUZvbnRGZWF0dXJlVmFsdWVzID0gKGZhbWlseU5hbWUsIGZlYXR1cmVWYWx1ZXMpID0+IHtcbiAgY29uc3QgZmVhdHVyZUJsb2NrcyA9IE9iamVjdC5lbnRyaWVzKGZlYXR1cmVWYWx1ZXMpLm1hcCgoW2ZlYXR1cmUsIHZhbHVlc10pID0+IHtcbiAgICBjb25zdCB2YWx1ZVN0cmluZyA9IEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcy5qb2luKCcgJykgOiB2YWx1ZXM7XG4gICAgcmV0dXJuIGBAJHtmZWF0dXJlfSB7ICR7ZmFtaWx5TmFtZX06ICR7dmFsdWVTdHJpbmd9OyB9YDtcbiAgfSkuam9pbignXFxuJyk7XG4gIHJldHVybiBgQGZvbnQtZmVhdHVyZS12YWx1ZXMgJHtmYW1pbHlOYW1lfSB7XFxuJHtmZWF0dXJlQmxvY2tzfVxcbn1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUZvbnRGZWF0dXJlVmFsdWVzIiwgIi8qKlxuICogRGVmaW5lcyBmb250IHBhbGV0dGUgdmFsdWVzIGZvciBhIGdpdmVuIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIFRoZSBpZGVudGlmaWVyIGZvciB0aGUgZm9udCBwYWxldHRlIHZhbHVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmFtaWx5TmFtZV0gLSBUaGUgbmFtZSBvZiB0aGUgZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Jhc2VQYWxldHRlXSAtIFRoZSBiYXNlIHBhbGV0dGUgb2YgdGhlIGZvbnQuXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PHN0cmluZz4+fSBbb3ZlcnJpZGVDb2xvcnNdIC0gQW4gYXJyYXkgb2YgY29sb3Igb3ZlcnJpZGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1wYWxldHRlLXZhbHVlcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udFBhbGV0dGVWYWx1ZXMgPSAoaWRlbnRpZmllciwgZmFtaWx5TmFtZSwgYmFzZVBhbGV0dGUsIG92ZXJyaWRlQ29sb3JzKSA9PiB7XG4gIGNvbnN0IGRlY2xhcmF0aW9ucyA9IFtdO1xuICBpZiAoZmFtaWx5TmFtZSkgZGVjbGFyYXRpb25zLnB1c2goYGZvbnQtZmFtaWx5OiAke2ZhbWlseU5hbWV9O2ApO1xuICBpZiAoYmFzZVBhbGV0dGUpIGRlY2xhcmF0aW9ucy5wdXNoKGBiYXNlLXBhbGV0dGU6ICR7YmFzZVBhbGV0dGV9O2ApO1xuICBpZiAob3ZlcnJpZGVDb2xvcnMpIHtcbiAgICBjb25zdCBjb2xvck92ZXJyaWRlcyA9IG92ZXJyaWRlQ29sb3JzLm1hcChjb2xvciA9PiBjb2xvci5qb2luKCcgJykpLmpvaW4oJyxcXG4gICAgJyk7XG4gICAgZGVjbGFyYXRpb25zLnB1c2goYG92ZXJyaWRlLWNvbG9yczpcXG4gICAgJHtjb2xvck92ZXJyaWRlc307YCk7XG4gIH1cblxuICByZXR1cm4gYEBmb250LXBhbGV0dGUtdmFsdWVzICR7aWRlbnRpZmllcn0ge1xcbiAgJHtkZWNsYXJhdGlvbnMuam9pbignXFxuICAnKX1cXG59YDtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUZvbnRQYWxldHRlVmFsdWVzIiwgIi8qKlxuICogQ3JlYXRlcyBhbiBAaW1wb3J0IHJ1bGUgd2l0aCBvcHRpb25hbCBjb25kaXRpb25zIGFuZCBsYXllci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpbXBvcnRQYXRoIC0gVGhlIFVSTCBvZiB0aGUgZmlsZSB0byBiZSBpbXBvcnRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbWVkaWFRdWVyaWVzXSAtIFRoZSBtZWRpYSBxdWVyeSBjb25kaXRpb25zLlxuICogQHBhcmFtIHtzdHJpbmd9IFtzdXBwb3J0c0NvbmRpdGlvbl0gLSBUaGUgc3VwcG9ydHMgY29uZGl0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IFtsYXllck5hbWVdIC0gVGhlIG5hbWUgb2YgdGhlIGxheWVyLlxuICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgY29tcGxldGUgQGltcG9ydCBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lSW1wb3J0ID0gKGltcG9ydFBhdGgsIG1lZGlhUXVlcmllcyA9ICcnLCBzdXBwb3J0c0NvbmRpdGlvbiA9ICcnLCBsYXllck5hbWUgPSAnJykgPT4ge1xuICBsZXQgaW1wb3J0UnVsZSA9IGBAaW1wb3J0IHVybCgke2ltcG9ydFBhdGh9KWA7XG5cbiAgaWYgKGxheWVyTmFtZSkge1xuICAgIGltcG9ydFJ1bGUgKz0gYCBsYXllcigke2xheWVyTmFtZX0pYDtcbiAgfVxuXG4gIGlmIChzdXBwb3J0c0NvbmRpdGlvbikge1xuICAgIGltcG9ydFJ1bGUgKz0gYCBzdXBwb3J0cygke3N1cHBvcnRzQ29uZGl0aW9ufSlgO1xuICB9XG5cbiAgaWYgKG1lZGlhUXVlcmllcykge1xuICAgIGltcG9ydFJ1bGUgKz0gYCAke21lZGlhUXVlcmllc31gO1xuICB9XG5cbiAgaW1wb3J0UnVsZSArPSAnOyc7XG5cbiAgcmV0dXJuIGltcG9ydFJ1bGU7XG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVJbXBvcnQiLCAiLyoqXG4gKiBEZWZpbmVzIGtleWZyYW1lIGFuaW1hdGlvbnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBhbmltYXRpb24uXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGZyYW1lcyAtIEFuIGFycmF5IG9mIG9iamVjdHMgcmVwcmVzZW50aW5nIHRoZSBrZXlmcmFtZXMuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBhcmd1bWVudHMgYXJlIG5vdCBhIHN0cmluZyBhbmQgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGtleWZyYW1lcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lS2V5ZnJhbWVzID0gKG5hbWUsIGZyYW1lcykgPT4ge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8ICFBcnJheS5pc0FycmF5KGZyYW1lcykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBmb3IgZGVmaW5lS2V5ZnJhbWVzLicpO1xuICB9XG5cbiAgY29uc3Qga2V5ZnJhbWVSdWxlcyA9IGZyYW1lcy5tYXAoZnJhbWUgPT4ge1xuICAgIGNvbnN0IG9mZnNldCA9IE9iamVjdC5rZXlzKGZyYW1lKVswXTtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmVudHJpZXMoZnJhbWVbb2Zmc2V0XSkubWFwKChbcHJvcCwgdmFsdWVdKSA9PiB7XG4gICAgICByZXR1cm4gYCR7cHJvcH06ICR7dmFsdWV9YDtcbiAgICB9KS5qb2luKCc7ICcpO1xuXG4gICAgcmV0dXJuIGAke29mZnNldH0geyAke3Byb3BlcnRpZXN9IH1gO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIGBAa2V5ZnJhbWVzICR7bmFtZX0geyAke2tleWZyYW1lUnVsZXN9IH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUtleWZyYW1lcyIsICIvKipcbiAqIERlZmluZXMgYSBDU1MgbGF5ZXIgYW5kIGl0cyBhc3NvY2lhdGVkIHN0eWxlIHJ1bGVzLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbGF5ZXIuXG4gKiBAcGFyYW0ge29iamVjdH0gcnVsZXMgLSBBbiBvYmplY3QgbWFwcGluZyBzZWxlY3RvcnMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBzdHlsZSBydWxlcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGFyZ3VtZW50cyBhcmUgbm90IGEgc3RyaW5nIGFuZCBhbiBvYmplY3Qgb2Ygc3R5bGUgcnVsZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBsYXllciBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lTGF5ZXIgPSAobmFtZSwgcnVsZXMpID0+IHtcbiAgaWYgKCFuYW1lIHx8IHR5cGVvZiBydWxlcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBmb3IgZGVmaW5lTGF5ZXIuJyk7XG4gIH1cblxuICBjb25zdCBsYXllclJ1bGVzID0gT2JqZWN0LmVudHJpZXMocnVsZXMpLm1hcCgoW3NlbGVjdG9yLCBzdHlsZVJ1bGVzXSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlU3RyaW5nID0gT2JqZWN0LmVudHJpZXMoc3R5bGVSdWxlcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4gYCR7cHJvcGVydHl9OiAke3ZhbHVlfTtgKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIGAke3NlbGVjdG9yfSB7ICR7c3R5bGVTdHJpbmd9IH1gO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIGBAbGF5ZXIgJHtuYW1lfSB7ICR7bGF5ZXJSdWxlc30gfWA7XG59O1xuXG5leHBvcnQgY29uc3QgZGVmaW5lTGF5ZXJPcmRlciA9ICguLi5uYW1lcykgPT4gKGBAbGF5ZXIgYCArIG5hbWVzLmpvaW4oJyAnKSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWZpbmVMYXllcixcbiAgZGVmaW5lTGF5ZXJPcmRlclxufSIsICIvKipcbiAqIERlZmluZXMgYSBDU1MgbWVkaWEgcXVlcnkgYW5kIGl0cyBhc3NvY2lhdGVkIHN0eWxlIHJ1bGVzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhUXVlcnkgLSBUaGUgbWVkaWEgcXVlcnkgc3RyaW5nLlxuICogQHBhcmFtIHtvYmplY3R9IHN0eWxlcyAtIEFuIG9iamVjdCBtYXBwaW5nIHNlbGVjdG9ycyB0byB0aGVpciByZXNwZWN0aXZlIHN0eWxlIHJ1bGVzLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgYXJndW1lbnRzIGFyZSBub3QgYSBzdHJpbmcgYW5kIGFuIG9iamVjdCBvZiBzdHlsZSBydWxlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQG1lZGlhIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVNZWRpYSA9IChtZWRpYVF1ZXJ5LCBzdHlsZXMpID0+IHtcbiAgaWYgKHR5cGVvZiBtZWRpYVF1ZXJ5ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2Ygc3R5bGVzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGZvciBkZWZpbmVNZWRpYS4nKTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlcykubWFwKChbc2VsZWN0b3IsIHN0eWxlUnVsZXNdKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVTdHJpbmcgPSBPYmplY3QuZW50cmllcyhzdHlsZVJ1bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2ApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gYCR7c2VsZWN0b3J9IHsgJHtzdHlsZVN0cmluZ30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBtZWRpYSAke21lZGlhUXVlcnl9IHsgJHtzdHlsZUVudHJpZXN9IH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1lZGlhIiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBuYW1lc3BhY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ByZWZpeF0gLSBUaGUgb3B0aW9uYWwgcHJlZml4IGZvciB0aGUgbmFtZXNwYWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaSAtIFRoZSBVUkkgb2YgdGhlIG5hbWVzcGFjZS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgVVJJIGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQG5hbWVzcGFjZSBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lTmFtZXNwYWNlID0gKHByZWZpeCwgdXJpKSA9PiB7XG4gIGlmICghdXJpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVUkkgZm9yIG5hbWVzcGFjZSBpcyByZXF1aXJlZC4nKTtcbiAgfVxuXG4gIGNvbnN0IG5hbWVzcGFjZVByZWZpeCA9IHByZWZpeCA/IGAke3ByZWZpeH0gYCA6ICcnO1xuICByZXR1cm4gYEBuYW1lc3BhY2UgJHtuYW1lc3BhY2VQcmVmaXh9dXJsKCR7dXJpfSk7YDtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVOYW1lc3BhY2UiLCAiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIEBwYWdlIHJ1bGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgc3R5bGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhZ2UgcnVsZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdHlsZXMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgQ1NTIHByb3BlcnRpZXMgYW5kIHZhbHVlcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgc3R5bGVzIGlzIG5vdCBhbiBvYmplY3QuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYSBwcm9wZXJ0eSBpcyBub3QgYWxsb3dlZCB3aXRoaW4gQHBhZ2UgcnVsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQHBhZ2UgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVBhZ2UgPSAobmFtZSwgc3R5bGVzKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3R5bGVzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0eWxlcyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4ge1xuICAgIGlmICghL15tYXJnaW4tfF5ib3JkZXItfF5wYWRkaW5nLXxeYmFja2dyb3VuZC18XmZvbnQtfF50ZXh0LXxeY29sb3IkfF5vdXRsaW5lJHxeY291bnRlci18XndpZHRoJHxeaGVpZ2h0JHxebGluZS1oZWlnaHQkfF5xdW90ZXMkfF52aXNpYmlsaXR5JC8udGVzdChwcm9wZXJ0eSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgXCIke3Byb3BlcnR5fVwiIGlzIG5vdCBhbGxvd2VkIHdpdGhpbiBAcGFnZSBydWxlLmApO1xuICAgIH1cbiAgICByZXR1cm4gYCR7cHJvcGVydHl9OiAke3ZhbHVlfTtgO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgY29uc3QgcGFnZVJ1bGUgPSBgQHBhZ2UgJHtuYW1lfSB7ICR7c3R5bGVFbnRyaWVzfSB9YDtcblxuICByZXR1cm4gcGFnZVJ1bGU7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUGFnZTsiLCAiLyoqXG4gKiBEZWZpbmVzIGEgc3RhcnRpbmcgc3R5bGUgZm9yIGEgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgQ1NTIHNlbGVjdG9yIHRvIHdoaWNoIHRoZSBzdGFydGluZyBzdHlsZSB3aWxsIGJlIGFwcGxpZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcGVydGllcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBDU1MgcHJvcGVydGllcyBhbmQgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAc3RhcnRpbmctc3R5bGUgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVN0YXJ0aW5nU3R5bGUgPSAoc2VsZWN0b3IsIHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgcHJvcGVydHlFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocHJvcGVydGllcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4ge1xuICAgIHJldHVybiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2A7XG4gIH0pLmpvaW4oJyAnKTtcblxuICBjb25zdCBzdGFydGluZ1N0eWxlUnVsZSA9IGBAc3RhcnRpbmctc3R5bGUge1xcbiAgJHtzZWxlY3Rvcn0geyAke3Byb3BlcnR5RW50cmllc30gfVxcbn1gO1xuXG4gIHJldHVybiBzdGFydGluZ1N0eWxlUnVsZTtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVTdGFydGluZ1N0eWxlOyIsICIvKipcbiAqIERlZmluZXMgYSBDU1MgQHN1cHBvcnRzIHJ1bGUuXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHN1cHBvcnRzQ29uZGl0aW9uIC0gQW4gYXJyYXkgb2YgY29uZGl0aW9ucyB0aGF0IHRoZSBicm93c2VyIG11c3Qgc3VwcG9ydC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBydWxlcyAtIEFuIG9iamVjdCBtYXBwaW5nIHNlbGVjdG9ycyB0byB0aGVpciByZXNwZWN0aXZlIHN0eWxlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBzdXBwb3J0cyBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lU3VwcG9ydHMgPSAoc3VwcG9ydHNDb25kaXRpb24sIHJ1bGVzKSA9PiB7XG4gIGNvbnN0IGNvbmRpdGlvblN0cmluZyA9IHN1cHBvcnRzQ29uZGl0aW9uLm1hcChjb25kaXRpb24gPT4gYCgke2NvbmRpdGlvbn0pYCkuam9pbignIGFuZCAnKTtcbiAgY29uc3QgcnVsZXNTdHJpbmcgPSBPYmplY3QuZW50cmllcyhydWxlcykubWFwKChbc2VsZWN0b3IsIHN0eWxlc10pID0+IHtcbiAgICBjb25zdCBzdHlsZVN0cmluZyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4gYCR7cHJvcGVydHl9OiAke3ZhbHVlfTtgKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIGAke3NlbGVjdG9yfSB7ICR7c3R5bGVTdHJpbmd9IH1gO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIGBAc3VwcG9ydHMgJHtjb25kaXRpb25TdHJpbmd9IHsgJHtydWxlc1N0cmluZ30gfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lU3VwcG9ydHM7IiwgImltcG9ydCBjaGFyc2V0cyBmcm9tICcuL0BjaGFyc2V0LmpzJztcbmltcG9ydCBjb2xvclByb2ZpbGVzIGZyb20gJy4vQGNvbG9ycHJvZmlsZS5qcyc7XG5pbXBvcnQgY29udGFpbmVyIGZyb20gJy4vQGNvbnRhaW5lci5qcyc7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAnLi9AcHJvcGVydHkuanMnO1xuaW1wb3J0IGNvdW50ZXJTdHlsZXMgZnJvbSAnLi9AY291bnRlcnN0eWxlLmpzJztcbmltcG9ydCBmb250RmFjZXMgZnJvbSAnLi9AZm9udGZhY2UuanMnO1xuaW1wb3J0IGZvbnRGZWF0dXJlVmFsdWVzIGZyb20gJy4vQGZvbnRmZWF0dXJldmFsdWVzLmpzJztcbmltcG9ydCBmb250UGFsZXR0ZVZhbHVlcyBmcm9tICcuL0Bmb250cGFsbGV0ZXZhbHVlcy5qcyc7XG5pbXBvcnQgaW1wb3J0ZXIgZnJvbSAnLi9AaW1wb3J0LmpzJztcbmltcG9ydCBrZXlmcmFtZXMgZnJvbSAnLi9Aa2V5ZnJhbWVzLmpzJztcbmltcG9ydCBsYXllciBmcm9tICcuL0BsYXllci5qcyc7XG5pbXBvcnQgbWVkaWEgZnJvbSAnLi9AbWVkaWEuanMnO1xuaW1wb3J0IG5hbWVzcGFjZSBmcm9tICcuL0BuYW1lc3BhY2UuanMnO1xuaW1wb3J0IHBhZ2VzIGZyb20gJy4vQHBhZ2UuanMnO1xuaW1wb3J0IHN0YXJ0aW5nU3R5bGVzIGZyb20gJy4vQHN0YXJ0aW5nc3R5bGUuanMnO1xuaW1wb3J0IHN1cHBvcnRzIGZyb20gJy4vQHN1cHBvcnRzLmpzJztcblxuZXhwb3J0IHtcbiAgY2hhcnNldHMsXG4gIGNvbG9yUHJvZmlsZXMsXG4gIGNvbnRhaW5lcixcbiAgcHJvcGVydHksXG4gIGNvdW50ZXJTdHlsZXMsXG4gIGZvbnRGYWNlcyxcbiAgZm9udEZlYXR1cmVWYWx1ZXMsXG4gIGZvbnRQYWxldHRlVmFsdWVzLFxuICBpbXBvcnRlcixcbiAga2V5ZnJhbWVzLFxuICBsYXllcixcbiAgbWVkaWEsXG4gIG5hbWVzcGFjZSxcbiAgcGFnZXMsXG4gIHN0YXJ0aW5nU3R5bGVzLFxuICBzdXBwb3J0cyxcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjaGFyc2V0cyxcbiAgY29sb3JQcm9maWxlcyxcbiAgY29udGFpbmVyLFxuICBwcm9wZXJ0eSxcbiAgY291bnRlclN0eWxlcyxcbiAgZm9udEZhY2VzLFxuICBmb250RmVhdHVyZVZhbHVlcyxcbiAgZm9udFBhbGV0dGVWYWx1ZXMsXG4gIGltcG9ydGVyLFxuICBrZXlmcmFtZXMsXG4gIGxheWVyLFxuICBtZWRpYSxcbiAgbmFtZXNwYWNlLFxuICBwYWdlcyxcbiAgc3RhcnRpbmdTdHlsZXMsXG4gIHN1cHBvcnRzLFxufSIsICIvKipcbiAqIFJldHJpZXZlcyB0aGUgY29ycmVzcG9uZGluZyBrZXl3b3JkIGZvciBhIGdpdmVuIHBhcmFtZXRlci5cbiAqIElmIHRoZSBrZXl3b3JkIGlzIGRlcHJlY2F0ZWQgb3IgdW5rbm93biwgYSB3YXJuaW5nIG9yIGVycm9yIGlzIHRocm93bi5cbiBcbiAqIEBwYXJhbSB7XG4gICAgJ2Fic29sdXRlLXNpemUnIHxcbiAgICAnYWxwaGEtdmFsdWUnIHxcbiAgICAnYW5nbGUnIHxcbiAgICAnYW5nbGUtcGVyY2VudGFnZScgfFxuICAgICdiYXNpYy1zaGFwZScgfFxuICAgICdibGVuZC1tb2RlJyB8XG4gICAgJ2JveC1lZGdlJyB8XG4gICAgJ2NhbGMtY29uc3RhbnQnIHxcbiAgICAnY2FsYy1zdW0nIHxcbiAgICAnY29sb3ItaW50ZXJwb2xhdGlvbi1tZXRob2QnIHxcbiAgICAnY29sb3InIHxcbiAgICAnY3VzdG9tLWlkZW50JyB8XG4gICAgJ2Rhc2hlZC1pZGVudCcgfFxuICAgICdkaW1lbnNpb24nIHxcbiAgICAnZGlzcGxheS1ib3gnIHxcbiAgICAnZGlzcGxheS1pbnNpZGUnIHxcbiAgICAnZGlzcGxheS1pbnRlcm5hbCcgfFxuICAgICdkaXNwbGF5LWxlZ2FjeScgfFxuICAgICdkaXNwbGF5LWxpc3RpdGVtJyB8XG4gICAgJ2Rpc3BsYXktb3V0c2lkZScgfFxuICAgICdlYXNpbmctZnVuY3Rpb24nIHxcbiAgICAnZmlsdGVyLWZ1bmN0aW9uJyB8XG4gICAgJ2ZsZXgnIHxcbiAgICAnZnJlcXVlbmN5JyB8XG4gICAgJ2ZyZXF1ZW5jeS1wZXJjZW50YWdlJyB8XG4gICAgJ2dlbmVyaWMtZmFtaWx5JyB8XG4gICAgJ2dyYWRpZW50JyB8XG4gICAgJ2hleC1jb2xvcicgfFxuICAgICdodWUnIHxcbiAgICAnaHVlLWludGVycG9sYXRpb24tbWV0aG9kJyB8XG4gICAgJ2lkZW50JyB8XG4gICAgJ2ltYWdlJyB8XG4gICAgJ2ludGVnZXInIHxcbiAgICAnbGVuZ3RoJyB8XG4gICAgJ2xlbmd0aC1wZXJjZW50YWdlJyB8XG4gICAgJ2xpbmUtc3R5bGUnIHxcbiAgICAnbmFtZWQtY29sb3InIHxcbiAgICAnbnVtYmVyJyB8XG4gICAgJ292ZXJmbG93JyB8XG4gICAgJ3BlcmNlbnRhZ2UnIHxcbiAgICAncG9zaXRpb24nIHxcbiAgICAncmF0aW8nIHxcbiAgICAncmVsYXRpdmUtc2l6ZScgfFxuICAgICdyZXNvbHV0aW9uJyB8XG4gICAgJ3N0cmluZycgfFxuICAgICdzeXN0ZW0tY29sb3InIHxcbiAgICAndGltZScgfFxuICAgICd0aW1lLXBlcmNlbnRhZ2UnIHxcbiAgICAndHJhbnNmb3JtLWZ1bmN0aW9uJ1xuICB9IHBhcmFtIC0gVGhlIHBhcmFtZXRlciB0byBnZXQgdGhlIGtleXdvcmQgZm9yLlxuICBcbiAqIEByZXR1cm5zIHtcbiAgICAnPGFic29sdXRlLXNpemU+JyB8XG4gICAgJzxhbHBoYS12YWx1ZT4nIHxcbiAgICAnPGFuZ2xlPicgfFxuICAgICc8YW5nbGUtcGVyY2VudGFnZT4nIHxcbiAgICAnPGJhc2ljLXNoYXBlPicgfFxuICAgICc8YmxlbmQtbW9kZT4nIHxcbiAgICAnPGJveC1lZGdlPicgfFxuICAgICc8Y2FsYy1jb25zdGFudD4nIHxcbiAgICAnPGNhbGMtc3VtPicgfFxuICAgICc8Y29sb3ItaW50ZXJwb2xhdGlvbi1tZXRob2Q+JyB8XG4gICAgJzxjb2xvcj4nIHxcbiAgICAnPGN1c3RvbS1pZGVudD4nIHxcbiAgICAnPGRhc2hlZC1pZGVudD4nIHxcbiAgICAnPGRpbWVuc2lvbj4nIHxcbiAgICAnPGRpc3BsYXktYm94PicgfFxuICAgICc8ZGlzcGxheS1pbnNpZGU+JyB8XG4gICAgJzxkaXNwbGF5LWludGVybmFsPicgfFxuICAgICc8ZGlzcGxheS1sZWdhY3k+JyB8XG4gICAgJzxkaXNwbGF5LWxpc3RpdGVtPicgfFxuICAgICc8ZGlzcGxheS1vdXRzaWRlPicgfFxuICAgICc8ZWFzaW5nLWZ1bmN0aW9uPicgfFxuICAgICc8ZmlsdGVyLWZ1bmN0aW9uPicgfFxuICAgICc8ZmxleD4nIHxcbiAgICAnPGZyZXF1ZW5jeT4nIHxcbiAgICAnPGZyZXF1ZW5jeS1wZXJjZW50YWdlPicgfFxuICAgICc8Z2VuZXJpYy1mYW1pbHk+JyB8XG4gICAgJzxncmFkaWVudD4nIHxcbiAgICAnPGhleC1jb2xvcj4nIHxcbiAgICAnPGh1ZT4nIHxcbiAgICAnPGh1ZS1pbnRlcnBvbGF0aW9uLW1ldGhvZD4nIHxcbiAgICAnPGlkZW50PicgfFxuICAgICc8aW1hZ2U+JyB8XG4gICAgJzxpbnRlZ2VyPicgfFxuICAgICc8bGVuZ3RoPicgfFxuICAgICc8bGVuZ3RoLXBlcmNlbnRhZ2U+JyB8XG4gICAgJzxsaW5lLXN0eWxlPicgfFxuICAgICc8bmFtZWQtY29sb3I+JyB8XG4gICAgJzxudW1iZXI+JyB8XG4gICAgJzxvdmVyZmxvdz4nIHxcbiAgICAnPHBlcmNlbnRhZ2U+JyB8XG4gICAgJzxwb3NpdGlvbj4nIHxcbiAgICAnPHJhdGlvPicgfFxuICAgICc8cmVsYXRpdmUtc2l6ZT4nIHxcbiAgICAnPHJlc29sdXRpb24+JyB8XG4gICAgJzxzdHJpbmc+JyB8XG4gICAgJzxzeXN0ZW0tY29sb3I+JyB8XG4gICAgJzx0aW1lPicgfFxuICAgICc8dGltZS1wZXJjZW50YWdlPicgfFxuICAgICc8dHJhbnNmb3JtLWZ1bmN0aW9uPidcbiAgfSBUaGUgY29ycmVzcG9uZGluZyBrZXl3b3JkIGFzIGEgXFw8a2V5d29yZFxcPi5cbiAqL1xuZnVuY3Rpb24gZ2V0VHlwZUtleXdvcmQocGFyYW0gPSAnJykge1xuICBzd2l0Y2ggKHBhcmFtKSB7XG4gICAgY2FzZSAnYWJzb2x1dGUtc2l6ZSc6XG4gICAgY2FzZSAnYWxwaGEtdmFsdWUnOlxuICAgIGNhc2UgJ2FuZ2xlJzpcbiAgICBjYXNlICdhbmdsZS1wZXJjZW50YWdlJzpcbiAgICBjYXNlICdiYXNpYy1zaGFwZSc6XG4gICAgY2FzZSAnYmxlbmQtbW9kZSc6XG4gICAgY2FzZSAnYm94LWVkZ2UnOlxuICAgIGNhc2UgJ2NhbGMtY29uc3RhbnQnOlxuICAgIGNhc2UgJ2NhbGMtc3VtJzpcbiAgICBjYXNlICdjb2xvci1pbnRlcnBvbGF0aW9uLW1ldGhvZCc6XG4gICAgY2FzZSAnY29sb3InOlxuICAgIGNhc2UgJ2N1c3RvbS1pZGVudCc6XG4gICAgY2FzZSAnZGFzaGVkLWlkZW50JzpcbiAgICBjYXNlICdkaW1lbnNpb24nOlxuICAgIGNhc2UgJ2Rpc3BsYXktYm94JzpcbiAgICBjYXNlICdkaXNwbGF5LWluc2lkZSc6XG4gICAgY2FzZSAnZGlzcGxheS1pbnRlcm5hbCc6XG4gICAgY2FzZSAnZGlzcGxheS1sZWdhY3knOlxuICAgIGNhc2UgJ2Rpc3BsYXktbGlzdGl0ZW0nOlxuICAgIGNhc2UgJ2Rpc3BsYXktb3V0c2lkZSc6XG4gICAgY2FzZSAnZWFzaW5nLWZ1bmN0aW9uJzpcbiAgICBjYXNlICdmaWx0ZXItZnVuY3Rpb24nOlxuICAgIGNhc2UgJ2ZsZXgnOlxuICAgIGNhc2UgJ2ZyZXF1ZW5jeSc6XG4gICAgY2FzZSAnZnJlcXVlbmN5LXBlcmNlbnRhZ2UnOlxuICAgIGNhc2UgJ2dlbmVyaWMtZmFtaWx5JzpcbiAgICBjYXNlICdncmFkaWVudCc6XG4gICAgY2FzZSAnaGV4LWNvbG9yJzpcbiAgICBjYXNlICdodWUnOlxuICAgIGNhc2UgJ2h1ZS1pbnRlcnBvbGF0aW9uLW1ldGhvZCc6XG4gICAgY2FzZSAnaWRlbnQnOlxuICAgIGNhc2UgJ2ltYWdlJzpcbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICBjYXNlICdsZW5ndGgnOlxuICAgIGNhc2UgJ2xlbmd0aC1wZXJjZW50YWdlJzpcbiAgICBjYXNlICdsaW5lLXN0eWxlJzpcbiAgICBjYXNlICduYW1lZC1jb2xvcic6XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdvdmVyZmxvdyc6XG4gICAgY2FzZSAncGVyY2VudGFnZSc6XG4gICAgY2FzZSAncG9zaXRpb24nOlxuICAgIGNhc2UgJ3JhdGlvJzpcbiAgICBjYXNlICdyZWxhdGl2ZS1zaXplJzpcbiAgICBjYXNlICdyZXNvbHV0aW9uJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ3N5c3RlbS1jb2xvcic6XG4gICAgY2FzZSAndGltZSc6XG4gICAgY2FzZSAndGltZS1wZXJjZW50YWdlJzpcbiAgICBjYXNlICd0cmFuc2Zvcm0tZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIGA8JHtwYXJhbX0+YDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUeXBlS2V5d29yZDsiLCAiZXhwb3J0IGNvbnN0IGltcG9ydGFudCA9IF8gPT4gYCFpbXBvcnRhbnQ7YFxuZXhwb3J0IGRlZmF1bHQgaW1wb3J0YW50IiwgImltcG9ydCB0eXBlcyBmcm9tICcuL3R5cGVzLmpzJztcblxuaW1wb3J0IGltcG9ydGFudCBmcm9tICcuL2ltcG9ydGFudC5qcyc7XG5cbmV4cG9ydCB7XG4gIGltcG9ydGFudCxcbiAgdHlwZXMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW1wb3J0YW50LFxuICB0eXBlcyxcbn0iLCAiLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGFic29sdXRlIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhYnNvbHV0ZSB2YWx1ZSBleHByZXNzaW9uIGZvciBDU1MuXG4gKi9cbmV4cG9ydCBjb25zdCBhYnMgPSBwYXlsb2FkID0+IHtcbiAgcmV0dXJuIGBhYnMoJHtwYXlsb2FkfSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnM7IiwgIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhcmNjb3NpbmUgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHBheWxvYWQgLSBUaGUgdmFsdWUgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFyY2Nvc2luZSBleHByZXNzaW9uIGZvciBDU1MuXG4gKi9cbmV4cG9ydCBjb25zdCBhY29zID0gcGF5bG9hZCA9PiBgYWNvcygke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGFjb3MiLCAiLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGFyY3NpbmUgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHBheWxvYWQgLSBUaGUgdmFsdWUgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFyY3NpbmUgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYXNpbiA9IHBheWxvYWQgPT4gYGFzaW4oJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhc2luIiwgIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhcmN0YW5nZW50IHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhcmN0YW5nZW50IGV4cHJlc3Npb24gZm9yIENTUy5cbiAqL1xuZXhwb3J0IGNvbnN0IGF0YW4gPSBwYXlsb2FkID0+IGBhdGFuKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgYXRhbiIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYXJjdGFuZ2VudCBvZiB0d28gdmFyaWFibGVzLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlcyB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYXJjdGFuZ2VudCBleHByZXNzaW9uIGZvciBDU1MuXG4gKi9cbmV4cG9ydCBjb25zdCBhdGFuMiA9IHBheWxvYWQgPT4gYGF0YW4yKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgYXRhbjIiLCAiLyoqXG4gKiBSZXRyaWV2ZSB0aGUgdmFsdWUgb2YgYW4gYXR0cmlidXRlIGZyb20gYSBDU1Mgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZCAtIFRoZSBhdHRyaWJ1dGUgdG8gcmV0cmlldmUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQ1NTIGZ1bmN0aW9uIHRvIHJldHJpZXZlIHRoZSBhdHRyaWJ1dGUgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyID0gcGF5bG9hZCA9PiBgYXR0cigke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGF0dHIiLCAiLyoqXG4gKiBDYWxjdWxhdGUgYSBDU1MgY2FsYygpIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF5bG9hZCAtIFRoZSBleHByZXNzaW9uIHRvIGJlIGNhbGN1bGF0ZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY2FsY3VsYXRlZCBDU1MgZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGMgPSBwYXlsb2FkID0+IGBjYWxjKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgY2FsYyIsICIvKipcbiAqIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gYSBtaW5pbXVtIGFuZCBhIG1heGltdW0uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG1pbiAtIFRoZSBtaW5pbXVtIHZhbHVlIG9yIENTUyBleHByZXNzaW9uLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWwgLSBUaGUgY3VycmVudCB2YWx1ZSBvciBDU1MgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbWF4IC0gVGhlIG1heGltdW0gdmFsdWUgb3IgQ1NTIGV4cHJlc3Npb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBjbGFtcCgpIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYW1wID0gKG1pbiwgdmFsLCBtYXgpID0+IHtcbiAgcmV0dXJuIGBjbGFtcCgke21pbn0sICR7dmFsfSwgJHttYXh9KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYW1wOyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBvZiB0aGUgZ2l2ZW4gYW5nbGUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGFuZ2xlIC0gVGhlIGFuZ2xlIGluIGRlZ3JlZXMgb3IgcmFkaWFucy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGZ1bmN0aW9uIHJlcHJlc2VudGluZyB0aGUgY29zaW5lIG9mIHRoZSBhbmdsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcyA9IGFuZ2xlID0+IGBjb3MoJHthbmdsZX0pYFxuZXhwb3J0IGRlZmF1bHQgY29zIiwgIi8qKlxuICogR2VuZXJhdGVzIGEgQ1NTIGNvdW50ZXIgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50ZXJOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvdW50ZXJTdHlsZT0nZGVjaW1hbCddIC0gVGhlIHN0eWxlIG9mIHRoZSBjb3VudGVyLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY291bnRlciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvdW50ZXIgPSAoY291bnRlck5hbWUsIGNvdW50ZXJTdHlsZSA9ICdkZWNpbWFsJykgPT4ge1xuICBpZiAodHlwZW9mIGNvdW50ZXJOYW1lICE9PSAnc3RyaW5nJyB8fCBjb3VudGVyTmFtZS5zdGFydHNXaXRoKCctLScpIHx8IFsnbm9uZScsICd1bnNldCcsICdpbml0aWFsJywgJ2luaGVyaXQnXS5pbmNsdWRlcyhjb3VudGVyTmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBuYW1lLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb3VudGVyU3R5bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgc3R5bGUuJyk7XG4gIH1cblxuICByZXR1cm4gYGNvdW50ZXIoJHtjb3VudGVyTmFtZX0ke2NvdW50ZXJTdHlsZSAhPT0gJ2RlY2ltYWwnID8gJywgJyArIGNvdW50ZXJTdHlsZSA6ICcnfSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3VudGVyOyIsICIvKipcbiAqIENvbnN0cnVjdHMgYSBDU1MgY291bnRlcnMgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50ZXJOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gVGhlIHN0cmluZyB0byBiZSBjb25jYXRlbmF0ZWQgd2l0aCB0aGUgY291bnRlciB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY291bnRlclN0eWxlPSdkZWNpbWFsJ10gLSBUaGUgc3R5bGUgb2YgdGhlIGNvdW50ZXIsIGRlZmF1bHQgaXMgJ2RlY2ltYWwnLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBjb3VudGVyIG5hbWUsIHN0cmluZywgb3IgY291bnRlciBzdHlsZSBpcyBpbnZhbGlkLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY291bnRlcnMgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY291bnRlcnMgPSAoY291bnRlck5hbWUsIHN0cmluZywgY291bnRlclN0eWxlID0gJ2RlY2ltYWwnKSA9PiB7XG4gIGlmICh0eXBlb2YgY291bnRlck5hbWUgIT09ICdzdHJpbmcnIHx8IGNvdW50ZXJOYW1lLnN0YXJ0c1dpdGgoJy0tJykgfHwgWydub25lJywgJ3Vuc2V0JywgJ2luaXRpYWwnLCAnaW5oZXJpdCddLmluY2x1ZGVzKGNvdW50ZXJOYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIG5hbWUuJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nIGZvciBjb25jYXRlbmF0aW9uLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb3VudGVyU3R5bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgc3R5bGUuJyk7XG4gIH1cblxuICByZXR1cm4gYGNvdW50ZXJzKCR7Y291bnRlck5hbWV9LCBcIiR7c3RyaW5nfVwiJHtjb3VudGVyU3R5bGUgIT09ICdkZWNpbWFsJyA/ICcsICcgKyBjb3VudGVyU3R5bGUgOiAnJ30pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY291bnRlcnM7IiwgImV4cG9ydCBjb25zdCBjcm9zc0ZhZGUgPSAoLi4uaW1hZ2VzKSA9PiB7XG4gIC8qKlxuICAgKiBCbGVuZHMgaW1hZ2VzIHVzaW5nIHRoZSBjcm9zcy1mYWRlIGVmZmVjdC5cbiAgICogQHBhcmFtIHsuLi5pbWFnZXN9IGltYWdlcyAtIEFuIGFycmF5IG9mIGltYWdlIFVSTHMgb3IgdHVwbGVzIG9mIGltYWdlIFVSTCBhbmQgcGVyY2VudGFnZS5cbiAgICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgZnVuY3Rpb24gcmVwcmVzZW50aW5nIHRoZSBjcm9zcy1mYWRlIG9mIHRoZSBwcm92aWRlZCBpbWFnZXMuXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBsZXNzIHRoYW4gdHdvIHZhbGlkIGltYWdlcyBhcmUgcHJvdmlkZWQuXG4gICAqL1xuICBjb25zdCB2YWxpZEltYWdlcyA9IGltYWdlcy5maWx0ZXIoaW1hZ2UgPT4ge1xuICAgIGlmICh0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnICYmIGltYWdlLnN0YXJ0c1dpdGgoJ3VybCgnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IFtpbWcsIHBlcmNlbnRhZ2VdID0gaW1hZ2U7XG4gICAgcmV0dXJuIHR5cGVvZiBpbWcgPT09ICdzdHJpbmcnICYmIGltZy5zdGFydHNXaXRoKCd1cmwoJykgJiZcbiAgICAgIHR5cGVvZiBwZXJjZW50YWdlID09PSAnbnVtYmVyJyAmJiBwZXJjZW50YWdlID49IDAgJiYgcGVyY2VudGFnZSA8PSAxMDA7XG4gIH0pO1xuXG4gIGlmICh2YWxpZEltYWdlcy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjcm9zc0ZhZGUgZnVuY3Rpb24gcmVxdWlyZXMgYXQgbGVhc3QgdHdvIGltYWdlcy4nKTtcbiAgfVxuXG4gIGNvbnN0IGNyb3NzRmFkZUltYWdlcyA9IHZhbGlkSW1hZ2VzLm1hcChpbWFnZSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9XG4gICAgY29uc3QgW2ltZywgcGVyY2VudGFnZV0gPSBpbWFnZTtcbiAgICByZXR1cm4gYCR7aW1nfSAke3BlcmNlbnRhZ2V9JWA7XG4gIH0pLmpvaW4oJywgJyk7XG5cbiAgcmV0dXJuIGBjcm9zcy1mYWRlKCR7Y3Jvc3NGYWRlSW1hZ2VzfSlgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3Jvc3NGYWRlIiwgIi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIGltYWdlIHZhbHVlIGZvciBhIGdpdmVuIGVsZW1lbnQgSUQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQsIG11c3Qgc3RhcnQgd2l0aCAnIycuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIElEIGlzIG5vdCBhIHN0cmluZyBvciBkb2Vzbid0IHN0YXJ0IHdpdGggJyMnLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBpbWFnZSB2YWx1ZSBmb3IgdGhlIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBlbGVtZW50ID0gKGlkKSA9PiB7XG4gIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8ICFpZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSUQgZm9yIGVsZW1lbnQgZnVuY3Rpb24uIElEIG11c3QgYmUgYSBzdHJpbmcgc3RhcnRpbmcgd2l0aCBcIiNcIi4nKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBmdW5jdGlvbiBpcyBzdXBwb3J0ZWRcbiAgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pTZXRJbWFnZUVsZW1lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLndhcm4oJ1RoZSBlbGVtZW50KCkgZnVuY3Rpb24gaXMgZXhwZXJpbWVudGFsIGFuZCBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vycy4nKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgQ1NTIGltYWdlIHZhbHVlXG4gIHJldHVybiBgLW1vei1lbGVtZW50KCR7aWR9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlbGVtZW50OyIsICIvKipcbiAqIFJldHJpZXZlcyBhIENTUyBlbnZpcm9ubWVudCB2YXJpYWJsZSB2YWx1ZSwgd2l0aCBhbiBvcHRpb25hbCBmYWxsYmFjay5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YXJpYWJsZSAtIFRoZSBuYW1lIG9mIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmFsbGJhY2tdIC0gVGhlIGZhbGxiYWNrIHZhbHVlIGlmIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3Qgc2V0LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBlbnYoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnYgPSAodmFyaWFibGUsIGZhbGxiYWNrKSA9PiB7XG4gIGNvbnN0IGVudlZhciA9IGBlbnYoJHt2YXJpYWJsZX0ke2ZhbGxiYWNrID8gYCwgJHtmYWxsYmFja31gIDogJyd9KWA7XG4gIHJldHVybiBlbnZWYXI7XG59O1xuXG4vLyBQcm92aWRlcyBhIG1lY2hhbmlzbSB0byByZXRyaWV2ZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgZm9yIENTU1xuLyoqXG4gKiBSZXByZXNlbnRzIHNhZmUgYXJlYSBpbnNldHMgZm9yIENTUyBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBzYWZlQXJlYUluc2V0cyA9IHtcbiAgdG9wOiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LXRvcCcsIGZhbGxiYWNrKSxcbiAgcmlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCdzYWZlLWFyZWEtaW5zZXQtcmlnaHQnLCBmYWxsYmFjayksXG4gIGJvdHRvbTogKGZhbGxiYWNrKSA9PiBlbnYoJ3NhZmUtYXJlYS1pbnNldC1ib3R0b20nLCBmYWxsYmFjayksXG4gIGxlZnQ6IChmYWxsYmFjaykgPT4gZW52KCdzYWZlLWFyZWEtaW5zZXQtbGVmdCcsIGZhbGxiYWNrKVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRpdGxlIGJhciBhcmVhIGZvciBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgY29uc3QgdGl0bGViYXJBcmVhID0ge1xuICB4OiAoZmFsbGJhY2spID0+IGVudigndGl0bGViYXItYXJlYS14JywgZmFsbGJhY2spLFxuICB5OiAoZmFsbGJhY2spID0+IGVudigndGl0bGViYXItYXJlYS15JywgZmFsbGJhY2spLFxuICB3aWR0aDogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEtd2lkdGgnLCBmYWxsYmFjayksXG4gIGhlaWdodDogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEtaGVpZ2h0JywgZmFsbGJhY2spXG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMga2V5Ym9hcmQgaW5zZXRzIGZvciBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgY29uc3Qga2V5Ym9hcmRJbnNldCA9IHtcbiAgdG9wOiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtdG9wJywgZmFsbGJhY2spLFxuICByaWdodDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LXJpZ2h0JywgZmFsbGJhY2spLFxuICBib3R0b206IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC1ib3R0b20nLCBmYWxsYmFjayksXG4gIGxlZnQ6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC1sZWZ0JywgZmFsbGJhY2spLFxuICB3aWR0aDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LXdpZHRoJywgZmFsbGJhY2spLFxuICBoZWlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC1oZWlnaHQnLCBmYWxsYmFjaylcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZW52LFxuICBzYWZlQXJlYUluc2V0cyxcbiAgdGl0bGViYXJBcmVhLFxuICBrZXlib2FyZEluc2V0XG59IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXhwb25lbnRpYWwgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIGV4cG9uZW50IHRvIHJhaXNlIGUgdG8uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQ1NTIGV4cG9uZW50aWFsIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGV4cCA9IHZhbHVlID0+IGBleHAoJHt2YWx1ZX0pYFxuXG5leHBvcnQgZGVmYXVsdCBleHAiLCAiLyoqXG4gKiBBZGp1c3RzIHRoZSBjb250ZW50IHNpemUgdG8gZml0IHRoZSBnaXZlbiBzaXplIHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaXplIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgbGVuZ3RoIG9yIGEgcGVyY2VudGFnZS5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHNpemUgaXMgbm90IGEgc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBmaXQtY29udGVudCBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBmaXRDb250ZW50ID0gKHNpemUpID0+IHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NpemUgbXVzdCBiZSBhIHN0cmluZyByZXByZXNlbnRpbmcgYSBsZW5ndGggb3IgYSBwZXJjZW50YWdlLicpO1xuICB9XG4gIHJldHVybiBgZml0LWNvbnRlbnQoJHtzaXplfSlgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZml0Q29udGVudCIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGh5cG90ZW51c2Ugb3IgRXVjbGlkZWFuIG5vcm0uXG4gKiBAcGFyYW0gey4uLmFyZ3N9IG51bWJlcnMgLSBBIHNldCBvZiBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgc2lkZXMgb2YgYSByaWdodC1hbmdsZWQgdHJpYW5nbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQ1NTIGh5cG90IGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGh5cG90ID0gKC4uLmFyZ3MpID0+IGBoeXBvdCgke2FyZ3Muam9pbignLCAnKX0pYFxuZXhwb3J0IGRlZmF1bHQgaHlwb3QiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsb2dhcml0aG0gb2YgYSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjYWxjdWxhdGUgdGhlIGxvZ2FyaXRobSBmb3IuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIGxvZygpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGxvZyA9IHZhbHVlID0+IGBsb2coJHt2YWx1ZX0pYFxuZXhwb3J0IGRlZmF1bHQgbG9nIiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWF4aW11bSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gKiBAcGFyYW0gey4uLmFyZ3N9IGFyZ3MgLSBBIHNldCBvZiBudW1lcmljIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbWF4KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbWF4ID0gKC4uLmFyZ3MpID0+IGBtYXgoJHthcmdzLmpvaW4oJywgJyl9KWBcbmV4cG9ydCBkZWZhdWx0IG1heCIsICJcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWluaW11bSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gKiBAcGFyYW0gey4uLmFyZ3N9IC0gQSBzZXQgb2YgbnVtZXJpYyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1pbigpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbiA9ICguLi5hcmdzKSA9PiBgbWluKCR7YXJncy5qb2luKCcsICcpfSlgXG5leHBvcnQgZGVmYXVsdCBtaW4iLCAiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIG1pbm1heCBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW4gLSBUaGUgbWluaW11bSB2YWx1ZSBhcyBhIENTUyB1bml0IG9yIGtleXdvcmQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWF4IC0gVGhlIG1heGltdW0gdmFsdWUgYXMgYSBDU1MgdW5pdCBvciBrZXl3b3JkLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBtaW4gb3IgbWF4IGFyZSBub3Qgb2YgdHlwZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1pbm1heCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbm1heCA9IChtaW4sIG1heCkgPT4ge1xuICBpZiAodHlwZW9mIG1pbiAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIG1heCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJhbWV0ZXJzIG1pbiBhbmQgbWF4IG11c3QgYmUgc3RyaW5ncy4nKTtcbiAgfVxuXG4gIC8vIElmIG1heCBpcyBsZXNzIHRoYW4gbWluLCB0cmVhdCBtaW5tYXggYXMgbWluXG4gIC8vIGlmIChwYXJzZUZsb2F0KG1heCkgPCBwYXJzZUZsb2F0KG1pbikpIHtcbiAgLy8gICByZXR1cm4gbWluO1xuICAvLyB9XG5cbiAgcmV0dXJuIGBtaW5tYXgoJHttaW59LCAke21heH0pYDtcbn1cbmV4cG9ydCBkZWZhdWx0IG1pbm1heDsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtb2R1bHVzIG9mIHR3byBudW1iZXJzLlxuICogQHBhcmFtIHtudW1iZXJ9IGEgLSBUaGUgZGl2aWRlbmQuXG4gKiBAcGFyYW0ge251bWJlcn0gYiAtIFRoZSBkaXZpc29yLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBtb2QoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtb2QgPSAoYSwgYikgPT4gYG1vZCgke2F9LCAke2J9KWA7XG5leHBvcnQgZGVmYXVsdCBtb2Q7IiwgIi8qKlxuICogQ3JlYXRlcyBhIENTUyBwYXRoKCkgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gZmlsbFJ1bGUgLSBUaGUgZmlsbC1ydWxlIHRvIGFwcGx5IHRvIHRoZSBwYXRoLCBvciBudWxsIGlmIG5vdCBhcHBsaWNhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHN2Z1BhdGggLSBUaGUgU1ZHIHBhdGggZGF0YS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgcGF0aCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHBhdGggPSAoZmlsbFJ1bGUsIHN2Z1BhdGgpID0+IHtcbiAgaWYgKHR5cGVvZiBzdmdQYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBzdmdQYXRoIHBhcmFtZXRlciBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgaWYgKGZpbGxSdWxlICYmIHR5cGVvZiBmaWxsUnVsZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgZmlsbFJ1bGUgcGFyYW1ldGVyIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICBjb25zdCB2YWxpZEZpbGxSdWxlcyA9IFsnbm9uemVybycsICdldmVub2RkJ107XG4gIGlmIChmaWxsUnVsZSAmJiAhdmFsaWRGaWxsUnVsZXMuaW5jbHVkZXMoZmlsbFJ1bGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmlsbFJ1bGUgcGFyYW1ldGVyIG11c3QgYmUgZWl0aGVyIFwibm9uemVyb1wiIG9yIFwiZXZlbm9kZFwiLicpO1xuICB9XG5cbiAgcmV0dXJuIGBwYXRoKCR7ZmlsbFJ1bGUgPyBgJHtmaWxsUnVsZX0sIGAgOiAnJ31cIiR7c3ZnUGF0aH1cIilgO1xufVxuZXhwb3J0IGRlZmF1bHQgcGF0aDsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBwb3dlciBvZiBhIGJhc2UgbnVtYmVyIHJhaXNlZCB0byBhbiBleHBvbmVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhIC0gVGhlIGJhc2UgbnVtYmVyLlxuICogQHBhcmFtIHtudW1iZXJ9IGIgLSBUaGUgZXhwb25lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIHBvdygpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHBvdyA9IChhLCBiKSA9PiBgcG93KCR7YX0sICR7Yn0pYDtcbmV4cG9ydCBkZWZhdWx0IHBvdzsiLCAiLyoqXG4gKiBDcmVhdGVzIGEgQ1NTIHJheSgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSAtIFRoZSBhbmdsZSBvZiB0aGUgcmF5IGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NpemU9J2Nsb3Nlc3Qtc2lkZSddIC0gVGhlIHNpemUga2V5d29yZCBmb3IgdGhlIHJheS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnRhaW49ZmFsc2VdIC0gV2hldGhlciB0aGUgcmF5IHNob3VsZCBjb250YWluIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IFtwb3NpdGlvbj0nJ10gLSBUaGUgcG9zaXRpb24gb2YgdGhlIHJheSB3aXRoaW4gdGhlIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIHJheSgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHJheSA9IChhbmdsZSwgc2l6ZSA9ICdjbG9zZXN0LXNpZGUnLCBjb250YWluID0gZmFsc2UsIHBvc2l0aW9uID0gJycpID0+IHtcbiAgaWYgKHR5cGVvZiBhbmdsZSAhPT0gJ251bWJlcicgfHwgYW5nbGUgPCAwIHx8IGFuZ2xlID49IDM2MCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBhbmdsZSBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMzU5LicpO1xuICB9XG5cbiAgY29uc3Qgc2l6ZUtleXdvcmRzID0gWydjbG9zZXN0LXNpZGUnLCAnY2xvc2VzdC1jb3JuZXInLCAnZmFydGhlc3Qtc2lkZScsICdmYXJ0aGVzdC1jb3JuZXInLCAnc2lkZXMnXTtcbiAgaWYgKCFzaXplS2V5d29yZHMuaW5jbHVkZXMoc2l6ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc2l6ZSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlczogJyArIHNpemVLZXl3b3Jkcy5qb2luKCcsICcpICsgJy4nKTtcbiAgfVxuXG4gIGNvbnN0IHBvc2l0aW9uUmVnZXggPSAvXihsZWZ0fGNlbnRlcnxyaWdodHx0b3B8Ym90dG9tfChcXGQrKFxcLlxcZCspPyhweHwlKT8pKSQvO1xuICBpZiAocG9zaXRpb24gJiYgIXBvc2l0aW9uUmVnZXgudGVzdChwb3NpdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgcG9zaXRpb24gbXVzdCBiZSBhIHZhbGlkIENTUyBwb3NpdGlvbiB2YWx1ZS4nKTtcbiAgfVxuXG4gIGxldCByYXlTdHJpbmcgPSBgcmF5KCR7YW5nbGV9ZGVnYDtcblxuICBpZiAoc2l6ZSAhPT0gJ2Nsb3Nlc3Qtc2lkZScpIHtcbiAgICByYXlTdHJpbmcgKz0gYCAke3NpemV9YDtcbiAgfVxuXG4gIGlmIChjb250YWluKSB7XG4gICAgcmF5U3RyaW5nICs9ICcgY29udGFpbic7XG4gIH1cblxuICBpZiAocG9zaXRpb24pIHtcbiAgICByYXlTdHJpbmcgKz0gYCBhdCAke3Bvc2l0aW9ufWA7XG4gIH1cblxuICByYXlTdHJpbmcgKz0gJyknO1xuXG4gIHJldHVybiBgb2Zmc2V0LXBhdGg6ICR7cmF5U3RyaW5nfTtgO1xufVxuZXhwb3J0IGRlZmF1bHQgcmF5OyIsICIvKipcbiAqIENvbnZlcnRzIGEgcGl4ZWwgdmFsdWUgdG8gcmVtIHVuaXRzIGJhc2VkIG9uIGEgcm9vdCBmb250IHNpemUuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgcGl4ZWwgdmFsdWUgdG8gY29udmVydCB0byByZW0uXG4gKiBAcGFyYW0ge251bWJlcn0gW3Jvb3RWYWx1ZT0xNl0gLSBUaGUgcm9vdCBmb250IHNpemUgaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDE2LlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgaW4gcmVtIHVuaXRzLlxuICovXG5leHBvcnQgY29uc3QgcmVtID0gKHZhbHVlLCByb290VmFsdWUgPSAxNikgPT4gYHJlbSgke3ZhbHVlfSwgJHtyb290VmFsdWV9KWA7XG5leHBvcnQgZGVmYXVsdCByZW07IiwgIi8qKlxuICogR2VuZXJhdGVzIGEgQ1NTIHJlcGVhdCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gY291bnQgLSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgdHJhY2tzIG9yIG9uZSBvZiB0aGUga2V5d29yZHM6ICdhdXRvLWZpbGwnLCAnYXV0by1maXQnLlxuICogQHBhcmFtIHsuLi5zdHJpbmd8YXJyYXl9IHRyYWNrcyAtIFRoZSB0cmFjayBzaXplcyBhbmQvb3IgbmFtZXMgdG8gYmUgcmVwZWF0ZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJlcGVhdCgpIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgcmVwZWF0ID0gKGNvdW50LCAuLi50cmFja3MpID0+IHtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvdW50KSAmJiBjb3VudCAhPT0gJ2F1dG8tZmlsbCcgJiYgY291bnQgIT09ICdhdXRvLWZpdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgcmVwZWF0IGNvdW50IG11c3QgYmUgYW4gaW50ZWdlciBvciBvbmUgb2YgdGhlIGtleXdvcmRzOiBhdXRvLWZpbGwsIGF1dG8tZml0LicpO1xuICB9XG5cbiAgY29uc3QgdHJhY2tMaXN0ID0gdHJhY2tzLm1hcCh0cmFjayA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJhY2spKSB7XG4gICAgICByZXR1cm4gYFske3RyYWNrLmpvaW4oJyAnKX1dYDtcbiAgICB9XG4gICAgcmV0dXJuIHRyYWNrO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIGByZXBlYXQoJHtjb3VudH0sICR7dHJhY2tMaXN0fSlgO1xufTtcbmV4cG9ydCBkZWZhdWx0IHJlcGVhdDsiLCAiLyoqXG4gKiBSb3VuZHMgYSBudW1iZXIgdG8gYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIG51bWJlciB0byByb3VuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbcHJlY2lzaW9uPTBdIC0gVGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byByb3VuZCB0byAoZGVmYXVsdCBpcyAwKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcm91bmRlZCBudW1iZXIuXG4gKi9cbmV4cG9ydCBjb25zdCByb3VuZCA9ICh2YWx1ZSwgcHJlY2lzaW9uID0gMCkgPT4gYHJvdW5kKCR7dmFsdWV9LCAke3ByZWNpc2lvbn0pYDtcbmV4cG9ydCBkZWZhdWx0IHJvdW5kOyIsICJcbi8qKlxuICogUmV0dXJucyB0aGUgQ1NTIHNpZ24gZnVuY3Rpb24gZm9yIGEgZ2l2ZW4gdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHVzZWQgaW4gdGhlIHNpZ24gZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNpZ24gb2YgdGhlIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3Qgc2lnbiA9ICh2YWx1ZSkgPT4gYHNpZ24oJHt2YWx1ZX0pYFxuZXhwb3J0IGRlZmF1bHQgc2lnbjsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzaW5lIG9mIGEgZ2l2ZW4gYW5nbGUgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWUgLSBUaGUgYW5nbGUgaW4gZGVncmVlcyBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBzaW5lLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzaW5lIG9mIHRoZSBhbmdsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpbiA9ICh2YWx1ZSkgPT4gYHNpbigke3ZhbHVlfSlgO1xuZXhwb3J0IGRlZmF1bHQgc2luOyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZSByb290IG9mIGEgZ2l2ZW4gdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIHZhbHVlIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIHNxdWFyZSByb290LlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcXVhcmUgcm9vdCBvZiB0aGUgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBzcXJ0ID0gKHZhbHVlKSA9PiBgc3FydCgke3ZhbHVlfSlgO1xuZXhwb3J0IGRlZmF1bHQgc3FydDsiLCAiLyoqXG4gKiBDcmVhdGVzIGEgQ1NTIHN5bWJvbHMgdmFsdWUgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiB0aGUgc3ltYm9scyBsaXN0OyBvbmUgb2YgJ2N5Y2xpYycsICdudW1lcmljJywgJ2FscGhhYmV0aWMnLCAnc3ltYm9saWMnLCAnZml4ZWQnLlxuICogQHBhcmFtIHsuLi52YWx1ZXN9IC0gVGhlIHN5bWJvbHMgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGxpc3QsIHdoaWNoIGNhbiBiZSBzdHJpbmdzIG9yIEltYWdlIGluc3RhbmNlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3ltYm9scyBsaXN0LlxuICovXG5leHBvcnQgY29uc3Qgc3ltYm9scyA9ICh0eXBlLCAuLi52YWx1ZXMpID0+IHtcbiAgY29uc3QgdmFsaWRUeXBlcyA9IFsnY3ljbGljJywgJ251bWVyaWMnLCAnYWxwaGFiZXRpYycsICdzeW1ib2xpYycsICdmaXhlZCddO1xuICBpZiAoIXZhbGlkVHlwZXMuaW5jbHVkZXModHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3ltYm9scyB0eXBlOiAke3R5cGV9LiBFeHBlY3RlZCBvbmUgb2YgJHt2YWxpZFR5cGVzLmpvaW4oJywgJyl9LmApO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVkVmFsdWVzID0gdmFsdWVzLm1hcCh2YWx1ZSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBgXFxcIiR7dmFsdWV9XFxcImA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEltYWdlKSB7XG4gICAgICAvLyBBc3N1bWluZyBJbWFnZSBpcyBhIGNsYXNzIHJlcHJlc2VudGluZyBhbiBpbWFnZSwgYW5kIHRvU3RyaW5nKCkgcmV0dXJucyBhIHZhbGlkIENTUyBpbWFnZSB2YWx1ZVxuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSB0eXBlOiB2YWx1ZXMgbXVzdCBiZSBzdHJpbmdzIG9yIEltYWdlIGluc3RhbmNlcy4nKTtcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgc3ltYm9scygke3R5cGV9ICR7Zm9ybWF0dGVkVmFsdWVzfSlgO1xufVxuZXhwb3J0IGRlZmF1bHQgc3ltYm9sczsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSB0YW5nZW50IG9mIGEgZ2l2ZW4gYW5nbGUgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWUgLSBUaGUgYW5nbGUgaW4gZGVncmVlcyBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSB0YW5nZW50LlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB0YW5nZW50IG9mIHRoZSBhbmdsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRhbiA9ICh2YWx1ZSkgPT4gYHRhbigke3ZhbHVlfSlgO1xuZXhwb3J0IGRlZmF1bHQgdGFuOyIsICIvKipcbiAqIEZvcm1hdHMgYSBnaXZlbiBwYXRoIGFzIGEgQ1NTIFVSTCB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gYmUgZm9ybWF0dGVkIGFzIGEgVVJMLlxuICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgZm9ybWF0dGVkIFVSTCBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCB1cmwgPSAocGF0aCkgPT4ge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVUkwgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBVUkwgaXMgYSBkYXRhIFVSTCwgYWJzb2x1dGUgVVJMLCBvciBhIHJlbGF0aXZlIFVSTFxuICBjb25zdCBpc0RhdGFVcmwgPSBwYXRoLnN0YXJ0c1dpdGgoJ2RhdGE6Jyk7XG4gIGNvbnN0IGlzQWJzb2x1dGVVcmwgPSAvXig/OlthLXpdKzopP1xcL1xcLy9pLnRlc3QocGF0aCk7XG4gIGNvbnN0IGlzUmVsYXRpdmVVcmwgPSAhaXNEYXRhVXJsICYmICFpc0Fic29sdXRlVXJsO1xuXG4gIC8vIElmIHRoZSBVUkwgY29udGFpbnMgc3BlY2lhbCBjaGFyYWN0ZXJzLCBpdCBzaG91bGQgYmUgcXVvdGVkXG4gIGNvbnN0IG5lZWRzUXVvdGVzID0gL1tcXHMnXCIoKV0vLnRlc3QocGF0aCk7XG4gIGNvbnN0IHF1b3RlZFBhdGggPSBuZWVkc1F1b3RlcyA/IGBcXFwiJHtwYXRofVxcXCJgIDogcGF0aDtcblxuICAvLyBSZXR1cm4gdGhlIGZvcm1hdHRlZCBVUkwgc3RyaW5nXG4gIHJldHVybiBgdXJsKCR7cXVvdGVkUGF0aH0pYDtcbn07XG5leHBvcnQgZGVmYXVsdCB1cmw7IiwgIi8qKlxuICogQ29uc3RydWN0cyBhIENTUyB2YXJpYWJsZSB3aXRoIGFuIG9wdGlvbmFsIGZhbGxiYWNrLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHZhcmlhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtmYWxsYmFja10gLSBUaGUgb3B0aW9uYWwgZmFsbGJhY2sgdmFsdWUgaWYgdGhlIHZhcmlhYmxlIGlzIG5vdCBkZWZpbmVkLlxuICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBuYW1lIGlzIG5vdCBhIHN0cmluZyBvciBpZiB0aGUgZmFsbGJhY2sgaXMgcHJvdmlkZWQgYW5kIGlzIG5vdCBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNzc1ZhciA9IChuYW1lLCBmYWxsYmFjaykgPT4ge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VzdG9tIHByb3BlcnR5IG5hbWUgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIGlmIChmYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBmYWxsYmFjayAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmYWxsYmFjayB2YWx1ZSBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgcmV0dXJuIGB2YXIoJHtuYW1lfSR7ZmFsbGJhY2sgIT09IHVuZGVmaW5lZCA/IGAsICR7ZmFsbGJhY2t9YCA6ICcnfSlgO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNzc1ZhcjsiLCAiaW1wb3J0IGFicyBmcm9tICcuL2Ficy5qcyc7XG5pbXBvcnQgYWNvcyBmcm9tICcuL2Fjb3MuanMnO1xuaW1wb3J0IGFzaW4gZnJvbSAnLi9hc2luLmpzJztcbmltcG9ydCBhdGFuIGZyb20gJy4vYXRhbi5qcyc7XG5pbXBvcnQgYXRhbjIgZnJvbSAnLi9hdGFuMi5qcyc7XG5pbXBvcnQgYXR0ciBmcm9tICcuL2F0dHIuanMnO1xuaW1wb3J0IGNhbGMgZnJvbSAnLi9jYWxjLmpzJztcbmltcG9ydCBjbGFtcCBmcm9tICcuL2NsYW1wLmpzJztcbmltcG9ydCBjb3MgZnJvbSAnLi9jb3MuanMnO1xuaW1wb3J0IGNvdW50ZXIgZnJvbSAnLi9jb3VudGVyLmpzJztcbmltcG9ydCBjb3VudGVycyBmcm9tICcuL2NvdW50ZXJzLmpzJztcbmltcG9ydCBjcm9zc2ZhZGUgZnJvbSAnLi9jcm9zc2ZhZGUuanMnO1xuaW1wb3J0IGVsZW1lbnQgZnJvbSAnLi9lbGVtZW50LmpzJztcbmltcG9ydCBlbnYgZnJvbSAnLi9lbnYuanMnO1xuaW1wb3J0IGV4cCBmcm9tICcuL2V4cC5qcyc7XG5pbXBvcnQgZml0Y29udGVudCBmcm9tICcuL2ZpdGNvbnRlbnQuanMnO1xuaW1wb3J0IGh5cG90IGZyb20gJy4vaHlwb3QuanMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZy5qcyc7XG5pbXBvcnQgbWF4IGZyb20gJy4vbWF4LmpzJztcbmltcG9ydCBtaW4gZnJvbSAnLi9taW4uanMnO1xuaW1wb3J0IG1pbm1heCBmcm9tICcuL21pbm1heC5qcyc7XG5pbXBvcnQgbW9kIGZyb20gJy4vbW9kLmpzJztcbmltcG9ydCBwYXRoIGZyb20gJy4vcGF0aC5qcyc7XG5pbXBvcnQgcG93IGZyb20gJy4vcG93LmpzJztcbmltcG9ydCByYXkgZnJvbSAnLi9yYXkuanMnO1xuaW1wb3J0IHJlbSBmcm9tICcuL3JlbS5qcyc7XG5pbXBvcnQgcmVwZWF0IGZyb20gJy4vcmVwZWF0LmpzJztcbmltcG9ydCByb3VuZCBmcm9tICcuL3JvdW5kLmpzJztcbmltcG9ydCBzaWduIGZyb20gJy4vc2lnbi5qcyc7XG5pbXBvcnQgc2luIGZyb20gJy4vc2luLmpzJztcbmltcG9ydCBzcXJ0IGZyb20gJy4vc3FydC5qcyc7XG5pbXBvcnQgc3ltYm9scyBmcm9tICcuL3N5bWJvbHMuanMnO1xuaW1wb3J0IHRhbiBmcm9tICcuL3Rhbi5qcyc7XG5pbXBvcnQgdXJsIGZyb20gJy4vdXJsLmpzJztcbmltcG9ydCBjc3NWYXIgZnJvbSAnLi92YXIuanMnO1xuXG5leHBvcnQge1xuICBhYnMsXG4gIGFjb3MsXG4gIGFzaW4sXG4gIGF0YW4sXG4gIGF0YW4yLFxuICBhdHRyLFxuICBjYWxjLFxuICBjbGFtcCxcbiAgY29zLFxuICBjb3VudGVyLFxuICBjb3VudGVycyxcbiAgY3Jvc3NmYWRlLFxuICBlbGVtZW50LFxuICBlbnYsXG4gIGV4cCxcbiAgZml0Y29udGVudCxcbiAgaHlwb3QsXG4gIGxvZyxcbiAgbWF4LFxuICBtaW4sXG4gIG1pbm1heCxcbiAgbW9kLFxuICBwYXRoLFxuICBwb3csXG4gIHJheSxcbiAgcmVtLFxuICByZXBlYXQsXG4gIHJvdW5kLFxuICBzaWduLFxuICBzaW4sXG4gIHNxcnQsXG4gIHN5bWJvbHMsXG4gIHRhbixcbiAgdXJsLFxuICBjc3NWYXJcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhYnMsXG4gIGFjb3MsXG4gIGFzaW4sXG4gIGF0YW4sXG4gIGF0YW4yLFxuICBhdHRyLFxuICBjYWxjLFxuICBjbGFtcCxcbiAgY29zLFxuICBjb3VudGVyLFxuICBjb3VudGVycyxcbiAgY3Jvc3NmYWRlLFxuICBlbGVtZW50LFxuICBlbnYsXG4gIGV4cCxcbiAgZml0Y29udGVudCxcbiAgaHlwb3QsXG4gIGxvZyxcbiAgbWF4LFxuICBtaW4sXG4gIG1pbm1heCxcbiAgbW9kLFxuICBwYXRoLFxuICBwb3csXG4gIHJheSxcbiAgcmVtLFxuICByZXBlYXQsXG4gIHJvdW5kLFxuICBzaWduLFxuICBzaW4sXG4gIHNxcnQsXG4gIHN5bWJvbHMsXG4gIHRhbixcbiAgdXJsLFxuICBjc3NWYXJcbn0iLCAiaW1wb3J0IHsgY2FsYyB9IGZyb20gJy4uL2Z1bmN0aW9ucy9pbmRleC5qcyc7XG5cbmNvbnN0IG9yR2F0ZSA9IChhLCBiKSA9PiB7XG4gIGNvbnN0IEFvdmVyQiA9IChhLCBiKSA9PiBjYWxjKGBtaW4oMSwgbWF4KCR7YX0gLSAke2J9LCAwKSlgKTtcbiAgY29uc3QgQm92ZXJBID0gKGEsIGIpID0+IGNhbGMoYCgxIC0gJHtBb3ZlckIoYSwgYil9KWApO1xuXG4gIHJldHVybiBbXG4gICAgYCR7Qm92ZXJBKGIsIGEpfSAqICR7YX0gKyAke0FvdmVyQihhLCBiKX0gKiAke2J9YCwgLy8gVHJ1ZSBpZiBlaXRoZXIgYSBvciBiIGlzIHRydWVcbiAgICBgJHtBb3ZlckIoYSwgYil9ICogJHthfSArICR7Qm92ZXJBKGIsIGEpfSAqICR7Yn1gICAvLyBUcnVlIGlmIGJvdGggYSBhbmQgYiBhcmUgdHJ1ZVxuICBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvckdhdGUiLCAiaW1wb3J0IG9yR2F0ZSBmcm9tICcuL29yLmdhdGUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9yR2F0ZSxcbn0iLCAiaW1wb3J0IHsgY3NzVmFyIH0gZnJvbSAnLi4vZnVuY3Rpb25zL3Zhci5qcydcblxuLy8gR2V0dGluZyBhIHZhcmlhYmxlIGluIENTUyBzY29wZS5cbi8vIHdpbmRvd1xuLy8gICAuZ2V0Q29tcHV0ZWRTdHlsZShkaXYpXG4vLyAgIC5nZXRQcm9wZXJ0eVZhbHVlKCctLWV4YW1wbGUtdmFyJylcblxuY29uc3QgQW5vb3AgPSBhc3luYyAoKSA9PiB7fVxuXG4vKipcbiAqIEdldHMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSByb290IGVsZW1lbnQuXG4gKi9cbmNvbnN0IGdldFJvb3QgPSBfID0+IFxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbi8qKlxuICogR2V0cyB0aGUgY29tcHV0ZWQgc3R5bGUgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBUaGUgY29tcHV0ZWQgc3R5bGUgb2JqZWN0IGZvciB0aGUgcm9vdCBlbGVtZW50LlxuICovXG5jb25zdCBnZXRSb290U3R5bGUgPSBfID0+IFxuICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShnZXRSb290KCkpXG5cbi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIHByb3BlcnR5IHZhbHVlIGZyb20gdGhlIHJvb3Qgc3R5bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIENTUyBwcm9wZXJ0eSBuYW1lLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBDU1MgcHJvcGVydHkuXG4gKi9cbmNvbnN0IGdldFJvb3RTdHlsZVByb3BlcnR5ID0gcHJvcGVydHkgPT4gZ2V0Um9vdFN0eWxlKCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSlcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgcHJvcGVydHkgdmFsdWUgZnJvbSB0aGUgcm9vdCBzdHlsZSB3aXRoIGEgZmFsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIENTUyBwcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZhbGxiYWNrRm49QW5vb3BdIFRoZSBmYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBUaGUgdmFsdWUgb2YgdGhlIENTUyBwcm9wZXJ0eSBvciB0aGUgcmVzdWx0IG9mIHRoZSBmYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuY29uc3QgZ2V0Um9vdFN0eWxlUHJvcGVydHlXaXRoRmFsbGJhY2sgPSBhc3luYyAocHJvcGVydHksIGZhbGxiYWNrRm4gPSBBbm9vcCkgPT4ge1xuICBsZXQgcnMgPSBnZXRSb290U3R5bGUoKVxuICByZXR1cm4gcnMuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgXG4gICAgfHwgYXdhaXQgZmFsbGJhY2tGbihycylcbn1cblxuLyoqXG4gKiBTZXRzIGEgQ1NTIHByb3BlcnR5IG9uIHRoZSByb290IGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIENTUyBwcm9wZXJ0eSBuYW1lIHRvIHNldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBDU1MgcHJvcGVydHkuXG4gKi9cbmNvbnN0IHNldFJvb3RQcm9wID0gKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCByb290ID0gZ2V0Um9vdCgpXG4gIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKVxufVxuXG5jb25zdCBkZWxldGVSb290UHJvcCA9IHByb3BlcnR5ID0+IHtcbiAgY29uc3Qgcm9vdCA9IGdldFJvb3QoKVxuICByb290LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5KVxufVxuXG4vKipcbiAqIFNldHMgYSBDU1MgdmFyaWFibGUgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHZhcmlhYmxlIHRvIHNldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBDU1MgdmFyaWFibGUuXG4gKi9cbmNvbnN0IHNldFJvb3RWYXIgPSAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gIHNldFJvb3RQcm9wKGAtLSR7cHJvcGVydHl9YCwgdmFsdWUpXG59XG5cbmNvbnN0IGRlbGV0ZVJvb3RWYXIgPSBwcm9wZXJ0eSA9PiB7XG4gIGRlbGV0ZVJvb3RQcm9wKGAtLSR7cHJvcGVydHl9YClcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgdmFyaWFibGUgdmFsdWUgZnJvbSB0aGUgcm9vdCBzdHlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHZhcmlhYmxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBDU1MgdmFyaWFibGUuXG4gKi9cbmNvbnN0IGdldFJvb3RWYXIgPSBwcm9wZXJ0eSA9PiBnZXRSb290U3R5bGVQcm9wZXJ0eShgLS0ke3Byb3BlcnR5fWApXG5cbi8qKlxuICogU2V0cyBhIENTUyBwcm9wZXJ0eSBvbiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IG9uIHdoaWNoIHRvIHNldCB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIENTUyBwcm9wZXJ0eSBuYW1lIHRvIHNldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBDU1MgcHJvcGVydHkuXG4gKi9cbmNvbnN0IHNldENTU1Byb3AgPSAoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuICAuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKVxuXG5jb25zdCBkZWxldGVDU1NQcm9wID0gKGVsZW1lbnQsIHByb3BlcnR5KSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuICAucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpXG5cbi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIHByb3BlcnR5IHZhbHVlIGZyb20gYSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBmcm9tIHdoaWNoIHRvIGdldCB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIENTUyBwcm9wZXJ0eSBuYW1lLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBDU1MgcHJvcGVydHkuXG4gKi9cbmNvbnN0IGdldENTU1Byb3AgPSAoZWxlbWVudCwgcHJvcGVydHkpID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG4gIC5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxuXG4vKipcbiAqIFJldHJpZXZlcyBhIENTUyB2YXJpYWJsZSB2YWx1ZSBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgZnJvbSB3aGljaCB0byBnZXQgdGhlIHZhcmlhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdmFsdWUgb2YgdGhlIENTUyB2YXJpYWJsZS5cbiAqL1xuY29uc3QgZ2V0Q1NTVmFyID0gKGVsZW1lbnQsIHByb3BlcnR5KSA9PiBnZXRDU1NQcm9wKGVsZW1lbnQsIGAtLSR7cHJvcGVydHl9YClcblxuLyoqXG4gKiBTZXRzIGEgQ1NTIHZhcmlhYmxlIG9uIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgb24gd2hpY2ggdG8gc2V0IHRoZSB2YXJpYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHZhcmlhYmxlIHRvIHNldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBDU1MgdmFyaWFibGUuXG4gKi9cbmNvbnN0IHNldENTU1ZhciA9IChlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpID0+IHNldENTU1Byb3AoZWxlbWVudCwgYC0tJHtwcm9wZXJ0eX1gICwgdmFsdWUpXG5cbi8qKlxuICogUmVtb3ZlcyBhIENTUyB2YXJpYWJsZSBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgZnJvbSB3aGljaCB0byByZW1vdmUgdGhlIHZhcmlhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUgdG8gcmVtb3ZlLlxuICovXG5jb25zdCBkZWxldGVDU1NWYXIgPSAoZWxlbWVudCwgcHJvcGVydHkpID0+IGRlbGV0ZUNTU1Byb3AoZWxlbWVudCwgYC0tJHtwcm9wZXJ0eX1gKVxuXG4vLyAtLS1cbnZhciBydW5uaW5nQ1NTX0V2YWxzID0gMDtcblxuLyoqXG4gKiBFdmFsdWF0ZXMgYSBDU1MgcHJvcGVydHkgYnkgdGVtcG9yYXJpbHkgYXBwbHlpbmcgaXQgdG8gdGhlIHJvb3QgYW5kIHJldHJpZXZpbmcgaXRzIGNvbXB1dGVkIHZhbHVlLlxuICogQHBhcmFtIHtzdHJpbmd9IGNzcyBUaGUgQ1NTIHByb3BlcnR5IHZhbHVlIHRvIGV2YWx1YXRlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbXB1dGVkIHZhbHVlIG9mIHRoZSBDU1MgcHJvcGVydHkuXG4gKi9cbmNvbnN0IGV2YWxDU1NQcm9wID0gY3NzID0+IHtcbiAgY29uc3QgbmFtZSA9ICdldmFsLWNzcy0nICsgcnVubmluZ0NTU19FdmFscztcbiAgKytydW5uaW5nQ1NTX0V2YWxzO1xuICBzZXRSb290VmFyKG5hbWUsIGNzcylcbiAgXG4gIGxldCByZXMgPSBnZXRSb290VmFyKG5hbWUpXG4gIC0tcnVubmluZ0NTU19FdmFscztcbiAgZGVsZXRlUm9vdFZhcihuYW1lKVxuXG4gIHJldHVybiByZXM7XG59XG5cbmNvbnN0IGV2YWxDU1NIYXJkID0gKHJ1bGUsIGNzcykgPT4gQ1NTU3R5bGVWYWx1ZS5wYXJzZShydWxlLCBjc3MpXG5cbmNvbnN0IGNyZWF0ZUNvdW50ZXIgPSAoZWxlbWVudCwgcHJvcGVydHksIHZhcl8pID0+IHtcbiAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgYGNvdW50ZXIoJHt2YXJffSlgKVxuICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCdjb3VudGVyLXJlc2V0JywgYCR7dmFyX30gJHtjc3NWYXIodmFyXyl9YClcbiAgcmV0dXJuIGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY3VzdG9tIENTUyBwcm9wZXJ0eSB3aXRoIGEgZ2l2ZW4gbmFtZSBhbmQgb3B0aW9uYWwgcGFyYW1ldGVycy5cbiAqIElmIHRoZSBicm93c2VyIGlzIEZpcmVmb3gsIHRoZSBwcm9wZXJ0eSBpcyBzZXQgb24gdGhlIHJvb3QgZWxlbWVudCBpbnN0ZWFkLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIENTUyBwcm9wZXJ0eSB0byBjcmVhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGE9e31dIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHByb3BlcnR5LCBzdWNoIGFzIHN5bnRheCBhbmQgaW5pdGlhbFZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5oZXJpdHM9ZmFsc2VdIFdoZXRoZXIgdGhlIHByb3BlcnR5IHNob3VsZCBiZSBpbmhlcml0ZWQgYnkgZGVzY2VuZGFudCBlbGVtZW50cy5cbiAqL1xuY29uc3QgY3JlYXRlUHJvcGVydHkgPSAobmFtZSwgZGF0YSA9IHt9LCBpbmhlcml0cyA9IGZhbHNlKSA9PiB7XG4gIC8vIElzIGZpcmVmb3g/XG4gIGxldCBpc0ZGID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xuXG4gIGlmICghaXNGRikge1xuICAgIENTUy5yZWdpc3RlclByb3BlcnR5KHtcbiAgICAgIG5hbWUsXG4gICAgICBzeW50YXg6IGRhdGE/LnN5bnRheCB8fCBcIjxjb2xvcj5cIixcbiAgICAgIGluaGVyaXRzOiBpbmhlcml0cyB8fCBmYWxzZSxcbiAgICAgIGluaXRpYWxWYWx1ZTogZGF0YT8uaW5pdGlhbFZhbHVlIHx8IFwiI2MwZmZlZVwiLFxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgc2V0Um9vdFZhcihuYW1lLCBkYXRhPy5pbml0aWFsVmFsdWUgfHwgXCIjYzBmZmVlXCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRSb290LFxuICBnZXRSb290U3R5bGUsXG4gIGdldFJvb3RTdHlsZVByb3BlcnR5LFxuICBnZXRSb290U3R5bGVQcm9wZXJ0eVdpdGhGYWxsYmFjayxcbiAgc2V0Um9vdFByb3AsXG4gIGRlbGV0ZVJvb3RQcm9wLFxuICBzZXRSb290VmFyLFxuICBkZWxldGVSb290VmFyLFxuICBnZXRSb290VmFyLFxuICBzZXRDU1NQcm9wLFxuICBkZWxldGVDU1NQcm9wLFxuICBnZXRDU1NQcm9wLFxuICBnZXRDU1NWYXIsXG4gIHNldENTU1ZhcixcbiAgZGVsZXRlQ1NTVmFyLFxuXG4gIGV2YWxDU1NQcm9wLFxuICBldmFsQ1NTSGFyZCxcbiAgXG4gIGNyZWF0ZVByb3BlcnR5LFxuICBjcmVhdGVDb3VudGVyLFxufSIsICJpbXBvcnQgcm9vdE1hbmlwdWxhdGUgZnJvbSAnLi9yb290TWFuaXB1bGF0ZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHsgXG4gIHJvb3RNYW5pcHVsYXRlXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNNTyxJQUFNLFVBQVUsa0JBQWdCLGFBQWEsWUFBWTtBQUNoRSxJQUFPLGtCQUFROzs7QUNEUixJQUFNLHFCQUFxQixDQUFDLE1BQU0sS0FBSyxvQkFBb0I7QUFDaEUsTUFBSSxjQUFjLGtCQUFrQixJQUFJO0FBQUEsY0FBb0IsR0FBRztBQUUvRCxNQUFJLGlCQUFpQjtBQUNuQixtQkFBZTtBQUFBLHNCQUEwQixlQUFlO0FBQUEsRUFDMUQ7QUFFQSxpQkFBZTtBQUVmLFNBQU87QUFDVDtBQUNBLElBQU8sdUJBQVE7OztBQ1ZSLElBQU0sdUJBQXVCLENBQUMsTUFBTSxXQUFXLFdBQVc7QUFDL0QsTUFBSSxnQkFBZ0IsY0FBYyxPQUFPLE9BQU8sTUFBTSxFQUFFLElBQUksU0FBUztBQUFBLEVBQVEsTUFBTTtBQUFBO0FBQ25GLFNBQU87QUFDVDtBQUNBLElBQU8sb0JBQVE7OztBQ0hSLElBQU0sbUJBQW1CLENBQUMsTUFBTSxRQUFRLFVBQVUsaUJBQWlCO0FBQ3hFLFNBQU87QUFBQSxJQUNMLENBQUMsYUFBYSxJQUFJLEVBQUUsR0FDbEIsT0FDQyxDQUFDLFNBQ0QsQ0FBQyxX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QSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7OztBQ3VEQSxTQUFTLGVBQWUsUUFBUSxJQUFJO0FBQ2xDLFVBQVEsT0FBTztBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUNILGFBQU8sSUFBSSxLQUFLO0FBQUEsSUFFbEI7QUFDRSxhQUFPO0FBQUEsRUFD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QUNkO0FBQUEsRUFFQSxlQUFlO0FBQ2IsV0FBTyxLQUFLLFNBQVMsU0FBUyxLQUFLLFVBQVU7QUFBQSxFQUMvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUUEsU0FBUyxRQUFRO0FBRWYsWUFBUSxNQUFNO0FBQUEsTUFDWixLQUFLLGtCQUFrQjtBQUFBLE1BQ3ZCLEtBQUssa0JBQWtCO0FBQUEsTUFDdkIsS0FBSyxrQkFBa0I7QUFBQSxNQUN2QixNQUFLLGtCQUFrQix5QkFBeUIsT0FBTyxXQUFXO0FBQ2hFLGVBQU8sT0FBTztBQUFBLE1BRWhCLEtBQUssa0JBQWtCO0FBQ3JCLGVBQU8sT0FBTztBQUFBLE1BRWhCO0FBQ0UsY0FBTSxJQUFJLE1BQU0scURBQXFEO0FBQUEsSUFDekU7QUFBQSxFQUNGO0FBQUEsRUFFQSxpQkFBaUI7QUFDZixRQUFJLEtBQUssS0FBSyxpQkFBaUI7QUFDL0IsUUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFFBQUksUUFBUSxHQUFHO0FBQ2YsUUFBSSxXQUFXLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDckMsT0FBRyxXQUFXLFNBQVMsS0FBSztBQUFBLEVBQzlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxVQUFVO0FBQ1IsUUFBSSxLQUFLLEtBQUssaUJBQWlCO0FBQy9CLFFBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUV6QixVQUFNLGFBQWEsUUFBUSxVQUFVO0FBRXJDLFFBQUksTUFBTSxLQUFLO0FBR2YsUUFBSSxXQUFXLEtBQUssTUFBTSxJQUFJLFVBQVE7QUFDcEMsWUFBTSxFQUFFLFVBQVUsYUFBYSxJQUFJO0FBRW5DLG1CQUFhLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNO0FBQ2pDLFlBQUksYUFBYSxHQUFHLEdBQUcsS0FBSyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksZ0JBQWdCLEVBQUU7QUFDbkUsWUFBSUMsU0FBUSxHQUFHLFFBQVEsTUFBTSxVQUFVO0FBQ3ZDLFdBQUcsV0FBV0EsUUFBTyxHQUFHLFNBQVMsTUFBTTtBQUN2QyxlQUFPQTtBQUFBLE1BQ1QsQ0FBQztBQUVELGFBQU87QUFBQSxRQUNMLENBQUMsUUFBUSxHQUFHO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksQ0FBQyxLQUFLLGFBQWEsR0FBRztBQUN4QixXQUFLLFNBQVMsS0FBSyxZQUFZLEtBQUs7QUFBQSxJQUN0QztBQUVBLFdBQU87QUFBQSxFQUNUO0FBRUY7QUFFQSxJQUFPLHFCQUFROyIsCiAgIm5hbWVzIjogWyJtaW4iLCAibWF4IiwgIm1pbiIsICJtYXgiLCAicGF0aCIsICJhIiwgImIiLCAiZWxlbWVudCIsICJkb2N1bWVudCIsICJzdHlsZSJdCn0K