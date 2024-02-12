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

// src/WTFCss/src/helpers/@import.js
var import_exports = {};
__export(import_exports, {
  default: () => import_default,
  defineImport: () => defineImport
});
module.exports = __toCommonJS(import_exports);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AaW1wb3J0LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENyZWF0ZXMgYW4gQGltcG9ydCBydWxlIHdpdGggb3B0aW9uYWwgY29uZGl0aW9ucyBhbmQgbGF5ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW1wb3J0UGF0aCAtIFRoZSBVUkwgb2YgdGhlIGZpbGUgdG8gYmUgaW1wb3J0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lZGlhUXVlcmllc10gLSBUaGUgbWVkaWEgcXVlcnkgY29uZGl0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3VwcG9ydHNDb25kaXRpb25dIC0gVGhlIHN1cHBvcnRzIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbbGF5ZXJOYW1lXSAtIFRoZSBuYW1lIG9mIHRoZSBsYXllci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGNvbXBsZXRlIEBpbXBvcnQgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUltcG9ydCA9IChpbXBvcnRQYXRoLCBtZWRpYVF1ZXJpZXMgPSAnJywgc3VwcG9ydHNDb25kaXRpb24gPSAnJywgbGF5ZXJOYW1lID0gJycpID0+IHtcbiAgbGV0IGltcG9ydFJ1bGUgPSBgQGltcG9ydCB1cmwoJHtpbXBvcnRQYXRofSlgO1xuXG4gIGlmIChsYXllck5hbWUpIHtcbiAgICBpbXBvcnRSdWxlICs9IGAgbGF5ZXIoJHtsYXllck5hbWV9KWA7XG4gIH1cblxuICBpZiAoc3VwcG9ydHNDb25kaXRpb24pIHtcbiAgICBpbXBvcnRSdWxlICs9IGAgc3VwcG9ydHMoJHtzdXBwb3J0c0NvbmRpdGlvbn0pYDtcbiAgfVxuXG4gIGlmIChtZWRpYVF1ZXJpZXMpIHtcbiAgICBpbXBvcnRSdWxlICs9IGAgJHttZWRpYVF1ZXJpZXN9YDtcbiAgfVxuXG4gIGltcG9ydFJ1bGUgKz0gJzsnO1xuXG4gIHJldHVybiBpbXBvcnRSdWxlO1xufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lSW1wb3J0Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRTyxJQUFNLGVBQWUsQ0FBQyxZQUFZLGVBQWUsSUFBSSxvQkFBb0IsSUFBSSxZQUFZLE9BQU87QUFDckcsTUFBSSxhQUFhLGVBQWUsVUFBVTtBQUUxQyxNQUFJLFdBQVc7QUFDYixrQkFBYyxVQUFVLFNBQVM7QUFBQSxFQUNuQztBQUVBLE1BQUksbUJBQW1CO0FBQ3JCLGtCQUFjLGFBQWEsaUJBQWlCO0FBQUEsRUFDOUM7QUFFQSxNQUFJLGNBQWM7QUFDaEIsa0JBQWMsSUFBSSxZQUFZO0FBQUEsRUFDaEM7QUFFQSxnQkFBYztBQUVkLFNBQU87QUFDVDtBQUNBLElBQU8saUJBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==