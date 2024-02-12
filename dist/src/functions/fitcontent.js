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

// src/WTFCss/src/functions/fitcontent.js
var fitcontent_exports = {};
__export(fitcontent_exports, {
  default: () => fitcontent_default,
  fitContent: () => fitContent
});
module.exports = __toCommonJS(fitcontent_exports);
var fitContent = (size) => {
  if (typeof size !== "string") {
    throw new TypeError("Size must be a string representing a length or a percentage.");
  }
  return `fit-content(${size})`;
};
var fitcontent_default = fitContent;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2ZpdGNvbnRlbnQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQWRqdXN0cyB0aGUgY29udGVudCBzaXplIHRvIGZpdCB0aGUgZ2l2ZW4gc2l6ZSBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2l6ZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyBhIGxlbmd0aCBvciBhIHBlcmNlbnRhZ2UuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBzaXplIGlzIG5vdCBhIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBDU1MgZml0LWNvbnRlbnQgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZml0Q29udGVudCA9IChzaXplKSA9PiB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTaXplIG11c3QgYmUgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgbGVuZ3RoIG9yIGEgcGVyY2VudGFnZS4nKTtcbiAgfVxuICByZXR1cm4gYGZpdC1jb250ZW50KCR7c2l6ZX0pYDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZpdENvbnRlbnQiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLElBQU0sYUFBYSxDQUFDLFNBQVM7QUFDbEMsTUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixVQUFNLElBQUksVUFBVSw4REFBOEQ7QUFBQSxFQUNwRjtBQUNBLFNBQU8sZUFBZSxJQUFJO0FBQzVCO0FBRUEsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K