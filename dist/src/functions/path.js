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

// src/WTFCss/src/functions/path.js
var path_exports = {};
__export(path_exports, {
  default: () => path_default,
  path: () => path
});
module.exports = __toCommonJS(path_exports);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3BhdGguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQ3JlYXRlcyBhIENTUyBwYXRoKCkgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gZmlsbFJ1bGUgLSBUaGUgZmlsbC1ydWxlIHRvIGFwcGx5IHRvIHRoZSBwYXRoLCBvciBudWxsIGlmIG5vdCBhcHBsaWNhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHN2Z1BhdGggLSBUaGUgU1ZHIHBhdGggZGF0YS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgcGF0aCgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHBhdGggPSAoZmlsbFJ1bGUsIHN2Z1BhdGgpID0+IHtcbiAgaWYgKHR5cGVvZiBzdmdQYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBzdmdQYXRoIHBhcmFtZXRlciBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgaWYgKGZpbGxSdWxlICYmIHR5cGVvZiBmaWxsUnVsZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgZmlsbFJ1bGUgcGFyYW1ldGVyIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICBjb25zdCB2YWxpZEZpbGxSdWxlcyA9IFsnbm9uemVybycsICdldmVub2RkJ107XG4gIGlmIChmaWxsUnVsZSAmJiAhdmFsaWRGaWxsUnVsZXMuaW5jbHVkZXMoZmlsbFJ1bGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmlsbFJ1bGUgcGFyYW1ldGVyIG11c3QgYmUgZWl0aGVyIFwibm9uemVyb1wiIG9yIFwiZXZlbm9kZFwiLicpO1xuICB9XG5cbiAgcmV0dXJuIGBwYXRoKCR7ZmlsbFJ1bGUgPyBgJHtmaWxsUnVsZX0sIGAgOiAnJ31cIiR7c3ZnUGF0aH1cIilgO1xufVxuZXhwb3J0IGRlZmF1bHQgcGF0aDsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLElBQU0sT0FBTyxDQUFDLFVBQVUsWUFBWTtBQUN6QyxNQUFJLE9BQU8sWUFBWSxVQUFVO0FBQy9CLFVBQU0sSUFBSSxVQUFVLHlDQUF5QztBQUFBLEVBQy9EO0FBRUEsTUFBSSxZQUFZLE9BQU8sYUFBYSxVQUFVO0FBQzVDLFVBQU0sSUFBSSxVQUFVLDBDQUEwQztBQUFBLEVBQ2hFO0FBRUEsUUFBTSxpQkFBaUIsQ0FBQyxXQUFXLFNBQVM7QUFDNUMsTUFBSSxZQUFZLENBQUMsZUFBZSxTQUFTLFFBQVEsR0FBRztBQUNsRCxVQUFNLElBQUksTUFBTSwrREFBK0Q7QUFBQSxFQUNqRjtBQUVBLFNBQU8sUUFBUSxXQUFXLEdBQUcsUUFBUSxPQUFPLEVBQUUsSUFBSSxPQUFPO0FBQzNEO0FBQ0EsSUFBTyxlQUFROyIsCiAgIm5hbWVzIjogW10KfQo=