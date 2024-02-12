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
export {
  stylesheet_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY2hhcnNldC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bjb2xvcnByb2ZpbGUuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY29udGFpbmVyLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQHByb3BlcnR5LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGNvdW50ZXJzdHlsZS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bmb250ZmFjZS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bmb250ZmVhdHVyZXZhbHVlcy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0Bmb250cGFsbGV0ZXZhbHVlcy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BpbXBvcnQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Aa2V5ZnJhbWVzLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQGxheWVyLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQG1lZGlhLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQG5hbWVzcGFjZS5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oZWxwZXJzL0BwYWdlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hlbHBlcnMvQHN0YXJ0aW5nc3R5bGUuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Ac3VwcG9ydHMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9pbmRleC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9rZXl3b3Jkcy90eXBlcy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9rZXl3b3Jkcy9pbXBvcnRhbnQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMva2V5d29yZHMvaW5kZXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Ficy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYWNvcy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXNpbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXRhbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXRhbjIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2F0dHIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NhbGMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NsYW1wLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jb3MuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXJzLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jcm9zc2ZhZGUuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2VsZW1lbnQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Vudi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvZXhwLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9maXRjb250ZW50LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9oeXBvdC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbG9nLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9tYXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL21pbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbWlubWF4LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9tb2QuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3BhdGguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Bvdy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcmF5LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9yZW0uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JlcGVhdC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcm91bmQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3NpZ24uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Npbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvc3FydC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvc3ltYm9scy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvdGFuLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy91cmwuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Zhci5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvaW5kZXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9vci5nYXRlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2hhbmRsZXMvaW5kZXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvbWFnaWMvcm9vdE1hbmlwdWxhdGUuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvbWFnaWMvaW5kZXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvY29yZS9zdHlsZXNoZWV0LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMgYSBjaGFyc2V0IGZvciBhIENTUyBmaWxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyc2V0VmFsdWUgLSBUaGUgY2hhcnNldCB0byBiZSBzZXQgZm9yIHRoZSBDU1MgZmlsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGNoYXJzZXQgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoYXJzZXQgPSBjaGFyc2V0VmFsdWUgPT4gYEBjaGFyc2V0IFwiJHtjaGFyc2V0VmFsdWV9XCI7YFxuZXhwb3J0IGRlZmF1bHQgY2hhcnNldDsiLCAiLyoqXG4gKiBEZWZpbmVzIGEgY29sb3IgcHJvZmlsZSBmb3IgdXNlIGluIENTUy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvbG9yIHByb2ZpbGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0gVGhlIFVSTCBvZiB0aGUgY29sb3IgcHJvZmlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcmVuZGVyaW5nSW50ZW50XSAtIFRoZSByZW5kZXJpbmcgaW50ZW50IHRvIHVzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUNvbG9yUHJvZmlsZSA9IChuYW1lLCBzcmMsIHJlbmRlcmluZ0ludGVudCkgPT4ge1xuICBsZXQgcHJvZmlsZVJ1bGUgPSBgQGNvbG9yLXByb2ZpbGUgJHtuYW1lfSB7XFxuICBzcmM6IHVybChcXFwiJHtzcmN9XFxcIilgO1xuXG4gIGlmIChyZW5kZXJpbmdJbnRlbnQpIHtcbiAgICBwcm9maWxlUnVsZSArPSBgO1xcbiAgcmVuZGVyaW5nLWludGVudDogJHtyZW5kZXJpbmdJbnRlbnR9YDtcbiAgfVxuXG4gIHByb2ZpbGVSdWxlICs9ICc7XFxufSc7XG5cbiAgcmV0dXJuIHByb2ZpbGVSdWxlO1xufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29sb3JQcm9maWxlIiwgIi8qKlxuICogQXBwbGllcyBzdHlsZXMgdG8gYSBjb250YWlubWVudCBjb250ZXh0IGJhc2VkIG9uIGEgY29uZGl0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgb3B0aW9uYWwgbmFtZSBvZiB0aGUgY29udGFpbmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbmRpdGlvbiAtIFRoZSBjb250YWluZXIgcXVlcnkgY29uZGl0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlcyAtIFRoZSBDU1Mgc3R5bGVzIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBjb250YWluZXIgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGx5Q29udGFpbmVyU3R5bGVzID0gKG5hbWUsIGNvbmRpdGlvbiwgc3R5bGVzKSA9PiB7XG4gIGxldCBjb250YWluZXJSdWxlID0gYEBjb250YWluZXIgJHtuYW1lID8gbmFtZSArICcgJyA6ICcnfSgke2NvbmRpdGlvbn0pIHtcXG4ke3N0eWxlc31cXG59YDtcbiAgcmV0dXJuIGNvbnRhaW5lclJ1bGU7XG59XG5leHBvcnQgZGVmYXVsdCBhcHBseUNvbnRhaW5lclN0eWxlcyIsICIvKipcbiAqIFJlZ2lzdGVycyBhIGN1c3RvbSBDU1MgcHJvcGVydHkgdXNpbmcgdGhlIEBwcm9wZXJ0eSBydWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY3VzdG9tIHByb3BlcnR5LlxuICogQHBhcmFtIHtzdHJpbmd9IHN5bnRheCAtIERlc2NyaWJlcyB0aGUgYWxsb3dhYmxlIHN5bnRheCBmb3IgdGhlIHByb3BlcnR5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0cyAtIENvbnRyb2xzIHdoZXRoZXIgdGhlIGN1c3RvbSBwcm9wZXJ0eSBpbmhlcml0cyBieSBkZWZhdWx0LlxuICogQHBhcmFtIHtzdHJpbmd9IGluaXRpYWxWYWx1ZSAtIFNldHMgdGhlIGluaXRpYWwgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBmb3JtYXR0ZWQgQHByb3BlcnR5IHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlclByb3BlcnR5ID0gKG5hbWUsIHN5bnRheCwgaW5oZXJpdHMsIGluaXRpYWxWYWx1ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIFtgQHByb3BlcnR5ICR7bmFtZX1gXTogKFxuICAgICAgXCJ7IFwiICtcbiAgICAgICghc3ludGF4ID8/IGBzeW50YXg6IFwiJHtzeW50YXh9XCI7IGApICtcbiAgICAgICghaW5oZXJpdHMgPz8gYGluaGVyaXRzOiAke2luaGVyaXRzfTsgYCkgK1xuICAgICAgKCFpbml0aWFsVmFsdWUgPz8gYGluaXRpYWwtdmFsdWU6ICR7aW5pdGlhbFZhbHVlfTtgKSArXG4gICAgICBcIiB9XCJcbiAgICApXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyUHJvcGVydHkiLCAiLyoqXG4gKiBEZWZpbmVzIGEgY3VzdG9tIGNvdW50ZXIgc3R5bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb3VudGVyIHN0eWxlLlxuICogQHBhcmFtIHtvYmplY3R9IHJ1bGVzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRlc2NyaXB0b3JzIGFuZCB2YWx1ZXMgZm9yIHRoZSBzdHlsZS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbmFtZSBpcyBvbmUgb2YgdGhlIHJlc2VydmVkIHN0eWxlIG5hbWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAY291bnRlci1zdHlsZSBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lQ291bnRlclN0eWxlID0gKG5hbWUsIHJ1bGVzKSA9PiB7XG4gIGlmIChbJ2RlY2ltYWwnLCAnZGlzYycsICdzcXVhcmUnLCAnY2lyY2xlJywgJ2Rpc2Nsb3N1cmUtb3BlbicsICdkaXNjbG9zdXJlLWNsb3NlZCddLmluY2x1ZGVzKG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBuYW1lIFwiJHtuYW1lfVwiIGlzIG5vdCBhbGxvd2VkIGZvciBjdXN0b20gY291bnRlciBzdHlsZXMuYCk7XG4gIH1cblxuICBjb25zdCBydWxlRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHJ1bGVzKS5tYXAoKFtkZXNjcmlwdG9yLCB2YWx1ZV0pID0+IHtcbiAgICBpZiAoZGVzY3JpcHRvciA9PT0gJ3N5bWJvbHMnIHx8IGRlc2NyaXB0b3IgPT09ICdhZGRpdGl2ZS1zeW1ib2xzJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoc3ltYm9sID0+IGBcXFwiJHtzeW1ib2x9XFxcImApLmpvaW4oJyAnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2Rlc2NyaXB0b3J9OiAke3ZhbHVlfWA7XG4gIH0pO1xuICBjb25zdCBydWxlU3RyaW5nID0gcnVsZUVudHJpZXMuam9pbignOyAnKTtcbiAgY29uc3QgY291bnRlclJ1bGUgPSBgQGNvdW50ZXItc3R5bGUgJHtuYW1lfSB7ICR7cnVsZVN0cmluZ30gfWA7XG5cbiAgcmV0dXJuIGNvdW50ZXJSdWxlXG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb3VudGVyU3R5bGUiLCAiLyoqXG4gKiBDcmVhdGVzIGEgQ1NTIEBmb250LWZhY2UgcnVsZSBzdHJpbmcuXG4gKiBAcGFyYW0ge29iamVjdH0gZm9udEZhY2UgLSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBmb250IGZhY2UgY29uZmlndXJhdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGZvbnQtZmFjZSBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udEZhY2UgPSBmb250RmFjZSA9PiB7XG4gIGNvbnN0IGZvbnRGYWNlUnVsZSA9IGBAZm9udC1mYWNlIHtcbiAgICBmb250LWZhbWlseTogXCIke2ZvbnRGYWNlLmZhbWlseX1cIjtcbiAgICBzcmM6ICR7Zm9udEZhY2Uuc291cmNlcy5tYXAoc291cmNlID0+IHtcbiAgICAgIGlmIChzb3VyY2UudXJsKSB7XG4gICAgICAgIHJldHVybiBgdXJsKFwiJHtzb3VyY2UudXJsfVwiKSBmb3JtYXQoXCIke3NvdXJjZS5mb3JtYXR9XCIpYDtcbiAgICAgIH0gZWxzZSBpZiAoc291cmNlLmxvY2FsKSB7XG4gICAgICAgIHJldHVybiBgbG9jYWwoXCIke3NvdXJjZS5sb2NhbH1cIilgO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH0pLmpvaW4oJyxcXG4gICAgJyl9O1xuICAgICR7Zm9udEZhY2UuZGVzY3JpcHRvcnMgPyBPYmplY3QuZW50cmllcyhmb250RmFjZS5kZXNjcmlwdG9ycykubWFwKChba2V5LCB2YWx1ZV0pID0+IGAke2tleX06ICR7dmFsdWV9YCkuam9pbignO1xcbiAgICAnKSA6ICcnfVxuICB9YDtcblxuICByZXR1cm4gZm9udEZhY2VSdWxlXG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRm9udEZhY2UiLCAiLyoqXG4gKiBEZWZpbmVzIGZvbnQgZmVhdHVyZSB2YWx1ZXMgZm9yIGEgZ2l2ZW4gZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gZmFtaWx5TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBmb250IGZhbWlseS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlVmFsdWVzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZlYXR1cmUgdGFncyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBmb250LWZlYXR1cmUtdmFsdWVzIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVGb250RmVhdHVyZVZhbHVlcyA9IChmYW1pbHlOYW1lLCBmZWF0dXJlVmFsdWVzKSA9PiB7XG4gIGNvbnN0IGZlYXR1cmVCbG9ja3MgPSBPYmplY3QuZW50cmllcyhmZWF0dXJlVmFsdWVzKS5tYXAoKFtmZWF0dXJlLCB2YWx1ZXNdKSA9PiB7XG4gICAgY29uc3QgdmFsdWVTdHJpbmcgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMuam9pbignICcpIDogdmFsdWVzO1xuICAgIHJldHVybiBgQCR7ZmVhdHVyZX0geyAke2ZhbWlseU5hbWV9OiAke3ZhbHVlU3RyaW5nfTsgfWA7XG4gIH0pLmpvaW4oJ1xcbicpO1xuICByZXR1cm4gYEBmb250LWZlYXR1cmUtdmFsdWVzICR7ZmFtaWx5TmFtZX0ge1xcbiR7ZmVhdHVyZUJsb2Nrc31cXG59YDtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVGb250RmVhdHVyZVZhbHVlcyIsICIvKipcbiAqIERlZmluZXMgZm9udCBwYWxldHRlIHZhbHVlcyBmb3IgYSBnaXZlbiBpZGVudGlmaWVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgLSBUaGUgaWRlbnRpZmllciBmb3IgdGhlIGZvbnQgcGFsZXR0ZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZhbWlseU5hbWVdIC0gVGhlIG5hbWUgb2YgdGhlIGZvbnQgZmFtaWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IFtiYXNlUGFsZXR0ZV0gLSBUaGUgYmFzZSBwYWxldHRlIG9mIHRoZSBmb250LlxuICogQHBhcmFtIHtBcnJheTxBcnJheTxzdHJpbmc+Pn0gW292ZXJyaWRlQ29sb3JzXSAtIEFuIGFycmF5IG9mIGNvbG9yIG92ZXJyaWRlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGZvbnQtcGFsZXR0ZS12YWx1ZXMgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUZvbnRQYWxldHRlVmFsdWVzID0gKGlkZW50aWZpZXIsIGZhbWlseU5hbWUsIGJhc2VQYWxldHRlLCBvdmVycmlkZUNvbG9ycykgPT4ge1xuICBjb25zdCBkZWNsYXJhdGlvbnMgPSBbXTtcbiAgaWYgKGZhbWlseU5hbWUpIGRlY2xhcmF0aW9ucy5wdXNoKGBmb250LWZhbWlseTogJHtmYW1pbHlOYW1lfTtgKTtcbiAgaWYgKGJhc2VQYWxldHRlKSBkZWNsYXJhdGlvbnMucHVzaChgYmFzZS1wYWxldHRlOiAke2Jhc2VQYWxldHRlfTtgKTtcbiAgaWYgKG92ZXJyaWRlQ29sb3JzKSB7XG4gICAgY29uc3QgY29sb3JPdmVycmlkZXMgPSBvdmVycmlkZUNvbG9ycy5tYXAoY29sb3IgPT4gY29sb3Iuam9pbignICcpKS5qb2luKCcsXFxuICAgICcpO1xuICAgIGRlY2xhcmF0aW9ucy5wdXNoKGBvdmVycmlkZS1jb2xvcnM6XFxuICAgICR7Y29sb3JPdmVycmlkZXN9O2ApO1xuICB9XG5cbiAgcmV0dXJuIGBAZm9udC1wYWxldHRlLXZhbHVlcyAke2lkZW50aWZpZXJ9IHtcXG4gICR7ZGVjbGFyYXRpb25zLmpvaW4oJ1xcbiAgJyl9XFxufWA7XG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVGb250UGFsZXR0ZVZhbHVlcyIsICIvKipcbiAqIENyZWF0ZXMgYW4gQGltcG9ydCBydWxlIHdpdGggb3B0aW9uYWwgY29uZGl0aW9ucyBhbmQgbGF5ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW1wb3J0UGF0aCAtIFRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gYmUgaW1wb3J0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lZGlhUXVlcmllc10gLSBUaGUgbWVkaWEgcXVlcnkgY29uZGl0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3VwcG9ydHNDb25kaXRpb25dIC0gVGhlIHN1cHBvcnRzIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbGF5ZXJOYW1lXSAtIFRoZSBuYW1lIG9mIHRoZSBsYXllci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGNvbXBsZXRlIEBpbXBvcnQgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUltcG9ydCA9IChpbXBvcnRQYXRoLCBtZWRpYVF1ZXJpZXMgPSAnJywgc3VwcG9ydHNDb25kaXRpb24gPSAnJywgbGF5ZXJOYW1lID0gJycpID0+IHtcbiAgbGV0IGltcG9ydFJ1bGUgPSBgQGltcG9ydCB1cmwoJHtpbXBvcnRQYXRofSlgO1xuXG4gIGlmIChsYXllck5hbWUpIHtcbiAgICBpbXBvcnRSdWxlICs9IGAgbGF5ZXIoJHtsYXllck5hbWV9KWA7XG4gIH1cblxuICBpZiAoc3VwcG9ydHNDb25kaXRpb24pIHtcbiAgICBpbXBvcnRSdWxlICs9IGAgc3VwcG9ydHMoJHtzdXBwb3J0c0NvbmRpdGlvbn0pYDtcbiAgfVxuXG4gIGlmIChtZWRpYVF1ZXJpZXMpIHtcbiAgICBpbXBvcnRSdWxlICs9IGAgJHttZWRpYVF1ZXJpZXN9YDtcbiAgfVxuXG4gIGltcG9ydFJ1bGUgKz0gJzsnO1xuXG4gIHJldHVybiBpbXBvcnRSdWxlO1xufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lSW1wb3J0IiwgIi8qKlxuICogRGVmaW5lcyBrZXlmcmFtZSBhbmltYXRpb25zLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgYW5pbWF0aW9uLlxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmcmFtZXMgLSBBbiBhcnJheSBvZiBvYmplY3RzIHJlcHJlc2VudGluZyB0aGUga2V5ZnJhbWVzLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgYXJndW1lbnRzIGFyZSBub3QgYSBzdHJpbmcgYW5kIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBrZXlmcmFtZXMgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUtleWZyYW1lcyA9IChuYW1lLCBmcmFtZXMpID0+IHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhQXJyYXkuaXNBcnJheShmcmFtZXMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZm9yIGRlZmluZUtleWZyYW1lcy4nKTtcbiAgfVxuXG4gIGNvbnN0IGtleWZyYW1lUnVsZXMgPSBmcmFtZXMubWFwKGZyYW1lID0+IHtcbiAgICBjb25zdCBvZmZzZXQgPSBPYmplY3Qua2V5cyhmcmFtZSlbMF07XG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5lbnRyaWVzKGZyYW1lW29mZnNldF0pLm1hcCgoW3Byb3AsIHZhbHVlXSkgPT4ge1xuICAgICAgcmV0dXJuIGAke3Byb3B9OiAke3ZhbHVlfWA7XG4gICAgfSkuam9pbignOyAnKTtcblxuICAgIHJldHVybiBgJHtvZmZzZXR9IHsgJHtwcm9wZXJ0aWVzfSB9YDtcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgQGtleWZyYW1lcyAke25hbWV9IHsgJHtrZXlmcmFtZVJ1bGVzfSB9YDtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVLZXlmcmFtZXMiLCAiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIGxheWVyIGFuZCBpdHMgYXNzb2NpYXRlZCBzdHlsZSBydWxlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGxheWVyLlxuICogQHBhcmFtIHtvYmplY3R9IHJ1bGVzIC0gQW4gb2JqZWN0IG1hcHBpbmcgc2VsZWN0b3JzIHRvIHRoZWlyIHJlc3BlY3RpdmUgc3R5bGUgcnVsZXMuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBhcmd1bWVudHMgYXJlIG5vdCBhIHN0cmluZyBhbmQgYW4gb2JqZWN0IG9mIHN0eWxlIHJ1bGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAbGF5ZXIgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUxheWVyID0gKG5hbWUsIHJ1bGVzKSA9PiB7XG4gIGlmICghbmFtZSB8fCB0eXBlb2YgcnVsZXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZm9yIGRlZmluZUxheWVyLicpO1xuICB9XG5cbiAgY29uc3QgbGF5ZXJSdWxlcyA9IE9iamVjdC5lbnRyaWVzKHJ1bGVzKS5tYXAoKFtzZWxlY3Rvciwgc3R5bGVSdWxlc10pID0+IHtcbiAgICBjb25zdCBzdHlsZVN0cmluZyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlUnVsZXMpLm1hcCgoW3Byb3BlcnR5LCB2YWx1ZV0pID0+IGAke3Byb3BlcnR5fTogJHt2YWx1ZX07YCkuam9pbignICcpO1xuICAgIHJldHVybiBgJHtzZWxlY3Rvcn0geyAke3N0eWxlU3RyaW5nfSB9YDtcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgQGxheWVyICR7bmFtZX0geyAke2xheWVyUnVsZXN9IH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlZmluZUxheWVyT3JkZXIgPSAoLi4ubmFtZXMpID0+IChgQGxheWVyIGAgKyBuYW1lcy5qb2luKCcgJykpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGVmaW5lTGF5ZXIsXG4gIGRlZmluZUxheWVyT3JkZXJcbn0iLCAiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIG1lZGlhIHF1ZXJ5IGFuZCBpdHMgYXNzb2NpYXRlZCBzdHlsZSBydWxlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYVF1ZXJ5IC0gVGhlIG1lZGlhIHF1ZXJ5IHN0cmluZy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdHlsZXMgLSBBbiBvYmplY3QgbWFwcGluZyBzZWxlY3RvcnMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBzdHlsZSBydWxlcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGFyZ3VtZW50cyBhcmUgbm90IGEgc3RyaW5nIGFuZCBhbiBvYmplY3Qgb2Ygc3R5bGUgcnVsZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBtZWRpYSBydWxlIGFzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lTWVkaWEgPSAobWVkaWFRdWVyeSwgc3R5bGVzKSA9PiB7XG4gIGlmICh0eXBlb2YgbWVkaWFRdWVyeSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIHN0eWxlcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBmb3IgZGVmaW5lTWVkaWEuJyk7XG4gIH1cblxuICBjb25zdCBzdHlsZUVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzdHlsZXMpLm1hcCgoW3NlbGVjdG9yLCBzdHlsZVJ1bGVzXSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlU3RyaW5nID0gT2JqZWN0LmVudHJpZXMoc3R5bGVSdWxlcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4gYCR7cHJvcGVydHl9OiAke3ZhbHVlfTtgKS5qb2luKCcgJyk7XG4gICAgcmV0dXJuIGAke3NlbGVjdG9yfSB7ICR7c3R5bGVTdHJpbmd9IH1gO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgcmV0dXJuIGBAbWVkaWEgJHttZWRpYVF1ZXJ5fSB7ICR7c3R5bGVFbnRyaWVzfSB9YDtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNZWRpYSIsICIvKipcbiAqIERlZmluZXMgYSBDU1MgbmFtZXNwYWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIC0gVGhlIG9wdGlvbmFsIHByZWZpeCBmb3IgdGhlIG5hbWVzcGFjZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgLSBUaGUgVVJJIG9mIHRoZSBuYW1lc3BhY2UuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIFVSSSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBuYW1lc3BhY2UgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZU5hbWVzcGFjZSA9IChwcmVmaXgsIHVyaSkgPT4ge1xuICBpZiAoIXVyaSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVVJJIGZvciBuYW1lc3BhY2UgaXMgcmVxdWlyZWQuJyk7XG4gIH1cblxuICBjb25zdCBuYW1lc3BhY2VQcmVmaXggPSBwcmVmaXggPyBgJHtwcmVmaXh9IGAgOiAnJztcbiAgcmV0dXJuIGBAbmFtZXNwYWNlICR7bmFtZXNwYWNlUHJlZml4fXVybCgke3VyaX0pO2A7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTmFtZXNwYWNlIiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBAcGFnZSBydWxlIHdpdGggdGhlIGdpdmVuIG5hbWUgYW5kIHN0eWxlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwYWdlIHJ1bGUuXG4gKiBAcGFyYW0ge29iamVjdH0gc3R5bGVzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIENTUyBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHN0eWxlcyBpcyBub3QgYW4gb2JqZWN0LlxuICogQHRocm93cyB7RXJyb3J9IElmIGEgcHJvcGVydHkgaXMgbm90IGFsbG93ZWQgd2l0aGluIEBwYWdlIHJ1bGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBwYWdlIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVQYWdlID0gKG5hbWUsIHN0eWxlcykgPT4ge1xuICBpZiAodHlwZW9mIHN0eWxlcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdHlsZXMgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gIH1cblxuICBjb25zdCBzdHlsZUVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzdHlsZXMpLm1hcCgoW3Byb3BlcnR5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAoIS9ebWFyZ2luLXxeYm9yZGVyLXxecGFkZGluZy18XmJhY2tncm91bmQtfF5mb250LXxedGV4dC18XmNvbG9yJHxeb3V0bGluZSR8XmNvdW50ZXItfF53aWR0aCR8XmhlaWdodCR8XmxpbmUtaGVpZ2h0JHxecXVvdGVzJHxedmlzaWJpbGl0eSQvLnRlc3QocHJvcGVydHkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5IFwiJHtwcm9wZXJ0eX1cIiBpcyBub3QgYWxsb3dlZCB3aXRoaW4gQHBhZ2UgcnVsZS5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3Byb3BlcnR5fTogJHt2YWx1ZX07YDtcbiAgfSkuam9pbignICcpO1xuXG4gIGNvbnN0IHBhZ2VSdWxlID0gYEBwYWdlICR7bmFtZX0geyAke3N0eWxlRW50cmllc30gfWA7XG5cbiAgcmV0dXJuIHBhZ2VSdWxlO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVBhZ2U7IiwgIi8qKlxuICogRGVmaW5lcyBhIHN0YXJ0aW5nIHN0eWxlIGZvciBhIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIENTUyBzZWxlY3RvciB0byB3aGljaCB0aGUgc3RhcnRpbmcgc3R5bGUgd2lsbCBiZSBhcHBsaWVkLlxuICogQHBhcmFtIHtvYmplY3R9IHByb3BlcnRpZXMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgQ1NTIHByb3BlcnRpZXMgYW5kIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQHN0YXJ0aW5nLXN0eWxlIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVTdGFydGluZ1N0eWxlID0gKHNlbGVjdG9yLCBwcm9wZXJ0aWVzKSA9PiB7XG4gIGNvbnN0IHByb3BlcnR5RW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHByb3BlcnRpZXMpLm1hcCgoW3Byb3BlcnR5LCB2YWx1ZV0pID0+IHtcbiAgICByZXR1cm4gYCR7cHJvcGVydHl9OiAke3ZhbHVlfTtgO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgY29uc3Qgc3RhcnRpbmdTdHlsZVJ1bGUgPSBgQHN0YXJ0aW5nLXN0eWxlIHtcXG4gICR7c2VsZWN0b3J9IHsgJHtwcm9wZXJ0eUVudHJpZXN9IH1cXG59YDtcblxuICByZXR1cm4gc3RhcnRpbmdTdHlsZVJ1bGU7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lU3RhcnRpbmdTdHlsZTsiLCAiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIEBzdXBwb3J0cyBydWxlLlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzdXBwb3J0c0NvbmRpdGlvbiAtIEFuIGFycmF5IG9mIGNvbmRpdGlvbnMgdGhhdCB0aGUgYnJvd3NlciBtdXN0IHN1cHBvcnQuXG4gKiBAcGFyYW0ge29iamVjdH0gcnVsZXMgLSBBbiBvYmplY3QgbWFwcGluZyBzZWxlY3RvcnMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBzdHlsZSBvYmplY3RzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAc3VwcG9ydHMgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVN1cHBvcnRzID0gKHN1cHBvcnRzQ29uZGl0aW9uLCBydWxlcykgPT4ge1xuICBjb25zdCBjb25kaXRpb25TdHJpbmcgPSBzdXBwb3J0c0NvbmRpdGlvbi5tYXAoY29uZGl0aW9uID0+IGAoJHtjb25kaXRpb259KWApLmpvaW4oJyBhbmQgJyk7XG4gIGNvbnN0IHJ1bGVzU3RyaW5nID0gT2JqZWN0LmVudHJpZXMocnVsZXMpLm1hcCgoW3NlbGVjdG9yLCBzdHlsZXNdKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVTdHJpbmcgPSBPYmplY3QuZW50cmllcyhzdHlsZXMpLm1hcCgoW3Byb3BlcnR5LCB2YWx1ZV0pID0+IGAke3Byb3BlcnR5fTogJHt2YWx1ZX07YCkuam9pbignICcpO1xuICAgIHJldHVybiBgJHtzZWxlY3Rvcn0geyAke3N0eWxlU3RyaW5nfSB9YDtcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgQHN1cHBvcnRzICR7Y29uZGl0aW9uU3RyaW5nfSB7ICR7cnVsZXNTdHJpbmd9IH1gO1xufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVN1cHBvcnRzOyIsICJpbXBvcnQgY2hhcnNldHMgZnJvbSAnLi9AY2hhcnNldC5qcyc7XG5pbXBvcnQgY29sb3JQcm9maWxlcyBmcm9tICcuL0Bjb2xvcnByb2ZpbGUuanMnO1xuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuL0Bjb250YWluZXIuanMnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJy4vQHByb3BlcnR5LmpzJztcbmltcG9ydCBjb3VudGVyU3R5bGVzIGZyb20gJy4vQGNvdW50ZXJzdHlsZS5qcyc7XG5pbXBvcnQgZm9udEZhY2VzIGZyb20gJy4vQGZvbnRmYWNlLmpzJztcbmltcG9ydCBmb250RmVhdHVyZVZhbHVlcyBmcm9tICcuL0Bmb250ZmVhdHVyZXZhbHVlcy5qcyc7XG5pbXBvcnQgZm9udFBhbGV0dGVWYWx1ZXMgZnJvbSAnLi9AZm9udHBhbGxldGV2YWx1ZXMuanMnO1xuaW1wb3J0IGltcG9ydGVyIGZyb20gJy4vQGltcG9ydC5qcyc7XG5pbXBvcnQga2V5ZnJhbWVzIGZyb20gJy4vQGtleWZyYW1lcy5qcyc7XG5pbXBvcnQgbGF5ZXIgZnJvbSAnLi9AbGF5ZXIuanMnO1xuaW1wb3J0IG1lZGlhIGZyb20gJy4vQG1lZGlhLmpzJztcbmltcG9ydCBuYW1lc3BhY2UgZnJvbSAnLi9AbmFtZXNwYWNlLmpzJztcbmltcG9ydCBwYWdlcyBmcm9tICcuL0BwYWdlLmpzJztcbmltcG9ydCBzdGFydGluZ1N0eWxlcyBmcm9tICcuL0BzdGFydGluZ3N0eWxlLmpzJztcbmltcG9ydCBzdXBwb3J0cyBmcm9tICcuL0BzdXBwb3J0cy5qcyc7XG5cbmV4cG9ydCB7XG4gIGNoYXJzZXRzLFxuICBjb2xvclByb2ZpbGVzLFxuICBjb250YWluZXIsXG4gIHByb3BlcnR5LFxuICBjb3VudGVyU3R5bGVzLFxuICBmb250RmFjZXMsXG4gIGZvbnRGZWF0dXJlVmFsdWVzLFxuICBmb250UGFsZXR0ZVZhbHVlcyxcbiAgaW1wb3J0ZXIsXG4gIGtleWZyYW1lcyxcbiAgbGF5ZXIsXG4gIG1lZGlhLFxuICBuYW1lc3BhY2UsXG4gIHBhZ2VzLFxuICBzdGFydGluZ1N0eWxlcyxcbiAgc3VwcG9ydHMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2hhcnNldHMsXG4gIGNvbG9yUHJvZmlsZXMsXG4gIGNvbnRhaW5lcixcbiAgcHJvcGVydHksXG4gIGNvdW50ZXJTdHlsZXMsXG4gIGZvbnRGYWNlcyxcbiAgZm9udEZlYXR1cmVWYWx1ZXMsXG4gIGZvbnRQYWxldHRlVmFsdWVzLFxuICBpbXBvcnRlcixcbiAga2V5ZnJhbWVzLFxuICBsYXllcixcbiAgbWVkaWEsXG4gIG5hbWVzcGFjZSxcbiAgcGFnZXMsXG4gIHN0YXJ0aW5nU3R5bGVzLFxuICBzdXBwb3J0cyxcbn0iLCAiLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGNvcnJlc3BvbmRpbmcga2V5d29yZCBmb3IgYSBnaXZlbiBwYXJhbWV0ZXIuXG4gKiBJZiB0aGUga2V5d29yZCBpcyBkZXByZWNhdGVkIG9yIHVua25vd24sIGEgd2FybmluZyBvciBlcnJvciBpcyB0aHJvd24uXG4gXG4gKiBAcGFyYW0ge1xuICAgICdhYnNvbHV0ZS1zaXplJyB8XG4gICAgJ2FscGhhLXZhbHVlJyB8XG4gICAgJ2FuZ2xlJyB8XG4gICAgJ2FuZ2xlLXBlcmNlbnRhZ2UnIHxcbiAgICAnYmFzaWMtc2hhcGUnIHxcbiAgICAnYmxlbmQtbW9kZScgfFxuICAgICdib3gtZWRnZScgfFxuICAgICdjYWxjLWNvbnN0YW50JyB8XG4gICAgJ2NhbGMtc3VtJyB8XG4gICAgJ2NvbG9yLWludGVycG9sYXRpb24tbWV0aG9kJyB8XG4gICAgJ2NvbG9yJyB8XG4gICAgJ2N1c3RvbS1pZGVudCcgfFxuICAgICdkYXNoZWQtaWRlbnQnIHxcbiAgICAnZGltZW5zaW9uJyB8XG4gICAgJ2Rpc3BsYXktYm94JyB8XG4gICAgJ2Rpc3BsYXktaW5zaWRlJyB8XG4gICAgJ2Rpc3BsYXktaW50ZXJuYWwnIHxcbiAgICAnZGlzcGxheS1sZWdhY3knIHxcbiAgICAnZGlzcGxheS1saXN0aXRlbScgfFxuICAgICdkaXNwbGF5LW91dHNpZGUnIHxcbiAgICAnZWFzaW5nLWZ1bmN0aW9uJyB8XG4gICAgJ2ZpbHRlci1mdW5jdGlvbicgfFxuICAgICdmbGV4JyB8XG4gICAgJ2ZyZXF1ZW5jeScgfFxuICAgICdmcmVxdWVuY3ktcGVyY2VudGFnZScgfFxuICAgICdnZW5lcmljLWZhbWlseScgfFxuICAgICdncmFkaWVudCcgfFxuICAgICdoZXgtY29sb3InIHxcbiAgICAnaHVlJyB8XG4gICAgJ2h1ZS1pbnRlcnBvbGF0aW9uLW1ldGhvZCcgfFxuICAgICdpZGVudCcgfFxuICAgICdpbWFnZScgfFxuICAgICdpbnRlZ2VyJyB8XG4gICAgJ2xlbmd0aCcgfFxuICAgICdsZW5ndGgtcGVyY2VudGFnZScgfFxuICAgICdsaW5lLXN0eWxlJyB8XG4gICAgJ25hbWVkLWNvbG9yJyB8XG4gICAgJ251bWJlcicgfFxuICAgICdvdmVyZmxvdycgfFxuICAgICdwZXJjZW50YWdlJyB8XG4gICAgJ3Bvc2l0aW9uJyB8XG4gICAgJ3JhdGlvJyB8XG4gICAgJ3JlbGF0aXZlLXNpemUnIHxcbiAgICAncmVzb2x1dGlvbicgfFxuICAgICdzdHJpbmcnIHxcbiAgICAnc3lzdGVtLWNvbG9yJyB8XG4gICAgJ3RpbWUnIHxcbiAgICAndGltZS1wZXJjZW50YWdlJyB8XG4gICAgJ3RyYW5zZm9ybS1mdW5jdGlvbidcbiAgfSBwYXJhbSAtIFRoZSBwYXJhbWV0ZXIgdG8gZ2V0IHRoZSBrZXl3b3JkIGZvci5cbiAgXG4gKiBAcmV0dXJucyB7XG4gICAgJzxhYnNvbHV0ZS1zaXplPicgfFxuICAgICc8YWxwaGEtdmFsdWU+JyB8XG4gICAgJzxhbmdsZT4nIHxcbiAgICAnPGFuZ2xlLXBlcmNlbnRhZ2U+JyB8XG4gICAgJzxiYXNpYy1zaGFwZT4nIHxcbiAgICAnPGJsZW5kLW1vZGU+JyB8XG4gICAgJzxib3gtZWRnZT4nIHxcbiAgICAnPGNhbGMtY29uc3RhbnQ+JyB8XG4gICAgJzxjYWxjLXN1bT4nIHxcbiAgICAnPGNvbG9yLWludGVycG9sYXRpb24tbWV0aG9kPicgfFxuICAgICc8Y29sb3I+JyB8XG4gICAgJzxjdXN0b20taWRlbnQ+JyB8XG4gICAgJzxkYXNoZWQtaWRlbnQ+JyB8XG4gICAgJzxkaW1lbnNpb24+JyB8XG4gICAgJzxkaXNwbGF5LWJveD4nIHxcbiAgICAnPGRpc3BsYXktaW5zaWRlPicgfFxuICAgICc8ZGlzcGxheS1pbnRlcm5hbD4nIHxcbiAgICAnPGRpc3BsYXktbGVnYWN5PicgfFxuICAgICc8ZGlzcGxheS1saXN0aXRlbT4nIHxcbiAgICAnPGRpc3BsYXktb3V0c2lkZT4nIHxcbiAgICAnPGVhc2luZy1mdW5jdGlvbj4nIHxcbiAgICAnPGZpbHRlci1mdW5jdGlvbj4nIHxcbiAgICAnPGZsZXg+JyB8XG4gICAgJzxmcmVxdWVuY3k+JyB8XG4gICAgJzxmcmVxdWVuY3ktcGVyY2VudGFnZT4nIHxcbiAgICAnPGdlbmVyaWMtZmFtaWx5PicgfFxuICAgICc8Z3JhZGllbnQ+JyB8XG4gICAgJzxoZXgtY29sb3I+JyB8XG4gICAgJzxodWU+JyB8XG4gICAgJzxodWUtaW50ZXJwb2xhdGlvbi1tZXRob2Q+JyB8XG4gICAgJzxpZGVudD4nIHxcbiAgICAnPGltYWdlPicgfFxuICAgICc8aW50ZWdlcj4nIHxcbiAgICAnPGxlbmd0aD4nIHxcbiAgICAnPGxlbmd0aC1wZXJjZW50YWdlPicgfFxuICAgICc8bGluZS1zdHlsZT4nIHxcbiAgICAnPG5hbWVkLWNvbG9yPicgfFxuICAgICc8bnVtYmVyPicgfFxuICAgICc8b3ZlcmZsb3c+JyB8XG4gICAgJzxwZXJjZW50YWdlPicgfFxuICAgICc8cG9zaXRpb24+JyB8XG4gICAgJzxyYXRpbz4nIHxcbiAgICAnPHJlbGF0aXZlLXNpemU+JyB8XG4gICAgJzxyZXNvbHV0aW9uPicgfFxuICAgICc8c3RyaW5nPicgfFxuICAgICc8c3lzdGVtLWNvbG9yPicgfFxuICAgICc8dGltZT4nIHxcbiAgICAnPHRpbWUtcGVyY2VudGFnZT4nIHxcbiAgICAnPHRyYW5zZm9ybS1mdW5jdGlvbj4nXG4gIH0gVGhlIGNvcnJlc3BvbmRpbmcga2V5d29yZCBhcyBhIFxcPGtleXdvcmRcXD4uXG4gKi9cbmZ1bmN0aW9uIGdldFR5cGVLZXl3b3JkKHBhcmFtID0gJycpIHtcbiAgc3dpdGNoIChwYXJhbSkge1xuICAgIGNhc2UgJ2Fic29sdXRlLXNpemUnOlxuICAgIGNhc2UgJ2FscGhhLXZhbHVlJzpcbiAgICBjYXNlICdhbmdsZSc6XG4gICAgY2FzZSAnYW5nbGUtcGVyY2VudGFnZSc6XG4gICAgY2FzZSAnYmFzaWMtc2hhcGUnOlxuICAgIGNhc2UgJ2JsZW5kLW1vZGUnOlxuICAgIGNhc2UgJ2JveC1lZGdlJzpcbiAgICBjYXNlICdjYWxjLWNvbnN0YW50JzpcbiAgICBjYXNlICdjYWxjLXN1bSc6XG4gICAgY2FzZSAnY29sb3ItaW50ZXJwb2xhdGlvbi1tZXRob2QnOlxuICAgIGNhc2UgJ2NvbG9yJzpcbiAgICBjYXNlICdjdXN0b20taWRlbnQnOlxuICAgIGNhc2UgJ2Rhc2hlZC1pZGVudCc6XG4gICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICBjYXNlICdkaXNwbGF5LWJveCc6XG4gICAgY2FzZSAnZGlzcGxheS1pbnNpZGUnOlxuICAgIGNhc2UgJ2Rpc3BsYXktaW50ZXJuYWwnOlxuICAgIGNhc2UgJ2Rpc3BsYXktbGVnYWN5JzpcbiAgICBjYXNlICdkaXNwbGF5LWxpc3RpdGVtJzpcbiAgICBjYXNlICdkaXNwbGF5LW91dHNpZGUnOlxuICAgIGNhc2UgJ2Vhc2luZy1mdW5jdGlvbic6XG4gICAgY2FzZSAnZmlsdGVyLWZ1bmN0aW9uJzpcbiAgICBjYXNlICdmbGV4JzpcbiAgICBjYXNlICdmcmVxdWVuY3knOlxuICAgIGNhc2UgJ2ZyZXF1ZW5jeS1wZXJjZW50YWdlJzpcbiAgICBjYXNlICdnZW5lcmljLWZhbWlseSc6XG4gICAgY2FzZSAnZ3JhZGllbnQnOlxuICAgIGNhc2UgJ2hleC1jb2xvcic6XG4gICAgY2FzZSAnaHVlJzpcbiAgICBjYXNlICdodWUtaW50ZXJwb2xhdGlvbi1tZXRob2QnOlxuICAgIGNhc2UgJ2lkZW50JzpcbiAgICBjYXNlICdpbWFnZSc6XG4gICAgY2FzZSAnaW50ZWdlcic6XG4gICAgY2FzZSAnbGVuZ3RoJzpcbiAgICBjYXNlICdsZW5ndGgtcGVyY2VudGFnZSc6XG4gICAgY2FzZSAnbGluZS1zdHlsZSc6XG4gICAgY2FzZSAnbmFtZWQtY29sb3InOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnb3ZlcmZsb3cnOlxuICAgIGNhc2UgJ3BlcmNlbnRhZ2UnOlxuICAgIGNhc2UgJ3Bvc2l0aW9uJzpcbiAgICBjYXNlICdyYXRpbyc6XG4gICAgY2FzZSAncmVsYXRpdmUtc2l6ZSc6XG4gICAgY2FzZSAncmVzb2x1dGlvbic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICdzeXN0ZW0tY29sb3InOlxuICAgIGNhc2UgJ3RpbWUnOlxuICAgIGNhc2UgJ3RpbWUtcGVyY2VudGFnZSc6XG4gICAgY2FzZSAndHJhbnNmb3JtLWZ1bmN0aW9uJzpcbiAgICAgIHJldHVybiBgPCR7cGFyYW19PmA7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0VHlwZUtleXdvcmQ7IiwgImV4cG9ydCBjb25zdCBpbXBvcnRhbnQgPSBfID0+IGAhaW1wb3J0YW50O2BcbmV4cG9ydCBkZWZhdWx0IGltcG9ydGFudCIsICJpbXBvcnQgdHlwZXMgZnJvbSAnLi90eXBlcy5qcyc7XG5cbmltcG9ydCBpbXBvcnRhbnQgZnJvbSAnLi9pbXBvcnRhbnQuanMnO1xuXG5leHBvcnQge1xuICBpbXBvcnRhbnQsXG4gIHR5cGVzLFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGltcG9ydGFudCxcbiAgdHlwZXMsXG59IiwgIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYWJzb2x1dGUgdmFsdWUgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYWJzID0gcGF5bG9hZCA9PiB7XG4gIHJldHVybiBgYWJzKCR7cGF5bG9hZH0pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzOyIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYXJjY29zaW5lIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhcmNjb3NpbmUgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYWNvcyA9IHBheWxvYWQgPT4gYGFjb3MoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhY29zIiwgIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhcmNzaW5lIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhcmNzaW5lIGV4cHJlc3Npb24gZm9yIENTUy5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzaW4gPSBwYXlsb2FkID0+IGBhc2luKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgYXNpbiIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYXJjdGFuZ2VudCB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYXJjdGFuZ2VudCBleHByZXNzaW9uIGZvciBDU1MuXG4gKi9cbmV4cG9ydCBjb25zdCBhdGFuID0gcGF5bG9hZCA9PiBgYXRhbigke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGF0YW4iLCAiLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGFyY3RhbmdlbnQgb2YgdHdvIHZhcmlhYmxlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZXMgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFyY3RhbmdlbnQgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYXRhbjIgPSBwYXlsb2FkID0+IGBhdGFuMigke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGF0YW4yIiwgIi8qKlxuICogUmV0cmlldmUgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBmcm9tIGEgQ1NTIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBUaGUgYXR0cmlidXRlIHRvIHJldHJpZXZlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBmdW5jdGlvbiB0byByZXRyaWV2ZSB0aGUgYXR0cmlidXRlIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgYXR0ciA9IHBheWxvYWQgPT4gYGF0dHIoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhdHRyIiwgIi8qKlxuICogQ2FsY3VsYXRlIGEgQ1NTIGNhbGMoKSBleHByZXNzaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBUaGUgZXhwcmVzc2lvbiB0byBiZSBjYWxjdWxhdGVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNhbGN1bGF0ZWQgQ1NTIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBjb25zdCBjYWxjID0gcGF5bG9hZCA9PiBgY2FsYygke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGNhbGMiLCAiLyoqXG4gKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBhbmQgYSBtYXhpbXVtLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBtaW4gLSBUaGUgbWluaW11bSB2YWx1ZSBvciBDU1MgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsIC0gVGhlIGN1cnJlbnQgdmFsdWUgb3IgQ1NTIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG1heCAtIFRoZSBtYXhpbXVtIHZhbHVlIG9yIENTUyBleHByZXNzaW9uLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY2xhbXAoKSBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFtcCA9IChtaW4sIHZhbCwgbWF4KSA9PiB7XG4gIHJldHVybiBgY2xhbXAoJHttaW59LCAke3ZhbH0sICR7bWF4fSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFtcDsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgb2YgdGhlIGdpdmVuIGFuZ2xlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBhbmdsZSAtIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9yIHJhZGlhbnMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBmdW5jdGlvbiByZXByZXNlbnRpbmcgdGhlIGNvc2luZSBvZiB0aGUgYW5nbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBjb3MgPSBhbmdsZSA9PiBgY29zKCR7YW5nbGV9KWBcbmV4cG9ydCBkZWZhdWx0IGNvcyIsICIvKipcbiAqIEdlbmVyYXRlcyBhIENTUyBjb3VudGVyIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudGVyTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb3VudGVyLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb3VudGVyU3R5bGU9J2RlY2ltYWwnXSAtIFRoZSBzdHlsZSBvZiB0aGUgY291bnRlci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGNvdW50ZXIgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBjb3VudGVyID0gKGNvdW50ZXJOYW1lLCBjb3VudGVyU3R5bGUgPSAnZGVjaW1hbCcpID0+IHtcbiAgaWYgKHR5cGVvZiBjb3VudGVyTmFtZSAhPT0gJ3N0cmluZycgfHwgY291bnRlck5hbWUuc3RhcnRzV2l0aCgnLS0nKSB8fCBbJ25vbmUnLCAndW5zZXQnLCAnaW5pdGlhbCcsICdpbmhlcml0J10uaW5jbHVkZXMoY291bnRlck5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgbmFtZS4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY291bnRlclN0eWxlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIHN0eWxlLicpO1xuICB9XG5cbiAgcmV0dXJuIGBjb3VudGVyKCR7Y291bnRlck5hbWV9JHtjb3VudGVyU3R5bGUgIT09ICdkZWNpbWFsJyA/ICcsICcgKyBjb3VudGVyU3R5bGUgOiAnJ30pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY291bnRlcjsiLCAiLyoqXG4gKiBDb25zdHJ1Y3RzIGEgQ1NTIGNvdW50ZXJzIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudGVyTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb3VudGVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFRoZSBzdHJpbmcgdG8gYmUgY29uY2F0ZW5hdGVkIHdpdGggdGhlIGNvdW50ZXIgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvdW50ZXJTdHlsZT0nZGVjaW1hbCddIC0gVGhlIHN0eWxlIG9mIHRoZSBjb3VudGVyLCBkZWZhdWx0IGlzICdkZWNpbWFsJy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY291bnRlciBuYW1lLCBzdHJpbmcsIG9yIGNvdW50ZXIgc3R5bGUgaXMgaW52YWxpZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGNvdW50ZXJzIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvdW50ZXJzID0gKGNvdW50ZXJOYW1lLCBzdHJpbmcsIGNvdW50ZXJTdHlsZSA9ICdkZWNpbWFsJykgPT4ge1xuICBpZiAodHlwZW9mIGNvdW50ZXJOYW1lICE9PSAnc3RyaW5nJyB8fCBjb3VudGVyTmFtZS5zdGFydHNXaXRoKCctLScpIHx8IFsnbm9uZScsICd1bnNldCcsICdpbml0aWFsJywgJ2luaGVyaXQnXS5pbmNsdWRlcyhjb3VudGVyTmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBuYW1lLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZyBmb3IgY29uY2F0ZW5hdGlvbi4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY291bnRlclN0eWxlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIHN0eWxlLicpO1xuICB9XG5cbiAgcmV0dXJuIGBjb3VudGVycygke2NvdW50ZXJOYW1lfSwgXCIke3N0cmluZ31cIiR7Y291bnRlclN0eWxlICE9PSAnZGVjaW1hbCcgPyAnLCAnICsgY291bnRlclN0eWxlIDogJyd9KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50ZXJzOyIsICJleHBvcnQgY29uc3QgY3Jvc3NGYWRlID0gKC4uLmltYWdlcykgPT4ge1xuICAvKipcbiAgICogQmxlbmRzIGltYWdlcyB1c2luZyB0aGUgY3Jvc3MtZmFkZSBlZmZlY3QuXG4gICAqIEBwYXJhbSB7Li4uaW1hZ2VzfSBpbWFnZXMgLSBBbiBhcnJheSBvZiBpbWFnZSBVUkxzIG9yIHR1cGxlcyBvZiBpbWFnZSBVUkwgYW5kIHBlcmNlbnRhZ2UuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGZ1bmN0aW9uIHJlcHJlc2VudGluZyB0aGUgY3Jvc3MtZmFkZSBvZiB0aGUgcHJvdmlkZWQgaW1hZ2VzLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgbGVzcyB0aGFuIHR3byB2YWxpZCBpbWFnZXMgYXJlIHByb3ZpZGVkLlxuICAgKi9cbiAgY29uc3QgdmFsaWRJbWFnZXMgPSBpbWFnZXMuZmlsdGVyKGltYWdlID0+IHtcbiAgICBpZiAodHlwZW9mIGltYWdlID09PSAnc3RyaW5nJyAmJiBpbWFnZS5zdGFydHNXaXRoKCd1cmwoJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBbaW1nLCBwZXJjZW50YWdlXSA9IGltYWdlO1xuICAgIHJldHVybiB0eXBlb2YgaW1nID09PSAnc3RyaW5nJyAmJiBpbWcuc3RhcnRzV2l0aCgndXJsKCcpICYmXG4gICAgICB0eXBlb2YgcGVyY2VudGFnZSA9PT0gJ251bWJlcicgJiYgcGVyY2VudGFnZSA+PSAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwO1xuICB9KTtcblxuICBpZiAodmFsaWRJbWFnZXMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcignY3Jvc3NGYWRlIGZ1bmN0aW9uIHJlcXVpcmVzIGF0IGxlYXN0IHR3byBpbWFnZXMuJyk7XG4gIH1cblxuICBjb25zdCBjcm9zc0ZhZGVJbWFnZXMgPSB2YWxpZEltYWdlcy5tYXAoaW1hZ2UgPT4ge1xuICAgIGlmICh0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gaW1hZ2U7XG4gICAgfVxuICAgIGNvbnN0IFtpbWcsIHBlcmNlbnRhZ2VdID0gaW1hZ2U7XG4gICAgcmV0dXJuIGAke2ltZ30gJHtwZXJjZW50YWdlfSVgO1xuICB9KS5qb2luKCcsICcpO1xuXG4gIHJldHVybiBgY3Jvc3MtZmFkZSgke2Nyb3NzRmFkZUltYWdlc30pYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyb3NzRmFkZSIsICIvKipcbiAqIFJldHJpZXZlcyBhIENTUyBpbWFnZSB2YWx1ZSBmb3IgYSBnaXZlbiBlbGVtZW50IElELlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIElEIG9mIHRoZSBlbGVtZW50LCBtdXN0IHN0YXJ0IHdpdGggJyMnLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBJRCBpcyBub3QgYSBzdHJpbmcgb3IgZG9lc24ndCBzdGFydCB3aXRoICcjJy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgaW1hZ2UgdmFsdWUgZm9yIHRoZSBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3QgZWxlbWVudCA9IChpZCkgPT4ge1xuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCAhaWQuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIElEIGZvciBlbGVtZW50IGZ1bmN0aW9uLiBJRCBtdXN0IGJlIGEgc3RyaW5nIHN0YXJ0aW5nIHdpdGggXCIjXCIuJyk7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgZnVuY3Rpb24gaXMgc3VwcG9ydGVkXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQubW96U2V0SW1hZ2VFbGVtZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS53YXJuKCdUaGUgZWxlbWVudCgpIGZ1bmN0aW9uIGlzIGV4cGVyaW1lbnRhbCBhbmQgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuJyk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIENTUyBpbWFnZSB2YWx1ZVxuICByZXR1cm4gYC1tb3otZWxlbWVudCgke2lkfSlgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudDsiLCAiLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGUgdmFsdWUsIHdpdGggYW4gb3B0aW9uYWwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFyaWFibGUgLSBUaGUgbmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZhbGxiYWNrXSAtIFRoZSBmYWxsYmFjayB2YWx1ZSBpZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgZW52KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZW52ID0gKHZhcmlhYmxlLCBmYWxsYmFjaykgPT4ge1xuICBjb25zdCBlbnZWYXIgPSBgZW52KCR7dmFyaWFibGV9JHtmYWxsYmFjayA/IGAsICR7ZmFsbGJhY2t9YCA6ICcnfSlgO1xuICByZXR1cm4gZW52VmFyO1xufTtcblxuLy8gUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gcmV0cmlldmUgZW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBDU1Ncbi8qKlxuICogUmVwcmVzZW50cyBzYWZlIGFyZWEgaW5zZXRzIGZvciBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgY29uc3Qgc2FmZUFyZWFJbnNldHMgPSB7XG4gIHRvcDogKGZhbGxiYWNrKSA9PiBlbnYoJ3NhZmUtYXJlYS1pbnNldC10b3AnLCBmYWxsYmFjayksXG4gIHJpZ2h0OiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LXJpZ2h0JywgZmFsbGJhY2spLFxuICBib3R0b206IChmYWxsYmFjaykgPT4gZW52KCdzYWZlLWFyZWEtaW5zZXQtYm90dG9tJywgZmFsbGJhY2spLFxuICBsZWZ0OiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LWxlZnQnLCBmYWxsYmFjaylcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aXRsZSBiYXIgYXJlYSBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHRpdGxlYmFyQXJlYSA9IHtcbiAgeDogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEteCcsIGZhbGxiYWNrKSxcbiAgeTogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEteScsIGZhbGxiYWNrKSxcbiAgd2lkdGg6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLXdpZHRoJywgZmFsbGJhY2spLFxuICBoZWlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLWhlaWdodCcsIGZhbGxiYWNrKVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGtleWJvYXJkIGluc2V0cyBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGtleWJvYXJkSW5zZXQgPSB7XG4gIHRvcDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LXRvcCcsIGZhbGxiYWNrKSxcbiAgcmlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC1yaWdodCcsIGZhbGxiYWNrKSxcbiAgYm90dG9tOiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtYm90dG9tJywgZmFsbGJhY2spLFxuICBsZWZ0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtbGVmdCcsIGZhbGxiYWNrKSxcbiAgd2lkdGg6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC13aWR0aCcsIGZhbGxiYWNrKSxcbiAgaGVpZ2h0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtaGVpZ2h0JywgZmFsbGJhY2spXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVudixcbiAgc2FmZUFyZWFJbnNldHMsXG4gIHRpdGxlYmFyQXJlYSxcbiAga2V5Ym9hcmRJbnNldFxufSIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV4cG9uZW50aWFsIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSBleHBvbmVudCB0byByYWlzZSBlIHRvLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBleHBvbmVudGlhbCBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBleHAgPSB2YWx1ZSA9PiBgZXhwKCR7dmFsdWV9KWBcblxuZXhwb3J0IGRlZmF1bHQgZXhwIiwgIi8qKlxuICogQWRqdXN0cyB0aGUgY29udGVudCBzaXplIHRvIGZpdCB0aGUgZ2l2ZW4gc2l6ZSBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2l6ZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyBhIGxlbmd0aCBvciBhIHBlcmNlbnRhZ2UuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBzaXplIGlzIG5vdCBhIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgZml0LWNvbnRlbnQgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZml0Q29udGVudCA9IChzaXplKSA9PiB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTaXplIG11c3QgYmUgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgbGVuZ3RoIG9yIGEgcGVyY2VudGFnZS4nKTtcbiAgfVxuICByZXR1cm4gYGZpdC1jb250ZW50KCR7c2l6ZX0pYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZpdENvbnRlbnQiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBoeXBvdGVudXNlIG9yIEV1Y2xpZGVhbiBub3JtLlxuICogQHBhcmFtIHsuLi5hcmdzfSBudW1iZXJzIC0gQSBzZXQgb2YgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIHNpZGVzIG9mIGEgcmlnaHQtYW5nbGVkIHRyaWFuZ2xlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBoeXBvdCBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBoeXBvdCA9ICguLi5hcmdzKSA9PiBgaHlwb3QoJHthcmdzLmpvaW4oJywgJyl9KWBcbmV4cG9ydCBkZWZhdWx0IGh5cG90IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbG9nYXJpdGhtIG9mIGEgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2FsY3VsYXRlIHRoZSBsb2dhcml0aG0gZm9yLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBsb2coKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBsb2cgPSB2YWx1ZSA9PiBgbG9nKCR7dmFsdWV9KWBcbmV4cG9ydCBkZWZhdWx0IGxvZyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1heGltdW0gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICogQHBhcmFtIHsuLi5hcmdzfSBhcmdzIC0gQSBzZXQgb2YgbnVtZXJpYyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1heCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1heCA9ICguLi5hcmdzKSA9PiBgbWF4KCR7YXJncy5qb2luKCcsICcpfSlgXG5leHBvcnQgZGVmYXVsdCBtYXgiLCAiXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1pbmltdW0gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICogQHBhcmFtIHsuLi5hcmdzfSAtIEEgc2V0IG9mIG51bWVyaWMgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBtaW4oKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW4gPSAoLi4uYXJncykgPT4gYG1pbigke2FyZ3Muam9pbignLCAnKX0pYFxuZXhwb3J0IGRlZmF1bHQgbWluIiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBtaW5tYXggZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWluIC0gVGhlIG1pbmltdW0gdmFsdWUgYXMgYSBDU1MgdW5pdCBvciBrZXl3b3JkLlxuICogQHBhcmFtIHtzdHJpbmd9IG1heCAtIFRoZSBtYXhpbXVtIHZhbHVlIGFzIGEgQ1NTIHVuaXQgb3Iga2V5d29yZC5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgbWluIG9yIG1heCBhcmUgbm90IG9mIHR5cGUgc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBtaW5tYXgoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5tYXggPSAobWluLCBtYXgpID0+IHtcbiAgaWYgKHR5cGVvZiBtaW4gIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBtYXggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFyYW1ldGVycyBtaW4gYW5kIG1heCBtdXN0IGJlIHN0cmluZ3MuJyk7XG4gIH1cblxuICAvLyBJZiBtYXggaXMgbGVzcyB0aGFuIG1pbiwgdHJlYXQgbWlubWF4IGFzIG1pblxuICAvLyBpZiAocGFyc2VGbG9hdChtYXgpIDwgcGFyc2VGbG9hdChtaW4pKSB7XG4gIC8vICAgcmV0dXJuIG1pbjtcbiAgLy8gfVxuXG4gIHJldHVybiBgbWlubWF4KCR7bWlufSwgJHttYXh9KWA7XG59XG5leHBvcnQgZGVmYXVsdCBtaW5tYXg7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbW9kdWx1cyBvZiB0d28gbnVtYmVycy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhIC0gVGhlIGRpdmlkZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IGIgLSBUaGUgZGl2aXNvci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbW9kKCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kID0gKGEsIGIpID0+IGBtb2QoJHthfSwgJHtifSlgO1xuZXhwb3J0IGRlZmF1bHQgbW9kOyIsICIvKipcbiAqIENyZWF0ZXMgYSBDU1MgcGF0aCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IGZpbGxSdWxlIC0gVGhlIGZpbGwtcnVsZSB0byBhcHBseSB0byB0aGUgcGF0aCwgb3IgbnVsbCBpZiBub3QgYXBwbGljYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdmdQYXRoIC0gVGhlIFNWRyBwYXRoIGRhdGEuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIHBhdGgoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoID0gKGZpbGxSdWxlLCBzdmdQYXRoKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3ZnUGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc3ZnUGF0aCBwYXJhbWV0ZXIgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIGlmIChmaWxsUnVsZSAmJiB0eXBlb2YgZmlsbFJ1bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGZpbGxSdWxlIHBhcmFtZXRlciBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgY29uc3QgdmFsaWRGaWxsUnVsZXMgPSBbJ25vbnplcm8nLCAnZXZlbm9kZCddO1xuICBpZiAoZmlsbFJ1bGUgJiYgIXZhbGlkRmlsbFJ1bGVzLmluY2x1ZGVzKGZpbGxSdWxlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZpbGxSdWxlIHBhcmFtZXRlciBtdXN0IGJlIGVpdGhlciBcIm5vbnplcm9cIiBvciBcImV2ZW5vZGRcIi4nKTtcbiAgfVxuXG4gIHJldHVybiBgcGF0aCgke2ZpbGxSdWxlID8gYCR7ZmlsbFJ1bGV9LCBgIDogJyd9XCIke3N2Z1BhdGh9XCIpYDtcbn1cbmV4cG9ydCBkZWZhdWx0IHBhdGg7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgcG93ZXIgb2YgYSBiYXNlIG51bWJlciByYWlzZWQgdG8gYW4gZXhwb25lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gYSAtIFRoZSBiYXNlIG51bWJlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gVGhlIGV4cG9uZW50LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBwb3coKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBwb3cgPSAoYSwgYikgPT4gYHBvdygke2F9LCAke2J9KWA7XG5leHBvcnQgZGVmYXVsdCBwb3c7IiwgIi8qKlxuICogQ3JlYXRlcyBhIENTUyByYXkoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgLSBUaGUgYW5nbGUgb2YgdGhlIHJheSBpbiBkZWdyZWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IFtzaXplPSdjbG9zZXN0LXNpZGUnXSAtIFRoZSBzaXplIGtleXdvcmQgZm9yIHRoZSByYXkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjb250YWluPWZhbHNlXSAtIFdoZXRoZXIgdGhlIHJheSBzaG91bGQgY29udGFpbiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcG9zaXRpb249JyddIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSByYXkgd2l0aGluIHRoZSBlbGVtZW50LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyByYXkoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCByYXkgPSAoYW5nbGUsIHNpemUgPSAnY2xvc2VzdC1zaWRlJywgY29udGFpbiA9IGZhbHNlLCBwb3NpdGlvbiA9ICcnKSA9PiB7XG4gIGlmICh0eXBlb2YgYW5nbGUgIT09ICdudW1iZXInIHx8IGFuZ2xlIDwgMCB8fCBhbmdsZSA+PSAzNjApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYW5nbGUgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDM1OS4nKTtcbiAgfVxuXG4gIGNvbnN0IHNpemVLZXl3b3JkcyA9IFsnY2xvc2VzdC1zaWRlJywgJ2Nsb3Nlc3QtY29ybmVyJywgJ2ZhcnRoZXN0LXNpZGUnLCAnZmFydGhlc3QtY29ybmVyJywgJ3NpZGVzJ107XG4gIGlmICghc2l6ZUtleXdvcmRzLmluY2x1ZGVzKHNpemUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHNpemUgbXVzdCBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXM6ICcgKyBzaXplS2V5d29yZHMuam9pbignLCAnKSArICcuJyk7XG4gIH1cblxuICBjb25zdCBwb3NpdGlvblJlZ2V4ID0gL14obGVmdHxjZW50ZXJ8cmlnaHR8dG9wfGJvdHRvbXwoXFxkKyhcXC5cXGQrKT8ocHh8JSk/KSkkLztcbiAgaWYgKHBvc2l0aW9uICYmICFwb3NpdGlvblJlZ2V4LnRlc3QocG9zaXRpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHBvc2l0aW9uIG11c3QgYmUgYSB2YWxpZCBDU1MgcG9zaXRpb24gdmFsdWUuJyk7XG4gIH1cblxuICBsZXQgcmF5U3RyaW5nID0gYHJheSgke2FuZ2xlfWRlZ2A7XG5cbiAgaWYgKHNpemUgIT09ICdjbG9zZXN0LXNpZGUnKSB7XG4gICAgcmF5U3RyaW5nICs9IGAgJHtzaXplfWA7XG4gIH1cblxuICBpZiAoY29udGFpbikge1xuICAgIHJheVN0cmluZyArPSAnIGNvbnRhaW4nO1xuICB9XG5cbiAgaWYgKHBvc2l0aW9uKSB7XG4gICAgcmF5U3RyaW5nICs9IGAgYXQgJHtwb3NpdGlvbn1gO1xuICB9XG5cbiAgcmF5U3RyaW5nICs9ICcpJztcblxuICByZXR1cm4gYG9mZnNldC1wYXRoOiAke3JheVN0cmluZ307YDtcbn1cbmV4cG9ydCBkZWZhdWx0IHJheTsiLCAiLyoqXG4gKiBDb252ZXJ0cyBhIHBpeGVsIHZhbHVlIHRvIHJlbSB1bml0cyBiYXNlZCBvbiBhIHJvb3QgZm9udCBzaXplLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHBpeGVsIHZhbHVlIHRvIGNvbnZlcnQgdG8gcmVtLlxuICogQHBhcmFtIHtudW1iZXJ9IFtyb290VmFsdWU9MTZdIC0gVGhlIHJvb3QgZm9udCBzaXplIGluIHBpeGVscy4gRGVmYXVsdCBpcyAxNi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIGluIHJlbSB1bml0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbSA9ICh2YWx1ZSwgcm9vdFZhbHVlID0gMTYpID0+IGByZW0oJHt2YWx1ZX0sICR7cm9vdFZhbHVlfSlgO1xuZXhwb3J0IGRlZmF1bHQgcmVtOyIsICIvKipcbiAqIEdlbmVyYXRlcyBhIENTUyByZXBlYXQoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGNvdW50IC0gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHRyYWNrcyBvciBvbmUgb2YgdGhlIGtleXdvcmRzOiAnYXV0by1maWxsJywgJ2F1dG8tZml0Jy5cbiAqIEBwYXJhbSB7Li4uc3RyaW5nfGFycmF5fSB0cmFja3MgLSBUaGUgdHJhY2sgc2l6ZXMgYW5kL29yIG5hbWVzIHRvIGJlIHJlcGVhdGVkLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByZXBlYXQoKSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlcGVhdCA9IChjb3VudCwgLi4udHJhY2tzKSA9PiB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb3VudCkgJiYgY291bnQgIT09ICdhdXRvLWZpbGwnICYmIGNvdW50ICE9PSAnYXV0by1maXQnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHJlcGVhdCBjb3VudCBtdXN0IGJlIGFuIGludGVnZXIgb3Igb25lIG9mIHRoZSBrZXl3b3JkczogYXV0by1maWxsLCBhdXRvLWZpdC4nKTtcbiAgfVxuXG4gIGNvbnN0IHRyYWNrTGlzdCA9IHRyYWNrcy5tYXAodHJhY2sgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRyYWNrKSkge1xuICAgICAgcmV0dXJuIGBbJHt0cmFjay5qb2luKCcgJyl9XWA7XG4gICAgfVxuICAgIHJldHVybiB0cmFjaztcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgcmVwZWF0KCR7Y291bnR9LCAke3RyYWNrTGlzdH0pYDtcbn07XG5leHBvcnQgZGVmYXVsdCByZXBlYXQ7IiwgIi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHRvIGEgc3BlY2lmaWVkIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSBudW1iZXIgdG8gcm91bmQuXG4gKiBAcGFyYW0ge251bWJlcn0gW3ByZWNpc2lvbj0wXSAtIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG8gKGRlZmF1bHQgaXMgMCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJvdW5kZWQgbnVtYmVyLlxuICovXG5leHBvcnQgY29uc3Qgcm91bmQgPSAodmFsdWUsIHByZWNpc2lvbiA9IDApID0+IGByb3VuZCgke3ZhbHVlfSwgJHtwcmVjaXNpb259KWA7XG5leHBvcnQgZGVmYXVsdCByb3VuZDsiLCAiXG4vKipcbiAqIFJldHVybnMgdGhlIENTUyBzaWduIGZ1bmN0aW9uIGZvciBhIGdpdmVuIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSB1c2VkIGluIHRoZSBzaWduIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzaWduIG9mIHRoZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpZ24gPSAodmFsdWUpID0+IGBzaWduKCR7dmFsdWV9KWBcbmV4cG9ydCBkZWZhdWx0IHNpZ247IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc2luZSBvZiBhIGdpdmVuIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIGFuZ2xlIGluIGRlZ3JlZXMgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgc2luZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc2luZSBvZiB0aGUgYW5nbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzaW4gPSAodmFsdWUpID0+IGBzaW4oJHt2YWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHNpbjsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmUgcm9vdCBvZiBhIGdpdmVuIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSB2YWx1ZSBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBzcXVhcmUgcm9vdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhlIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3Qgc3FydCA9ICh2YWx1ZSkgPT4gYHNxcnQoJHt2YWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHNxcnQ7IiwgIi8qKlxuICogQ3JlYXRlcyBhIENTUyBzeW1ib2xzIHZhbHVlIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgdGhlIHN5bWJvbHMgbGlzdDsgb25lIG9mICdjeWNsaWMnLCAnbnVtZXJpYycsICdhbHBoYWJldGljJywgJ3N5bWJvbGljJywgJ2ZpeGVkJy5cbiAqIEBwYXJhbSB7Li4udmFsdWVzfSAtIFRoZSBzeW1ib2xzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBsaXN0LCB3aGljaCBjYW4gYmUgc3RyaW5ncyBvciBJbWFnZSBpbnN0YW5jZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHN5bWJvbHMgbGlzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbHMgPSAodHlwZSwgLi4udmFsdWVzKSA9PiB7XG4gIGNvbnN0IHZhbGlkVHlwZXMgPSBbJ2N5Y2xpYycsICdudW1lcmljJywgJ2FscGhhYmV0aWMnLCAnc3ltYm9saWMnLCAnZml4ZWQnXTtcbiAgaWYgKCF2YWxpZFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN5bWJvbHMgdHlwZTogJHt0eXBlfS4gRXhwZWN0ZWQgb25lIG9mICR7dmFsaWRUeXBlcy5qb2luKCcsICcpfS5gKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gYFxcXCIke3ZhbHVlfVxcXCJgO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgICAgLy8gQXNzdW1pbmcgSW1hZ2UgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgYW4gaW1hZ2UsIGFuZCB0b1N0cmluZygpIHJldHVybnMgYSB2YWxpZCBDU1MgaW1hZ2UgdmFsdWVcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgdHlwZTogdmFsdWVzIG11c3QgYmUgc3RyaW5ncyBvciBJbWFnZSBpbnN0YW5jZXMuJyk7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYHN5bWJvbHMoJHt0eXBlfSAke2Zvcm1hdHRlZFZhbHVlc30pYDtcbn1cbmV4cG9ydCBkZWZhdWx0IHN5bWJvbHM7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgdGFuZ2VudCBvZiBhIGdpdmVuIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIGFuZ2xlIGluIGRlZ3JlZXMgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgdGFuZ2VudC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdGFuZ2VudCBvZiB0aGUgYW5nbGUuXG4gKi9cbmV4cG9ydCBjb25zdCB0YW4gPSAodmFsdWUpID0+IGB0YW4oJHt2YWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHRhbjsiLCAiLyoqXG4gKiBGb3JtYXRzIGEgZ2l2ZW4gcGF0aCBhcyBhIENTUyBVUkwgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIGJlIGZvcm1hdHRlZCBhcyBhIFVSTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGZvcm1hdHRlZCBVUkwgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgdXJsID0gKHBhdGgpID0+IHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVVJMIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgVVJMIGlzIGEgZGF0YSBVUkwsIGFic29sdXRlIFVSTCwgb3IgYSByZWxhdGl2ZSBVUkxcbiAgY29uc3QgaXNEYXRhVXJsID0gcGF0aC5zdGFydHNXaXRoKCdkYXRhOicpO1xuICBjb25zdCBpc0Fic29sdXRlVXJsID0gL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHBhdGgpO1xuICBjb25zdCBpc1JlbGF0aXZlVXJsID0gIWlzRGF0YVVybCAmJiAhaXNBYnNvbHV0ZVVybDtcblxuICAvLyBJZiB0aGUgVVJMIGNvbnRhaW5zIHNwZWNpYWwgY2hhcmFjdGVycywgaXQgc2hvdWxkIGJlIHF1b3RlZFxuICBjb25zdCBuZWVkc1F1b3RlcyA9IC9bXFxzJ1wiKCldLy50ZXN0KHBhdGgpO1xuICBjb25zdCBxdW90ZWRQYXRoID0gbmVlZHNRdW90ZXMgPyBgXFxcIiR7cGF0aH1cXFwiYCA6IHBhdGg7XG5cbiAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgVVJMIHN0cmluZ1xuICByZXR1cm4gYHVybCgke3F1b3RlZFBhdGh9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgdXJsOyIsICIvKipcbiAqIENvbnN0cnVjdHMgYSBDU1MgdmFyaWFibGUgd2l0aCBhbiBvcHRpb25hbCBmYWxsYmFjay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmFsbGJhY2tdIC0gVGhlIG9wdGlvbmFsIGZhbGxiYWNrIHZhbHVlIGlmIHRoZSB2YXJpYWJsZSBpcyBub3QgZGVmaW5lZC5cbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgbmFtZSBpcyBub3QgYSBzdHJpbmcgb3IgaWYgdGhlIGZhbGxiYWNrIGlzIHByb3ZpZGVkIGFuZCBpcyBub3QgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBjc3NWYXIgPSAobmFtZSwgZmFsbGJhY2spID0+IHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1c3RvbSBwcm9wZXJ0eSBuYW1lIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICBpZiAoZmFsbGJhY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZmFsbGJhY2sgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmFsbGJhY2sgdmFsdWUgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIHJldHVybiBgdmFyKCR7bmFtZX0ke2ZhbGxiYWNrICE9PSB1bmRlZmluZWQgPyBgLCAke2ZhbGxiYWNrfWAgOiAnJ30pYDtcbn07XG5leHBvcnQgZGVmYXVsdCBjc3NWYXI7IiwgImltcG9ydCBhYnMgZnJvbSAnLi9hYnMuanMnO1xuaW1wb3J0IGFjb3MgZnJvbSAnLi9hY29zLmpzJztcbmltcG9ydCBhc2luIGZyb20gJy4vYXNpbi5qcyc7XG5pbXBvcnQgYXRhbiBmcm9tICcuL2F0YW4uanMnO1xuaW1wb3J0IGF0YW4yIGZyb20gJy4vYXRhbjIuanMnO1xuaW1wb3J0IGF0dHIgZnJvbSAnLi9hdHRyLmpzJztcbmltcG9ydCBjYWxjIGZyb20gJy4vY2FsYy5qcyc7XG5pbXBvcnQgY2xhbXAgZnJvbSAnLi9jbGFtcC5qcyc7XG5pbXBvcnQgY29zIGZyb20gJy4vY29zLmpzJztcbmltcG9ydCBjb3VudGVyIGZyb20gJy4vY291bnRlci5qcyc7XG5pbXBvcnQgY291bnRlcnMgZnJvbSAnLi9jb3VudGVycy5qcyc7XG5pbXBvcnQgY3Jvc3NmYWRlIGZyb20gJy4vY3Jvc3NmYWRlLmpzJztcbmltcG9ydCBlbGVtZW50IGZyb20gJy4vZWxlbWVudC5qcyc7XG5pbXBvcnQgZW52IGZyb20gJy4vZW52LmpzJztcbmltcG9ydCBleHAgZnJvbSAnLi9leHAuanMnO1xuaW1wb3J0IGZpdGNvbnRlbnQgZnJvbSAnLi9maXRjb250ZW50LmpzJztcbmltcG9ydCBoeXBvdCBmcm9tICcuL2h5cG90LmpzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnO1xuaW1wb3J0IG1heCBmcm9tICcuL21heC5qcyc7XG5pbXBvcnQgbWluIGZyb20gJy4vbWluLmpzJztcbmltcG9ydCBtaW5tYXggZnJvbSAnLi9taW5tYXguanMnO1xuaW1wb3J0IG1vZCBmcm9tICcuL21vZC5qcyc7XG5pbXBvcnQgcGF0aCBmcm9tICcuL3BhdGguanMnO1xuaW1wb3J0IHBvdyBmcm9tICcuL3Bvdy5qcyc7XG5pbXBvcnQgcmF5IGZyb20gJy4vcmF5LmpzJztcbmltcG9ydCByZW0gZnJvbSAnLi9yZW0uanMnO1xuaW1wb3J0IHJlcGVhdCBmcm9tICcuL3JlcGVhdC5qcyc7XG5pbXBvcnQgcm91bmQgZnJvbSAnLi9yb3VuZC5qcyc7XG5pbXBvcnQgc2lnbiBmcm9tICcuL3NpZ24uanMnO1xuaW1wb3J0IHNpbiBmcm9tICcuL3Npbi5qcyc7XG5pbXBvcnQgc3FydCBmcm9tICcuL3NxcnQuanMnO1xuaW1wb3J0IHN5bWJvbHMgZnJvbSAnLi9zeW1ib2xzLmpzJztcbmltcG9ydCB0YW4gZnJvbSAnLi90YW4uanMnO1xuaW1wb3J0IHVybCBmcm9tICcuL3VybC5qcyc7XG5pbXBvcnQgY3NzVmFyIGZyb20gJy4vdmFyLmpzJztcblxuZXhwb3J0IHtcbiAgYWJzLFxuICBhY29zLFxuICBhc2luLFxuICBhdGFuLFxuICBhdGFuMixcbiAgYXR0cixcbiAgY2FsYyxcbiAgY2xhbXAsXG4gIGNvcyxcbiAgY291bnRlcixcbiAgY291bnRlcnMsXG4gIGNyb3NzZmFkZSxcbiAgZWxlbWVudCxcbiAgZW52LFxuICBleHAsXG4gIGZpdGNvbnRlbnQsXG4gIGh5cG90LFxuICBsb2csXG4gIG1heCxcbiAgbWluLFxuICBtaW5tYXgsXG4gIG1vZCxcbiAgcGF0aCxcbiAgcG93LFxuICByYXksXG4gIHJlbSxcbiAgcmVwZWF0LFxuICByb3VuZCxcbiAgc2lnbixcbiAgc2luLFxuICBzcXJ0LFxuICBzeW1ib2xzLFxuICB0YW4sXG4gIHVybCxcbiAgY3NzVmFyXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWJzLFxuICBhY29zLFxuICBhc2luLFxuICBhdGFuLFxuICBhdGFuMixcbiAgYXR0cixcbiAgY2FsYyxcbiAgY2xhbXAsXG4gIGNvcyxcbiAgY291bnRlcixcbiAgY291bnRlcnMsXG4gIGNyb3NzZmFkZSxcbiAgZWxlbWVudCxcbiAgZW52LFxuICBleHAsXG4gIGZpdGNvbnRlbnQsXG4gIGh5cG90LFxuICBsb2csXG4gIG1heCxcbiAgbWluLFxuICBtaW5tYXgsXG4gIG1vZCxcbiAgcGF0aCxcbiAgcG93LFxuICByYXksXG4gIHJlbSxcbiAgcmVwZWF0LFxuICByb3VuZCxcbiAgc2lnbixcbiAgc2luLFxuICBzcXJ0LFxuICBzeW1ib2xzLFxuICB0YW4sXG4gIHVybCxcbiAgY3NzVmFyXG59IiwgImltcG9ydCB7IGNhbGMgfSBmcm9tICcuLi9mdW5jdGlvbnMvaW5kZXguanMnO1xuXG5jb25zdCBvckdhdGUgPSAoYSwgYikgPT4ge1xuICBjb25zdCBBb3ZlckIgPSAoYSwgYikgPT4gY2FsYyhgbWluKDEsIG1heCgke2F9IC0gJHtifSwgMCkpYCk7XG4gIGNvbnN0IEJvdmVyQSA9IChhLCBiKSA9PiBjYWxjKGAoMSAtICR7QW92ZXJCKGEsIGIpfSlgKTtcblxuICByZXR1cm4gW1xuICAgIGAke0JvdmVyQShiLCBhKX0gKiAke2F9ICsgJHtBb3ZlckIoYSwgYil9ICogJHtifWAsIC8vIFRydWUgaWYgZWl0aGVyIGEgb3IgYiBpcyB0cnVlXG4gICAgYCR7QW92ZXJCKGEsIGIpfSAqICR7YX0gKyAke0JvdmVyQShiLCBhKX0gKiAke2J9YCAgLy8gVHJ1ZSBpZiBib3RoIGEgYW5kIGIgYXJlIHRydWVcbiAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3JHYXRlIiwgImltcG9ydCBvckdhdGUgZnJvbSAnLi9vci5nYXRlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvckdhdGUsXG59IiwgImltcG9ydCB7IGNzc1ZhciB9IGZyb20gJy4uL2Z1bmN0aW9ucy92YXIuanMnXG5cbi8vIEdldHRpbmcgYSB2YXJpYWJsZSBpbiBDU1Mgc2NvcGUuXG4vLyB3aW5kb3dcbi8vICAgLmdldENvbXB1dGVkU3R5bGUoZGl2KVxuLy8gICAuZ2V0UHJvcGVydHlWYWx1ZSgnLS1leGFtcGxlLXZhcicpXG5cbmNvbnN0IEFub29wID0gYXN5bmMgKCkgPT4ge31cblxuLyoqXG4gKiBHZXRzIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGRvY3VtZW50LlxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgcm9vdCBlbGVtZW50LlxuICovXG5jb25zdCBnZXRSb290ID0gXyA9PiBcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4vKipcbiAqIEdldHMgdGhlIGNvbXB1dGVkIHN0eWxlIG9mIHRoZSByb290IGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gVGhlIGNvbXB1dGVkIHN0eWxlIG9iamVjdCBmb3IgdGhlIHJvb3QgZWxlbWVudC5cbiAqL1xuY29uc3QgZ2V0Um9vdFN0eWxlID0gXyA9PiBcbiAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZ2V0Um9vdCgpKVxuXG4vKipcbiAqIFJldHJpZXZlcyBhIENTUyBwcm9wZXJ0eSB2YWx1ZSBmcm9tIHRoZSByb290IHN0eWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgQ1NTIHByb3BlcnR5LlxuICovXG5jb25zdCBnZXRSb290U3R5bGVQcm9wZXJ0eSA9IHByb3BlcnR5ID0+IGdldFJvb3RTdHlsZSgpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG5cbi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIHByb3BlcnR5IHZhbHVlIGZyb20gdGhlIHJvb3Qgc3R5bGUgd2l0aCBhIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmYWxsYmFja0ZuPUFub29wXSBUaGUgZmFsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSBpZiB0aGUgcHJvcGVydHkgaXMgbm90IGZvdW5kLlxuICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gVGhlIHZhbHVlIG9mIHRoZSBDU1MgcHJvcGVydHkgb3IgdGhlIHJlc3VsdCBvZiB0aGUgZmFsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGdldFJvb3RTdHlsZVByb3BlcnR5V2l0aEZhbGxiYWNrID0gYXN5bmMgKHByb3BlcnR5LCBmYWxsYmFja0ZuID0gQW5vb3ApID0+IHtcbiAgbGV0IHJzID0gZ2V0Um9vdFN0eWxlKClcbiAgcmV0dXJuIHJzLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpIFxuICAgIHx8IGF3YWl0IGZhbGxiYWNrRm4ocnMpXG59XG5cbi8qKlxuICogU2V0cyBhIENTUyBwcm9wZXJ0eSBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBDU1MgcHJvcGVydHkgbmFtZSB0byBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgQ1NTIHByb3BlcnR5LlxuICovXG5jb25zdCBzZXRSb290UHJvcCA9IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgY29uc3Qgcm9vdCA9IGdldFJvb3QoKVxuICByb290LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSlcbn1cblxuY29uc3QgZGVsZXRlUm9vdFByb3AgPSBwcm9wZXJ0eSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBnZXRSb290KClcbiAgcm9vdC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eSlcbn1cblxuLyoqXG4gKiBTZXRzIGEgQ1NTIHZhcmlhYmxlIG9uIHRoZSByb290IGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZSB0byBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgQ1NTIHZhcmlhYmxlLlxuICovXG5jb25zdCBzZXRSb290VmFyID0gKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICBzZXRSb290UHJvcChgLS0ke3Byb3BlcnR5fWAsIHZhbHVlKVxufVxuXG5jb25zdCBkZWxldGVSb290VmFyID0gcHJvcGVydHkgPT4ge1xuICBkZWxldGVSb290UHJvcChgLS0ke3Byb3BlcnR5fWApXG59XG5cbi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIHZhcmlhYmxlIHZhbHVlIGZyb20gdGhlIHJvb3Qgc3R5bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgQ1NTIHZhcmlhYmxlLlxuICovXG5jb25zdCBnZXRSb290VmFyID0gcHJvcGVydHkgPT4gZ2V0Um9vdFN0eWxlUHJvcGVydHkoYC0tJHtwcm9wZXJ0eX1gKVxuXG4vKipcbiAqIFNldHMgYSBDU1MgcHJvcGVydHkgb24gYSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBvbiB3aGljaCB0byBzZXQgdGhlIHByb3BlcnR5LlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBDU1MgcHJvcGVydHkgbmFtZSB0byBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgQ1NTIHByb3BlcnR5LlxuICovXG5jb25zdCBzZXRDU1NQcm9wID0gKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSkgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcbiAgLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSlcblxuY29uc3QgZGVsZXRlQ1NTUHJvcCA9IChlbGVtZW50LCBwcm9wZXJ0eSkgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcbiAgLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5KVxuXG4vKipcbiAqIFJldHJpZXZlcyBhIENTUyBwcm9wZXJ0eSB2YWx1ZSBmcm9tIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgZnJvbSB3aGljaCB0byBnZXQgdGhlIHByb3BlcnR5LlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBDU1MgcHJvcGVydHkgbmFtZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgQ1NTIHByb3BlcnR5LlxuICovXG5jb25zdCBnZXRDU1NQcm9wID0gKGVsZW1lbnQsIHByb3BlcnR5KSA9PiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSlcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgdmFyaWFibGUgdmFsdWUgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IGZyb20gd2hpY2ggdG8gZ2V0IHRoZSB2YXJpYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHZhcmlhYmxlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBDU1MgdmFyaWFibGUuXG4gKi9cbmNvbnN0IGdldENTU1ZhciA9IChlbGVtZW50LCBwcm9wZXJ0eSkgPT4gZ2V0Q1NTUHJvcChlbGVtZW50LCBgLS0ke3Byb3BlcnR5fWApXG5cbi8qKlxuICogU2V0cyBhIENTUyB2YXJpYWJsZSBvbiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IG9uIHdoaWNoIHRvIHNldCB0aGUgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZSB0byBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgQ1NTIHZhcmlhYmxlLlxuICovXG5jb25zdCBzZXRDU1NWYXIgPSAoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSA9PiBzZXRDU1NQcm9wKGVsZW1lbnQsIGAtLSR7cHJvcGVydHl9YCAsIHZhbHVlKVxuXG4vKipcbiAqIFJlbW92ZXMgYSBDU1MgdmFyaWFibGUgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IGZyb20gd2hpY2ggdG8gcmVtb3ZlIHRoZSB2YXJpYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgQ1NTIHZhcmlhYmxlIHRvIHJlbW92ZS5cbiAqL1xuY29uc3QgZGVsZXRlQ1NTVmFyID0gKGVsZW1lbnQsIHByb3BlcnR5KSA9PiBkZWxldGVDU1NQcm9wKGVsZW1lbnQsIGAtLSR7cHJvcGVydHl9YClcblxuLy8gLS0tXG52YXIgcnVubmluZ0NTU19FdmFscyA9IDA7XG5cbi8qKlxuICogRXZhbHVhdGVzIGEgQ1NTIHByb3BlcnR5IGJ5IHRlbXBvcmFyaWx5IGFwcGx5aW5nIGl0IHRvIHRoZSByb290IGFuZCByZXRyaWV2aW5nIGl0cyBjb21wdXRlZCB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3MgVGhlIENTUyBwcm9wZXJ0eSB2YWx1ZSB0byBldmFsdWF0ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21wdXRlZCB2YWx1ZSBvZiB0aGUgQ1NTIHByb3BlcnR5LlxuICovXG5jb25zdCBldmFsQ1NTUHJvcCA9IGNzcyA9PiB7XG4gIGNvbnN0IG5hbWUgPSAnZXZhbC1jc3MtJyArIHJ1bm5pbmdDU1NfRXZhbHM7XG4gICsrcnVubmluZ0NTU19FdmFscztcbiAgc2V0Um9vdFZhcihuYW1lLCBjc3MpXG4gIFxuICBsZXQgcmVzID0gZ2V0Um9vdFZhcihuYW1lKVxuICAtLXJ1bm5pbmdDU1NfRXZhbHM7XG4gIGRlbGV0ZVJvb3RWYXIobmFtZSlcblxuICByZXR1cm4gcmVzO1xufVxuXG5jb25zdCBldmFsQ1NTSGFyZCA9IChydWxlLCBjc3MpID0+IENTU1N0eWxlVmFsdWUucGFyc2UocnVsZSwgY3NzKVxuXG5jb25zdCBjcmVhdGVDb3VudGVyID0gKGVsZW1lbnQsIHByb3BlcnR5LCB2YXJfKSA9PiB7XG4gIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIGBjb3VudGVyKCR7dmFyX30pYClcbiAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnY291bnRlci1yZXNldCcsIGAke3Zhcl99ICR7Y3NzVmFyKHZhcl8pfWApXG4gIHJldHVybiBlbGVtZW50LnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGN1c3RvbSBDU1MgcHJvcGVydHkgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gKiBJZiB0aGUgYnJvd3NlciBpcyBGaXJlZm94LCB0aGUgcHJvcGVydHkgaXMgc2V0IG9uIHRoZSByb290IGVsZW1lbnQgaW5zdGVhZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBDU1MgcHJvcGVydHkgdG8gY3JlYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhPXt9XSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBwcm9wZXJ0eSwgc3VjaCBhcyBzeW50YXggYW5kIGluaXRpYWxWYWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaGVyaXRzPWZhbHNlXSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgaW5oZXJpdGVkIGJ5IGRlc2NlbmRhbnQgZWxlbWVudHMuXG4gKi9cbmNvbnN0IGNyZWF0ZVByb3BlcnR5ID0gKG5hbWUsIGRhdGEgPSB7fSwgaW5oZXJpdHMgPSBmYWxzZSkgPT4ge1xuICAvLyBJcyBmaXJlZm94P1xuICBsZXQgaXNGRiA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMTtcblxuICBpZiAoIWlzRkYpIHtcbiAgICBDU1MucmVnaXN0ZXJQcm9wZXJ0eSh7XG4gICAgICBuYW1lLFxuICAgICAgc3ludGF4OiBkYXRhPy5zeW50YXggfHwgXCI8Y29sb3I+XCIsXG4gICAgICBpbmhlcml0czogaW5oZXJpdHMgfHwgZmFsc2UsXG4gICAgICBpbml0aWFsVmFsdWU6IGRhdGE/LmluaXRpYWxWYWx1ZSB8fCBcIiNjMGZmZWVcIixcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHNldFJvb3RWYXIobmFtZSwgZGF0YT8uaW5pdGlhbFZhbHVlIHx8IFwiI2MwZmZlZVwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Um9vdCxcbiAgZ2V0Um9vdFN0eWxlLFxuICBnZXRSb290U3R5bGVQcm9wZXJ0eSxcbiAgZ2V0Um9vdFN0eWxlUHJvcGVydHlXaXRoRmFsbGJhY2ssXG4gIHNldFJvb3RQcm9wLFxuICBkZWxldGVSb290UHJvcCxcbiAgc2V0Um9vdFZhcixcbiAgZGVsZXRlUm9vdFZhcixcbiAgZ2V0Um9vdFZhcixcbiAgc2V0Q1NTUHJvcCxcbiAgZGVsZXRlQ1NTUHJvcCxcbiAgZ2V0Q1NTUHJvcCxcbiAgZ2V0Q1NTVmFyLFxuICBzZXRDU1NWYXIsXG4gIGRlbGV0ZUNTU1ZhcixcblxuICBldmFsQ1NTUHJvcCxcbiAgZXZhbENTU0hhcmQsXG4gIFxuICBjcmVhdGVQcm9wZXJ0eSxcbiAgY3JlYXRlQ291bnRlcixcbn0iLCAiaW1wb3J0IHJvb3RNYW5pcHVsYXRlIGZyb20gJy4vcm9vdE1hbmlwdWxhdGUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7IFxuICByb290TWFuaXB1bGF0ZVxufSIsICJpbXBvcnQgaGVscGVycyBmcm9tICcuLi9oZWxwZXJzL2luZGV4LmpzJztcbmltcG9ydCBrZXl3b3JkcyBmcm9tICcuLi9rZXl3b3Jkcy9pbmRleC5qcyc7XG5pbXBvcnQgZnVuY3Rpb25zIGZyb20gJy4uL2Z1bmN0aW9ucy9pbmRleC5qcyc7XG5pbXBvcnQgaGFuZGxlcyBmcm9tICcuLi9oYW5kbGVzL2luZGV4LmpzJztcbmltcG9ydCBtYWdpYyBmcm9tICcuLi9tYWdpYy9pbmRleC5qcyc7XG5cbmNsYXNzIFdURlN0eWxlc2hlZXQge1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhlbHBlcnMgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGhlbHBlcnMgPSBoZWxwZXJzO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGtleXdvcmRzIG1vZHVsZS5cbiAgICovXG4gIHN0YXRpYyBrZXl3b3JkcyA9IGtleXdvcmRzO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGZ1bmN0aW9ucyBtb2R1bGUuXG4gICAqL1xuICBzdGF0aWMgZnVuY3Rpb25zID0gZnVuY3Rpb25zO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGhhbmRsZXMgbW9kdWxlLlxuICAgKi9cbiAgc3RhdGljIGhhbmRsZXMgPSBoYW5kbGVzO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIG1hZ2ljIG1vZHVsZS5cbiAgICovXG4gIHN0YXRpYyBtYWdpYyA9IG1hZ2ljO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSByZWZlcmVuY2UgdG8gdGhlIGhlbHBlcnMgbW9kdWxlLlxuICAgKi9cbiAgaGVscGVycyA9IGhlbHBlcnM7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIHJlZmVyZW5jZSB0byB0aGUga2V5d29yZHMgbW9kdWxlLlxuICAgKi9cbiAga2V5d29yZHMgPSBrZXl3b3JkcztcblxuICAvKipcbiAgICogSW5zdGFuY2UgcmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbnMgbW9kdWxlLlxuICAgKi9cbiAgZnVuY3Rpb25zID0gZnVuY3Rpb25zO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSByZWZlcmVuY2UgdG8gdGhlIGhhbmRsZXMgbW9kdWxlLlxuICAgKi9cbiAgaGFuZGxlcyA9IGhhbmRsZXM7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIHJlZmVyZW5jZSB0byB0aGUgbWFnaWMgbW9kdWxlLlxuICAgKi9cbiAgbWFnaWMgPSBtYWdpYztcblxuICAvKipcbiAgICogU3RhdGljIGNvdW50ZXIgZm9yIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgKi9cbiAgc3RhdGljIGNvdW50ID0gMDtcblxuICAvKipcbiAgICogVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBzdHlsZXNoZWV0IGluc3RhbmNlLlxuICAgKi9cbiAgaWQgPSArK1dURlN0eWxlc2hlZXQuY291bnQ7XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgQ1NTIHJ1bGVzLlxuICAgKi9cbiAgcnVsZXMgPSBbXTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBicm93c2VyJ3MgQ1NTIG9iamVjdC5cbiAgICovXG4gIENTUyA9IHdpbmRvdy5DU1M7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgV1RGU3R5bGVzaGVldC5cbiAgICogQHBhcmFtIHtEb2N1bWVudH0gZG9jdW1lbnQgLSBUaGUgZG9jdW1lbnQgaW4gd2hpY2ggdGhlIHN0eWxlc2hlZXQgd2lsbCBiZSBjcmVhdGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIENTUyBydWxlIHRvIHRoZSBzdHlsZXNoZWV0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcnVsZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRlY2xhcmF0aW9ucyAtIFRoZSBDU1MgZGVjbGFyYXRpb25zIGZvciB0aGUgcnVsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleF0gLSBUaGUgcG9zaXRpb24gYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBydWxlLlxuICAgKi9cbiAgYWRkUnVsZShzZWxlY3RvciwgZGVjbGFyYXRpb25zLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbmRleCA9IHRoaXMucnVsZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMucnVsZXMuc3BsaWNlKGluZGV4LCAwLCB7XG4gICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIC0tLVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG9yIHJldHJpZXZlcyB0aGUgc3R5bGUgZWxlbWVudCBmb3IgdGhlIHN0eWxlc2hlZXQuXG4gICAqIEByZXR1cm4ge0hUTUxTdHlsZUVsZW1lbnR9IFRoZSBzdHlsZSBlbGVtZW50LlxuICAgKi9cbiAgY3JlYXRlU3R5bGVzaGVldCgpIHtcbiAgICBpZiAoIXRoaXMuc3R5bGVzaGVldCkge1xuICAgICAgdGhpcy5zdHlsZXNoZWV0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG4gIH1cblxuICBpc0luRG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuY29udGFpbnModGhpcy5zdHlsZXNoZWV0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIENTU1N0eWxlU2hlZXQgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIERPTSBlbGVtZW50IG9yIHJ1bGUuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8Q1NTUnVsZX0gb2JqZWN0IC0gVGhlIERPTSBlbGVtZW50IG9yIENTUyBydWxlIHRvIGdldCB0aGUgc3R5bGVzaGVldCBmcm9tLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBvYmplY3QgdHlwZSBpcyB1bnN1cHBvcnRlZC5cbiAgICogQHJldHVybiB7Q1NTU3R5bGVTaGVldHxudWxsfSBUaGUgYXNzb2NpYXRlZCBDU1NTdHlsZVNoZWV0IG9iamVjdCwgb3IgbnVsbCBpZiBub3QgZm91bmQuXG4gICAqL1xuICBnZXRTaGVldChvYmplY3QpIHtcbiAgICAvLyBHZXQgdGhlIENTU1N0eWxlU2hlZXQgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgb3duZXIgZWxlbWVudCBvciBydWxlXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG9iamVjdCBpbnN0YW5jZW9mIEhUTUxMaW5rRWxlbWVudDpcbiAgICAgIGNhc2Ugb2JqZWN0IGluc3RhbmNlb2YgSFRNTFN0eWxlRWxlbWVudDpcbiAgICAgIGNhc2Ugb2JqZWN0IGluc3RhbmNlb2YgU1ZHU3R5bGVFbGVtZW50OlxuICAgICAgY2FzZSBvYmplY3QgaW5zdGFuY2VvZiBQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gJiYgb2JqZWN0LnRhcmdldCA9PT0gJ3htbC1zdHlsZXNoZWV0JzpcbiAgICAgICAgcmV0dXJuIG9iamVjdC5zaGVldDtcblxuICAgICAgY2FzZSBvYmplY3QgaW5zdGFuY2VvZiBDU1NJbXBvcnRSdWxlOlxuICAgICAgICByZXR1cm4gb2JqZWN0LnN0eWxlU2hlZXQ7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgb3duZXIgb2JqZWN0IGZvciBnZXR0aW5nIENTU1N0eWxlU2hlZXQuJyk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlTGFzdFJ1bGUoKSB7XG4gICAgbGV0IHNzID0gdGhpcy5jcmVhdGVTdHlsZXNoZWV0KCk7XG4gICAgbGV0IHNfID0gdGhpcy5nZXRTaGVldChzcyk7XG4gICAgbGV0IHJ1bGVzID0gc18uY3NzUnVsZXM7XG4gICAgbGV0IGxhc3RSdWxlID0gcnVsZXNbcnVsZXMubGVuZ3RoIC0gMV07XG4gICAgc18uZGVsZXRlUnVsZShsYXN0UnVsZS5pbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZXMgdGhlIHN0eWxlc2hlZXQgaW50byBhIHN0eWxlIGVsZW1lbnQuXG4gICAqL1xuICBjb21waWxlKCkge1xuICAgIGxldCBzcyA9IHRoaXMuY3JlYXRlU3R5bGVzaGVldCgpO1xuICAgIGxldCBzXyA9IHRoaXMuZ2V0U2hlZXQoc3MpO1xuXG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICBsZXQgY3NzID0gdGhpcy5DU1M7XG5cbiAgICAvLyBBZGQgdGhlIENTUyBydWxlc1xuICAgIGxldCBhbGxSdWxlcyA9IHRoaXMucnVsZXMubWFwKHJ1bGUgPT4ge1xuICAgICAgY29uc3QgeyBzZWxlY3RvciwgZGVjbGFyYXRpb25zIH0gPSBydWxlO1xuXG4gICAgICBkZWNsYXJhdGlvbnMubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgbGV0IHJ1bGVTdHJpbmcgPSBgJHtrZXl9OiAke3ZhbHVlfSR7dmFsdWU/LlsxXSA/ICcgIWltcG9ydGFudCcgOiAnJ31gO1xuICAgICAgICBsZXQgc3R5bGUgPSBgJHtzZWxlY3Rvcn0geyAke3J1bGVTdHJpbmd9IH1gXG4gICAgICAgIHNfLmluc2VydFJ1bGUoc3R5bGUsIHNfLmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBbc2VsZWN0b3JdOiBkZWNsYXJhdGlvbnMsXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghdGhpcy5pc0luRG9jdW1lbnQoKSkge1xuICAgICAgdGhpcy5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWxsUnVsZXM7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXVEZTdHlsZXNoZWV0Il0sCiAgIm1hcHBpbmdzIjogIjtBQU1PLElBQU0sVUFBVSxrQkFBZ0IsYUFBYSxZQUFZO0FBQ2hFLElBQU8sa0JBQVE7OztBQ0RSLElBQU0scUJBQXFCLENBQUMsTUFBTSxLQUFLLG9CQUFvQjtBQUNoRSxNQUFJLGNBQWMsa0JBQWtCLElBQUk7QUFBQSxjQUFvQixHQUFHO0FBRS9ELE1BQUksaUJBQWlCO0FBQ25CLG1CQUFlO0FBQUEsc0JBQTBCLGVBQWU7QUFBQSxFQUMxRDtBQUVBLGlCQUFlO0FBRWYsU0FBTztBQUNUO0FBQ0EsSUFBTyx1QkFBUTs7O0FDVlIsSUFBTSx1QkFBdUIsQ0FBQyxNQUFNLFdBQVcsV0FBVztBQUMvRCxNQUFJLGdCQUFnQixjQUFjLE9BQU8sT0FBTyxNQUFNLEVBQUUsSUFBSSxTQUFTO0FBQUEsRUFBUSxNQUFNO0FBQUE7QUFDbkYsU0FBTztBQUNUO0FBQ0EsSUFBTyxvQkFBUTs7O0FDSFIsSUFBTSxtQkFBbUIsQ0FBQyxNQUFNLFFBQVEsVUFBVSxpQkFBaUI7QUFDeEUsU0FBTztBQUFBLElBQ0wsQ0FBQyxhQUFhLElBQUksRUFBRSxHQUNsQixPQUNDLENBQUMsU0FDRCxDQUFDLFdBQ0QsQ0FBQyxlQUNGO0FBQUEsRUFFSjtBQUNGO0FBQ0EsSUFBTyxtQkFBUTs7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O0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjs7O0FDdURBLFNBQVMsZUFBZSxRQUFRLElBQUk7QUFDbEMsVUFBUSxPQUFPO0FBQUEsSUFDYixLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQ0gsYUFBTyxJQUFJLEtBQUs7QUFBQSxJQUVsQjtBQUNFLGFBQU87QUFBQSxFQUNYO0FBQ0Y7QUFFQSxJQUFPLGdCQUFROzs7QUN0S1IsSUFBTSxZQUFZLE9BQUs7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SyxVQUFVO0FBQUEsRUFDL0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFBLFNBQVMsUUFBUTtBQUVmLFlBQVEsTUFBTTtBQUFBLE1BQ1osS0FBSyxrQkFBa0I7QUFBQSxNQUN2QixLQUFLLGtCQUFrQjtBQUFBLE1BQ3ZCLEtBQUssa0JBQWtCO0FBQUEsTUFDdkIsTUFBSyxrQkFBa0IseUJBQXlCLE9BQU8sV0FBVztBQUNoRSxlQUFPLE9BQU87QUFBQSxNQUVoQixLQUFLLGtCQUFrQjtBQUNyQixlQUFPLE9BQU87QUFBQSxNQUVoQjtBQUNFLGNBQU0sSUFBSSxNQUFNLHFEQUFxRDtBQUFBLElBQ3pFO0FBQUEsRUFDRjtBQUFBLEVBRUEsaUJBQWlCO0FBQ2YsUUFBSSxLQUFLLEtBQUssaUJBQWlCO0FBQy9CLFFBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN6QixRQUFJLFFBQVEsR0FBRztBQUNmLFFBQUksV0FBVyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQUcsV0FBVyxTQUFTLEtBQUs7QUFBQSxFQUM5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0EsVUFBVTtBQUNSLFFBQUksS0FBSyxLQUFLLGlCQUFpQjtBQUMvQixRQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFFekIsVUFBTSxhQUFhLFFBQVEsVUFBVTtBQUVyQyxRQUFJLE1BQU0sS0FBSztBQUdmLFFBQUksV0FBVyxLQUFLLE1BQU0sSUFBSSxVQUFRO0FBQ3BDLFlBQU0sRUFBRSxVQUFVLGFBQWEsSUFBSTtBQUVuQyxtQkFBYSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTTtBQUNqQyxZQUFJLGFBQWEsR0FBRyxHQUFHLEtBQUssS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLGdCQUFnQixFQUFFO0FBQ25FLFlBQUlDLFNBQVEsR0FBRyxRQUFRLE1BQU0sVUFBVTtBQUN2QyxXQUFHLFdBQVdBLFFBQU8sR0FBRyxTQUFTLE1BQU07QUFDdkMsZUFBT0E7QUFBQSxNQUNULENBQUM7QUFFRCxhQUFPO0FBQUEsUUFDTCxDQUFDLFFBQVEsR0FBRztBQUFBLE1BQ2Q7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLENBQUMsS0FBSyxhQUFhLEdBQUc7QUFDeEIsV0FBSyxTQUFTLEtBQUssWUFBWSxLQUFLO0FBQUEsSUFDdEM7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVGO0FBRUEsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsibWluIiwgIm1heCIsICJtaW4iLCAibWF4IiwgInBhdGgiLCAiYSIsICJiIiwgImVsZW1lbnQiLCAiZG9jdW1lbnQiLCAic3R5bGUiXQp9Cg==