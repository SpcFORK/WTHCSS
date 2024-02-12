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

// src/WTFCss/src/helpers/@fontpalletevalues.js
var fontpalletevalues_exports = {};
__export(fontpalletevalues_exports, {
  default: () => fontpalletevalues_default,
  defineFontPaletteValues: () => defineFontPaletteValues
});
module.exports = __toCommonJS(fontpalletevalues_exports);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udHBhbGxldGV2YWx1ZXMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBmb250IHBhbGV0dGUgdmFsdWVzIGZvciBhIGdpdmVuIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIFRoZSBpZGVudGlmaWVyIGZvciB0aGUgZm9udCBwYWxldHRlIHZhbHVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmFtaWx5TmFtZV0gLSBUaGUgbmFtZSBvZiB0aGUgZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Jhc2VQYWxldHRlXSAtIFRoZSBiYXNlIHBhbGV0dGUgb2YgdGhlIGZvbnQuXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PHN0cmluZz4+fSBbb3ZlcnJpZGVDb2xvcnNdIC0gQW4gYXJyYXkgb2YgY29sb3Igb3ZlcnJpZGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1wYWxldHRlLXZhbHVlcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udFBhbGV0dGVWYWx1ZXMgPSAoaWRlbnRpZmllciwgZmFtaWx5TmFtZSwgYmFzZVBhbGV0dGUsIG92ZXJyaWRlQ29sb3JzKSA9PiB7XG4gIGNvbnN0IGRlY2xhcmF0aW9ucyA9IFtdO1xuICBpZiAoZmFtaWx5TmFtZSkgZGVjbGFyYXRpb25zLnB1c2goYGZvbnQtZmFtaWx5OiAke2ZhbWlseU5hbWV9O2ApO1xuICBpZiAoYmFzZVBhbGV0dGUpIGRlY2xhcmF0aW9ucy5wdXNoKGBiYXNlLXBhbGV0dGU6ICR7YmFzZVBhbGV0dGV9O2ApO1xuICBpZiAob3ZlcnJpZGVDb2xvcnMpIHtcbiAgICBjb25zdCBjb2xvck92ZXJyaWRlcyA9IG92ZXJyaWRlQ29sb3JzLm1hcChjb2xvciA9PiBjb2xvci5qb2luKCcgJykpLmpvaW4oJyxcXG4gICAgJyk7XG4gICAgZGVjbGFyYXRpb25zLnB1c2goYG92ZXJyaWRlLWNvbG9yczpcXG4gICAgJHtjb2xvck92ZXJyaWRlc307YCk7XG4gIH1cblxuICByZXR1cm4gYEBmb250LXBhbGV0dGUtdmFsdWVzICR7aWRlbnRpZmllcn0ge1xcbiAgJHtkZWNsYXJhdGlvbnMuam9pbignXFxuICAnKX1cXG59YDtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUZvbnRQYWxldHRlVmFsdWVzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRTyxJQUFNLDBCQUEwQixDQUFDLFlBQVksWUFBWSxhQUFhLG1CQUFtQjtBQUM5RixRQUFNLGVBQWUsQ0FBQztBQUN0QixNQUFJO0FBQVksaUJBQWEsS0FBSyxnQkFBZ0IsVUFBVSxHQUFHO0FBQy9ELE1BQUk7QUFBYSxpQkFBYSxLQUFLLGlCQUFpQixXQUFXLEdBQUc7QUFDbEUsTUFBSSxnQkFBZ0I7QUFDbEIsVUFBTSxpQkFBaUIsZUFBZSxJQUFJLFdBQVMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssU0FBUztBQUNsRixpQkFBYSxLQUFLO0FBQUEsTUFBeUIsY0FBYyxHQUFHO0FBQUEsRUFDOUQ7QUFFQSxTQUFPLHdCQUF3QixVQUFVO0FBQUEsSUFBUyxhQUFhLEtBQUssTUFBTSxDQUFDO0FBQUE7QUFDN0U7QUFDQSxJQUFPLDRCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=