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

// src/WTFCss/src/helpers/@namespace.js
var namespace_exports = {};
__export(namespace_exports, {
  default: () => namespace_default,
  defineNamespace: () => defineNamespace
});
module.exports = __toCommonJS(namespace_exports);
var defineNamespace = (prefix, uri) => {
  if (!uri) {
    throw new Error("URI for namespace is required.");
  }
  const namespacePrefix = prefix ? `${prefix} ` : "";
  return `@namespace ${namespacePrefix}url(${uri});`;
};
var namespace_default = defineNamespace;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AbmFtZXNwYWNlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMgYSBDU1MgbmFtZXNwYWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIC0gVGhlIG9wdGlvbmFsIHByZWZpeCBmb3IgdGhlIG5hbWVzcGFjZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgLSBUaGUgVVJJIG9mIHRoZSBuYW1lc3BhY2UuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIFVSSSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBuYW1lc3BhY2UgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZU5hbWVzcGFjZSA9IChwcmVmaXgsIHVyaSkgPT4ge1xuICBpZiAoIXVyaSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVVJJIGZvciBuYW1lc3BhY2UgaXMgcmVxdWlyZWQuJyk7XG4gIH1cblxuICBjb25zdCBuYW1lc3BhY2VQcmVmaXggPSBwcmVmaXggPyBgJHtwcmVmaXh9IGAgOiAnJztcbiAgcmV0dXJuIGBAbmFtZXNwYWNlICR7bmFtZXNwYWNlUHJlZml4fXVybCgke3VyaX0pO2A7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTmFtZXNwYWNlIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPTyxJQUFNLGtCQUFrQixDQUFDLFFBQVEsUUFBUTtBQUM5QyxNQUFJLENBQUMsS0FBSztBQUNSLFVBQU0sSUFBSSxNQUFNLGdDQUFnQztBQUFBLEVBQ2xEO0FBRUEsUUFBTSxrQkFBa0IsU0FBUyxHQUFHLE1BQU0sTUFBTTtBQUNoRCxTQUFPLGNBQWMsZUFBZSxPQUFPLEdBQUc7QUFDaEQ7QUFDQSxJQUFPLG9CQUFROyIsCiAgIm5hbWVzIjogW10KfQo=