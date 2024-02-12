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

// src/WTFCss/src/functions/repeat.js
var repeat_exports = {};
__export(repeat_exports, {
  default: () => repeat_default,
  repeat: () => repeat
});
module.exports = __toCommonJS(repeat_exports);
var repeat = (count, ...tracks) => {
  if (!Number.isInteger(count) && count !== "auto-fill" && count !== "auto-fit") {
    throw new TypeError("The repeat count must be an integer or one of the keywords: auto-fill, auto-fit.");
  }
  const trackList = tracks.map((track) => {
    if (Array.isArray(track)) {
      return `[${track.join(" ")}]`;
    }
    return track;
  }).join(" ");
  return `repeat(${count}, ${trackList})`;
};
var repeat_default = repeat;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JlcGVhdC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBHZW5lcmF0ZXMgYSBDU1MgcmVwZWF0KCkgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBjb3VudCAtIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSB0cmFja3Mgb3Igb25lIG9mIHRoZSBrZXl3b3JkczogJ2F1dG8tZmlsbCcsICdhdXRvLWZpdCcuXG4gKiBAcGFyYW0gey4uLnN0cmluZ3xhcnJheX0gdHJhY2tzIC0gVGhlIHRyYWNrIHNpemVzIGFuZC9vciBuYW1lcyB0byBiZSByZXBlYXRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gQSBDU1MgdmFsdWUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcmVwZWF0KCkgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCByZXBlYXQgPSAoY291bnQsIC4uLnRyYWNrcykgPT4ge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoY291bnQpICYmIGNvdW50ICE9PSAnYXV0by1maWxsJyAmJiBjb3VudCAhPT0gJ2F1dG8tZml0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSByZXBlYXQgY291bnQgbXVzdCBiZSBhbiBpbnRlZ2VyIG9yIG9uZSBvZiB0aGUga2V5d29yZHM6IGF1dG8tZmlsbCwgYXV0by1maXQuJyk7XG4gIH1cblxuICBjb25zdCB0cmFja0xpc3QgPSB0cmFja3MubWFwKHRyYWNrID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmFjaykpIHtcbiAgICAgIHJldHVybiBgWyR7dHJhY2suam9pbignICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2s7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYHJlcGVhdCgke2NvdW50fSwgJHt0cmFja0xpc3R9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgcmVwZWF0OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU8sSUFBTSxTQUFTLENBQUMsVUFBVSxXQUFXO0FBQzFDLE1BQUksQ0FBQyxPQUFPLFVBQVUsS0FBSyxLQUFLLFVBQVUsZUFBZSxVQUFVLFlBQVk7QUFDN0UsVUFBTSxJQUFJLFVBQVUsa0ZBQWtGO0FBQUEsRUFDeEc7QUFFQSxRQUFNLFlBQVksT0FBTyxJQUFJLFdBQVM7QUFDcEMsUUFBSSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3hCLGFBQU8sSUFBSSxNQUFNLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDNUI7QUFDQSxXQUFPO0FBQUEsRUFDVCxDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsU0FBTyxVQUFVLEtBQUssS0FBSyxTQUFTO0FBQ3RDO0FBQ0EsSUFBTyxpQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K