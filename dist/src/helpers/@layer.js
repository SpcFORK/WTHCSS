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

// src/WTFCss/src/helpers/@layer.js
var layer_exports = {};
__export(layer_exports, {
  default: () => layer_default,
  defineLayer: () => defineLayer,
  defineLayerOrder: () => defineLayerOrder
});
module.exports = __toCommonJS(layer_exports);
var defineLayer = (name, rules) => {
  if (!name || typeof rules !== "object") {
    throw new TypeError("Invalid arguments for defineLayer.");
  }
  const layerRules = Object.entries(rules).map(([selector, styleRules]) => {
    const styleString = Object.entries(styleRules).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@layer ${name} { ${layerRules} }`;
};
var defineLayerOrder = (...names) => `@layer ` + names.join(" ");
var layer_default = {
  defineLayer,
  defineLayerOrder
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AbGF5ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBhIENTUyBsYXllciBhbmQgaXRzIGFzc29jaWF0ZWQgc3R5bGUgcnVsZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBsYXllci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBydWxlcyAtIEFuIG9iamVjdCBtYXBwaW5nIHNlbGVjdG9ycyB0byB0aGVpciByZXNwZWN0aXZlIHN0eWxlIHJ1bGVzLlxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgYXJndW1lbnRzIGFyZSBub3QgYSBzdHJpbmcgYW5kIGFuIG9iamVjdCBvZiBzdHlsZSBydWxlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQGxheWVyIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVMYXllciA9IChuYW1lLCBydWxlcykgPT4ge1xuICBpZiAoIW5hbWUgfHwgdHlwZW9mIHJ1bGVzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGZvciBkZWZpbmVMYXllci4nKTtcbiAgfVxuXG4gIGNvbnN0IGxheWVyUnVsZXMgPSBPYmplY3QuZW50cmllcyhydWxlcykubWFwKChbc2VsZWN0b3IsIHN0eWxlUnVsZXNdKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVTdHJpbmcgPSBPYmplY3QuZW50cmllcyhzdHlsZVJ1bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2ApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gYCR7c2VsZWN0b3J9IHsgJHtzdHlsZVN0cmluZ30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBsYXllciAke25hbWV9IHsgJHtsYXllclJ1bGVzfSB9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmVMYXllck9yZGVyID0gKC4uLm5hbWVzKSA9PiAoYEBsYXllciBgICsgbmFtZXMuam9pbignICcpKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRlZmluZUxheWVyLFxuICBkZWZpbmVMYXllck9yZGVyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9PLElBQU0sY0FBYyxDQUFDLE1BQU0sVUFBVTtBQUMxQyxNQUFJLENBQUMsUUFBUSxPQUFPLFVBQVUsVUFBVTtBQUN0QyxVQUFNLElBQUksVUFBVSxvQ0FBb0M7QUFBQSxFQUMxRDtBQUVBLFFBQU0sYUFBYSxPQUFPLFFBQVEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsVUFBVSxNQUFNO0FBQ3ZFLFVBQU0sY0FBYyxPQUFPLFFBQVEsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyxNQUFNLEdBQUcsUUFBUSxLQUFLLEtBQUssR0FBRyxFQUFFLEtBQUssR0FBRztBQUM1RyxXQUFPLEdBQUcsUUFBUSxNQUFNLFdBQVc7QUFBQSxFQUNyQyxDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsU0FBTyxVQUFVLElBQUksTUFBTSxVQUFVO0FBQ3ZDO0FBRU8sSUFBTSxtQkFBbUIsSUFBSSxVQUFXLFlBQVksTUFBTSxLQUFLLEdBQUc7QUFFekUsSUFBTyxnQkFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==