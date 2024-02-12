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

// src/WTFCss/src/helpers/@container.js
var container_exports = {};
__export(container_exports, {
  applyContainerStyles: () => applyContainerStyles,
  default: () => container_default
});
module.exports = __toCommonJS(container_exports);
var applyContainerStyles = (name, condition, styles) => {
  let containerRule = `@container ${name ? name + " " : ""}(${condition}) {
${styles}
}`;
  return containerRule;
};
var container_default = applyContainerStyles;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY29udGFpbmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEFwcGxpZXMgc3R5bGVzIHRvIGEgY29udGFpbm1lbnQgY29udGV4dCBiYXNlZCBvbiBhIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG9wdGlvbmFsIG5hbWUgb2YgdGhlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25kaXRpb24gLSBUaGUgY29udGFpbmVyIHF1ZXJ5IGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZXMgLSBUaGUgQ1NTIHN0eWxlcyB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAY29udGFpbmVyIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseUNvbnRhaW5lclN0eWxlcyA9IChuYW1lLCBjb25kaXRpb24sIHN0eWxlcykgPT4ge1xuICBsZXQgY29udGFpbmVyUnVsZSA9IGBAY29udGFpbmVyICR7bmFtZSA/IG5hbWUgKyAnICcgOiAnJ30oJHtjb25kaXRpb259KSB7XFxuJHtzdHlsZXN9XFxufWA7XG4gIHJldHVybiBjb250YWluZXJSdWxlO1xufVxuZXhwb3J0IGRlZmF1bHQgYXBwbHlDb250YWluZXJTdHlsZXMiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9PLElBQU0sdUJBQXVCLENBQUMsTUFBTSxXQUFXLFdBQVc7QUFDL0QsTUFBSSxnQkFBZ0IsY0FBYyxPQUFPLE9BQU8sTUFBTSxFQUFFLElBQUksU0FBUztBQUFBLEVBQVEsTUFBTTtBQUFBO0FBQ25GLFNBQU87QUFDVDtBQUNBLElBQU8sb0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==