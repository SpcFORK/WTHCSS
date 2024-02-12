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

// src/WTFCss/src/helpers/@media.js
var media_exports = {};
__export(media_exports, {
  default: () => media_default,
  defineMedia: () => defineMedia
});
module.exports = __toCommonJS(media_exports);
var defineMedia = (mediaQuery, styles) => {
  if (typeof mediaQuery !== "string" || typeof styles !== "object") {
    throw new TypeError("Invalid arguments for defineMedia.");
  }
  const styleEntries = Object.entries(styles).map(([selector, styleRules]) => {
    const styleString = Object.entries(styleRules).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@media ${mediaQuery} { ${styleEntries} }`;
};
var media_default = defineMedia;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AbWVkaWEuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBhIENTUyBtZWRpYSBxdWVyeSBhbmQgaXRzIGFzc29jaWF0ZWQgc3R5bGUgcnVsZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWFRdWVyeSAtIFRoZSBtZWRpYSBxdWVyeSBzdHJpbmcuXG4gKiBAcGFyYW0ge29iamVjdH0gc3R5bGVzIC0gQW4gb2JqZWN0IG1hcHBpbmcgc2VsZWN0b3JzIHRvIHRoZWlyIHJlc3BlY3RpdmUgc3R5bGUgcnVsZXMuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBhcmd1bWVudHMgYXJlIG5vdCBhIHN0cmluZyBhbmQgYW4gb2JqZWN0IG9mIHN0eWxlIHJ1bGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAbWVkaWEgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZU1lZGlhID0gKG1lZGlhUXVlcnksIHN0eWxlcykgPT4ge1xuICBpZiAodHlwZW9mIG1lZGlhUXVlcnkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzdHlsZXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZm9yIGRlZmluZU1lZGlhLicpO1xuICB9XG5cbiAgY29uc3Qgc3R5bGVFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5tYXAoKFtzZWxlY3Rvciwgc3R5bGVSdWxlc10pID0+IHtcbiAgICBjb25zdCBzdHlsZVN0cmluZyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlUnVsZXMpLm1hcCgoW3Byb3BlcnR5LCB2YWx1ZV0pID0+IGAke3Byb3BlcnR5fTogJHt2YWx1ZX07YCkuam9pbignICcpO1xuICAgIHJldHVybiBgJHtzZWxlY3Rvcn0geyAke3N0eWxlU3RyaW5nfSB9YDtcbiAgfSkuam9pbignICcpO1xuXG4gIHJldHVybiBgQG1lZGlhICR7bWVkaWFRdWVyeX0geyAke3N0eWxlRW50cmllc30gfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWVkaWEiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9PLElBQU0sY0FBYyxDQUFDLFlBQVksV0FBVztBQUNqRCxNQUFJLE9BQU8sZUFBZSxZQUFZLE9BQU8sV0FBVyxVQUFVO0FBQ2hFLFVBQU0sSUFBSSxVQUFVLG9DQUFvQztBQUFBLEVBQzFEO0FBRUEsUUFBTSxlQUFlLE9BQU8sUUFBUSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxVQUFVLE1BQU07QUFDMUUsVUFBTSxjQUFjLE9BQU8sUUFBUSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLE1BQU0sR0FBRyxRQUFRLEtBQUssS0FBSyxHQUFHLEVBQUUsS0FBSyxHQUFHO0FBQzVHLFdBQU8sR0FBRyxRQUFRLE1BQU0sV0FBVztBQUFBLEVBQ3JDLENBQUMsRUFBRSxLQUFLLEdBQUc7QUFFWCxTQUFPLFVBQVUsVUFBVSxNQUFNLFlBQVk7QUFDL0M7QUFDQSxJQUFPLGdCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=