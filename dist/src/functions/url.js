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

// src/WTFCss/src/functions/url.js
var url_exports = {};
__export(url_exports, {
  default: () => url_default,
  url: () => url
});
module.exports = __toCommonJS(url_exports);
var url = (path) => {
  if (typeof path !== "string") {
    throw new Error("URL must be a string.");
  }
  const isDataUrl = path.startsWith("data:");
  const isAbsoluteUrl = /^(?:[a-z]+:)?\/\//i.test(path);
  const isRelativeUrl = !isDataUrl && !isAbsoluteUrl;
  const needsQuotes = /[\s'"()]/.test(path);
  const quotedPath = needsQuotes ? `"${path}"` : path;
  return `url(${quotedPath})`;
};
var url_default = url;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3VybC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBGb3JtYXRzIGEgZ2l2ZW4gcGF0aCBhcyBhIENTUyBVUkwgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIGJlIGZvcm1hdHRlZCBhcyBhIFVSTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGZvcm1hdHRlZCBVUkwgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgdXJsID0gKHBhdGgpID0+IHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVVJMIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgVVJMIGlzIGEgZGF0YSBVUkwsIGFic29sdXRlIFVSTCwgb3IgYSByZWxhdGl2ZSBVUkxcbiAgY29uc3QgaXNEYXRhVXJsID0gcGF0aC5zdGFydHNXaXRoKCdkYXRhOicpO1xuICBjb25zdCBpc0Fic29sdXRlVXJsID0gL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHBhdGgpO1xuICBjb25zdCBpc1JlbGF0aXZlVXJsID0gIWlzRGF0YVVybCAmJiAhaXNBYnNvbHV0ZVVybDtcblxuICAvLyBJZiB0aGUgVVJMIGNvbnRhaW5zIHNwZWNpYWwgY2hhcmFjdGVycywgaXQgc2hvdWxkIGJlIHF1b3RlZFxuICBjb25zdCBuZWVkc1F1b3RlcyA9IC9bXFxzJ1wiKCldLy50ZXN0KHBhdGgpO1xuICBjb25zdCBxdW90ZWRQYXRoID0gbmVlZHNRdW90ZXMgPyBgXFxcIiR7cGF0aH1cXFwiYCA6IHBhdGg7XG5cbiAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgVVJMIHN0cmluZ1xuICByZXR1cm4gYHVybCgke3F1b3RlZFBhdGh9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgdXJsOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS08sSUFBTSxNQUFNLENBQUMsU0FBUztBQUMzQixNQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzVCLFVBQU0sSUFBSSxNQUFNLHVCQUF1QjtBQUFBLEVBQ3pDO0FBR0EsUUFBTSxZQUFZLEtBQUssV0FBVyxPQUFPO0FBQ3pDLFFBQU0sZ0JBQWdCLHFCQUFxQixLQUFLLElBQUk7QUFDcEQsUUFBTSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7QUFHckMsUUFBTSxjQUFjLFdBQVcsS0FBSyxJQUFJO0FBQ3hDLFFBQU0sYUFBYSxjQUFjLElBQUssSUFBSSxNQUFPO0FBR2pELFNBQU8sT0FBTyxVQUFVO0FBQzFCO0FBQ0EsSUFBTyxjQUFROyIsCiAgIm5hbWVzIjogW10KfQo=