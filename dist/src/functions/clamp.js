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

// src/WTFCss/src/functions/clamp.js
var clamp_exports = {};
__export(clamp_exports, {
  clamp: () => clamp,
  default: () => clamp_default
});
module.exports = __toCommonJS(clamp_exports);
var clamp = (min, val, max) => {
  return `clamp(${min}, ${val}, ${max})`;
};
var clamp_default = clamp;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NsYW1wLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gYSBtaW5pbXVtIGFuZCBhIG1heGltdW0uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG1pbiAtIFRoZSBtaW5pbXVtIHZhbHVlIG9yIENTUyBleHByZXNzaW9uLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWwgLSBUaGUgY3VycmVudCB2YWx1ZSBvciBDU1MgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbWF4IC0gVGhlIG1heGltdW0gdmFsdWUgb3IgQ1NTIGV4cHJlc3Npb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBjbGFtcCgpIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYW1wID0gKG1pbiwgdmFsLCBtYXgpID0+IHtcbiAgcmV0dXJuIGBjbGFtcCgke21pbn0sICR7dmFsfSwgJHttYXh9KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYW1wOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT08sSUFBTSxRQUFRLENBQUMsS0FBSyxLQUFLLFFBQVE7QUFDdEMsU0FBTyxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRztBQUNyQztBQUVBLElBQU8sZ0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==