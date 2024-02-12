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
export {
  abs_default as abs,
  acos_default as acos,
  asin_default as asin,
  atan_default as atan,
  atan2_default as atan2,
  attr_default as attr,
  calc_default as calc,
  clamp_default as clamp,
  cos_default as cos,
  counter_default as counter,
  counters_default as counters,
  crossfade_default as crossfade,
  var_default as cssVar,
  functions_default as default,
  element_default as element,
  env_default as env,
  exp_default as exp,
  fitcontent_default as fitcontent,
  hypot_default as hypot,
  log_default as log,
  max_default as max,
  min_default as min,
  minmax_default as minmax,
  mod_default as mod,
  path_default as path,
  pow_default as pow,
  ray_default as ray,
  rem_default as rem,
  repeat_default as repeat,
  round_default as round,
  sign_default as sign,
  sin_default as sin,
  sqrt_default as sqrt,
  symbols_default as symbols,
  tan_default as tan,
  url_default as url
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Ficy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYWNvcy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXNpbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXRhbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvYXRhbjIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2F0dHIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NhbGMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NsYW1wLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jb3MuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXJzLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jcm9zc2ZhZGUuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2VsZW1lbnQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Vudi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvZXhwLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9maXRjb250ZW50LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9oeXBvdC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbG9nLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9tYXguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL21pbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbWlubWF4LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9tb2QuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3BhdGguanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Bvdy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcmF5LmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9yZW0uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JlcGVhdC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvcm91bmQuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3NpZ24uanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Npbi5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvc3FydC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvc3ltYm9scy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvdGFuLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy91cmwuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Zhci5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYWJzb2x1dGUgdmFsdWUgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYWJzID0gcGF5bG9hZCA9PiB7XG4gIHJldHVybiBgYWJzKCR7cGF5bG9hZH0pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzOyIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYXJjY29zaW5lIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhcmNjb3NpbmUgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYWNvcyA9IHBheWxvYWQgPT4gYGFjb3MoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhY29zIiwgIi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhcmNzaW5lIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBwYXlsb2FkIC0gVGhlIHZhbHVlIHRvIGJlIHByb2Nlc3NlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBhcmNzaW5lIGV4cHJlc3Npb24gZm9yIENTUy5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzaW4gPSBwYXlsb2FkID0+IGBhc2luKCR7cGF5bG9hZH0pYFxuZXhwb3J0IGRlZmF1bHQgYXNpbiIsICIvKipcbiAqIENhbGN1bGF0ZSB0aGUgYXJjdGFuZ2VudCB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZSB0byBiZSBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYXJjdGFuZ2VudCBleHByZXNzaW9uIGZvciBDU1MuXG4gKi9cbmV4cG9ydCBjb25zdCBhdGFuID0gcGF5bG9hZCA9PiBgYXRhbigke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGF0YW4iLCAiLyoqXG4gKiBDYWxjdWxhdGUgdGhlIGFyY3RhbmdlbnQgb2YgdHdvIHZhcmlhYmxlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gcGF5bG9hZCAtIFRoZSB2YWx1ZXMgdG8gYmUgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFyY3RhbmdlbnQgZXhwcmVzc2lvbiBmb3IgQ1NTLlxuICovXG5leHBvcnQgY29uc3QgYXRhbjIgPSBwYXlsb2FkID0+IGBhdGFuMigke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGF0YW4yIiwgIi8qKlxuICogUmV0cmlldmUgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBmcm9tIGEgQ1NTIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBUaGUgYXR0cmlidXRlIHRvIHJldHJpZXZlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBmdW5jdGlvbiB0byByZXRyaWV2ZSB0aGUgYXR0cmlidXRlIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgYXR0ciA9IHBheWxvYWQgPT4gYGF0dHIoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBhdHRyIiwgIi8qKlxuICogQ2FsY3VsYXRlIGEgQ1NTIGNhbGMoKSBleHByZXNzaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBUaGUgZXhwcmVzc2lvbiB0byBiZSBjYWxjdWxhdGVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNhbGN1bGF0ZWQgQ1NTIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBjb25zdCBjYWxjID0gcGF5bG9hZCA9PiBgY2FsYygke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGNhbGMiLCAiLyoqXG4gKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBhbmQgYSBtYXhpbXVtLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBtaW4gLSBUaGUgbWluaW11bSB2YWx1ZSBvciBDU1MgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsIC0gVGhlIGN1cnJlbnQgdmFsdWUgb3IgQ1NTIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG1heCAtIFRoZSBtYXhpbXVtIHZhbHVlIG9yIENTUyBleHByZXNzaW9uLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY2xhbXAoKSBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFtcCA9IChtaW4sIHZhbCwgbWF4KSA9PiB7XG4gIHJldHVybiBgY2xhbXAoJHttaW59LCAke3ZhbH0sICR7bWF4fSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFtcDsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgb2YgdGhlIGdpdmVuIGFuZ2xlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBhbmdsZSAtIFRoZSBhbmdsZSBpbiBkZWdyZWVzIG9yIHJhZGlhbnMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBmdW5jdGlvbiByZXByZXNlbnRpbmcgdGhlIGNvc2luZSBvZiB0aGUgYW5nbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBjb3MgPSBhbmdsZSA9PiBgY29zKCR7YW5nbGV9KWBcbmV4cG9ydCBkZWZhdWx0IGNvcyIsICIvKipcbiAqIEdlbmVyYXRlcyBhIENTUyBjb3VudGVyIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudGVyTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb3VudGVyLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb3VudGVyU3R5bGU9J2RlY2ltYWwnXSAtIFRoZSBzdHlsZSBvZiB0aGUgY291bnRlci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGNvdW50ZXIgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBjb3VudGVyID0gKGNvdW50ZXJOYW1lLCBjb3VudGVyU3R5bGUgPSAnZGVjaW1hbCcpID0+IHtcbiAgaWYgKHR5cGVvZiBjb3VudGVyTmFtZSAhPT0gJ3N0cmluZycgfHwgY291bnRlck5hbWUuc3RhcnRzV2l0aCgnLS0nKSB8fCBbJ25vbmUnLCAndW5zZXQnLCAnaW5pdGlhbCcsICdpbmhlcml0J10uaW5jbHVkZXMoY291bnRlck5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgbmFtZS4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY291bnRlclN0eWxlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIHN0eWxlLicpO1xuICB9XG5cbiAgcmV0dXJuIGBjb3VudGVyKCR7Y291bnRlck5hbWV9JHtjb3VudGVyU3R5bGUgIT09ICdkZWNpbWFsJyA/ICcsICcgKyBjb3VudGVyU3R5bGUgOiAnJ30pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY291bnRlcjsiLCAiLyoqXG4gKiBDb25zdHJ1Y3RzIGEgQ1NTIGNvdW50ZXJzIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudGVyTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb3VudGVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIFRoZSBzdHJpbmcgdG8gYmUgY29uY2F0ZW5hdGVkIHdpdGggdGhlIGNvdW50ZXIgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvdW50ZXJTdHlsZT0nZGVjaW1hbCddIC0gVGhlIHN0eWxlIG9mIHRoZSBjb3VudGVyLCBkZWZhdWx0IGlzICdkZWNpbWFsJy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY291bnRlciBuYW1lLCBzdHJpbmcsIG9yIGNvdW50ZXIgc3R5bGUgaXMgaW52YWxpZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGNvdW50ZXJzIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvdW50ZXJzID0gKGNvdW50ZXJOYW1lLCBzdHJpbmcsIGNvdW50ZXJTdHlsZSA9ICdkZWNpbWFsJykgPT4ge1xuICBpZiAodHlwZW9mIGNvdW50ZXJOYW1lICE9PSAnc3RyaW5nJyB8fCBjb3VudGVyTmFtZS5zdGFydHNXaXRoKCctLScpIHx8IFsnbm9uZScsICd1bnNldCcsICdpbml0aWFsJywgJ2luaGVyaXQnXS5pbmNsdWRlcyhjb3VudGVyTmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBuYW1lLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZyBmb3IgY29uY2F0ZW5hdGlvbi4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY291bnRlclN0eWxlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIHN0eWxlLicpO1xuICB9XG5cbiAgcmV0dXJuIGBjb3VudGVycygke2NvdW50ZXJOYW1lfSwgXCIke3N0cmluZ31cIiR7Y291bnRlclN0eWxlICE9PSAnZGVjaW1hbCcgPyAnLCAnICsgY291bnRlclN0eWxlIDogJyd9KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50ZXJzOyIsICJleHBvcnQgY29uc3QgY3Jvc3NGYWRlID0gKC4uLmltYWdlcykgPT4ge1xuICAvKipcbiAgICogQmxlbmRzIGltYWdlcyB1c2luZyB0aGUgY3Jvc3MtZmFkZSBlZmZlY3QuXG4gICAqIEBwYXJhbSB7Li4uaW1hZ2VzfSBpbWFnZXMgLSBBbiBhcnJheSBvZiBpbWFnZSBVUkxzIG9yIHR1cGxlcyBvZiBpbWFnZSBVUkwgYW5kIHBlcmNlbnRhZ2UuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgQ1NTIGZ1bmN0aW9uIHJlcHJlc2VudGluZyB0aGUgY3Jvc3MtZmFkZSBvZiB0aGUgcHJvdmlkZWQgaW1hZ2VzLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgbGVzcyB0aGFuIHR3byB2YWxpZCBpbWFnZXMgYXJlIHByb3ZpZGVkLlxuICAgKi9cbiAgY29uc3QgdmFsaWRJbWFnZXMgPSBpbWFnZXMuZmlsdGVyKGltYWdlID0+IHtcbiAgICBpZiAodHlwZW9mIGltYWdlID09PSAnc3RyaW5nJyAmJiBpbWFnZS5zdGFydHNXaXRoKCd1cmwoJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBbaW1nLCBwZXJjZW50YWdlXSA9IGltYWdlO1xuICAgIHJldHVybiB0eXBlb2YgaW1nID09PSAnc3RyaW5nJyAmJiBpbWcuc3RhcnRzV2l0aCgndXJsKCcpICYmXG4gICAgICB0eXBlb2YgcGVyY2VudGFnZSA9PT0gJ251bWJlcicgJiYgcGVyY2VudGFnZSA+PSAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwO1xuICB9KTtcblxuICBpZiAodmFsaWRJbWFnZXMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcignY3Jvc3NGYWRlIGZ1bmN0aW9uIHJlcXVpcmVzIGF0IGxlYXN0IHR3byBpbWFnZXMuJyk7XG4gIH1cblxuICBjb25zdCBjcm9zc0ZhZGVJbWFnZXMgPSB2YWxpZEltYWdlcy5tYXAoaW1hZ2UgPT4ge1xuICAgIGlmICh0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gaW1hZ2U7XG4gICAgfVxuICAgIGNvbnN0IFtpbWcsIHBlcmNlbnRhZ2VdID0gaW1hZ2U7XG4gICAgcmV0dXJuIGAke2ltZ30gJHtwZXJjZW50YWdlfSVgO1xuICB9KS5qb2luKCcsICcpO1xuXG4gIHJldHVybiBgY3Jvc3MtZmFkZSgke2Nyb3NzRmFkZUltYWdlc30pYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyb3NzRmFkZSIsICIvKipcbiAqIFJldHJpZXZlcyBhIENTUyBpbWFnZSB2YWx1ZSBmb3IgYSBnaXZlbiBlbGVtZW50IElELlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIElEIG9mIHRoZSBlbGVtZW50LCBtdXN0IHN0YXJ0IHdpdGggJyMnLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBJRCBpcyBub3QgYSBzdHJpbmcgb3IgZG9lc24ndCBzdGFydCB3aXRoICcjJy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgaW1hZ2UgdmFsdWUgZm9yIHRoZSBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3QgZWxlbWVudCA9IChpZCkgPT4ge1xuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCAhaWQuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIElEIGZvciBlbGVtZW50IGZ1bmN0aW9uLiBJRCBtdXN0IGJlIGEgc3RyaW5nIHN0YXJ0aW5nIHdpdGggXCIjXCIuJyk7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgZnVuY3Rpb24gaXMgc3VwcG9ydGVkXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQubW96U2V0SW1hZ2VFbGVtZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS53YXJuKCdUaGUgZWxlbWVudCgpIGZ1bmN0aW9uIGlzIGV4cGVyaW1lbnRhbCBhbmQgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuJyk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIENTUyBpbWFnZSB2YWx1ZVxuICByZXR1cm4gYC1tb3otZWxlbWVudCgke2lkfSlgO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWxlbWVudDsiLCAiLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGUgdmFsdWUsIHdpdGggYW4gb3B0aW9uYWwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFyaWFibGUgLSBUaGUgbmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZhbGxiYWNrXSAtIFRoZSBmYWxsYmFjayB2YWx1ZSBpZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgZW52KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZW52ID0gKHZhcmlhYmxlLCBmYWxsYmFjaykgPT4ge1xuICBjb25zdCBlbnZWYXIgPSBgZW52KCR7dmFyaWFibGV9JHtmYWxsYmFjayA/IGAsICR7ZmFsbGJhY2t9YCA6ICcnfSlgO1xuICByZXR1cm4gZW52VmFyO1xufTtcblxuLy8gUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gcmV0cmlldmUgZW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBDU1Ncbi8qKlxuICogUmVwcmVzZW50cyBzYWZlIGFyZWEgaW5zZXRzIGZvciBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgY29uc3Qgc2FmZUFyZWFJbnNldHMgPSB7XG4gIHRvcDogKGZhbGxiYWNrKSA9PiBlbnYoJ3NhZmUtYXJlYS1pbnNldC10b3AnLCBmYWxsYmFjayksXG4gIHJpZ2h0OiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LXJpZ2h0JywgZmFsbGJhY2spLFxuICBib3R0b206IChmYWxsYmFjaykgPT4gZW52KCdzYWZlLWFyZWEtaW5zZXQtYm90dG9tJywgZmFsbGJhY2spLFxuICBsZWZ0OiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LWxlZnQnLCBmYWxsYmFjaylcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aXRsZSBiYXIgYXJlYSBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHRpdGxlYmFyQXJlYSA9IHtcbiAgeDogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEteCcsIGZhbGxiYWNrKSxcbiAgeTogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEteScsIGZhbGxiYWNrKSxcbiAgd2lkdGg6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLXdpZHRoJywgZmFsbGJhY2spLFxuICBoZWlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLWhlaWdodCcsIGZhbGxiYWNrKVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGtleWJvYXJkIGluc2V0cyBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGtleWJvYXJkSW5zZXQgPSB7XG4gIHRvcDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LXRvcCcsIGZhbGxiYWNrKSxcbiAgcmlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC1yaWdodCcsIGZhbGxiYWNrKSxcbiAgYm90dG9tOiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtYm90dG9tJywgZmFsbGJhY2spLFxuICBsZWZ0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtbGVmdCcsIGZhbGxiYWNrKSxcbiAgd2lkdGg6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC13aWR0aCcsIGZhbGxiYWNrKSxcbiAgaGVpZ2h0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtaGVpZ2h0JywgZmFsbGJhY2spXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVudixcbiAgc2FmZUFyZWFJbnNldHMsXG4gIHRpdGxlYmFyQXJlYSxcbiAga2V5Ym9hcmRJbnNldFxufSIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV4cG9uZW50aWFsIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSBleHBvbmVudCB0byByYWlzZSBlIHRvLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBleHBvbmVudGlhbCBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBleHAgPSB2YWx1ZSA9PiBgZXhwKCR7dmFsdWV9KWBcblxuZXhwb3J0IGRlZmF1bHQgZXhwIiwgIi8qKlxuICogQWRqdXN0cyB0aGUgY29udGVudCBzaXplIHRvIGZpdCB0aGUgZ2l2ZW4gc2l6ZSBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2l6ZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyBhIGxlbmd0aCBvciBhIHBlcmNlbnRhZ2UuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBzaXplIGlzIG5vdCBhIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgZml0LWNvbnRlbnQgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZml0Q29udGVudCA9IChzaXplKSA9PiB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTaXplIG11c3QgYmUgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgbGVuZ3RoIG9yIGEgcGVyY2VudGFnZS4nKTtcbiAgfVxuICByZXR1cm4gYGZpdC1jb250ZW50KCR7c2l6ZX0pYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZpdENvbnRlbnQiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBoeXBvdGVudXNlIG9yIEV1Y2xpZGVhbiBub3JtLlxuICogQHBhcmFtIHsuLi5hcmdzfSBudW1iZXJzIC0gQSBzZXQgb2YgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIHNpZGVzIG9mIGEgcmlnaHQtYW5nbGVkIHRyaWFuZ2xlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBoeXBvdCBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBoeXBvdCA9ICguLi5hcmdzKSA9PiBgaHlwb3QoJHthcmdzLmpvaW4oJywgJyl9KWBcbmV4cG9ydCBkZWZhdWx0IGh5cG90IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbG9nYXJpdGhtIG9mIGEgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2FsY3VsYXRlIHRoZSBsb2dhcml0aG0gZm9yLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBsb2coKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBsb2cgPSB2YWx1ZSA9PiBgbG9nKCR7dmFsdWV9KWBcbmV4cG9ydCBkZWZhdWx0IGxvZyIsICIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1heGltdW0gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICogQHBhcmFtIHsuLi5hcmdzfSBhcmdzIC0gQSBzZXQgb2YgbnVtZXJpYyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1heCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1heCA9ICguLi5hcmdzKSA9PiBgbWF4KCR7YXJncy5qb2luKCcsICcpfSlgXG5leHBvcnQgZGVmYXVsdCBtYXgiLCAiXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1pbmltdW0gdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICogQHBhcmFtIHsuLi5hcmdzfSAtIEEgc2V0IG9mIG51bWVyaWMgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBtaW4oKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW4gPSAoLi4uYXJncykgPT4gYG1pbigke2FyZ3Muam9pbignLCAnKX0pYFxuZXhwb3J0IGRlZmF1bHQgbWluIiwgIi8qKlxuICogRGVmaW5lcyBhIENTUyBtaW5tYXggZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWluIC0gVGhlIG1pbmltdW0gdmFsdWUgYXMgYSBDU1MgdW5pdCBvciBrZXl3b3JkLlxuICogQHBhcmFtIHtzdHJpbmd9IG1heCAtIFRoZSBtYXhpbXVtIHZhbHVlIGFzIGEgQ1NTIHVuaXQgb3Iga2V5d29yZC5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgbWluIG9yIG1heCBhcmUgbm90IG9mIHR5cGUgc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBtaW5tYXgoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5tYXggPSAobWluLCBtYXgpID0+IHtcbiAgaWYgKHR5cGVvZiBtaW4gIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBtYXggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFyYW1ldGVycyBtaW4gYW5kIG1heCBtdXN0IGJlIHN0cmluZ3MuJyk7XG4gIH1cblxuICAvLyBJZiBtYXggaXMgbGVzcyB0aGFuIG1pbiwgdHJlYXQgbWlubWF4IGFzIG1pblxuICAvLyBpZiAocGFyc2VGbG9hdChtYXgpIDwgcGFyc2VGbG9hdChtaW4pKSB7XG4gIC8vICAgcmV0dXJuIG1pbjtcbiAgLy8gfVxuXG4gIHJldHVybiBgbWlubWF4KCR7bWlufSwgJHttYXh9KWA7XG59XG5leHBvcnQgZGVmYXVsdCBtaW5tYXg7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbW9kdWx1cyBvZiB0d28gbnVtYmVycy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhIC0gVGhlIGRpdmlkZW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IGIgLSBUaGUgZGl2aXNvci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbW9kKCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kID0gKGEsIGIpID0+IGBtb2QoJHthfSwgJHtifSlgO1xuZXhwb3J0IGRlZmF1bHQgbW9kOyIsICIvKipcbiAqIENyZWF0ZXMgYSBDU1MgcGF0aCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IGZpbGxSdWxlIC0gVGhlIGZpbGwtcnVsZSB0byBhcHBseSB0byB0aGUgcGF0aCwgb3IgbnVsbCBpZiBub3QgYXBwbGljYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdmdQYXRoIC0gVGhlIFNWRyBwYXRoIGRhdGEuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIHBhdGgoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoID0gKGZpbGxSdWxlLCBzdmdQYXRoKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3ZnUGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc3ZnUGF0aCBwYXJhbWV0ZXIgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIGlmIChmaWxsUnVsZSAmJiB0eXBlb2YgZmlsbFJ1bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGZpbGxSdWxlIHBhcmFtZXRlciBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgY29uc3QgdmFsaWRGaWxsUnVsZXMgPSBbJ25vbnplcm8nLCAnZXZlbm9kZCddO1xuICBpZiAoZmlsbFJ1bGUgJiYgIXZhbGlkRmlsbFJ1bGVzLmluY2x1ZGVzKGZpbGxSdWxlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZpbGxSdWxlIHBhcmFtZXRlciBtdXN0IGJlIGVpdGhlciBcIm5vbnplcm9cIiBvciBcImV2ZW5vZGRcIi4nKTtcbiAgfVxuXG4gIHJldHVybiBgcGF0aCgke2ZpbGxSdWxlID8gYCR7ZmlsbFJ1bGV9LCBgIDogJyd9XCIke3N2Z1BhdGh9XCIpYDtcbn1cbmV4cG9ydCBkZWZhdWx0IHBhdGg7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgcG93ZXIgb2YgYSBiYXNlIG51bWJlciByYWlzZWQgdG8gYW4gZXhwb25lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gYSAtIFRoZSBiYXNlIG51bWJlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gVGhlIGV4cG9uZW50LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyBwb3coKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBwb3cgPSAoYSwgYikgPT4gYHBvdygke2F9LCAke2J9KWA7XG5leHBvcnQgZGVmYXVsdCBwb3c7IiwgIi8qKlxuICogQ3JlYXRlcyBhIENTUyByYXkoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgLSBUaGUgYW5nbGUgb2YgdGhlIHJheSBpbiBkZWdyZWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IFtzaXplPSdjbG9zZXN0LXNpZGUnXSAtIFRoZSBzaXplIGtleXdvcmQgZm9yIHRoZSByYXkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjb250YWluPWZhbHNlXSAtIFdoZXRoZXIgdGhlIHJheSBzaG91bGQgY29udGFpbiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcG9zaXRpb249JyddIC0gVGhlIHBvc2l0aW9uIG9mIHRoZSByYXkgd2l0aGluIHRoZSBlbGVtZW50LlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIENTUyByYXkoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCByYXkgPSAoYW5nbGUsIHNpemUgPSAnY2xvc2VzdC1zaWRlJywgY29udGFpbiA9IGZhbHNlLCBwb3NpdGlvbiA9ICcnKSA9PiB7XG4gIGlmICh0eXBlb2YgYW5nbGUgIT09ICdudW1iZXInIHx8IGFuZ2xlIDwgMCB8fCBhbmdsZSA+PSAzNjApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYW5nbGUgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDM1OS4nKTtcbiAgfVxuXG4gIGNvbnN0IHNpemVLZXl3b3JkcyA9IFsnY2xvc2VzdC1zaWRlJywgJ2Nsb3Nlc3QtY29ybmVyJywgJ2ZhcnRoZXN0LXNpZGUnLCAnZmFydGhlc3QtY29ybmVyJywgJ3NpZGVzJ107XG4gIGlmICghc2l6ZUtleXdvcmRzLmluY2x1ZGVzKHNpemUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHNpemUgbXVzdCBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyB2YWx1ZXM6ICcgKyBzaXplS2V5d29yZHMuam9pbignLCAnKSArICcuJyk7XG4gIH1cblxuICBjb25zdCBwb3NpdGlvblJlZ2V4ID0gL14obGVmdHxjZW50ZXJ8cmlnaHR8dG9wfGJvdHRvbXwoXFxkKyhcXC5cXGQrKT8ocHh8JSk/KSkkLztcbiAgaWYgKHBvc2l0aW9uICYmICFwb3NpdGlvblJlZ2V4LnRlc3QocG9zaXRpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHBvc2l0aW9uIG11c3QgYmUgYSB2YWxpZCBDU1MgcG9zaXRpb24gdmFsdWUuJyk7XG4gIH1cblxuICBsZXQgcmF5U3RyaW5nID0gYHJheSgke2FuZ2xlfWRlZ2A7XG5cbiAgaWYgKHNpemUgIT09ICdjbG9zZXN0LXNpZGUnKSB7XG4gICAgcmF5U3RyaW5nICs9IGAgJHtzaXplfWA7XG4gIH1cblxuICBpZiAoY29udGFpbikge1xuICAgIHJheVN0cmluZyArPSAnIGNvbnRhaW4nO1xuICB9XG5cbiAgaWYgKHBvc2l0aW9uKSB7XG4gICAgcmF5U3RyaW5nICs9IGAgYXQgJHtwb3NpdGlvbn1gO1xuICB9XG5cbiAgcmF5U3RyaW5nICs9ICcpJztcblxuICByZXR1cm4gYG9mZnNldC1wYXRoOiAke3JheVN0cmluZ307YDtcbn1cbmV4cG9ydCBkZWZhdWx0IHJheTsiLCAiLyoqXG4gKiBDb252ZXJ0cyBhIHBpeGVsIHZhbHVlIHRvIHJlbSB1bml0cyBiYXNlZCBvbiBhIHJvb3QgZm9udCBzaXplLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHBpeGVsIHZhbHVlIHRvIGNvbnZlcnQgdG8gcmVtLlxuICogQHBhcmFtIHtudW1iZXJ9IFtyb290VmFsdWU9MTZdIC0gVGhlIHJvb3QgZm9udCBzaXplIGluIHBpeGVscy4gRGVmYXVsdCBpcyAxNi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIGluIHJlbSB1bml0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbSA9ICh2YWx1ZSwgcm9vdFZhbHVlID0gMTYpID0+IGByZW0oJHt2YWx1ZX0sICR7cm9vdFZhbHVlfSlgO1xuZXhwb3J0IGRlZmF1bHQgcmVtOyIsICIvKipcbiAqIEdlbmVyYXRlcyBhIENTUyByZXBlYXQoKSBmdW5jdGlvbiBzdHJpbmcuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGNvdW50IC0gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHRyYWNrcyBvciBvbmUgb2YgdGhlIGtleXdvcmRzOiAnYXV0by1maWxsJywgJ2F1dG8tZml0Jy5cbiAqIEBwYXJhbSB7Li4uc3RyaW5nfGFycmF5fSB0cmFja3MgLSBUaGUgdHJhY2sgc2l6ZXMgYW5kL29yIG5hbWVzIHRvIGJlIHJlcGVhdGVkLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByZXBlYXQoKSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlcGVhdCA9IChjb3VudCwgLi4udHJhY2tzKSA9PiB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb3VudCkgJiYgY291bnQgIT09ICdhdXRvLWZpbGwnICYmIGNvdW50ICE9PSAnYXV0by1maXQnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHJlcGVhdCBjb3VudCBtdXN0IGJlIGFuIGludGVnZXIgb3Igb25lIG9mIHRoZSBrZXl3b3JkczogYXV0by1maWxsLCBhdXRvLWZpdC4nKTtcbiAgfVxuXG4gIGNvbnN0IHRyYWNrTGlzdCA9IHRyYWNrcy5tYXAodHJhY2sgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRyYWNrKSkge1xuICAgICAgcmV0dXJuIGBbJHt0cmFjay5qb2luKCcgJyl9XWA7XG4gICAgfVxuICAgIHJldHVybiB0cmFjaztcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgcmVwZWF0KCR7Y291bnR9LCAke3RyYWNrTGlzdH0pYDtcbn07XG5leHBvcnQgZGVmYXVsdCByZXBlYXQ7IiwgIi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHRvIGEgc3BlY2lmaWVkIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSBudW1iZXIgdG8gcm91bmQuXG4gKiBAcGFyYW0ge251bWJlcn0gW3ByZWNpc2lvbj0wXSAtIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG8gKGRlZmF1bHQgaXMgMCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJvdW5kZWQgbnVtYmVyLlxuICovXG5leHBvcnQgY29uc3Qgcm91bmQgPSAodmFsdWUsIHByZWNpc2lvbiA9IDApID0+IGByb3VuZCgke3ZhbHVlfSwgJHtwcmVjaXNpb259KWA7XG5leHBvcnQgZGVmYXVsdCByb3VuZDsiLCAiXG4vKipcbiAqIFJldHVybnMgdGhlIENTUyBzaWduIGZ1bmN0aW9uIGZvciBhIGdpdmVuIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSB1c2VkIGluIHRoZSBzaWduIGZ1bmN0aW9uLlxuICogQHJldHVybnMge3N0cmluZ30gLSBBIENTUyB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzaWduIG9mIHRoZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpZ24gPSAodmFsdWUpID0+IGBzaWduKCR7dmFsdWV9KWBcbmV4cG9ydCBkZWZhdWx0IHNpZ247IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc2luZSBvZiBhIGdpdmVuIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIGFuZ2xlIGluIGRlZ3JlZXMgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgc2luZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc2luZSBvZiB0aGUgYW5nbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzaW4gPSAodmFsdWUpID0+IGBzaW4oJHt2YWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHNpbjsiLCAiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmUgcm9vdCBvZiBhIGdpdmVuIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZSAtIFRoZSB2YWx1ZSBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBzcXVhcmUgcm9vdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhlIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3Qgc3FydCA9ICh2YWx1ZSkgPT4gYHNxcnQoJHt2YWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHNxcnQ7IiwgIi8qKlxuICogQ3JlYXRlcyBhIENTUyBzeW1ib2xzIHZhbHVlIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgdGhlIHN5bWJvbHMgbGlzdDsgb25lIG9mICdjeWNsaWMnLCAnbnVtZXJpYycsICdhbHBoYWJldGljJywgJ3N5bWJvbGljJywgJ2ZpeGVkJy5cbiAqIEBwYXJhbSB7Li4udmFsdWVzfSAtIFRoZSBzeW1ib2xzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBsaXN0LCB3aGljaCBjYW4gYmUgc3RyaW5ncyBvciBJbWFnZSBpbnN0YW5jZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHN5bWJvbHMgbGlzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbHMgPSAodHlwZSwgLi4udmFsdWVzKSA9PiB7XG4gIGNvbnN0IHZhbGlkVHlwZXMgPSBbJ2N5Y2xpYycsICdudW1lcmljJywgJ2FscGhhYmV0aWMnLCAnc3ltYm9saWMnLCAnZml4ZWQnXTtcbiAgaWYgKCF2YWxpZFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN5bWJvbHMgdHlwZTogJHt0eXBlfS4gRXhwZWN0ZWQgb25lIG9mICR7dmFsaWRUeXBlcy5qb2luKCcsICcpfS5gKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gYFxcXCIke3ZhbHVlfVxcXCJgO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgICAgLy8gQXNzdW1pbmcgSW1hZ2UgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgYW4gaW1hZ2UsIGFuZCB0b1N0cmluZygpIHJldHVybnMgYSB2YWxpZCBDU1MgaW1hZ2UgdmFsdWVcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgdHlwZTogdmFsdWVzIG11c3QgYmUgc3RyaW5ncyBvciBJbWFnZSBpbnN0YW5jZXMuJyk7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYHN5bWJvbHMoJHt0eXBlfSAke2Zvcm1hdHRlZFZhbHVlc30pYDtcbn1cbmV4cG9ydCBkZWZhdWx0IHN5bWJvbHM7IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgdGFuZ2VudCBvZiBhIGdpdmVuIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlIC0gVGhlIGFuZ2xlIGluIGRlZ3JlZXMgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgdGFuZ2VudC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdGFuZ2VudCBvZiB0aGUgYW5nbGUuXG4gKi9cbmV4cG9ydCBjb25zdCB0YW4gPSAodmFsdWUpID0+IGB0YW4oJHt2YWx1ZX0pYDtcbmV4cG9ydCBkZWZhdWx0IHRhbjsiLCAiLyoqXG4gKiBGb3JtYXRzIGEgZ2l2ZW4gcGF0aCBhcyBhIENTUyBVUkwgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIGJlIGZvcm1hdHRlZCBhcyBhIFVSTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGZvcm1hdHRlZCBVUkwgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgdXJsID0gKHBhdGgpID0+IHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVVJMIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgVVJMIGlzIGEgZGF0YSBVUkwsIGFic29sdXRlIFVSTCwgb3IgYSByZWxhdGl2ZSBVUkxcbiAgY29uc3QgaXNEYXRhVXJsID0gcGF0aC5zdGFydHNXaXRoKCdkYXRhOicpO1xuICBjb25zdCBpc0Fic29sdXRlVXJsID0gL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHBhdGgpO1xuICBjb25zdCBpc1JlbGF0aXZlVXJsID0gIWlzRGF0YVVybCAmJiAhaXNBYnNvbHV0ZVVybDtcblxuICAvLyBJZiB0aGUgVVJMIGNvbnRhaW5zIHNwZWNpYWwgY2hhcmFjdGVycywgaXQgc2hvdWxkIGJlIHF1b3RlZFxuICBjb25zdCBuZWVkc1F1b3RlcyA9IC9bXFxzJ1wiKCldLy50ZXN0KHBhdGgpO1xuICBjb25zdCBxdW90ZWRQYXRoID0gbmVlZHNRdW90ZXMgPyBgXFxcIiR7cGF0aH1cXFwiYCA6IHBhdGg7XG5cbiAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgVVJMIHN0cmluZ1xuICByZXR1cm4gYHVybCgke3F1b3RlZFBhdGh9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgdXJsOyIsICIvKipcbiAqIENvbnN0cnVjdHMgYSBDU1MgdmFyaWFibGUgd2l0aCBhbiBvcHRpb25hbCBmYWxsYmFjay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIENTUyB2YXJpYWJsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmFsbGJhY2tdIC0gVGhlIG9wdGlvbmFsIGZhbGxiYWNrIHZhbHVlIGlmIHRoZSB2YXJpYWJsZSBpcyBub3QgZGVmaW5lZC5cbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgbmFtZSBpcyBub3QgYSBzdHJpbmcgb3IgaWYgdGhlIGZhbGxiYWNrIGlzIHByb3ZpZGVkIGFuZCBpcyBub3QgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBjc3NWYXIgPSAobmFtZSwgZmFsbGJhY2spID0+IHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1c3RvbSBwcm9wZXJ0eSBuYW1lIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICBpZiAoZmFsbGJhY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZmFsbGJhY2sgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmFsbGJhY2sgdmFsdWUgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIHJldHVybiBgdmFyKCR7bmFtZX0ke2ZhbGxiYWNrICE9PSB1bmRlZmluZWQgPyBgLCAke2ZhbGxiYWNrfWAgOiAnJ30pYDtcbn07XG5leHBvcnQgZGVmYXVsdCBjc3NWYXI7IiwgImltcG9ydCBhYnMgZnJvbSAnLi9hYnMuanMnO1xuaW1wb3J0IGFjb3MgZnJvbSAnLi9hY29zLmpzJztcbmltcG9ydCBhc2luIGZyb20gJy4vYXNpbi5qcyc7XG5pbXBvcnQgYXRhbiBmcm9tICcuL2F0YW4uanMnO1xuaW1wb3J0IGF0YW4yIGZyb20gJy4vYXRhbjIuanMnO1xuaW1wb3J0IGF0dHIgZnJvbSAnLi9hdHRyLmpzJztcbmltcG9ydCBjYWxjIGZyb20gJy4vY2FsYy5qcyc7XG5pbXBvcnQgY2xhbXAgZnJvbSAnLi9jbGFtcC5qcyc7XG5pbXBvcnQgY29zIGZyb20gJy4vY29zLmpzJztcbmltcG9ydCBjb3VudGVyIGZyb20gJy4vY291bnRlci5qcyc7XG5pbXBvcnQgY291bnRlcnMgZnJvbSAnLi9jb3VudGVycy5qcyc7XG5pbXBvcnQgY3Jvc3NmYWRlIGZyb20gJy4vY3Jvc3NmYWRlLmpzJztcbmltcG9ydCBlbGVtZW50IGZyb20gJy4vZWxlbWVudC5qcyc7XG5pbXBvcnQgZW52IGZyb20gJy4vZW52LmpzJztcbmltcG9ydCBleHAgZnJvbSAnLi9leHAuanMnO1xuaW1wb3J0IGZpdGNvbnRlbnQgZnJvbSAnLi9maXRjb250ZW50LmpzJztcbmltcG9ydCBoeXBvdCBmcm9tICcuL2h5cG90LmpzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnO1xuaW1wb3J0IG1heCBmcm9tICcuL21heC5qcyc7XG5pbXBvcnQgbWluIGZyb20gJy4vbWluLmpzJztcbmltcG9ydCBtaW5tYXggZnJvbSAnLi9taW5tYXguanMnO1xuaW1wb3J0IG1vZCBmcm9tICcuL21vZC5qcyc7XG5pbXBvcnQgcGF0aCBmcm9tICcuL3BhdGguanMnO1xuaW1wb3J0IHBvdyBmcm9tICcuL3Bvdy5qcyc7XG5pbXBvcnQgcmF5IGZyb20gJy4vcmF5LmpzJztcbmltcG9ydCByZW0gZnJvbSAnLi9yZW0uanMnO1xuaW1wb3J0IHJlcGVhdCBmcm9tICcuL3JlcGVhdC5qcyc7XG5pbXBvcnQgcm91bmQgZnJvbSAnLi9yb3VuZC5qcyc7XG5pbXBvcnQgc2lnbiBmcm9tICcuL3NpZ24uanMnO1xuaW1wb3J0IHNpbiBmcm9tICcuL3Npbi5qcyc7XG5pbXBvcnQgc3FydCBmcm9tICcuL3NxcnQuanMnO1xuaW1wb3J0IHN5bWJvbHMgZnJvbSAnLi9zeW1ib2xzLmpzJztcbmltcG9ydCB0YW4gZnJvbSAnLi90YW4uanMnO1xuaW1wb3J0IHVybCBmcm9tICcuL3VybC5qcyc7XG5pbXBvcnQgY3NzVmFyIGZyb20gJy4vdmFyLmpzJztcblxuZXhwb3J0IHtcbiAgYWJzLFxuICBhY29zLFxuICBhc2luLFxuICBhdGFuLFxuICBhdGFuMixcbiAgYXR0cixcbiAgY2FsYyxcbiAgY2xhbXAsXG4gIGNvcyxcbiAgY291bnRlcixcbiAgY291bnRlcnMsXG4gIGNyb3NzZmFkZSxcbiAgZWxlbWVudCxcbiAgZW52LFxuICBleHAsXG4gIGZpdGNvbnRlbnQsXG4gIGh5cG90LFxuICBsb2csXG4gIG1heCxcbiAgbWluLFxuICBtaW5tYXgsXG4gIG1vZCxcbiAgcGF0aCxcbiAgcG93LFxuICByYXksXG4gIHJlbSxcbiAgcmVwZWF0LFxuICByb3VuZCxcbiAgc2lnbixcbiAgc2luLFxuICBzcXJ0LFxuICBzeW1ib2xzLFxuICB0YW4sXG4gIHVybCxcbiAgY3NzVmFyXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWJzLFxuICBhY29zLFxuICBhc2luLFxuICBhdGFuLFxuICBhdGFuMixcbiAgYXR0cixcbiAgY2FsYyxcbiAgY2xhbXAsXG4gIGNvcyxcbiAgY291bnRlcixcbiAgY291bnRlcnMsXG4gIGNyb3NzZmFkZSxcbiAgZWxlbWVudCxcbiAgZW52LFxuICBleHAsXG4gIGZpdGNvbnRlbnQsXG4gIGh5cG90LFxuICBsb2csXG4gIG1heCxcbiAgbWluLFxuICBtaW5tYXgsXG4gIG1vZCxcbiAgcGF0aCxcbiAgcG93LFxuICByYXksXG4gIHJlbSxcbiAgcmVwZWF0LFxuICByb3VuZCxcbiAgc2lnbixcbiAgc2luLFxuICBzcXJ0LFxuICBzeW1ib2xzLFxuICB0YW4sXG4gIHVybCxcbiAgY3NzVmFyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUtPLElBQU0sTUFBTSxhQUFXO0FBQzVCLFNBQU8sT0FBTyxPQUFPO0FBQ3ZCO0FBRUEsSUFBTyxjQUFROzs7QUNKUixJQUFNLE9BQU8sYUFBVyxRQUFRLE9BQU87QUFDOUMsSUFBTyxlQUFROzs7QUNEUixJQUFNLE9BQU8sYUFBVyxRQUFRLE9BQU87QUFDOUMsSUFBTyxlQUFROzs7QUNEUixJQUFNLE9BQU8sYUFBVyxRQUFRLE9BQU87QUFDOUMsSUFBTyxlQUFROzs7QUNEUixJQUFNLFFBQVEsYUFBVyxT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