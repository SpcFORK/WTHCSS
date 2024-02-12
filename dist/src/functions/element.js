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

// src/WTFCss/src/functions/element.js
var element_exports = {};
__export(element_exports, {
  default: () => element_default,
  element: () => element
});
module.exports = __toCommonJS(element_exports);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2VsZW1lbnQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIGltYWdlIHZhbHVlIGZvciBhIGdpdmVuIGVsZW1lbnQgSUQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQsIG11c3Qgc3RhcnQgd2l0aCAnIycuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIElEIGlzIG5vdCBhIHN0cmluZyBvciBkb2Vzbid0IHN0YXJ0IHdpdGggJyMnLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBpbWFnZSB2YWx1ZSBmb3IgdGhlIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBlbGVtZW50ID0gKGlkKSA9PiB7XG4gIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8ICFpZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSUQgZm9yIGVsZW1lbnQgZnVuY3Rpb24uIElEIG11c3QgYmUgYSBzdHJpbmcgc3RhcnRpbmcgd2l0aCBcIiNcIi4nKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBmdW5jdGlvbiBpcyBzdXBwb3J0ZWRcbiAgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pTZXRJbWFnZUVsZW1lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLndhcm4oJ1RoZSBlbGVtZW50KCkgZnVuY3Rpb24gaXMgZXhwZXJpbWVudGFsIGFuZCBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vycy4nKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgQ1NTIGltYWdlIHZhbHVlXG4gIHJldHVybiBgLW1vei1lbGVtZW50KCR7aWR9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlbGVtZW50OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU8sSUFBTSxVQUFVLENBQUMsT0FBTztBQUM3QixNQUFJLE9BQU8sT0FBTyxZQUFZLENBQUMsR0FBRyxXQUFXLEdBQUcsR0FBRztBQUNqRCxVQUFNLElBQUksTUFBTSx5RUFBeUU7QUFBQSxFQUMzRjtBQUdBLE1BQUksT0FBTyxTQUFTLHVCQUF1QixZQUFZO0FBQ3JELFlBQVEsS0FBSywyRUFBMkU7QUFBQSxFQUMxRjtBQUdBLFNBQU8sZ0JBQWdCLEVBQUU7QUFDM0I7QUFFQSxJQUFPLGtCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=