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

// src/WTFCss/src/functions/ray.js
var ray_exports = {};
__export(ray_exports, {
  default: () => ray_default,
  ray: () => ray
});
module.exports = __toCommonJS(ray_exports);
var ray = (angle, size = "closest-side", contain = false, position = "") => {
  if (typeof angle !== "number" || angle < 0 || angle >= 360) {
    throw new TypeError("The angle must be a number between 0 and 359.");
  }
  const sizeKeywords = ["closest-side", "closest-corner", "farthest-side", "farthest-corner", "sides"];
  if (!sizeKeywords.includes(size)) {
    throw new TypeError("The size must be one of the following values: " + sizeKeywords.join(", ") + ".");
  }
  const positionRegex = /^(left|center|right|top|bottom|(\d+(\.\d+)?(px|%)?))$/;
  if (position && !positionRegex.test(position)) {
    throw new TypeError("The position must be a valid CSS position value.");
  }
  let rayString = `ray(${angle}deg`;
  if (size !== "closest-side") {
    rayString += ` ${size}`;
  }
  if (contain) {
    rayString += " contain";
  }
  if (position) {
    rayString += ` at ${position}`;
  }
  rayString += ")";
  return `offset-path: ${rayString};`;
};
var ray_default = ray;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JheS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDcmVhdGVzIGEgQ1NTIHJheSgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSAtIFRoZSBhbmdsZSBvZiB0aGUgcmF5IGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NpemU9J2Nsb3Nlc3Qtc2lkZSddIC0gVGhlIHNpemUga2V5d29yZCBmb3IgdGhlIHJheS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnRhaW49ZmFsc2VdIC0gV2hldGhlciB0aGUgcmF5IHNob3VsZCBjb250YWluIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IFtwb3NpdGlvbj0nJ10gLSBUaGUgcG9zaXRpb24gb2YgdGhlIHJheSB3aXRoaW4gdGhlIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIHJheSgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHJheSA9IChhbmdsZSwgc2l6ZSA9ICdjbG9zZXN0LXNpZGUnLCBjb250YWluID0gZmFsc2UsIHBvc2l0aW9uID0gJycpID0+IHtcbiAgaWYgKHR5cGVvZiBhbmdsZSAhPT0gJ251bWJlcicgfHwgYW5nbGUgPCAwIHx8IGFuZ2xlID49IDM2MCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBhbmdsZSBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMzU5LicpO1xuICB9XG5cbiAgY29uc3Qgc2l6ZUtleXdvcmRzID0gWydjbG9zZXN0LXNpZGUnLCAnY2xvc2VzdC1jb3JuZXInLCAnZmFydGhlc3Qtc2lkZScsICdmYXJ0aGVzdC1jb3JuZXInLCAnc2lkZXMnXTtcbiAgaWYgKCFzaXplS2V5d29yZHMuaW5jbHVkZXMoc2l6ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc2l6ZSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlczogJyArIHNpemVLZXl3b3Jkcy5qb2luKCcsICcpICsgJy4nKTtcbiAgfVxuXG4gIGNvbnN0IHBvc2l0aW9uUmVnZXggPSAvXihsZWZ0fGNlbnRlcnxyaWdodHx0b3B8Ym90dG9tfChcXGQrKFxcLlxcZCspPyhweHwlKT8pKSQvO1xuICBpZiAocG9zaXRpb24gJiYgIXBvc2l0aW9uUmVnZXgudGVzdChwb3NpdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgcG9zaXRpb24gbXVzdCBiZSBhIHZhbGlkIENTUyBwb3NpdGlvbiB2YWx1ZS4nKTtcbiAgfVxuXG4gIGxldCByYXlTdHJpbmcgPSBgcmF5KCR7YW5nbGV9ZGVnYDtcblxuICBpZiAoc2l6ZSAhPT0gJ2Nsb3Nlc3Qtc2lkZScpIHtcbiAgICByYXlTdHJpbmcgKz0gYCAke3NpemV9YDtcbiAgfVxuXG4gIGlmIChjb250YWluKSB7XG4gICAgcmF5U3RyaW5nICs9ICcgY29udGFpbic7XG4gIH1cblxuICBpZiAocG9zaXRpb24pIHtcbiAgICByYXlTdHJpbmcgKz0gYCBhdCAke3Bvc2l0aW9ufWA7XG4gIH1cblxuICByYXlTdHJpbmcgKz0gJyknO1xuXG4gIHJldHVybiBgb2Zmc2V0LXBhdGg6ICR7cmF5U3RyaW5nfTtgO1xufVxuZXhwb3J0IGRlZmF1bHQgcmF5OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUU8sSUFBTSxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFnQixVQUFVLE9BQU8sV0FBVyxPQUFPO0FBQ25GLE1BQUksT0FBTyxVQUFVLFlBQVksUUFBUSxLQUFLLFNBQVMsS0FBSztBQUMxRCxVQUFNLElBQUksVUFBVSwrQ0FBK0M7QUFBQSxFQUNyRTtBQUVBLFFBQU0sZUFBZSxDQUFDLGdCQUFnQixrQkFBa0IsaUJBQWlCLG1CQUFtQixPQUFPO0FBQ25HLE1BQUksQ0FBQyxhQUFhLFNBQVMsSUFBSSxHQUFHO0FBQ2hDLFVBQU0sSUFBSSxVQUFVLG1EQUFtRCxhQUFhLEtBQUssSUFBSSxJQUFJLEdBQUc7QUFBQSxFQUN0RztBQUVBLFFBQU0sZ0JBQWdCO0FBQ3RCLE1BQUksWUFBWSxDQUFDLGNBQWMsS0FBSyxRQUFRLEdBQUc7QUFDN0MsVUFBTSxJQUFJLFVBQVUsa0RBQWtEO0FBQUEsRUFDeEU7QUFFQSxNQUFJLFlBQVksT0FBTyxLQUFLO0FBRTVCLE1BQUksU0FBUyxnQkFBZ0I7QUFDM0IsaUJBQWEsSUFBSSxJQUFJO0FBQUEsRUFDdkI7QUFFQSxNQUFJLFNBQVM7QUFDWCxpQkFBYTtBQUFBLEVBQ2Y7QUFFQSxNQUFJLFVBQVU7QUFDWixpQkFBYSxPQUFPLFFBQVE7QUFBQSxFQUM5QjtBQUVBLGVBQWE7QUFFYixTQUFPLGdCQUFnQixTQUFTO0FBQ2xDO0FBQ0EsSUFBTyxjQUFROyIsCiAgIm5hbWVzIjogW10KfQo=