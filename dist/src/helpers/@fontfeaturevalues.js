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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/WTFCss/src/helpers/@fontfeaturevalues.js
var fontfeaturevalues_exports = {};
__export(fontfeaturevalues_exports, {
  default: () => fontfeaturevalues_default,
  defineFontFeatureValues: () => defineFontFeatureValues
});
module.exports = __toCommonJS(fontfeaturevalues_exports);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udGZlYXR1cmV2YWx1ZXMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBmb250IGZlYXR1cmUgdmFsdWVzIGZvciBhIGdpdmVuIGZvbnQgZmFtaWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IGZhbWlseU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZVZhbHVlcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmZWF0dXJlIHRhZ3MgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1mZWF0dXJlLXZhbHVlcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udEZlYXR1cmVWYWx1ZXMgPSAoZmFtaWx5TmFtZSwgZmVhdHVyZVZhbHVlcykgPT4ge1xuICBjb25zdCBmZWF0dXJlQmxvY2tzID0gT2JqZWN0LmVudHJpZXMoZmVhdHVyZVZhbHVlcykubWFwKChbZmVhdHVyZSwgdmFsdWVzXSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlU3RyaW5nID0gQXJyYXkuaXNBcnJheSh2YWx1ZXMpID8gdmFsdWVzLmpvaW4oJyAnKSA6IHZhbHVlcztcbiAgICByZXR1cm4gYEAke2ZlYXR1cmV9IHsgJHtmYW1pbHlOYW1lfTogJHt2YWx1ZVN0cmluZ307IH1gO1xuICB9KS5qb2luKCdcXG4nKTtcbiAgcmV0dXJuIGBAZm9udC1mZWF0dXJlLXZhbHVlcyAke2ZhbWlseU5hbWV9IHtcXG4ke2ZlYXR1cmVCbG9ja3N9XFxufWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRm9udEZlYXR1cmVWYWx1ZXMiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLElBQU0sMEJBQTBCLENBQUMsWUFBWSxrQkFBa0I7QUFDcEUsUUFBTSxnQkFBZ0IsT0FBTyxRQUFRLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLE1BQU0sTUFBTTtBQUM3RSxVQUFNLGNBQWMsTUFBTSxRQUFRLE1BQU0sSUFBSSxPQUFPLEtBQUssR0FBRyxJQUFJO0FBQy9ELFdBQU8sSUFBSSxPQUFPLE1BQU0sVUFBVSxLQUFLLFdBQVc7QUFBQSxFQUNwRCxDQUFDLEVBQUUsS0FBSyxJQUFJO0FBQ1osU0FBTyx3QkFBd0IsVUFBVTtBQUFBLEVBQU8sYUFBYTtBQUFBO0FBQy9EO0FBQ0EsSUFBTyw0QkFBUTsiLAogICJuYW1lcyI6IFtdCn0K