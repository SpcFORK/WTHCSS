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

// src/WTFCss/src/helpers/@keyframes.js
var keyframes_exports = {};
__export(keyframes_exports, {
  default: () => keyframes_default,
  defineKeyframes: () => defineKeyframes
});
module.exports = __toCommonJS(keyframes_exports);
var defineKeyframes = (name, frames) => {
  if (typeof name !== "string" || !Array.isArray(frames)) {
    throw new TypeError("Invalid arguments for defineKeyframes.");
  }
  const keyframeRules = frames.map((frame) => {
    const offset = Object.keys(frame)[0];
    const properties = Object.entries(frame[offset]).map(([prop, value]) => {
      return `${prop}: ${value}`;
    }).join("; ");
    return `${offset} { ${properties} }`;
  }).join(" ");
  return `@keyframes ${name} { ${keyframeRules} }`;
};
var keyframes_default = defineKeyframes;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Aa2V5ZnJhbWVzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGFuaW1hdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZnJhbWVzIC0gQW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIGtleWZyYW1lcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGFyZ3VtZW50cyBhcmUgbm90IGEgc3RyaW5nIGFuZCBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAa2V5ZnJhbWVzIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVLZXlmcmFtZXMgPSAobmFtZSwgZnJhbWVzKSA9PiB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIUFycmF5LmlzQXJyYXkoZnJhbWVzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGZvciBkZWZpbmVLZXlmcmFtZXMuJyk7XG4gIH1cblxuICBjb25zdCBrZXlmcmFtZVJ1bGVzID0gZnJhbWVzLm1hcChmcmFtZSA9PiB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gT2JqZWN0LmtleXMoZnJhbWUpWzBdO1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3QuZW50cmllcyhmcmFtZVtvZmZzZXRdKS5tYXAoKFtwcm9wLCB2YWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiBgJHtwcm9wfTogJHt2YWx1ZX1gO1xuICAgIH0pLmpvaW4oJzsgJyk7XG5cbiAgICByZXR1cm4gYCR7b2Zmc2V0fSB7ICR7cHJvcGVydGllc30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBrZXlmcmFtZXMgJHtuYW1lfSB7ICR7a2V5ZnJhbWVSdWxlc30gfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lS2V5ZnJhbWVzIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPTyxJQUFNLGtCQUFrQixDQUFDLE1BQU0sV0FBVztBQUMvQyxNQUFJLE9BQU8sU0FBUyxZQUFZLENBQUMsTUFBTSxRQUFRLE1BQU0sR0FBRztBQUN0RCxVQUFNLElBQUksVUFBVSx3Q0FBd0M7QUFBQSxFQUM5RDtBQUVBLFFBQU0sZ0JBQWdCLE9BQU8sSUFBSSxXQUFTO0FBQ3hDLFVBQU0sU0FBUyxPQUFPLEtBQUssS0FBSyxFQUFFLENBQUM7QUFDbkMsVUFBTSxhQUFhLE9BQU8sUUFBUSxNQUFNLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNO0FBQ3RFLGFBQU8sR0FBRyxJQUFJLEtBQUssS0FBSztBQUFBLElBQzFCLENBQUMsRUFBRSxLQUFLLElBQUk7QUFFWixXQUFPLEdBQUcsTUFBTSxNQUFNLFVBQVU7QUFBQSxFQUNsQyxDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsU0FBTyxjQUFjLElBQUksTUFBTSxhQUFhO0FBQzlDO0FBQ0EsSUFBTyxvQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K