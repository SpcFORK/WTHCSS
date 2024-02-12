"use strict";

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

// src/WTFCss/src/wtfcss.js
var ep_ = {
  stylesheet: stylesheet_default
};
var ev_ = new CustomEvent("wtfcss:loaded", {
  detail: {
    version: "0.0.1",
    entrypoint: ep_
  }
});
window.WTFCSS = { ...ep_ };
window.dispatchEvent(ev_);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY2hhcnNldC5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bjb2xvcnByb2ZpbGUuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY29udGFpbmVyLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQHByb3BlcnR5LmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGNvdW50ZXJzdHlsZS5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bmb250ZmFjZS5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bmb250ZmVhdHVyZXZhbHVlcy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bmb250cGFsbGV0ZXZhbHVlcy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BpbXBvcnQuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Aa2V5ZnJhbWVzLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGxheWVyLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQG1lZGlhLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQG5hbWVzcGFjZS5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BwYWdlLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQHN0YXJ0aW5nc3R5bGUuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Ac3VwcG9ydHMuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9pbmRleC5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9rZXl3b3Jkcy90eXBlcy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9rZXl3b3Jkcy9pbXBvcnRhbnQuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMva2V5d29yZHMvaW5kZXguanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Ficy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYWNvcy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXNpbi5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXRhbi5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXRhbjIuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2F0dHIuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NhbGMuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NsYW1wLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jb3MuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXIuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXJzLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jcm9zc2ZhZGUuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2VsZW1lbnQuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Vudi5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvZXhwLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9maXRjb250ZW50LmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9oeXBvdC5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbG9nLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9tYXguanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL21pbi5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbWlubWF4LmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9tb2QuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3BhdGguanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Bvdy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcmF5LmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9yZW0uanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JlcGVhdC5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcm91bmQuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3NpZ24uanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Npbi5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvc3FydC5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvc3ltYm9scy5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvdGFuLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy91cmwuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Zhci5qcyIsICIuLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvaW5kZXguanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9vci5nYXRlLmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hhbmRsZXMvaW5kZXguanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvbWFnaWMvcm9vdE1hbmlwdWxhdGUuanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvbWFnaWMvaW5kZXguanMiLCAiLi4vLi4vc3JjL1dURkNzcy9zcmMvY29yZS9zdHlsZXNoZWV0LmpzIiwgIi4uLy4uL3NyYy9XVEZDc3Mvc3JjL3d0ZmNzcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBEZWZpbmVzIGEgY2hhcnNldCBmb3IgYSBDU1MgZmlsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhcnNldFZhbHVlIC0gVGhlIGNoYXJzZXQgdG8gYmUgc2V0IGZvciB0aGUgQ1NTIGZpbGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBjaGFyc2V0IHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBjaGFyc2V0ID0gY2hhcnNldFZhbHVlID0+IGBAY2hhcnNldCBcIiR7Y2hhcnNldFZhbHVlfVwiO2BcbmV4cG9ydCBkZWZhdWx0IGNoYXJzZXQ7IiwgIi8qKlxuICogRGVmaW5lcyBhIGNvbG9yIHByb2ZpbGUgZm9yIHVzZSBpbiBDU1MuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb2xvciBwcm9maWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIFRoZSBVUkwgb2YgdGhlIGNvbG9yIHByb2ZpbGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3JlbmRlcmluZ0ludGVudF0gLSBUaGUgcmVuZGVyaW5nIGludGVudCB0byB1c2UuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVDb2xvclByb2ZpbGUgPSAobmFtZSwgc3JjLCByZW5kZXJpbmdJbnRlbnQpID0+IHtcbiAgbGV0IHByb2ZpbGVSdWxlID0gYEBjb2xvci1wcm9maWxlICR7bmFtZX0ge1xcbiAgc3JjOiB1cmwoXFxcIiR7c3JjfVxcXCIpYDtcblxuICBpZiAocmVuZGVyaW5nSW50ZW50KSB7XG4gICAgcHJvZmlsZVJ1bGUgKz0gYDtcXG4gIHJlbmRlcmluZy1pbnRlbnQ6ICR7cmVuZGVyaW5nSW50ZW50fWA7XG4gIH1cblxuICBwcm9maWxlUnVsZSArPSAnO1xcbn0nO1xuXG4gIHJldHVybiBwcm9maWxlUnVsZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbG9yUHJvZmlsZSIsICIvKipcbiAqIEFwcGxpZXMgc3R5bGVzIHRvIGEgY29udGFpbm1lbnQgY29udGV4dCBiYXNlZCBvbiBhIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG9wdGlvbmFsIG5hbWUgb2YgdGhlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25kaXRpb24gLSBUaGUgY29udGFpbmVyIHF1ZXJ5IGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZXMgLSBUaGUgQ1NTIHN0eWxlcyB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAY29udGFpbmVyIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseUNvbnRhaW5lclN0eWxlcyA9IChuYW1lLCBjb25kaXRpb24sIHN0eWxlcykgPT4ge1xuICBsZXQgY29udGFpbmVyUnVsZSA9IGBAY29udGFpbmVyICR7bmFtZSA/IG5hbWUgKyAnICcgOiAnJ30oJHtjb25kaXRpb259KSB7XFxuJHtzdHlsZXN9XFxufWA7XG4gIHJldHVybiBjb250YWluZXJSdWxlO1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlDb250YWluZXJTdHlsZXMiLCAiLyoqXG4gKiBSZWdpc3RlcnMgYSBjdXN0b20gQ1NTIHByb3BlcnR5IHVzaW5nIHRoZSBAcHJvcGVydHkgcnVsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGN1c3RvbSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzeW50YXggLSBEZXNjcmliZXMgdGhlIGFsbG93YWJsZSBzeW50YXggZm9yIHRoZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdHMgLSBDb250cm9scyB3aGV0aGVyIHRoZSBjdXN0b20gcHJvcGVydHkgaW5oZXJpdHMgYnkgZGVmYXVsdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpbml0aWFsVmFsdWUgLSBTZXRzIHRoZSBpbml0aWFsIHZhbHVlIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZm9ybWF0dGVkIEBwcm9wZXJ0eSBydWxlLlxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJQcm9wZXJ0eSA9IChuYW1lLCBzeW50YXgsIGluaGVyaXRzLCBpbml0aWFsVmFsdWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBbYEBwcm9wZXJ0eSAke25hbWV9YF06IChcbiAgICAgIFwieyBcIiArXG4gICAgICAoIXN5bnRheCA/PyBgc3ludGF4OiBcIiR7c3ludGF4fVwiOyBgKSArXG4gICAgICAoIWluaGVyaXRzID8/IGBpbmhlcml0czogJHtpbmhlcml0c307IGApICtcbiAgICAgICghaW5pdGlhbFZhbHVlID8/IGBpbml0aWFsLXZhbHVlOiAke2luaXRpYWxWYWx1ZX07YCkgK1xuICAgICAgXCIgfVwiXG4gICAgKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlclByb3BlcnR5IiwgIi8qKlxuICogRGVmaW5lcyBhIGN1c3RvbSBjb3VudGVyIHN0eWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY291bnRlciBzdHlsZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBydWxlcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBkZXNjcmlwdG9ycyBhbmQgdmFsdWVzIGZvciB0aGUgc3R5bGUuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIG5hbWUgaXMgb25lIG9mIHRoZSByZXNlcnZlZCBzdHlsZSBuYW1lcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGNvdW50ZXItc3R5bGUgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUNvdW50ZXJTdHlsZSA9IChuYW1lLCBydWxlcykgPT4ge1xuICBpZiAoWydkZWNpbWFsJywgJ2Rpc2MnLCAnc3F1YXJlJywgJ2NpcmNsZScsICdkaXNjbG9zdXJlLW9wZW4nLCAnZGlzY2xvc3VyZS1jbG9zZWQnXS5pbmNsdWRlcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgbmFtZSBcIiR7bmFtZX1cIiBpcyBub3QgYWxsb3dlZCBmb3IgY3VzdG9tIGNvdW50ZXIgc3R5bGVzLmApO1xuICB9XG5cbiAgY29uc3QgcnVsZUVudHJpZXMgPSBPYmplY3QuZW50cmllcyhydWxlcykubWFwKChbZGVzY3JpcHRvciwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKGRlc2NyaXB0b3IgPT09ICdzeW1ib2xzJyB8fCBkZXNjcmlwdG9yID09PSAnYWRkaXRpdmUtc3ltYm9scycpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKHN5bWJvbCA9PiBgXFxcIiR7c3ltYm9sfVxcXCJgKS5qb2luKCcgJyk7XG4gICAgfVxuICAgIHJldHVybiBgJHtkZXNjcmlwdG9yfTogJHt2YWx1ZX1gO1xuICB9KTtcbiAgY29uc3QgcnVsZVN0cmluZyA9IHJ1bGVFbnRyaWVzLmpvaW4oJzsgJyk7XG4gIGNvbnN0IGNvdW50ZXJSdWxlID0gYEBjb3VudGVyLXN0eWxlICR7bmFtZX0geyAke3J1bGVTdHJpbmd9IH1gO1xuXG4gIHJldHVybiBjb3VudGVyUnVsZVxufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ291bnRlclN0eWxlIiwgIi8qKlxuICogQ3JlYXRlcyBhIENTUyBAZm9udC1mYWNlIHJ1bGUgc3RyaW5nLlxuICogQHBhcmFtIHtvYmplY3R9IGZvbnRGYWNlIC0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgZm9udCBmYWNlIGNvbmZpZ3VyYXRpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBmb250LWZhY2UgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUZvbnRGYWNlID0gZm9udEZhY2UgPT4ge1xuICBjb25zdCBmb250RmFjZVJ1bGUgPSBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiJHtmb250RmFjZS5mYW1pbHl9XCI7XG4gICAgc3JjOiAke2ZvbnRGYWNlLnNvdXJjZXMubWFwKHNvdXJjZSA9PiB7XG4gICAgICBpZiAoc291cmNlLnVybCkge1xuICAgICAgICByZXR1cm4gYHVybChcIiR7c291cmNlLnVybH1cIikgZm9ybWF0KFwiJHtzb3VyY2UuZm9ybWF0fVwiKWA7XG4gICAgICB9IGVsc2UgaWYgKHNvdXJjZS5sb2NhbCkge1xuICAgICAgICByZXR1cm4gYGxvY2FsKFwiJHtzb3VyY2UubG9jYWx9XCIpYDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9KS5qb2luKCcsXFxuICAgICcpfTtcbiAgICAke2ZvbnRGYWNlLmRlc2NyaXB0b3JzID8gT2JqZWN0LmVudHJpZXMoZm9udEZhY2UuZGVzY3JpcHRvcnMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgJHtrZXl9OiAke3ZhbHVlfWApLmpvaW4oJztcXG4gICAgJykgOiAnJ31cbiAgfWA7XG5cbiAgcmV0dXJuIGZvbnRGYWNlUnVsZVxufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUZvbnRGYWNlIiwgIi8qKlxuICogRGVmaW5lcyBmb250IGZlYXR1cmUgdmFsdWVzIGZvciBhIGdpdmVuIGZvbnQgZmFtaWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IGZhbWlseU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZVZhbHVlcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmZWF0dXJlIHRhZ3MgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1mZWF0dXJlLXZhbHVlcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udEZlYXR1cmVWYWx1ZXMgPSAoZmFtaWx5TmFtZSwgZmVhdHVyZVZhbHVlcykgPT4ge1xuICBjb25zdCBmZWF0dXJlQmxvY2tzID0gT2JqZWN0LmVudHJpZXMoZmVhdHVyZVZhbHVlcykubWFwKChbZmVhdHVyZSwgdmFsdWVzXSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlU3RyaW5nID0gQXJyYXkuaXNBcnJheSh2YWx1ZXMpID8gdmFsdWVzLmpvaW4oJyAnKSA6IHZhbHVlcztcbiAgICByZXR1cm4gYEAke2ZlYXR1cmV9IHsgJHtmYW1pbHlOYW1lfTogJHt2YWx1ZVN0cmluZ307IH1gO1xuICB9KS5qb2luKCdcXG4nKTtcbiAgcmV0dXJuIGBAZm9udC1mZWF0dXJlLXZhbHVlcyAke2ZhbWlseU5hbWV9IHtcXG4ke2ZlYXR1cmVCbG9ja3N9XFxufWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRm9udEZlYXR1cmVWYWx1ZXMiLCAiLyoqXG4gKiBEZWZpbmVzIGZvbnQgcGFsZXR0ZSB2YWx1ZXMgZm9yIGEgZ2l2ZW4gaWRlbnRpZmllci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyIC0gVGhlIGlkZW50aWZpZXIgZm9yIHRoZSBmb250IHBhbGV0dGUgdmFsdWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IFtmYW1pbHlOYW1lXSAtIFRoZSBuYW1lIG9mIHRoZSBmb250IGZhbWlseS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYmFzZVBhbGV0dGVdIC0gVGhlIGJhc2UgcGFsZXR0ZSBvZiB0aGUgZm9udC5cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8c3RyaW5nPj59IFtvdmVycmlkZUNvbG9yc10gLSBBbiBhcnJheSBvZiBjb2xvciBvdmVycmlkZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBmb250LXBhbGV0dGUtdmFsdWVzIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVGb250UGFsZXR0ZVZhbHVlcyA9IChpZGVudGlmaWVyLCBmYW1pbHlOYW1lLCBiYXNlUGFsZXR0ZSwgb3ZlcnJpZGVDb2xvcnMpID0+IHtcbiAgY29uc3QgZGVjbGFyYXRpb25zID0gW107XG4gIGlmIChmYW1pbHlOYW1lKSBkZWNsYXJhdGlvbnMucHVzaChgZm9udC1mYW1pbHk6ICR7ZmFtaWx5TmFtZX07YCk7XG4gIGlmIChiYXNlUGFsZXR0ZSkgZGVjbGFyYXRpb25zLnB1c2goYGJhc2UtcGFsZXR0ZTogJHtiYXNlUGFsZXR0ZX07YCk7XG4gIGlmIChvdmVycmlkZUNvbG9ycykge1xuICAgIGNvbnN0IGNvbG9yT3ZlcnJpZGVzID0gb3ZlcnJpZGVDb2xvcnMubWFwKGNvbG9yID0+IGNvbG9yLmpvaW4oJyAnKSkuam9pbignLFxcbiAgICAnKTtcbiAgICBkZWNsYXJhdGlvbnMucHVzaChgb3ZlcnJpZGUtY29sb3JzOlxcbiAgICAke2NvbG9yT3ZlcnJpZGVzfTtgKTtcbiAgfVxuXG4gIHJldHVybiBgQGZvbnQtcGFsZXR0ZS12YWx1ZXMgJHtpZGVudGlmaWVyfSB7XFxuICAke2RlY2xhcmF0aW9ucy5qb2luKCdcXG4gICcpfVxcbn1gO1xufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRm9udFBhbGV0dGVWYWx1ZXMiLCAiLyoqXG4gKiBDcmVhdGVzIGFuIEBpbXBvcnQgcnVsZSB3aXRoIG9wdGlvbmFsIGNvbmRpdGlvbnMgYW5kIGxheWVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGltcG9ydFBhdGggLSBUaGUgVVJMIG9mIHRoZSBmaWxlIHRvIGJlIGltcG9ydGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IFttZWRpYVF1ZXJpZXNdIC0gVGhlIG1lZGlhIHF1ZXJ5IGNvbmRpdGlvbnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N1cHBvcnRzQ29uZGl0aW9uXSAtIFRoZSBzdXBwb3J0cyBjb25kaXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xheWVyTmFtZV0gLSBUaGUgbmFtZSBvZiB0aGUgbGF5ZXIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBjb21wbGV0ZSBAaW1wb3J0IHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVJbXBvcnQgPSAoaW1wb3J0UGF0aCwgbWVkaWFRdWVyaWVzID0gJycsIHN1cHBvcnRzQ29uZGl0aW9uID0gJycsIGxheWVyTmFtZSA9ICcnKSA9PiB7XG4gIGxldCBpbXBvcnRSdWxlID0gYEBpbXBvcnQgdXJsKCR7aW1wb3J0UGF0aH0pYDtcblxuICBpZiAobGF5ZXJOYW1lKSB7XG4gICAgaW1wb3J0UnVsZSArPSBgIGxheWVyKCR7bGF5ZXJOYW1lfSlgO1xuICB9XG5cbiAgaWYgKHN1cHBvcnRzQ29uZGl0aW9uKSB7XG4gICAgaW1wb3J0UnVsZSArPSBgIHN1cHBvcnRzKCR7c3VwcG9ydHNDb25kaXRpb259KWA7XG4gIH1cblxuICBpZiAobWVkaWFRdWVyaWVzKSB7XG4gICAgaW1wb3J0UnVsZSArPSBgICR7bWVkaWFRdWVyaWVzfWA7XG4gIH1cblxuICBpbXBvcnRSdWxlICs9ICc7JztcblxuICByZXR1cm4gaW1wb3J0UnVsZTtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUltcG9ydCIsICIvKipcbiAqIERlZmluZXMga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGFuaW1hdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZnJhbWVzIC0gQW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIGtleWZyYW1lcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGFyZ3VtZW50cyBhcmUgbm90IGEgc3RyaW5nIGFuZCBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAa2V5ZnJhbWVzIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVLZXlmcmFtZXMgPSAobmFtZSwgZnJhbWVzKSA9PiB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIUFycmF5LmlzQXJyYXkoZnJhbWVzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGZvciBkZWZpbmVLZXlmcmFtZXMuJyk7XG4gIH1cblxuICBjb25zdCBrZXlmcmFtZVJ1bGVzID0gZnJhbWVzLm1hcChmcmFtZSA9PiB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gT2JqZWN0LmtleXMoZnJhbWUpWzBdO1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3QuZW50cmllcyhmcmFtZVtvZmZzZXRdKS5tYXAoKFtwcm9wLCB2YWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiBgJHtwcm9wfTogJHt2YWx1ZX1gO1xuICAgIH0pLmpvaW4oJzsgJyk7XG5cbiAgICByZXR1cm4gYCR7b2Zmc2V0fSB7ICR7cHJvcGVydGllc30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBrZXlmcmFtZXMgJHtuYW1lfSB7ICR7a2V5ZnJhbWVSdWxlc30gfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lS2V5ZnJhbWVzIiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBsYXllciBhbmQgaXRzIGFzc29jaWF0ZWQgc3R5bGUgcnVsZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBsYXllci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBydWxlcyAtIEFuIG9iamVjdCBtYXBwaW5nIHNlbGVjdG9ycyB0byB0aGVpciByZXNwZWN0aXZlIHN0eWxlIHJ1bGVzLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgYXJndW1lbnRzIGFyZSBub3QgYSBzdHJpbmcgYW5kIGFuIG9iamVjdCBvZiBzdHlsZSBydWxlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGxheWVyIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVMYXllciA9IChuYW1lLCBydWxlcykgPT4ge1xuICBpZiAoIW5hbWUgfHwgdHlwZW9mIHJ1bGVzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGZvciBkZWZpbmVMYXllci4nKTtcbiAgfVxuXG4gIGNvbnN0IGxheWVyUnVsZXMgPSBPYmplY3QuZW50cmllcyhydWxlcykubWFwKChbc2VsZWN0b3IsIHN0eWxlUnVsZXNdKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVTdHJpbmcgPSBPYmplY3QuZW50cmllcyhzdHlsZVJ1bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2ApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gYCR7c2VsZWN0b3J9IHsgJHtzdHlsZVN0cmluZ30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBsYXllciAke25hbWV9IHsgJHtsYXllclJ1bGVzfSB9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmVMYXllck9yZGVyID0gKC4uLm5hbWVzKSA9PiAoYEBsYXllciBgICsgbmFtZXMuam9pbignICcpKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlZmluZUxheWVyLFxuICBkZWZpbmVMYXllck9yZGVyXG59IiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBtZWRpYSBxdWVyeSBhbmQgaXRzIGFzc29jaWF0ZWQgc3R5bGUgcnVsZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWFRdWVyeSAtIFRoZSBtZWRpYSBxdWVyeSBzdHJpbmcuXG4gKiBAcGFyYW0ge29iamVjdH0gc3R5bGVzIC0gQW4gb2JqZWN0IG1hcHBpbmcgc2VsZWN0b3JzIHRvIHRoZWlyIHJlc3BlY3RpdmUgc3R5bGUgcnVsZXMuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBhcmd1bWVudHMgYXJlIG5vdCBhIHN0cmluZyBhbmQgYW4gb2JqZWN0IG9mIHN0eWxlIHJ1bGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAbWVkaWEgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZU1lZGlhID0gKG1lZGlhUXVlcnksIHN0eWxlcykgPT4ge1xuICBpZiAodHlwZW9mIG1lZGlhUXVlcnkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzdHlsZXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZm9yIGRlZmluZU1lZGlhLicpO1xuICB9XG5cbiAgY29uc3Qgc3R5bGVFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5tYXAoKFtzZWxlY3Rvciwgc3R5bGVSdWxlc10pID0+IHtcbiAgICBjb25zdCBzdHlsZVN0cmluZyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlUnVsZXMpLm1hcCgoW3Byb3BlcnR5LCB2YWx1ZV0pID0+IGAke3Byb3BlcnR5fTogJHt2YWx1ZX07YCkuam9pbignICcpO1xuICAgIHJldHVybiBgJHtzZWxlY3Rvcn0geyAke3N0eWxlU3RyaW5nfSB9YDtcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgQG1lZGlhICR7bWVkaWFRdWVyeX0geyAke3N0eWxlRW50cmllc30gfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWVkaWEiLCAiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIG5hbWVzcGFjZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4XSAtIFRoZSBvcHRpb25hbCBwcmVmaXggZm9yIHRoZSBuYW1lc3BhY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpIC0gVGhlIFVSSSBvZiB0aGUgbmFtZXNwYWNlLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBVUkkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAbmFtZXNwYWNlIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVOYW1lc3BhY2UgPSAocHJlZml4LCB1cmkpID0+IHtcbiAgaWYgKCF1cmkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSSSBmb3IgbmFtZXNwYWNlIGlzIHJlcXVpcmVkLicpO1xuICB9XG5cbiAgY29uc3QgbmFtZXNwYWNlUHJlZml4ID0gcHJlZml4ID8gYCR7cHJlZml4fSBgIDogJyc7XG4gIHJldHVybiBgQG5hbWVzcGFjZSAke25hbWVzcGFjZVByZWZpeH11cmwoJHt1cml9KTtgO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZU5hbWVzcGFjZSIsICIvKipcbiAqIERlZmluZXMgYSBDU1MgQHBhZ2UgcnVsZSB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBzdHlsZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcGFnZSBydWxlLlxuICogQHBhcmFtIHtvYmplY3R9IHN0eWxlcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBDU1MgcHJvcGVydGllcyBhbmQgdmFsdWVzLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBzdHlsZXMgaXMgbm90IGFuIG9iamVjdC5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBhIHByb3BlcnR5IGlzIG5vdCBhbGxvd2VkIHdpdGhpbiBAcGFnZSBydWxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAcGFnZSBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lUGFnZSA9IChuYW1lLCBzdHlsZXMpID0+IHtcbiAgaWYgKHR5cGVvZiBzdHlsZXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU3R5bGVzIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICB9XG5cbiAgY29uc3Qgc3R5bGVFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKCEvXm1hcmdpbi18XmJvcmRlci18XnBhZGRpbmctfF5iYWNrZ3JvdW5kLXxeZm9udC18XnRleHQtfF5jb2xvciR8Xm91dGxpbmUkfF5jb3VudGVyLXxed2lkdGgkfF5oZWlnaHQkfF5saW5lLWhlaWdodCR8XnF1b3RlcyR8XnZpc2liaWxpdHkkLy50ZXN0KHByb3BlcnR5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSBcIiR7cHJvcGVydHl9XCIgaXMgbm90IGFsbG93ZWQgd2l0aGluIEBwYWdlIHJ1bGUuYCk7XG4gICAgfVxuICAgIHJldHVybiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2A7XG4gIH0pLmpvaW4oJyAnKTtcblxuICBjb25zdCBwYWdlUnVsZSA9IGBAcGFnZSAke25hbWV9IHsgJHtzdHlsZUVudHJpZXN9IH1gO1xuXG4gIHJldHVybiBwYWdlUnVsZTtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVQYWdlOyIsICIvKipcbiAqIERlZmluZXMgYSBzdGFydGluZyBzdHlsZSBmb3IgYSBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBDU1Mgc2VsZWN0b3IgdG8gd2hpY2ggdGhlIHN0YXJ0aW5nIHN0eWxlIHdpbGwgYmUgYXBwbGllZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIENTUyBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBzdGFydGluZy1zdHlsZSBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lU3RhcnRpbmdTdHlsZSA9IChzZWxlY3RvciwgcHJvcGVydGllcykgPT4ge1xuICBjb25zdCBwcm9wZXJ0eUVudHJpZXMgPSBPYmplY3QuZW50cmllcyhwcm9wZXJ0aWVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiB7XG4gICAgcmV0dXJuIGAke3Byb3BlcnR5fTogJHt2YWx1ZX07YDtcbiAgfSkuam9pbignICcpO1xuXG4gIGNvbnN0IHN0YXJ0aW5nU3R5bGVSdWxlID0gYEBzdGFydGluZy1zdHlsZSB7XFxuICAke3NlbGVjdG9yfSB7ICR7cHJvcGVydHlFbnRyaWVzfSB9XFxufWA7XG5cbiAgcmV0dXJuIHN0YXJ0aW5nU3R5bGVSdWxlO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVN0YXJ0aW5nU3R5bGU7IiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBAc3VwcG9ydHMgcnVsZS5cbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc3VwcG9ydHNDb25kaXRpb24gLSBBbiBhcnJheSBvZiBjb25kaXRpb25zIHRoYXQgdGhlIGJyb3dzZXIgbXVzdCBzdXBwb3J0LlxuICogQHBhcmFtIHtvYmplY3R9IHJ1bGVzIC0gQW4gb2JqZWN0IG1hcHBpbmcgc2VsZWN0b3JzIHRvIHRoZWlyIHJlc3BlY3RpdmUgc3R5bGUgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQHN1cHBvcnRzIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVTdXBwb3J0cyA9IChzdXBwb3J0c0NvbmRpdGlvbiwgcnVsZXMpID0+IHtcbiAgY29uc3QgY29uZGl0aW9uU3RyaW5nID0gc3VwcG9ydHNDb25kaXRpb24ubWFwKGNvbmRpdGlvbiA9PiBgKCR7Y29uZGl0aW9ufSlgKS5qb2luKCcgYW5kICcpO1xuICBjb25zdCBydWxlc1N0cmluZyA9IE9iamVjdC5lbnRyaWVzKHJ1bGVzKS5tYXAoKFtzZWxlY3Rvciwgc3R5bGVzXSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlU3RyaW5nID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2ApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gYCR7c2VsZWN0b3J9IHsgJHtzdHlsZVN0cmluZ30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBzdXBwb3J0cyAke2NvbmRpdGlvblN0cmluZ30geyAke3J1bGVzU3RyaW5nfSB9YDtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVTdXBwb3J0czsiLCAiaW1wb3J0IGNoYXJzZXRzIGZyb20gJy4vQGNoYXJzZXQuanMnO1xuaW1wb3J0IGNvbG9yUHJvZmlsZXMgZnJvbSAnLi9AY29sb3Jwcm9maWxlLmpzJztcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi9AY29udGFpbmVyLmpzJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICcuL0Bwcm9wZXJ0eS5qcyc7XG5pbXBvcnQgY291bnRlclN0eWxlcyBmcm9tICcuL0Bjb3VudGVyc3R5bGUuanMnO1xuaW1wb3J0IGZvbnRGYWNlcyBmcm9tICcuL0Bmb250ZmFjZS5qcyc7XG5pbXBvcnQgZm9udEZlYXR1cmVWYWx1ZXMgZnJvbSAnLi9AZm9udGZlYXR1cmV2YWx1ZXMuanMnO1xuaW1wb3J0IGZvbnRQYWxldHRlVmFsdWVzIGZyb20gJy4vQGZvbnRwYWxsZXRldmFsdWVzLmpzJztcbmltcG9ydCBpbXBvcnRlciBmcm9tICcuL0BpbXBvcnQuanMnO1xuaW1wb3J0IGtleWZyYW1lcyBmcm9tICcuL0BrZXlmcmFtZXMuanMnO1xuaW1wb3J0IGxheWVyIGZyb20gJy4vQGxheWVyLmpzJztcbmltcG9ydCBtZWRpYSBmcm9tICcuL0BtZWRpYS5qcyc7XG5pbXBvcnQgbmFtZXNwYWNlIGZyb20gJy4vQG5hbWVzcGFjZS5qcyc7XG5pbXBvcnQgcGFnZXMgZnJvbSAnLi9AcGFnZS5qcyc7XG5pbXBvcnQgc3RhcnRpbmdTdHlsZXMgZnJvbSAnLi9Ac3RhcnRpbmdzdHlsZS5qcyc7XG5pbXBvcnQgc3VwcG9ydHMgZnJvbSAnLi9Ac3VwcG9ydHMuanMnO1xuXG5leHBvcnQge1xuICBjaGFyc2V0cyxcbiAgY29sb3JQcm9maWxlcyxcbiAgY29udGFpbmVyLFxuICBwcm9wZXJ0eSxcbiAgY291bnRlclN0eWxlcyxcbiAgZm9udEZhY2VzLFxuICBmb250RmVhdHVyZVZhbHVlcyxcbiAgZm9udFBhbGV0dGVWYWx1ZXMsXG4gIGltcG9ydGVyLFxuICBrZXlmcmFtZXMsXG4gIGxheWVyLFxuICBtZWRpYSxcbiAgbmFtZXNwYWNlLFxuICBwYWdlcyxcbiAgc3RhcnRpbmdTdHlsZXMsXG4gIHN1cHBvcnRzLFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNoYXJzZXRzLFxuICBjb2xvclByb2ZpbGVzLFxuICBjb250YWluZXIsXG4gIHByb3BlcnR5LFxuICBjb3VudGVyU3R5bGVzLFxuICBmb250RmFjZXMsXG4gIGZvbnRGZWF0dXJlVmFsdWVzLFxuICBmb250UGFsZXR0ZVZhbHVlcyxcbiAgaW1wb3J0ZXIsXG4gIGtleWZyYW1lcyxcbiAgbGF5ZXIsXG4gIG1lZGlhLFxuICBuYW1lc3BhY2UsXG4gIHBhZ2VzLFxuICBzdGFydGluZ1N0eWxlcyxcbiAgc3VwcG9ydHMsXG59IiwgIi8qKlxuICogUmV0cmlldmVzIHRoZSBjb3JyZXNwb25kaW5nIGtleXdvcmQgZm9yIGEgZ2l2ZW4gcGFyYW1ldGVyLlxuICogSWYgdGhlIGtleXdvcmQgaXMgZGVwcmVjYXRlZCBvciB1bmtub3duLCBhIHdhcm5pbmcgb3IgZXJyb3IgaXMgdGhyb3duLlxuIFxuICogQHBhcmFtIHtcbiAgICAnYWJzb2x1dGUtc2l6ZScgfFxuICAgICdhbHBoYS12YWx1ZScgfFxuICAgICdhbmdsZScgfFxuICAgICdhbmdsZS1wZXJjZW50YWdlJyB8XG4gICAgJ2Jhc2ljLXNoYXBlJyB8XG4gICAgJ2JsZW5kLW1vZGUnIHxcbiAgICAnYm94LWVkZ2UnIHxcbiAgICAnY2FsYy1jb25zdGFudCcgfFxuICAgICdjYWxjLXN1bScgfFxuICAgICdjb2xvci1pbnRlcnBvbGF0aW9uLW1ldGhvZCcgfFxuICAgICdjb2xvcicgfFxuICAgICdjdXN0b20taWRlbnQnIHxcbiAgICAnZGFzaGVkLWlkZW50JyB8XG4gICAgJ2RpbWVuc2lvbicgfFxuICAgICdkaXNwbGF5LWJveCcgfFxuICAgICdkaXNwbGF5LWluc2lkZScgfFxuICAgICdkaXNwbGF5LWludGVybmFsJyB8XG4gICAgJ2Rpc3BsYXktbGVnYWN5JyB8XG4gICAgJ2Rpc3BsYXktbGlzdGl0ZW0nIHxcbiAgICAnZGlzcGxheS1vdXRzaWRlJyB8XG4gICAgJ2Vhc2luZy1mdW5jdGlvbicgfFxuICAgICdmaWx0ZXItZnVuY3Rpb24nIHxcbiAgICAnZmxleCcgfFxuICAgICdmcmVxdWVuY3knIHxcbiAgICAnZnJlcXVlbmN5LXBlcmNlbnRhZ2UnIHxcbiAgICAnZ2VuZXJpYy1mYW1pbHknIHxcbiAgICAnZ3JhZGllbnQnIHxcbiAgICAnaGV4LWNvbG9yJyB8XG4gICAgJ2h1ZScgfFxuICAgICdodWUtaW50ZXJwb2xhdGlvbi1tZXRob2QnIHxcbiAgICAnaWRlbnQnIHxcbiAgICAnaW1hZ2UnIHxcbiAgICAnaW50ZWdlcicgfFxuICAgICdsZW5ndGgnIHxcbiAgICAnbGVuZ3RoLXBlcmNlbnRhZ2UnIHxcbiAgICAnbGluZS1zdHlsZScgfFxuICAgICduYW1lZC1jb2xvcicgfFxuICAgICdudW1iZXInIHxcbiAgICAnb3ZlcmZsb3cnIHxcbiAgICAncGVyY2VudGFnZScgfFxuICAgICdwb3NpdGlvbicgfFxuICAgICdyYXRpbycgfFxuICAgICdyZWxhdGl2ZS1zaXplJyB8XG4gICAgJ3Jlc29sdXRpb24nIHxcbiAgICAnc3RyaW5nJyB8XG4gICAgJ3N5c3RlbS1jb2xvcicgfFxuICAgICd0aW1lJyB8XG4gICAgJ3RpbWUtcGVyY2VudGFnZScgfFxuICAgICd0cmFuc2Zvcm0tZnVuY3Rpb24nXG4gIH0gcGFyYW0gLSBUaGUgcGFyYW1ldGVyIHRvIGdldCB0aGUga2V5d29yZCBmb3IuXG4gIFxuICogQHJldHVybnMge1xuICAgICc8YWJzb2x1dGUtc2l6ZT4nIHxcbiAgICAnPGFscGhhLXZhbHVlPicgfFxuICAgICc8YW5nbGU+JyB8XG4gICAgJzxhbmdsZS1wZXJjZW50YWdlPicgfFxuICAgICc8YmFzaWMtc2hhcGU+JyB8XG4gICAgJzxibGVuZC1tb2RlPicgfFxuICAgICc8Ym94LWVkZ2U+JyB8XG4gICAgJzxjYWxjLWNvbnN0YW50PicgfFxuICAgICc8Y2FsYy1zdW0+JyB8XG4gICAgJzxjb2xvci1pbnRlcnBvbGF0aW9uLW1ldGhvZD4nIHxcbiAgICAnPGNvbG9yPicgfFxuICAgICc8Y3VzdG9tLWlkZW50PicgfFxuICAgICc8ZGFzaGVkLWlkZW50PicgfFxuICAgICc8ZGltZW5zaW9uPicgfFxuICAgICc8ZGlzcGxheS1ib3g+JyB8XG4gICAgJzxkaXNwbGF5LWluc2lkZT4nIHxcbiAgICAnPGRpc3BsYXktaW50ZXJuYWw+JyB8XG4gICAgJzxkaXNwbGF5LWxlZ2FjeT4nIHxcbiAgICAnPGRpc3BsYXktbGlzdGl0ZW0+JyB8XG4gICAgJzxkaXNwbGF5LW91dHNpZGU+JyB8XG4gICAgJzxlYXNpbmctZnVuY3Rpb24+JyB8XG4gICAgJzxmaWx0ZXItZnVuY3Rpb24+JyB8XG4gICAgJzxmbGV4PicgfFxuICAgICc8ZnJlcXVlbmN5PicgfFxuICAgICc8ZnJlcXVlbmN5LXBlcmNlbnRhZ2U+JyB8XG4gICAgJzxnZW5lcmljLWZhbWlseT4nIHxcbiAgICAnPGdyYWRpZW50PicgfFxuICAgICc8aGV4LWNvbG9yPicgfFxuICAgICc8aHVlPicgfFxuICAgICc8aHVlLWludGVycG9sYXRpb24tbWV0aG9kPicgfFxuICAgICc8aWRlbnQ+JyB8XG4gICAgJzxpbWFnZT4nIHxcbiAgICAnPGludGVnZXI+JyB8XG4gICAgJzxsZW5ndGg+JyB8XG4gICAgJzxsZW5ndGgtcGVyY2VudGFnZT4nIHxcbiAgICAnPGxpbmUtc3R5bGU+JyB8XG4gICAgJzxuYW1lZC1jb2xvcj4nIHxcbiAgICAnPG51bWJlcj4nIHxcbiAgICAnPG92ZXJmbG93PicgfFxuICAgICc8cGVyY2VudGFnZT4nIHxcbiAgICAnPHBvc2l0aW9uPicgfFxuICAgICc8cmF0aW8+JyB8XG4gICAgJzxyZWxhdGl2ZS1zaXplPicgfFxuICAgICc8cmVzb2x1dGlvbj4nIHxcbiAgICAnPHN0cmluZz4nIHxcbiAgICAnPHN5c3RlbS1jb2xvcj4nIHxcbiAgICAnPHRpbWU+JyB8XG4gICAgJzx0aW1lLXBlcmNlbnRhZ2U+JyB8XG4gICAgJzx0cmFuc2Zvcm0tZnVuY3Rpb24+J1xuICB9IFRoZSBjb3JyZXNwb25kaW5nIGtleXdvcmQgYXMgYSBcXDxrZXl3b3JkXFw+LlxuICovXG5mdW5jdGlvbiBnZXRUeXBlS2V5d29yZChwYXJhbSA9ICcnKSB7XG4gIHN3aXRjaCAocGFyYW0pIHtcbiAgICBjYXNlICdhYnNvbHV0ZS1zaXplJzpcbiAgICBjYXNlICdhbHBoYS12YWx1ZSc6XG4gICAgY2FzZSAnYW5nbGUnOlxuICAgIGNhc2UgJ2FuZ2xlLXBlcmNlbnRhZ2UnOlxuICAgIGNhc2UgJ2Jhc2ljLXNoYXBlJzpcbiAgICBjYXNlICdibGVuZC1tb2RlJzpcbiAgICBjYXNlICdib3gtZWRnZSc6XG4gICAgY2FzZSAnY2FsYy1jb25zdGFudCc6XG4gICAgY2FzZSAnY2FsYy1zdW0nOlxuICAgIGNhc2UgJ2NvbG9yLWludGVycG9sYXRpb24tbWV0aG9kJzpcbiAgICBjYXNlICdjb2xvcic6XG4gICAgY2FzZSAnY3VzdG9tLWlkZW50JzpcbiAgICBjYXNlICdkYXNoZWQtaWRlbnQnOlxuICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgY2FzZSAnZGlzcGxheS1ib3gnOlxuICAgIGNhc2UgJ2Rpc3BsYXktaW5zaWRlJzpcbiAgICBjYXNlICdkaXNwbGF5LWludGVybmFsJzpcbiAgICBjYXNlICdkaXNwbGF5LWxlZ2FjeSc6XG4gICAgY2FzZSAnZGlzcGxheS1saXN0aXRlbSc6XG4gICAgY2FzZSAnZGlzcGxheS1vdXRzaWRlJzpcbiAgICBjYXNlICdlYXNpbmctZnVuY3Rpb24nOlxuICAgIGNhc2UgJ2ZpbHRlci1mdW5jdGlvbic6XG4gICAgY2FzZSAnZmxleCc6XG4gICAgY2FzZSAnZnJlcXVlbmN5JzpcbiAgICBjYXNlICdmcmVxdWVuY3ktcGVyY2VudGFnZSc6XG4gICAgY2FzZSAnZ2VuZXJpYy1mYW1pbHknOlxuICAgIGNhc2UgJ2dyYWRpZW50JzpcbiAgICBjYXNlICdoZXgtY29sb3InOlxuICAgIGNhc2UgJ2h1ZSc6XG4gICAgY2FzZSAnaHVlLWludGVycG9sYXRpb24tbWV0aG9kJzpcbiAgICBjYXNlICdpZGVudCc6XG4gICAgY2FzZSAnaW1hZ2UnOlxuICAgIGNhc2UgJ2ludGVnZXInOlxuICAgIGNhc2UgJ2xlbmd0aCc6XG4gICAgY2FzZSAnbGVuZ3RoLXBlcmNlbnRhZ2UnOlxuICAgIGNhc2UgJ2xpbmUtc3R5bGUnOlxuICAgIGNhc2UgJ25hbWVkLWNvbG9yJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ292ZXJmbG93JzpcbiAgICBjYXNlICdwZXJjZW50YWdlJzpcbiAgICBjYXNlICdwb3NpdGlvbic6XG4gICAgY2FzZSAncmF0aW8nOlxuICAgIGNhc2UgJ3JlbGF0aXZlLXNpemUnOlxuICAgIGNhc2UgJ3Jlc29sdXRpb24nOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnc3lzdGVtLWNvbG9yJzpcbiAgICBjYXNlICd0aW1lJzpcbiAgICBjYXNlICd0aW1lLXBlcmNlbnRhZ2UnOlxuICAgIGNhc2UgJ3RyYW5zZm9ybS1mdW5jdGlvbic6XG4gICAgICByZXR1cm4gYDwke3BhcmFtfT5gO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFR5cGVLZXl3b3JkOyIsICJleHBvcnQgY29uc3QgaW1wb3J0YW50ID0gXyA9PiBgIWltcG9ydGFudDtgXG5leHBvcnQgZGVmYXVsdCBpbXBvcnRhbnQiLCAiaW1wb3J0IHR5cGVzIGZyb20gJy4vdHlwZXMuanMnO1xuXG5pbXBvcnQgaW1wb3J0YW50IGZyb20gJy4vaW1wb3J0YW50LmpzJztcblxuZXhwb3J0IHtcbiAgaW1wb3J0YW50LFxuICB0eXBlcyxcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbXBvcnRhbnQsXG4gIHR5cGVzLFxufSIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYWJzb2x1dGUgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHBheWxvYWQgLSBUaGUgdmFsdWUgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFic29sdXRlIHZhbHVlIGV4cHJlc3Npb24gZm9yIENTUy5cbiAqL1xuZXhwb3J0IGNvbnN0IGFicyA9IHBheWxvYWQgPT4ge1xuICByZXR1cm4gYGFicygke3BheWxvYWR9KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFiczsiLCAiLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGFyY2Nvc2luZSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYXJjY29zaW5lIGV4cHJlc3Npb24gZm9yIENTUy5cbiAqL1xuZXhwb3J0IGNvbnN0IGFjb3MgPSBwYXlsb2FkID0+IGBhY29zKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgYWNvcyIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYXJjc2luZSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYXJjc2luZSBleHByZXNzaW9uIGZvciBDU1MuXG4gKi9cbmV4cG9ydCBjb25zdCBhc2luID0gcGF5bG9hZCA9PiBgYXNpbigke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGFzaW4iLCAiLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGFyY3RhbmdlbnQgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHBheWxvYWQgLSBUaGUgdmFsdWUgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFyY3RhbmdlbnQgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYXRhbiA9IHBheWxvYWQgPT4gYGF0YW4oJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhdGFuIiwgIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhcmN0YW5nZW50IG9mIHR3byB2YXJpYWJsZXMuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHBheWxvYWQgLSBUaGUgdmFsdWVzIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhcmN0YW5nZW50IGV4cHJlc3Npb24gZm9yIENTUy5cbiAqL1xuZXhwb3J0IGNvbnN0IGF0YW4yID0gcGF5bG9hZCA9PiBgYXRhbjIoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhdGFuMiIsICIvKipcbiAqIFJldHJpZXZlIHRoZSB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUgZnJvbSBhIENTUyBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gVGhlIGF0dHJpYnV0ZSB0byByZXRyaWV2ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgZnVuY3Rpb24gdG8gcmV0cmlldmUgdGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHIgPSBwYXlsb2FkID0+IGBhdHRyKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgYXR0ciIsICIvKipcbiAqIENhbGN1bGF0ZSBhIENTUyBjYWxjKCkgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gVGhlIGV4cHJlc3Npb24gdG8gYmUgY2FsY3VsYXRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjYWxjdWxhdGVkIENTUyBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY2FsYyA9IHBheWxvYWQgPT4gYGNhbGMoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBjYWxjIiwgIi8qKlxuICogQ2xhbXBzIGEgdmFsdWUgYmV0d2VlbiBhIG1pbmltdW0gYW5kIGEgbWF4aW11bS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbWluIC0gVGhlIG1pbmltdW0gdmFsdWUgb3IgQ1NTIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbCAtIFRoZSBjdXJyZW50IHZhbHVlIG9yIENTUyBleHByZXNzaW9uLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBtYXggLSBUaGUgbWF4aW11bSB2YWx1ZSBvciBDU1MgZXhwcmVzc2lvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGNsYW1wKCkgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWVzLlxuICovXG5leHBvcnQgY29uc3QgY2xhbXAgPSAobWluLCB2YWwsIG1heCkgPT4ge1xuICByZXR1cm4gYGNsYW1wKCR7bWlufSwgJHt2YWx9LCAke21heH0pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhbXA7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29zaW5lIG9mIHRoZSBnaXZlbiBhbmdsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gYW5nbGUgLSBUaGUgYW5nbGUgaW4gZGVncmVlcyBvciByYWRpYW5zLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgZnVuY3Rpb24gcmVwcmVzZW50aW5nIHRoZSBjb3NpbmUgb2YgdGhlIGFuZ2xlLlxuICovXG5leHBvcnQgY29uc3QgY29zID0gYW5nbGUgPT4gYGNvcygke2FuZ2xlfSlgXG5leHBvcnQgZGVmYXVsdCBjb3MiLCAiLyoqXG4gKiBHZW5lcmF0ZXMgYSBDU1MgY291bnRlciBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gY291bnRlck5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY291bnRlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY291bnRlclN0eWxlPSdkZWNpbWFsJ10gLSBUaGUgc3R5bGUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBjb3VudGVyIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgY291bnRlciA9IChjb3VudGVyTmFtZSwgY291bnRlclN0eWxlID0gJ2RlY2ltYWwnKSA9PiB7XG4gIGlmICh0eXBlb2YgY291bnRlck5hbWUgIT09ICdzdHJpbmcnIHx8IGNvdW50ZXJOYW1lLnN0YXJ0c1dpdGgoJy0tJykgfHwgWydub25lJywgJ3Vuc2V0JywgJ2luaXRpYWwnLCAnaW5oZXJpdCddLmluY2x1ZGVzKGNvdW50ZXJOYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIG5hbWUuJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGNvdW50ZXJTdHlsZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBzdHlsZS4nKTtcbiAgfVxuXG4gIHJldHVybiBgY291bnRlcigke2NvdW50ZXJOYW1lfSR7Y291bnRlclN0eWxlICE9PSAnZGVjaW1hbCcgPyAnLCAnICsgY291bnRlclN0eWxlIDogJyd9KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50ZXI7IiwgIi8qKlxuICogQ29uc3RydWN0cyBhIENTUyBjb3VudGVycyBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gY291bnRlck5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY291bnRlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBUaGUgc3RyaW5nIHRvIGJlIGNvbmNhdGVuYXRlZCB3aXRoIHRoZSBjb3VudGVyIHZhbHVlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb3VudGVyU3R5bGU9J2RlY2ltYWwnXSAtIFRoZSBzdHlsZSBvZiB0aGUgY291bnRlciwgZGVmYXVsdCBpcyAnZGVjaW1hbCcuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGNvdW50ZXIgbmFtZSwgc3RyaW5nLCBvciBjb3VudGVyIHN0eWxlIGlzIGludmFsaWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBjb3VudGVycyBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBjb3VudGVycyA9IChjb3VudGVyTmFtZSwgc3RyaW5nLCBjb3VudGVyU3R5bGUgPSAnZGVjaW1hbCcpID0+IHtcbiAgaWYgKHR5cGVvZiBjb3VudGVyTmFtZSAhPT0gJ3N0cmluZycgfHwgY291bnRlck5hbWUuc3RhcnRzV2l0aCgnLS0nKSB8fCBbJ25vbmUnLCAndW5zZXQnLCAnaW5pdGlhbCcsICdpbmhlcml0J10uaW5jbHVkZXMoY291bnRlck5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgbmFtZS4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcgZm9yIGNvbmNhdGVuYXRpb24uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGNvdW50ZXJTdHlsZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBzdHlsZS4nKTtcbiAgfVxuXG4gIHJldHVybiBgY291bnRlcnMoJHtjb3VudGVyTmFtZX0sIFwiJHtzdHJpbmd9XCIke2NvdW50ZXJTdHlsZSAhPT0gJ2RlY2ltYWwnID8gJywgJyArIGNvdW50ZXJTdHlsZSA6ICcnfSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3VudGVyczsiLCAiZXhwb3J0IGNvbnN0IGNyb3NzRmFkZSA9ICguLi5pbWFnZXMpID0+IHtcbiAgLyoqXG4gICAqIEJsZW5kcyBpbWFnZXMgdXNpbmcgdGhlIGNyb3NzLWZhZGUgZWZmZWN0LlxuICAgKiBAcGFyYW0gey4uLmltYWdlc30gaW1hZ2VzIC0gQW4gYXJyYXkgb2YgaW1hZ2UgVVJMcyBvciB0dXBsZXMgb2YgaW1hZ2UgVVJMIGFuZCBwZXJjZW50YWdlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBmdW5jdGlvbiByZXByZXNlbnRpbmcgdGhlIGNyb3NzLWZhZGUgb2YgdGhlIHByb3ZpZGVkIGltYWdlcy5cbiAgICogQHRocm93cyB7RXJyb3J9IElmIGxlc3MgdGhhbiB0d28gdmFsaWQgaW1hZ2VzIGFyZSBwcm92aWRlZC5cbiAgICovXG4gIGNvbnN0IHZhbGlkSW1hZ2VzID0gaW1hZ2VzLmZpbHRlcihpbWFnZSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZycgJiYgaW1hZ2Uuc3RhcnRzV2l0aCgndXJsKCcpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgW2ltZywgcGVyY2VudGFnZV0gPSBpbWFnZTtcbiAgICByZXR1cm4gdHlwZW9mIGltZyA9PT0gJ3N0cmluZycgJiYgaW1nLnN0YXJ0c1dpdGgoJ3VybCgnKSAmJlxuICAgICAgdHlwZW9mIHBlcmNlbnRhZ2UgPT09ICdudW1iZXInICYmIHBlcmNlbnRhZ2UgPj0gMCAmJiBwZXJjZW50YWdlIDw9IDEwMDtcbiAgfSk7XG5cbiAgaWYgKHZhbGlkSW1hZ2VzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nyb3NzRmFkZSBmdW5jdGlvbiByZXF1aXJlcyBhdCBsZWFzdCB0d28gaW1hZ2VzLicpO1xuICB9XG5cbiAgY29uc3QgY3Jvc3NGYWRlSW1hZ2VzID0gdmFsaWRJbWFnZXMubWFwKGltYWdlID0+IHtcbiAgICBpZiAodHlwZW9mIGltYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cbiAgICBjb25zdCBbaW1nLCBwZXJjZW50YWdlXSA9IGltYWdlO1xuICAgIHJldHVybiBgJHtpbWd9ICR7cGVyY2VudGFnZX0lYDtcbiAgfSkuam9pbignLCAnKTtcblxuICByZXR1cm4gYGNyb3NzLWZhZGUoJHtjcm9zc0ZhZGVJbWFnZXN9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcm9zc0ZhZGUiLCAiLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgaW1hZ2UgdmFsdWUgZm9yIGEgZ2l2ZW4gZWxlbWVudCBJRC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBJRCBvZiB0aGUgZWxlbWVudCwgbXVzdCBzdGFydCB3aXRoICcjJy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgSUQgaXMgbm90IGEgc3RyaW5nIG9yIGRvZXNuJ3Qgc3RhcnQgd2l0aCAnIycuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQ1NTIGltYWdlIHZhbHVlIGZvciB0aGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGVsZW1lbnQgPSAoaWQpID0+IHtcbiAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgIWlkLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBJRCBmb3IgZWxlbWVudCBmdW5jdGlvbi4gSUQgbXVzdCBiZSBhIHN0cmluZyBzdGFydGluZyB3aXRoIFwiI1wiLicpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGZ1bmN0aW9uIGlzIHN1cHBvcnRlZFxuICBpZiAodHlwZW9mIGRvY3VtZW50Lm1velNldEltYWdlRWxlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUud2FybignVGhlIGVsZW1lbnQoKSBmdW5jdGlvbiBpcyBleHBlcmltZW50YWwgYW5kIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzLicpO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBDU1MgaW1hZ2UgdmFsdWVcbiAgcmV0dXJuIGAtbW96LWVsZW1lbnQoJHtpZH0pYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVsZW1lbnQ7IiwgIi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlIHZhbHVlLCB3aXRoIGFuIG9wdGlvbmFsIGZhbGxiYWNrLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhcmlhYmxlIC0gVGhlIG5hbWUgb2YgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtmYWxsYmFja10gLSBUaGUgZmFsbGJhY2sgdmFsdWUgaWYgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlIGlzIG5vdCBzZXQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIGVudigpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudiA9ICh2YXJpYWJsZSwgZmFsbGJhY2spID0+IHtcbiAgY29uc3QgZW52VmFyID0gYGVudigke3ZhcmlhYmxlfSR7ZmFsbGJhY2sgPyBgLCAke2ZhbGxiYWNrfWAgOiAnJ30pYDtcbiAgcmV0dXJuIGVudlZhcjtcbn07XG5cbi8vIFByb3ZpZGVzIGEgbWVjaGFuaXNtIHRvIHJldHJpZXZlIGVudmlyb25tZW50IHZhcmlhYmxlcyBmb3IgQ1NTXG4vKipcbiAqIFJlcHJlc2VudHMgc2FmZSBhcmVhIGluc2V0cyBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHNhZmVBcmVhSW5zZXRzID0ge1xuICB0b3A6IChmYWxsYmFjaykgPT4gZW52KCdzYWZlLWFyZWEtaW5zZXQtdG9wJywgZmFsbGJhY2spLFxuICByaWdodDogKGZhbGxiYWNrKSA9PiBlbnYoJ3NhZmUtYXJlYS1pbnNldC1yaWdodCcsIGZhbGxiYWNrKSxcbiAgYm90dG9tOiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LWJvdHRvbScsIGZhbGxiYWNrKSxcbiAgbGVmdDogKGZhbGxiYWNrKSA9PiBlbnYoJ3NhZmUtYXJlYS1pbnNldC1sZWZ0JywgZmFsbGJhY2spXG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGl0bGUgYmFyIGFyZWEgZm9yIENTUyBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBjb25zdCB0aXRsZWJhckFyZWEgPSB7XG4gIHg6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLXgnLCBmYWxsYmFjayksXG4gIHk6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLXknLCBmYWxsYmFjayksXG4gIHdpZHRoOiAoZmFsbGJhY2spID0+IGVudigndGl0bGViYXItYXJlYS13aWR0aCcsIGZhbGxiYWNrKSxcbiAgaGVpZ2h0OiAoZmFsbGJhY2spID0+IGVudigndGl0bGViYXItYXJlYS1oZWlnaHQnLCBmYWxsYmFjaylcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBrZXlib2FyZCBpbnNldHMgZm9yIENTUyBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBrZXlib2FyZEluc2V0ID0ge1xuICB0b3A6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC10b3AnLCBmYWxsYmFjayksXG4gIHJpZ2h0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtcmlnaHQnLCBmYWxsYmFjayksXG4gIGJvdHRvbTogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LWJvdHRvbScsIGZhbGxiYWNrKSxcbiAgbGVmdDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LWxlZnQnLCBmYWxsYmFjayksXG4gIHdpZHRoOiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtd2lkdGgnLCBmYWxsYmFjayksXG4gIGhlaWdodDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LWhlaWdodCcsIGZhbGxiYWNrKVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlbnYsXG4gIHNhZmVBcmVhSW5zZXRzLFxuICB0aXRsZWJhckFyZWEsXG4gIGtleWJvYXJkSW5zZXRcbn0iLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBleHBvbmVudGlhbCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWUgLSBUaGUgZXhwb25lbnQgdG8gcmFpc2UgZSB0by5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgZXhwb25lbnRpYWwgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZXhwID0gdmFsdWUgPT4gYGV4cCgke3ZhbHVlfSlgXG5cbmV4cG9ydCBkZWZhdWx0IGV4cCIsICIvKipcbiAqIEFkanVzdHMgdGhlIGNvbnRlbnQgc2l6ZSB0byBmaXQgdGhlIGdpdmVuIHNpemUgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHNpemUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgYSBsZW5ndGggb3IgYSBwZXJjZW50YWdlLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgc2l6ZSBpcyBub3QgYSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQ1NTIGZpdC1jb250ZW50IGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGZpdENvbnRlbnQgPSAoc2l6ZSkgPT4ge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2l6ZSBtdXN0IGJlIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhIGxlbmd0aCBvciBhIHBlcmNlbnRhZ2UuJyk7XG4gIH1cbiAgcmV0dXJuIGBmaXQtY29udGVudCgke3NpemV9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmaXRDb250ZW50IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgaHlwb3RlbnVzZSBvciBFdWNsaWRlYW4gbm9ybS5cbiAqIEBwYXJhbSB7Li4uYXJnc30gbnVtYmVycyAtIEEgc2V0IG9mIG51bWJlcnMgcmVwcmVzZW50aW5nIHRoZSBzaWRlcyBvZiBhIHJpZ2h0LWFuZ2xlZCB0cmlhbmdsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgaHlwb3QgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgaHlwb3QgPSAoLi4uYXJncykgPT4gYGh5cG90KCR7YXJncy5qb2luKCcsICcpfSlgXG5leHBvcnQgZGVmYXVsdCBoeXBvdCIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxvZ2FyaXRobSBvZiBhIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNhbGN1bGF0ZSB0aGUgbG9nYXJpdGhtIGZvci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbG9nKCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbG9nID0gdmFsdWUgPT4gYGxvZygke3ZhbHVlfSlgXG5leHBvcnQgZGVmYXVsdCBsb2ciLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYXhpbXVtIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSB7Li4uYXJnc30gYXJncyAtIEEgc2V0IG9mIG51bWVyaWMgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBtYXgoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXggPSAoLi4uYXJncykgPT4gYG1heCgke2FyZ3Muam9pbignLCAnKX0pYFxuZXhwb3J0IGRlZmF1bHQgbWF4IiwgIlxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtaW5pbXVtIHZhbHVlIGZyb20gdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSB7Li4uYXJnc30gLSBBIHNldCBvZiBudW1lcmljIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbWluKCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbWluID0gKC4uLmFyZ3MpID0+IGBtaW4oJHthcmdzLmpvaW4oJywgJyl9KWBcbmV4cG9ydCBkZWZhdWx0IG1pbiIsICIvKipcbiAqIERlZmluZXMgYSBDU1MgbWlubWF4IGZ1bmN0aW9uIHdpdGggdGhlIGdpdmVuIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1pbiAtIFRoZSBtaW5pbXVtIHZhbHVlIGFzIGEgQ1NTIHVuaXQgb3Iga2V5d29yZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXggLSBUaGUgbWF4aW11bSB2YWx1ZSBhcyBhIENTUyB1bml0IG9yIGtleXdvcmQuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIG1pbiBvciBtYXggYXJlIG5vdCBvZiB0eXBlIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbWlubWF4KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbWlubWF4ID0gKG1pbiwgbWF4KSA9PiB7XG4gIGlmICh0eXBlb2YgbWluICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgbWF4ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhcmFtZXRlcnMgbWluIGFuZCBtYXggbXVzdCBiZSBzdHJpbmdzLicpO1xuICB9XG5cbiAgLy8gSWYgbWF4IGlzIGxlc3MgdGhhbiBtaW4sIHRyZWF0IG1pbm1heCBhcyBtaW5cbiAgLy8gaWYgKHBhcnNlRmxvYXQobWF4KSA8IHBhcnNlRmxvYXQobWluKSkge1xuICAvLyAgIHJldHVybiBtaW47XG4gIC8vIH1cblxuICByZXR1cm4gYG1pbm1heCgke21pbn0sICR7bWF4fSlgO1xufVxuZXhwb3J0IGRlZmF1bHQgbWlubWF4OyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1vZHVsdXMgb2YgdHdvIG51bWJlcnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYSAtIFRoZSBkaXZpZGVuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gVGhlIGRpdmlzb3IuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1vZCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vZCA9IChhLCBiKSA9PiBgbW9kKCR7YX0sICR7Yn0pYDtcbmV4cG9ydCBkZWZhdWx0IG1vZDsiLCAiLyoqXG4gKiBDcmVhdGVzIGEgQ1NTIHBhdGgoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ3xudWxsfSBmaWxsUnVsZSAtIFRoZSBmaWxsLXJ1bGUgdG8gYXBwbHkgdG8gdGhlIHBhdGgsIG9yIG51bGwgaWYgbm90IGFwcGxpY2FibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ZnUGF0aCAtIFRoZSBTVkcgcGF0aCBkYXRhLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBwYXRoKCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgcGF0aCA9IChmaWxsUnVsZSwgc3ZnUGF0aCkgPT4ge1xuICBpZiAodHlwZW9mIHN2Z1BhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN2Z1BhdGggcGFyYW1ldGVyIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICBpZiAoZmlsbFJ1bGUgJiYgdHlwZW9mIGZpbGxSdWxlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBmaWxsUnVsZSBwYXJhbWV0ZXIgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIGNvbnN0IHZhbGlkRmlsbFJ1bGVzID0gWydub256ZXJvJywgJ2V2ZW5vZGQnXTtcbiAgaWYgKGZpbGxSdWxlICYmICF2YWxpZEZpbGxSdWxlcy5pbmNsdWRlcyhmaWxsUnVsZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmaWxsUnVsZSBwYXJhbWV0ZXIgbXVzdCBiZSBlaXRoZXIgXCJub256ZXJvXCIgb3IgXCJldmVub2RkXCIuJyk7XG4gIH1cblxuICByZXR1cm4gYHBhdGgoJHtmaWxsUnVsZSA/IGAke2ZpbGxSdWxlfSwgYCA6ICcnfVwiJHtzdmdQYXRofVwiKWA7XG59XG5leHBvcnQgZGVmYXVsdCBwYXRoOyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHBvd2VyIG9mIGEgYmFzZSBudW1iZXIgcmFpc2VkIHRvIGFuIGV4cG9uZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IGEgLSBUaGUgYmFzZSBudW1iZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gYiAtIFRoZSBleHBvbmVudC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgcG93KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgcG93ID0gKGEsIGIpID0+IGBwb3coJHthfSwgJHtifSlgO1xuZXhwb3J0IGRlZmF1bHQgcG93OyIsICIvKipcbiAqIENyZWF0ZXMgYSBDU1MgcmF5KCkgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIC0gVGhlIGFuZ2xlIG9mIHRoZSByYXkgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2l6ZT0nY2xvc2VzdC1zaWRlJ10gLSBUaGUgc2l6ZSBrZXl3b3JkIGZvciB0aGUgcmF5LlxuICogQHBhcmFtIHtib29sZWFufSBbY29udGFpbj1mYWxzZV0gLSBXaGV0aGVyIHRoZSByYXkgc2hvdWxkIGNvbnRhaW4gdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Bvc2l0aW9uPScnXSAtIFRoZSBwb3NpdGlvbiBvZiB0aGUgcmF5IHdpdGhpbiB0aGUgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgcmF5KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgcmF5ID0gKGFuZ2xlLCBzaXplID0gJ2Nsb3Nlc3Qtc2lkZScsIGNvbnRhaW4gPSBmYWxzZSwgcG9zaXRpb24gPSAnJykgPT4ge1xuICBpZiAodHlwZW9mIGFuZ2xlICE9PSAnbnVtYmVyJyB8fCBhbmdsZSA8IDAgfHwgYW5nbGUgPj0gMzYwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGFuZ2xlIG11c3QgYmUgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAzNTkuJyk7XG4gIH1cblxuICBjb25zdCBzaXplS2V5d29yZHMgPSBbJ2Nsb3Nlc3Qtc2lkZScsICdjbG9zZXN0LWNvcm5lcicsICdmYXJ0aGVzdC1zaWRlJywgJ2ZhcnRoZXN0LWNvcm5lcicsICdzaWRlcyddO1xuICBpZiAoIXNpemVLZXl3b3Jkcy5pbmNsdWRlcyhzaXplKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBzaXplIG11c3QgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmcgdmFsdWVzOiAnICsgc2l6ZUtleXdvcmRzLmpvaW4oJywgJykgKyAnLicpO1xuICB9XG5cbiAgY29uc3QgcG9zaXRpb25SZWdleCA9IC9eKGxlZnR8Y2VudGVyfHJpZ2h0fHRvcHxib3R0b218KFxcZCsoXFwuXFxkKyk/KHB4fCUpPykpJC87XG4gIGlmIChwb3NpdGlvbiAmJiAhcG9zaXRpb25SZWdleC50ZXN0KHBvc2l0aW9uKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBwb3NpdGlvbiBtdXN0IGJlIGEgdmFsaWQgQ1NTIHBvc2l0aW9uIHZhbHVlLicpO1xuICB9XG5cbiAgbGV0IHJheVN0cmluZyA9IGByYXkoJHthbmdsZX1kZWdgO1xuXG4gIGlmIChzaXplICE9PSAnY2xvc2VzdC1zaWRlJykge1xuICAgIHJheVN0cmluZyArPSBgICR7c2l6ZX1gO1xuICB9XG5cbiAgaWYgKGNvbnRhaW4pIHtcbiAgICByYXlTdHJpbmcgKz0gJyBjb250YWluJztcbiAgfVxuXG4gIGlmIChwb3NpdGlvbikge1xuICAgIHJheVN0cmluZyArPSBgIGF0ICR7cG9zaXRpb259YDtcbiAgfVxuXG4gIHJheVN0cmluZyArPSAnKSc7XG5cbiAgcmV0dXJuIGBvZmZzZXQtcGF0aDogJHtyYXlTdHJpbmd9O2A7XG59XG5leHBvcnQgZGVmYXVsdCByYXk7IiwgIi8qKlxuICogQ29udmVydHMgYSBwaXhlbCB2YWx1ZSB0byByZW0gdW5pdHMgYmFzZWQgb24gYSByb290IGZvbnQgc2l6ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSBwaXhlbCB2YWx1ZSB0byBjb252ZXJ0IHRvIHJlbS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbcm9vdFZhbHVlPTE2XSAtIFRoZSByb290IGZvbnQgc2l6ZSBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTYuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyBpbiByZW0gdW5pdHMuXG4gKi9cbmV4cG9ydCBjb25zdCByZW0gPSAodmFsdWUsIHJvb3RWYWx1ZSA9IDE2KSA9PiBgcmVtKCR7dmFsdWV9LCAke3Jvb3RWYWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHJlbTsiLCAiLyoqXG4gKiBHZW5lcmF0ZXMgYSBDU1MgcmVwZWF0KCkgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBjb3VudCAtIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSB0cmFja3Mgb3Igb25lIG9mIHRoZSBrZXl3b3JkczogJ2F1dG8tZmlsbCcsICdhdXRvLWZpdCcuXG4gKiBAcGFyYW0gey4uLnN0cmluZ3xhcnJheX0gdHJhY2tzIC0gVGhlIHRyYWNrIHNpemVzIGFuZC9vciBuYW1lcyB0byBiZSByZXBlYXRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcmVwZWF0KCkgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCByZXBlYXQgPSAoY291bnQsIC4uLnRyYWNrcykgPT4ge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoY291bnQpICYmIGNvdW50ICE9PSAnYXV0by1maWxsJyAmJiBjb3VudCAhPT0gJ2F1dG8tZml0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSByZXBlYXQgY291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyIG9yIG9uZSBvZiB0aGUga2V5d29yZHM6IGF1dG8tZmlsbCwgYXV0by1maXQuJyk7XG4gIH1cblxuICBjb25zdCB0cmFja0xpc3QgPSB0cmFja3MubWFwKHRyYWNrID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmFjaykpIHtcbiAgICAgIHJldHVybiBgWyR7dHJhY2suam9pbignICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2s7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYHJlcGVhdCgke2NvdW50fSwgJHt0cmFja0xpc3R9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgcmVwZWF0OyIsICIvKipcbiAqIFJvdW5kcyBhIG51bWJlciB0byBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgbnVtYmVyIHRvIHJvdW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IFtwcmVjaXNpb249MF0gLSBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHJvdW5kIHRvIChkZWZhdWx0IGlzIDApLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByb3VuZGVkIG51bWJlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHJvdW5kID0gKHZhbHVlLCBwcmVjaXNpb24gPSAwKSA9PiBgcm91bmQoJHt2YWx1ZX0sICR7cHJlY2lzaW9ufSlgO1xuZXhwb3J0IGRlZmF1bHQgcm91bmQ7IiwgIlxuLyoqXG4gKiBSZXR1cm5zIHRoZSBDU1Mgc2lnbiBmdW5jdGlvbiBmb3IgYSBnaXZlbiB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgdXNlZCBpbiB0aGUgc2lnbiBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc2lnbiBvZiB0aGUgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBzaWduID0gKHZhbHVlKSA9PiBgc2lnbigke3ZhbHVlfSlgXG5leHBvcnQgZGVmYXVsdCBzaWduOyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNpbmUgb2YgYSBnaXZlbiBhbmdsZSBpbiBkZWdyZWVzLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSBhbmdsZSBpbiBkZWdyZWVzIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIHNpbmUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNpbmUgb2YgdGhlIGFuZ2xlLlxuICovXG5leHBvcnQgY29uc3Qgc2luID0gKHZhbHVlKSA9PiBgc2luKCR7dmFsdWV9KWA7XG5leHBvcnQgZGVmYXVsdCBzaW47IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlIHJvb3Qgb2YgYSBnaXZlbiB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWUgLSBUaGUgdmFsdWUgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgc3F1YXJlIHJvb3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNxdWFyZSByb290IG9mIHRoZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNxcnQgPSAodmFsdWUpID0+IGBzcXJ0KCR7dmFsdWV9KWA7XG5leHBvcnQgZGVmYXVsdCBzcXJ0OyIsICIvKipcbiAqIENyZWF0ZXMgYSBDU1Mgc3ltYm9scyB2YWx1ZSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIHRoZSBzeW1ib2xzIGxpc3Q7IG9uZSBvZiAnY3ljbGljJywgJ251bWVyaWMnLCAnYWxwaGFiZXRpYycsICdzeW1ib2xpYycsICdmaXhlZCcuXG4gKiBAcGFyYW0gey4uLnZhbHVlc30gLSBUaGUgc3ltYm9scyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgbGlzdCwgd2hpY2ggY2FuIGJlIHN0cmluZ3Mgb3IgSW1hZ2UgaW5zdGFuY2VzLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzeW1ib2xzIGxpc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBzeW1ib2xzID0gKHR5cGUsIC4uLnZhbHVlcykgPT4ge1xuICBjb25zdCB2YWxpZFR5cGVzID0gWydjeWNsaWMnLCAnbnVtZXJpYycsICdhbHBoYWJldGljJywgJ3N5bWJvbGljJywgJ2ZpeGVkJ107XG4gIGlmICghdmFsaWRUeXBlcy5pbmNsdWRlcyh0eXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzeW1ib2xzIHR5cGU6ICR7dHlwZX0uIEV4cGVjdGVkIG9uZSBvZiAke3ZhbGlkVHlwZXMuam9pbignLCAnKX0uYCk7XG4gIH1cblxuICBjb25zdCBmb3JtYXR0ZWRWYWx1ZXMgPSB2YWx1ZXMubWFwKHZhbHVlID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGBcXFwiJHt2YWx1ZX1cXFwiYDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgSW1hZ2UpIHtcbiAgICAgIC8vIEFzc3VtaW5nIEltYWdlIGlzIGEgY2xhc3MgcmVwcmVzZW50aW5nIGFuIGltYWdlLCBhbmQgdG9TdHJpbmcoKSByZXR1cm5zIGEgdmFsaWQgQ1NTIGltYWdlIHZhbHVlXG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIHR5cGU6IHZhbHVlcyBtdXN0IGJlIHN0cmluZ3Mgb3IgSW1hZ2UgaW5zdGFuY2VzLicpO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIGBzeW1ib2xzKCR7dHlwZX0gJHtmb3JtYXR0ZWRWYWx1ZXN9KWA7XG59XG5leHBvcnQgZGVmYXVsdCBzeW1ib2xzOyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIHRhbmdlbnQgb2YgYSBnaXZlbiBhbmdsZSBpbiBkZWdyZWVzLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSBhbmdsZSBpbiBkZWdyZWVzIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIHRhbmdlbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHRhbmdlbnQgb2YgdGhlIGFuZ2xlLlxuICovXG5leHBvcnQgY29uc3QgdGFuID0gKHZhbHVlKSA9PiBgdGFuKCR7dmFsdWV9KWA7XG5leHBvcnQgZGVmYXVsdCB0YW47IiwgIi8qKlxuICogRm9ybWF0cyBhIGdpdmVuIHBhdGggYXMgYSBDU1MgVVJMIHZhbHVlLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byBiZSBmb3JtYXR0ZWQgYXMgYSBVUkwuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBmb3JtYXR0ZWQgVVJMIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHVybCA9IChwYXRoKSA9PiB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIFVSTCBpcyBhIGRhdGEgVVJMLCBhYnNvbHV0ZSBVUkwsIG9yIGEgcmVsYXRpdmUgVVJMXG4gIGNvbnN0IGlzRGF0YVVybCA9IHBhdGguc3RhcnRzV2l0aCgnZGF0YTonKTtcbiAgY29uc3QgaXNBYnNvbHV0ZVVybCA9IC9eKD86W2Etel0rOik/XFwvXFwvL2kudGVzdChwYXRoKTtcbiAgY29uc3QgaXNSZWxhdGl2ZVVybCA9ICFpc0RhdGFVcmwgJiYgIWlzQWJzb2x1dGVVcmw7XG5cbiAgLy8gSWYgdGhlIFVSTCBjb250YWlucyBzcGVjaWFsIGNoYXJhY3RlcnMsIGl0IHNob3VsZCBiZSBxdW90ZWRcbiAgY29uc3QgbmVlZHNRdW90ZXMgPSAvW1xccydcIigpXS8udGVzdChwYXRoKTtcbiAgY29uc3QgcXVvdGVkUGF0aCA9IG5lZWRzUXVvdGVzID8gYFxcXCIke3BhdGh9XFxcImAgOiBwYXRoO1xuXG4gIC8vIFJldHVybiB0aGUgZm9ybWF0dGVkIFVSTCBzdHJpbmdcbiAgcmV0dXJuIGB1cmwoJHtxdW90ZWRQYXRofSlgO1xufTtcbmV4cG9ydCBkZWZhdWx0IHVybDsiLCAiLyoqXG4gKiBDb25zdHJ1Y3RzIGEgQ1NTIHZhcmlhYmxlIHdpdGggYW4gb3B0aW9uYWwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZhbGxiYWNrXSAtIFRoZSBvcHRpb25hbCBmYWxsYmFjayB2YWx1ZSBpZiB0aGUgdmFyaWFibGUgaXMgbm90IGRlZmluZWQuXG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG5hbWUgaXMgbm90IGEgc3RyaW5nIG9yIGlmIHRoZSBmYWxsYmFjayBpcyBwcm92aWRlZCBhbmQgaXMgbm90IGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY3NzVmFyID0gKG5hbWUsIGZhbGxiYWNrKSA9PiB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXN0b20gcHJvcGVydHkgbmFtZSBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgaWYgKGZhbGxiYWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZhbGxiYWNrICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZhbGxiYWNrIHZhbHVlIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICByZXR1cm4gYHZhcigke25hbWV9JHtmYWxsYmFjayAhPT0gdW5kZWZpbmVkID8gYCwgJHtmYWxsYmFja31gIDogJyd9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgY3NzVmFyOyIsICJpbXBvcnQgYWJzIGZyb20gJy4vYWJzLmpzJztcbmltcG9ydCBhY29zIGZyb20gJy4vYWNvcy5qcyc7XG5pbXBvcnQgYXNpbiBmcm9tICcuL2FzaW4uanMnO1xuaW1wb3J0IGF0YW4gZnJvbSAnLi9hdGFuLmpzJztcbmltcG9ydCBhdGFuMiBmcm9tICcuL2F0YW4yLmpzJztcbmltcG9ydCBhdHRyIGZyb20gJy4vYXR0ci5qcyc7XG5pbXBvcnQgY2FsYyBmcm9tICcuL2NhbGMuanMnO1xuaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAuanMnO1xuaW1wb3J0IGNvcyBmcm9tICcuL2Nvcy5qcyc7XG5pbXBvcnQgY291bnRlciBmcm9tICcuL2NvdW50ZXIuanMnO1xuaW1wb3J0IGNvdW50ZXJzIGZyb20gJy4vY291bnRlcnMuanMnO1xuaW1wb3J0IGNyb3NzZmFkZSBmcm9tICcuL2Nyb3NzZmFkZS5qcyc7XG5pbXBvcnQgZWxlbWVudCBmcm9tICcuL2VsZW1lbnQuanMnO1xuaW1wb3J0IGVudiBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQgZXhwIGZyb20gJy4vZXhwLmpzJztcbmltcG9ydCBmaXRjb250ZW50IGZyb20gJy4vZml0Y29udGVudC5qcyc7XG5pbXBvcnQgaHlwb3QgZnJvbSAnLi9oeXBvdC5qcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nLmpzJztcbmltcG9ydCBtYXggZnJvbSAnLi9tYXguanMnO1xuaW1wb3J0IG1pbiBmcm9tICcuL21pbi5qcyc7XG5pbXBvcnQgbWlubWF4IGZyb20gJy4vbWlubWF4LmpzJztcbmltcG9ydCBtb2QgZnJvbSAnLi9tb2QuanMnO1xuaW1wb3J0IHBhdGggZnJvbSAnLi9wYXRoLmpzJztcbmltcG9ydCBwb3cgZnJvbSAnLi9wb3cuanMnO1xuaW1wb3J0IHJheSBmcm9tICcuL3JheS5qcyc7XG5pbXBvcnQgcmVtIGZyb20gJy4vcmVtLmpzJztcbmltcG9ydCByZXBlYXQgZnJvbSAnLi9yZXBlYXQuanMnO1xuaW1wb3J0IHJvdW5kIGZyb20gJy4vcm91bmQuanMnO1xuaW1wb3J0IHNpZ24gZnJvbSAnLi9zaWduLmpzJztcbmltcG9ydCBzaW4gZnJvbSAnLi9zaW4uanMnO1xuaW1wb3J0IHNxcnQgZnJvbSAnLi9zcXJ0LmpzJztcbmltcG9ydCBzeW1ib2xzIGZyb20gJy4vc3ltYm9scy5qcyc7XG5pbXBvcnQgdGFuIGZyb20gJy4vdGFuLmpzJztcbmltcG9ydCB1cmwgZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0IGNzc1ZhciBmcm9tICcuL3Zhci5qcyc7XG5cbmV4cG9ydCB7XG4gIGFicyxcbiAgYWNvcyxcbiAgYXNpbixcbiAgYXRhbixcbiAgYXRhbjIsXG4gIGF0dHIsXG4gIGNhbGMsXG4gIGNsYW1wLFxuICBjb3MsXG4gIGNvdW50ZXIsXG4gIGNvdW50ZXJzLFxuICBjcm9zc2ZhZGUsXG4gIGVsZW1lbnQsXG4gIGVudixcbiAgZXhwLFxuICBmaXRjb250ZW50LFxuICBoeXBvdCxcbiAgbG9nLFxuICBtYXgsXG4gIG1pbixcbiAgbWlubWF4LFxuICBtb2QsXG4gIHBhdGgsXG4gIHBvdyxcbiAgcmF5LFxuICByZW0sXG4gIHJlcGVhdCxcbiAgcm91bmQsXG4gIHNpZ24sXG4gIHNpbixcbiAgc3FydCxcbiAgc3ltYm9scyxcbiAgdGFuLFxuICB1cmwsXG4gIGNzc1ZhclxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFicyxcbiAgYWNvcyxcbiAgYXNpbixcbiAgYXRhbixcbiAgYXRhbjIsXG4gIGF0dHIsXG4gIGNhbGMsXG4gIGNsYW1wLFxuICBjb3MsXG4gIGNvdW50ZXIsXG4gIGNvdW50ZXJzLFxuICBjcm9zc2ZhZGUsXG4gIGVsZW1lbnQsXG4gIGVudixcbiAgZXhwLFxuICBmaXRjb250ZW50LFxuICBoeXBvdCxcbiAgbG9nLFxuICBtYXgsXG4gIG1pbixcbiAgbWlubWF4LFxuICBtb2QsXG4gIHBhdGgsXG4gIHBvdyxcbiAgcmF5LFxuICByZW0sXG4gIHJlcGVhdCxcbiAgcm91bmQsXG4gIHNpZ24sXG4gIHNpbixcbiAgc3FydCxcbiAgc3ltYm9scyxcbiAgdGFuLFxuICB1cmwsXG4gIGNzc1ZhclxufSIsICJpbXBvcnQgeyBjYWxjIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2luZGV4LmpzJztcblxuY29uc3Qgb3JHYXRlID0gKGEsIGIpID0+IHtcbiAgY29uc3QgQW92ZXJCID0gKGEsIGIpID0+IGNhbGMoYG1pbigxLCBtYXgoJHthfSAtICR7Yn0sIDApKWApO1xuICBjb25zdCBCb3ZlckEgPSAoYSwgYikgPT4gY2FsYyhgKDEgLSAke0FvdmVyQihhLCBiKX0pYCk7XG5cbiAgcmV0dXJuIFtcbiAgICBgJHtCb3ZlckEoYiwgYSl9ICogJHthfSArICR7QW92ZXJCKGEsIGIpfSAqICR7Yn1gLCAvLyBUcnVlIGlmIGVpdGhlciBhIG9yIGIgaXMgdHJ1ZVxuICAgIGAke0FvdmVyQihhLCBiKX0gKiAke2F9ICsgJHtCb3ZlckEoYiwgYSl9ICogJHtifWAgIC8vIFRydWUgaWYgYm90aCBhIGFuZCBiIGFyZSB0cnVlXG4gIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yR2F0ZSIsICJpbXBvcnQgb3JHYXRlIGZyb20gJy4vb3IuZ2F0ZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb3JHYXRlLFxufSIsICJpbXBvcnQgeyBjc3NWYXIgfSBmcm9tICcuLi9mdW5jdGlvbnMvdmFyLmpzJ1xuXG4vLyBHZXR0aW5nIGEgdmFyaWFibGUgaW4gQ1NTIHNjb3BlLlxuLy8gd2luZG93XG4vLyAgIC5nZXRDb21wdXRlZFN0eWxlKGRpdilcbi8vICAgLmdldFByb3BlcnR5VmFsdWUoJy0tZXhhbXBsZS12YXInKVxuXG5jb25zdCBBbm9vcCA9IGFzeW5jICgpID0+IHt9XG5cbi8qKlxuICogR2V0cyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gVGhlIHJvb3QgZWxlbWVudC5cbiAqL1xuY29uc3QgZ2V0Um9vdCA9IF8gPT4gXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuLyoqXG4gKiBHZXRzIHRoZSBjb21wdXRlZCBzdHlsZSBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICogQHJldHVybnMge0NTU1N0eWxlRGVjbGFyYXRpb259IFRoZSBjb21wdXRlZCBzdHlsZSBvYmplY3QgZm9yIHRoZSByb290IGVsZW1lbnQuXG4gKi9cbmNvbnN0IGdldFJvb3RTdHlsZSA9IF8gPT4gXG4gIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGdldFJvb3QoKSlcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgcHJvcGVydHkgdmFsdWUgZnJvbSB0aGUgcm9vdCBzdHlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgQ1NTIHByb3BlcnR5IG5hbWUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdmFsdWUgb2YgdGhlIENTUyBwcm9wZXJ0eS5cbiAqL1xuY29uc3QgZ2V0Um9vdFN0eWxlUHJvcGVydHkgPSBwcm9wZXJ0eSA9PiBnZXRSb290U3R5bGUoKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxuXG4vKipcbiAqIFJldHJpZXZlcyBhIENTUyBwcm9wZXJ0eSB2YWx1ZSBmcm9tIHRoZSByb290IHN0eWxlIHdpdGggYSBmYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgQ1NTIHByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmFsbGJhY2tGbj1Bbm9vcF0gVGhlIGZhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBmb3VuZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IFRoZSB2YWx1ZSBvZiB0aGUgQ1NTIHByb3BlcnR5IG9yIHRoZSByZXN1bHQgb2YgdGhlIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5jb25zdCBnZXRSb290U3R5bGVQcm9wZXJ0eVdpdGhGYWxsYmFjayA9IGFzeW5jIChwcm9wZXJ0eSwgZmFsbGJhY2tGbiA9IEFub29wKSA9PiB7XG4gIGxldCBycyA9IGdldFJvb3RTdHlsZSgpXG4gIHJldHVybiBycy5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSBcbiAgICB8fCBhd2FpdCBmYWxsYmFja0ZuKHJzKVxufVxuXG4vKipcbiAqIFNldHMgYSBDU1MgcHJvcGVydHkgb24gdGhlIHJvb3QgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgQ1NTIHByb3BlcnR5IG5hbWUgdG8gc2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIENTUyBwcm9wZXJ0eS5cbiAqL1xuY29uc3Qgc2V0Um9vdFByb3AgPSAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBnZXRSb290KClcbiAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpXG59XG5cbmNvbnN0IGRlbGV0ZVJvb3RQcm9wID0gcHJvcGVydHkgPT4ge1xuICBjb25zdCByb290ID0gZ2V0Um9vdCgpXG4gIHJvb3Quc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpXG59XG5cbi8qKlxuICogU2V0cyBhIENTUyB2YXJpYWJsZSBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUgdG8gc2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIENTUyB2YXJpYWJsZS5cbiAqL1xuY29uc3Qgc2V0Um9vdFZhciA9IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgc2V0Um9vdFByb3AoYC0tJHtwcm9wZXJ0eX1gLCB2YWx1ZSlcbn1cblxuY29uc3QgZGVsZXRlUm9vdFZhciA9IHByb3BlcnR5ID0+IHtcbiAgZGVsZXRlUm9vdFByb3AoYC0tJHtwcm9wZXJ0eX1gKVxufVxuXG4vKipcbiAqIFJldHJpZXZlcyBhIENTUyB2YXJpYWJsZSB2YWx1ZSBmcm9tIHRoZSByb290IHN0eWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdmFsdWUgb2YgdGhlIENTUyB2YXJpYWJsZS5cbiAqL1xuY29uc3QgZ2V0Um9vdFZhciA9IHByb3BlcnR5ID0+IGdldFJvb3RTdHlsZVByb3BlcnR5KGAtLSR7cHJvcGVydHl9YClcblxuLyoqXG4gKiBTZXRzIGEgQ1NTIHByb3BlcnR5IG9uIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgb24gd2hpY2ggdG8gc2V0IHRoZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgQ1NTIHByb3BlcnR5IG5hbWUgdG8gc2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIENTUyBwcm9wZXJ0eS5cbiAqL1xuY29uc3Qgc2V0Q1NTUHJvcCA9IChlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG4gIC5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpXG5cbmNvbnN0IGRlbGV0ZUNTU1Byb3AgPSAoZWxlbWVudCwgcHJvcGVydHkpID0+IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG4gIC5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eSlcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgcHJvcGVydHkgdmFsdWUgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IGZyb20gd2hpY2ggdG8gZ2V0IHRoZSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgQ1NTIHByb3BlcnR5IG5hbWUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdmFsdWUgb2YgdGhlIENTUyBwcm9wZXJ0eS5cbiAqL1xuY29uc3QgZ2V0Q1NTUHJvcCA9IChlbGVtZW50LCBwcm9wZXJ0eSkgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcbiAgLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG5cbi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIHZhcmlhYmxlIHZhbHVlIGZyb20gYSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBmcm9tIHdoaWNoIHRvIGdldCB0aGUgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgQ1NTIHZhcmlhYmxlLlxuICovXG5jb25zdCBnZXRDU1NWYXIgPSAoZWxlbWVudCwgcHJvcGVydHkpID0+IGdldENTU1Byb3AoZWxlbWVudCwgYC0tJHtwcm9wZXJ0eX1gKVxuXG4vKipcbiAqIFNldHMgYSBDU1MgdmFyaWFibGUgb24gYSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBvbiB3aGljaCB0byBzZXQgdGhlIHZhcmlhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUgdG8gc2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIENTUyB2YXJpYWJsZS5cbiAqL1xuY29uc3Qgc2V0Q1NTVmFyID0gKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSkgPT4gc2V0Q1NTUHJvcChlbGVtZW50LCBgLS0ke3Byb3BlcnR5fWAgLCB2YWx1ZSlcblxuLyoqXG4gKiBSZW1vdmVzIGEgQ1NTIHZhcmlhYmxlIGZyb20gYSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBmcm9tIHdoaWNoIHRvIHJlbW92ZSB0aGUgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZSB0byByZW1vdmUuXG4gKi9cbmNvbnN0IGRlbGV0ZUNTU1ZhciA9IChlbGVtZW50LCBwcm9wZXJ0eSkgPT4gZGVsZXRlQ1NTUHJvcChlbGVtZW50LCBgLS0ke3Byb3BlcnR5fWApXG5cbi8vIC0tLVxudmFyIHJ1bm5pbmdDU1NfRXZhbHMgPSAwO1xuXG4vKipcbiAqIEV2YWx1YXRlcyBhIENTUyBwcm9wZXJ0eSBieSB0ZW1wb3JhcmlseSBhcHBseWluZyBpdCB0byB0aGUgcm9vdCBhbmQgcmV0cmlldmluZyBpdHMgY29tcHV0ZWQgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzIFRoZSBDU1MgcHJvcGVydHkgdmFsdWUgdG8gZXZhbHVhdGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tcHV0ZWQgdmFsdWUgb2YgdGhlIENTUyBwcm9wZXJ0eS5cbiAqL1xuY29uc3QgZXZhbENTU1Byb3AgPSBjc3MgPT4ge1xuICBjb25zdCBuYW1lID0gJ2V2YWwtY3NzLScgKyBydW5uaW5nQ1NTX0V2YWxzO1xuICArK3J1bm5pbmdDU1NfRXZhbHM7XG4gIHNldFJvb3RWYXIobmFtZSwgY3NzKVxuICBcbiAgbGV0IHJlcyA9IGdldFJvb3RWYXIobmFtZSlcbiAgLS1ydW5uaW5nQ1NTX0V2YWxzO1xuICBkZWxldGVSb290VmFyKG5hbWUpXG5cbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgZXZhbENTU0hhcmQgPSAocnVsZSwgY3NzKSA9PiBDU1NTdHlsZVZhbHVlLnBhcnNlKHJ1bGUsIGNzcylcblxuY29uc3QgY3JlYXRlQ291bnRlciA9IChlbGVtZW50LCBwcm9wZXJ0eSwgdmFyXykgPT4ge1xuICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCBgY291bnRlcigke3Zhcl99KWApXG4gIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2NvdW50ZXItcmVzZXQnLCBgJHt2YXJffSAke2Nzc1Zhcih2YXJfKX1gKVxuICByZXR1cm4gZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjdXN0b20gQ1NTIHByb3BlcnR5IHdpdGggYSBnaXZlbiBuYW1lIGFuZCBvcHRpb25hbCBwYXJhbWV0ZXJzLlxuICogSWYgdGhlIGJyb3dzZXIgaXMgRmlyZWZveCwgdGhlIHByb3BlcnR5IGlzIHNldCBvbiB0aGUgcm9vdCBlbGVtZW50IGluc3RlYWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHByb3BlcnR5IHRvIGNyZWF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YT17fV0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgcHJvcGVydHksIHN1Y2ggYXMgc3ludGF4IGFuZCBpbml0aWFsVmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbmhlcml0cz1mYWxzZV0gV2hldGhlciB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGluaGVyaXRlZCBieSBkZXNjZW5kYW50IGVsZW1lbnRzLlxuICovXG5jb25zdCBjcmVhdGVQcm9wZXJ0eSA9IChuYW1lLCBkYXRhID0ge30sIGluaGVyaXRzID0gZmFsc2UpID0+IHtcbiAgLy8gSXMgZmlyZWZveD9cbiAgbGV0IGlzRkYgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG5cbiAgaWYgKCFpc0ZGKSB7XG4gICAgQ1NTLnJlZ2lzdGVyUHJvcGVydHkoe1xuICAgICAgbmFtZSxcbiAgICAgIHN5bnRheDogZGF0YT8uc3ludGF4IHx8IFwiPGNvbG9yPlwiLFxuICAgICAgaW5oZXJpdHM6IGluaGVyaXRzIHx8IGZhbHNlLFxuICAgICAgaW5pdGlhbFZhbHVlOiBkYXRhPy5pbml0aWFsVmFsdWUgfHwgXCIjYzBmZmVlXCIsXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBzZXRSb290VmFyKG5hbWUsIGRhdGE/LmluaXRpYWxWYWx1ZSB8fCBcIiNjMGZmZWVcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFJvb3QsXG4gIGdldFJvb3RTdHlsZSxcbiAgZ2V0Um9vdFN0eWxlUHJvcGVydHksXG4gIGdldFJvb3RTdHlsZVByb3BlcnR5V2l0aEZhbGxiYWNrLFxuICBzZXRSb290UHJvcCxcbiAgZGVsZXRlUm9vdFByb3AsXG4gIHNldFJvb3RWYXIsXG4gIGRlbGV0ZVJvb3RWYXIsXG4gIGdldFJvb3RWYXIsXG4gIHNldENTU1Byb3AsXG4gIGRlbGV0ZUNTU1Byb3AsXG4gIGdldENTU1Byb3AsXG4gIGdldENTU1ZhcixcbiAgc2V0Q1NTVmFyLFxuICBkZWxldGVDU1NWYXIsXG5cbiAgZXZhbENTU1Byb3AsXG4gIGV2YWxDU1NIYXJkLFxuICBcbiAgY3JlYXRlUHJvcGVydHksXG4gIGNyZWF0ZUNvdW50ZXIsXG59IiwgImltcG9ydCByb290TWFuaXB1bGF0ZSBmcm9tICcuL3Jvb3RNYW5pcHVsYXRlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgeyBcbiAgcm9vdE1hbmlwdWxhdGVcbn0iLCAiaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vaGVscGVycy9pbmRleC5qcyc7XG5pbXBvcnQga2V5d29yZHMgZnJvbSAnLi4va2V5d29yZHMvaW5kZXguanMnO1xuaW1wb3J0IGZ1bmN0aW9ucyBmcm9tICcuLi9mdW5jdGlvbnMvaW5kZXguanMnO1xuaW1wb3J0IGhhbmRsZXMgZnJvbSAnLi4vaGFuZGxlcy9pbmRleC5qcyc7XG5pbXBvcnQgbWFnaWMgZnJvbSAnLi4vbWFnaWMvaW5kZXguanMnO1xuXG5jbGFzcyBXVEZTdHlsZXNoZWV0IHtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBoZWxwZXJzIG1vZHVsZS5cbiAgICovXG4gIHN0YXRpYyBoZWxwZXJzID0gaGVscGVycztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBrZXl3b3JkcyBtb2R1bGUuXG4gICAqL1xuICBzdGF0aWMga2V5d29yZHMgPSBrZXl3b3JkcztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbnMgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGZ1bmN0aW9ucyA9IGZ1bmN0aW9ucztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBoYW5kbGVzIG1vZHVsZS5cbiAgICovXG4gIHN0YXRpYyBoYW5kbGVzID0gaGFuZGxlcztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBtYWdpYyBtb2R1bGUuXG4gICAqL1xuICBzdGF0aWMgbWFnaWMgPSBtYWdpYztcblxuICAvKipcbiAgICogSW5zdGFuY2UgcmVmZXJlbmNlIHRvIHRoZSBoZWxwZXJzIG1vZHVsZS5cbiAgICovXG4gIGhlbHBlcnMgPSBoZWxwZXJzO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSByZWZlcmVuY2UgdG8gdGhlIGtleXdvcmRzIG1vZHVsZS5cbiAgICovXG4gIGtleXdvcmRzID0ga2V5d29yZHM7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIHJlZmVyZW5jZSB0byB0aGUgZnVuY3Rpb25zIG1vZHVsZS5cbiAgICovXG4gIGZ1bmN0aW9ucyA9IGZ1bmN0aW9ucztcblxuICAvKipcbiAgICogSW5zdGFuY2UgcmVmZXJlbmNlIHRvIHRoZSBoYW5kbGVzIG1vZHVsZS5cbiAgICovXG4gIGhhbmRsZXMgPSBoYW5kbGVzO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSByZWZlcmVuY2UgdG8gdGhlIG1hZ2ljIG1vZHVsZS5cbiAgICovXG4gIG1hZ2ljID0gbWFnaWM7XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBjb3VudGVyIGZvciB1bmlxdWUgaWRlbnRpZmllci5cbiAgICovXG4gIHN0YXRpYyBjb3VudCA9IDA7XG5cbiAgLyoqXG4gICAqIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgc3R5bGVzaGVldCBpbnN0YW5jZS5cbiAgICovXG4gIGlkID0gKytXVEZTdHlsZXNoZWV0LmNvdW50O1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIENTUyBydWxlcy5cbiAgICovXG4gIHJ1bGVzID0gW107XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgYnJvd3NlcidzIENTUyBvYmplY3QuXG4gICAqL1xuICBDU1MgPSB3aW5kb3cuQ1NTO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFdURlN0eWxlc2hlZXQuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY3VtZW50IC0gVGhlIGRvY3VtZW50IGluIHdoaWNoIHRoZSBzdHlsZXNoZWV0IHdpbGwgYmUgY3JlYXRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBDU1MgcnVsZSB0byB0aGUgc3R5bGVzaGVldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIENTUyBzZWxlY3RvciBmb3IgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZWNsYXJhdGlvbnMgLSBUaGUgQ1NTIGRlY2xhcmF0aW9ucyBmb3IgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaW5kZXhdIC0gVGhlIHBvc2l0aW9uIGF0IHdoaWNoIHRvIGluc2VydCB0aGUgcnVsZS5cbiAgICovXG4gIGFkZFJ1bGUoc2VsZWN0b3IsIGRlY2xhcmF0aW9ucywgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5kZXggPSB0aGlzLnJ1bGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICB0aGlzLnJ1bGVzLnNwbGljZShpbmRleCwgMCwge1xuICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgZGVjbGFyYXRpb25zOiBkZWNsYXJhdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICAvLyAtLS1cblxuICAvKipcbiAgICogQ3JlYXRlcyBvciByZXRyaWV2ZXMgdGhlIHN0eWxlIGVsZW1lbnQgZm9yIHRoZSBzdHlsZXNoZWV0LlxuICAgKiBAcmV0dXJuIHtIVE1MU3R5bGVFbGVtZW50fSBUaGUgc3R5bGUgZWxlbWVudC5cbiAgICovXG4gIGNyZWF0ZVN0eWxlc2hlZXQoKSB7XG4gICAgaWYgKCF0aGlzLnN0eWxlc2hlZXQpIHtcbiAgICAgIHRoaXMuc3R5bGVzaGVldCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdHlsZXNoZWV0O1xuICB9XG5cbiAgaXNJbkRvY3VtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmNvbnRhaW5zKHRoaXMuc3R5bGVzaGVldCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBDU1NTdHlsZVNoZWV0IG9iamVjdCBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBET00gZWxlbWVudCBvciBydWxlLlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fENTU1J1bGV9IG9iamVjdCAtIFRoZSBET00gZWxlbWVudCBvciBDU1MgcnVsZSB0byBnZXQgdGhlIHN0eWxlc2hlZXQgZnJvbS5cbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGUgb2JqZWN0IHR5cGUgaXMgdW5zdXBwb3J0ZWQuXG4gICAqIEByZXR1cm4ge0NTU1N0eWxlU2hlZXR8bnVsbH0gVGhlIGFzc29jaWF0ZWQgQ1NTU3R5bGVTaGVldCBvYmplY3QsIG9yIG51bGwgaWYgbm90IGZvdW5kLlxuICAgKi9cbiAgZ2V0U2hlZXQob2JqZWN0KSB7XG4gICAgLy8gR2V0IHRoZSBDU1NTdHlsZVNoZWV0IG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIG93bmVyIGVsZW1lbnQgb3IgcnVsZVxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBvYmplY3QgaW5zdGFuY2VvZiBIVE1MTGlua0VsZW1lbnQ6XG4gICAgICBjYXNlIG9iamVjdCBpbnN0YW5jZW9mIEhUTUxTdHlsZUVsZW1lbnQ6XG4gICAgICBjYXNlIG9iamVjdCBpbnN0YW5jZW9mIFNWR1N0eWxlRWxlbWVudDpcbiAgICAgIGNhc2Ugb2JqZWN0IGluc3RhbmNlb2YgUHJvY2Vzc2luZ0luc3RydWN0aW9uICYmIG9iamVjdC50YXJnZXQgPT09ICd4bWwtc3R5bGVzaGVldCc6XG4gICAgICAgIHJldHVybiBvYmplY3Quc2hlZXQ7XG5cbiAgICAgIGNhc2Ugb2JqZWN0IGluc3RhbmNlb2YgQ1NTSW1wb3J0UnVsZTpcbiAgICAgICAgcmV0dXJuIG9iamVjdC5zdHlsZVNoZWV0O1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIG93bmVyIG9iamVjdCBmb3IgZ2V0dGluZyBDU1NTdHlsZVNoZWV0LicpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUxhc3RSdWxlKCkge1xuICAgIGxldCBzcyA9IHRoaXMuY3JlYXRlU3R5bGVzaGVldCgpO1xuICAgIGxldCBzXyA9IHRoaXMuZ2V0U2hlZXQoc3MpO1xuICAgIGxldCBydWxlcyA9IHNfLmNzc1J1bGVzO1xuICAgIGxldCBsYXN0UnVsZSA9IHJ1bGVzW3J1bGVzLmxlbmd0aCAtIDFdO1xuICAgIHNfLmRlbGV0ZVJ1bGUobGFzdFJ1bGUuaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBzdHlsZXNoZWV0IGludG8gYSBzdHlsZSBlbGVtZW50LlxuICAgKi9cbiAgY29tcGlsZSgpIHtcbiAgICBsZXQgc3MgPSB0aGlzLmNyZWF0ZVN0eWxlc2hlZXQoKTtcbiAgICBsZXQgc18gPSB0aGlzLmdldFNoZWV0KHNzKTtcblxuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuXG4gICAgbGV0IGNzcyA9IHRoaXMuQ1NTO1xuXG4gICAgLy8gQWRkIHRoZSBDU1MgcnVsZXNcbiAgICBsZXQgYWxsUnVsZXMgPSB0aGlzLnJ1bGVzLm1hcChydWxlID0+IHtcbiAgICAgIGNvbnN0IHsgc2VsZWN0b3IsIGRlY2xhcmF0aW9ucyB9ID0gcnVsZTtcblxuICAgICAgZGVjbGFyYXRpb25zLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGxldCBydWxlU3RyaW5nID0gYCR7a2V5fTogJHt2YWx1ZX0ke3ZhbHVlPy5bMV0gPyAnICFpbXBvcnRhbnQnIDogJyd9YDtcbiAgICAgICAgbGV0IHN0eWxlID0gYCR7c2VsZWN0b3J9IHsgJHtydWxlU3RyaW5nfSB9YFxuICAgICAgICBzXy5pbnNlcnRSdWxlKHN0eWxlLCBzXy5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW3NlbGVjdG9yXTogZGVjbGFyYXRpb25zLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuaXNJbkRvY3VtZW50KCkpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsbFJ1bGVzO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV1RGU3R5bGVzaGVldCIsICJpbXBvcnQgc3R5bGVzaGVldCBmcm9tICcuL2NvcmUvc3R5bGVzaGVldC5qcydcblxuY29uc3QgZXBfID0ge1xuICBzdHlsZXNoZWV0XG59XG5cbmNvbnN0IGV2XyA9IG5ldyBDdXN0b21FdmVudCgnd3RmY3NzOmxvYWRlZCcsIHtcbiAgZGV0YWlsOiB7XG4gICAgdmVyc2lvbjogJzAuMC4xJyxcbiAgICBlbnRyeXBvaW50OiBlcF8sXG4gIH1cbn0pXG5cbndpbmRvdy5XVEZDU1MgPSB7IC4uLmVwXyB9XG5cbndpbmRvdy5kaXNwYXRjaEV2ZW50KGV2XykiXSwKICAibWFwcGluZ3MiOiAiOzs7QUFNTyxJQUFNLFVBQVUsa0JBQWdCLGFBQWEsWUFBWTtBQUNoRSxJQUFPLGtCQUFROzs7QUNEUixJQUFNLHFCQUFxQixDQUFDLE1BQU0sS0FBSyxvQkFBb0I7QUFDaEUsTUFBSSxjQUFjLGtCQUFrQixJQUFJO0FBQUEsY0FBb0IsR0FBRztBQUUvRCxNQUFJLGlCQUFpQjtBQUNuQixtQkFBZTtBQUFBLHNCQUEwQixlQUFlO0FBQUEsRUFDMUQ7QUFFQSxpQkFBZTtBQUVmLFNBQU87QUFDVDtBQUNBLElBQU8sdUJBQVE7OztBQ1ZSLElBQU0sdUJBQXVCLENBQUMsTUFBTSxXQUFXLFdBQVc7QUFDL0QsTUFBSSxnQkFBZ0IsY0FBYyxPQUFPLE9BQU8sTUFBTSxFQUFFLElBQUksU0FBUztBQUFBLEVBQVEsTUFBTTtBQUFBO0FBQ25GLFNBQU87QUFDVDtBQUNBLElBQU8sb0JBQVE7OztBQ0hSLElBQU0sbUJBQW1CLENBQUMsTUFBTSxRQUFRLFVBQVUsaUJBQWlCO0FB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Q0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7OztBQ3VEQSxTQUFTLGVBQWUsUUFBUSxJQUFJO0FBQ2xDLFVBQVEsT0FBTztBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FBSztBQUFBLElBQ0wsS0FB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RSxZQUFJQyxTQUFRLEdBQUcsUUFBUSxNQUFNLFVBQVU7QUFDdkMsV0FBRyxXQUFXQSxRQUFPLEdBQUcsU0FBUyxNQUFNO0FBQ3ZDLGVBQU9BO0FBQUEsTUFDVCxDQUFDO0FBRUQsYUFBTztBQUFBLFFBQ0wsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNkO0FBQUEsSUFDRixDQUFDO0FBRUQsUUFBSSxDQUFDLEtBQUssYUFBYSxHQUFHO0FBQ3hCLFdBQUssU0FBUyxLQUFLLFlBQVksS0FBSztBQUFBLElBQ3RDO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFFRjtBQUVBLElBQU8scUJBQVE7OztBQzFMZixJQUFNLE1BQU07QUFBQSxFQUNWO0FBQ0Y7QUFFQSxJQUFNLE1BQU0sSUFBSSxZQUFZLGlCQUFpQjtBQUFBLEVBQzNDLFFBQVE7QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQztBQUVELE9BQU8sU0FBUyxFQUFFLEdBQUcsSUFBSTtBQUV6QixPQUFPLGNBQWMsR0FBRzsiLAogICJuYW1lcyI6IFsibWluIiwgIm1heCIsICJtaW4iLCAibWF4IiwgInBhdGgiLCAiYSIsICJiIiwgImVsZW1lbnQiLCAiZG9jdW1lbnQiLCAic3R5bGUiXQp9Cg==