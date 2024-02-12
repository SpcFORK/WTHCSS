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

// src/WTFCss/src/functions/crossfade.js
var crossfade_exports = {};
__export(crossfade_exports, {
  crossFade: () => crossFade,
  default: () => crossfade_default
});
module.exports = __toCommonJS(crossfade_exports);
var crossFade = (...images) => {
  const validImages = images.filter((image) => {
    if (typeof image === "string" && image.startsWith("url(")) {
      return true;
    }
    const [img, percentage] = image;
    return typeof img === "string" && img.startsWith("url(") && typeof percentage === "number" && percentage >= 0 && percentage <= 100;
  });
  if (validImages.length < 2) {
    throw new Error("crossFade function requires at least two images.");
  }
  const crossFadeImages = validImages.map((image) => {
    if (typeof image === "string") {
      return image;
    }
    const [img, percentage] = image;
    return `${img} ${percentage}%`;
  }).join(", ");
  return `cross-fade(${crossFadeImages})`;
};
var crossfade_default = crossFade;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Nyb3NzZmFkZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IGNyb3NzRmFkZSA9ICguLi5pbWFnZXMpID0+IHtcbiAgLyoqXG4gICAqIEJsZW5kcyBpbWFnZXMgdXNpbmcgdGhlIGNyb3NzLWZhZGUgZWZmZWN0LlxuICAgKiBAcGFyYW0gey4uLmltYWdlc30gaW1hZ2VzIC0gQW4gYXJyYXkgb2YgaW1hZ2UgVVJMcyBvciB0dXBsZXMgb2YgaW1hZ2UgVVJMIGFuZCBwZXJjZW50YWdlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBmdW5jdGlvbiByZXByZXNlbnRpbmcgdGhlIGNyb3NzLWZhZGUgb2YgdGhlIHByb3ZpZGVkIGltYWdlcy5cbiAgICogQHRocm93cyB7RXJyb3J9IElmIGxlc3MgdGhhbiB0d28gdmFsaWQgaW1hZ2VzIGFyZSBwcm92aWRlZC5cbiAgICovXG4gIGNvbnN0IHZhbGlkSW1hZ2VzID0gaW1hZ2VzLmZpbHRlcihpbWFnZSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZycgJiYgaW1hZ2Uuc3RhcnRzV2l0aCgndXJsKCcpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgW2ltZywgcGVyY2VudGFnZV0gPSBpbWFnZTtcbiAgICByZXR1cm4gdHlwZW9mIGltZyA9PT0gJ3N0cmluZycgJiYgaW1nLnN0YXJ0c1dpdGgoJ3VybCgnKSAmJlxuICAgICAgdHlwZW9mIHBlcmNlbnRhZ2UgPT09ICdudW1iZXInICYmIHBlcmNlbnRhZ2UgPj0gMCAmJiBwZXJjZW50YWdlIDw9IDEwMDtcbiAgfSk7XG5cbiAgaWYgKHZhbGlkSW1hZ2VzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nyb3NzRmFkZSBmdW5jdGlvbiByZXF1aXJlcyBhdCBsZWFzdCB0d28gaW1hZ2VzLicpO1xuICB9XG5cbiAgY29uc3QgY3Jvc3NGYWRlSW1hZ2VzID0gdmFsaWRJbWFnZXMubWFwKGltYWdlID0+IHtcbiAgICBpZiAodHlwZW9mIGltYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cbiAgICBjb25zdCBbaW1nLCBwZXJjZW50YWdlXSA9IGltYWdlO1xuICAgIHJldHVybiBgJHtpbWd9ICR7cGVyY2VudGFnZX0lYDtcbiAgfSkuam9pbignLCAnKTtcblxuICByZXR1cm4gYGNyb3NzLWZhZGUoJHtjcm9zc0ZhZGVJbWFnZXN9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcm9zc0ZhZGUiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLElBQU0sWUFBWSxJQUFJLFdBQVc7QUFPdEMsUUFBTSxjQUFjLE9BQU8sT0FBTyxXQUFTO0FBQ3pDLFFBQUksT0FBTyxVQUFVLFlBQVksTUFBTSxXQUFXLE1BQU0sR0FBRztBQUN6RCxhQUFPO0FBQUEsSUFDVDtBQUNBLFVBQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSTtBQUMxQixXQUFPLE9BQU8sUUFBUSxZQUFZLElBQUksV0FBVyxNQUFNLEtBQ3JELE9BQU8sZUFBZSxZQUFZLGNBQWMsS0FBSyxjQUFjO0FBQUEsRUFDdkUsQ0FBQztBQUVELE1BQUksWUFBWSxTQUFTLEdBQUc7QUFDMUIsVUFBTSxJQUFJLE1BQU0sa0RBQWtEO0FBQUEsRUFDcEU7QUFFQSxRQUFNLGtCQUFrQixZQUFZLElBQUksV0FBUztBQUMvQyxRQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLGFBQU87QUFBQSxJQUNUO0FBQ0EsVUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJO0FBQzFCLFdBQU8sR0FBRyxHQUFHLElBQUksVUFBVTtBQUFBLEVBQzdCLENBQUMsRUFBRSxLQUFLLElBQUk7QUFFWixTQUFPLGNBQWMsZUFBZTtBQUN0QztBQUVBLElBQU8sb0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==