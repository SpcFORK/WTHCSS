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

// src/WTFCss/src/functions/minmax.js
var minmax_exports = {};
__export(minmax_exports, {
  default: () => minmax_default,
  minmax: () => minmax
});
module.exports = __toCommonJS(minmax_exports);
var minmax = (min, max) => {
  if (typeof min !== "string" || typeof max !== "string") {
    throw new TypeError("Parameters min and max must be strings.");
  }
  return `minmax(${min}, ${max})`;
};
var minmax_default = minmax;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL21pbm1heC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIG1pbm1heCBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtaW4gLSBUaGUgbWluaW11bSB2YWx1ZSBhcyBhIENTUyB1bml0IG9yIGtleXdvcmQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWF4IC0gVGhlIG1heGltdW0gdmFsdWUgYXMgYSBDU1MgdW5pdCBvciBrZXl3b3JkLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBtaW4gb3IgbWF4IGFyZSBub3Qgb2YgdHlwZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1pbm1heCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbm1heCA9IChtaW4sIG1heCkgPT4ge1xuICBpZiAodHlwZW9mIG1pbiAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIG1heCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJhbWV0ZXJzIG1pbiBhbmQgbWF4IG11c3QgYmUgc3RyaW5ncy4nKTtcbiAgfVxuXG4gIC8vIElmIG1heCBpcyBsZXNzIHRoYW4gbWluLCB0cmVhdCBtaW5tYXggYXMgbWluXG4gIC8vIGlmIChwYXJzZUZsb2F0KG1heCkgPCBwYXJzZUZsb2F0KG1pbikpIHtcbiAgLy8gICByZXR1cm4gbWluO1xuICAvLyB9XG5cbiAgcmV0dXJuIGBtaW5tYXgoJHttaW59LCAke21heH0pYDtcbn1cbmV4cG9ydCBkZWZhdWx0IG1pbm1heDsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9PLElBQU0sU0FBUyxDQUFDLEtBQUssUUFBUTtBQUNsQyxNQUFJLE9BQU8sUUFBUSxZQUFZLE9BQU8sUUFBUSxVQUFVO0FBQ3RELFVBQU0sSUFBSSxVQUFVLHlDQUF5QztBQUFBLEVBQy9EO0FBT0EsU0FBTyxVQUFVLEdBQUcsS0FBSyxHQUFHO0FBQzlCO0FBQ0EsSUFBTyxpQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K