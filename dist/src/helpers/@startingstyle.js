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

// src/WTFCss/src/helpers/@startingstyle.js
var startingstyle_exports = {};
__export(startingstyle_exports, {
  default: () => startingstyle_default,
  defineStartingStyle: () => defineStartingStyle
});
module.exports = __toCommonJS(startingstyle_exports);
var defineStartingStyle = (selector, properties) => {
  const propertyEntries = Object.entries(properties).map(([property, value]) => {
    return `${property}: ${value};`;
  }).join(" ");
  const startingStyleRule = `@starting-style {
  ${selector} { ${propertyEntries} }
}`;
  return startingStyleRule;
};
var startingstyle_default = defineStartingStyle;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Ac3RhcnRpbmdzdHlsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBEZWZpbmVzIGEgc3RhcnRpbmcgc3R5bGUgZm9yIGEgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgQ1NTIHNlbGVjdG9yIHRvIHdoaWNoIHRoZSBzdGFydGluZyBzdHlsZSB3aWxsIGJlIGFwcGxpZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcGVydGllcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBDU1MgcHJvcGVydGllcyBhbmQgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAc3RhcnRpbmctc3R5bGUgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVN0YXJ0aW5nU3R5bGUgPSAoc2VsZWN0b3IsIHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgcHJvcGVydHlFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocHJvcGVydGllcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4ge1xuICAgIHJldHVybiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2A7XG4gIH0pLmpvaW4oJyAnKTtcblxuICBjb25zdCBzdGFydGluZ1N0eWxlUnVsZSA9IGBAc3RhcnRpbmctc3R5bGUge1xcbiAgJHtzZWxlY3Rvcn0geyAke3Byb3BlcnR5RW50cmllc30gfVxcbn1gO1xuXG4gIHJldHVybiBzdGFydGluZ1N0eWxlUnVsZTtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVTdGFydGluZ1N0eWxlOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU8sSUFBTSxzQkFBc0IsQ0FBQyxVQUFVLGVBQWU7QUFDM0QsUUFBTSxrQkFBa0IsT0FBTyxRQUFRLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssTUFBTTtBQUM1RSxXQUFPLEdBQUcsUUFBUSxLQUFLLEtBQUs7QUFBQSxFQUM5QixDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsUUFBTSxvQkFBb0I7QUFBQSxJQUF3QixRQUFRLE1BQU0sZUFBZTtBQUFBO0FBRS9FLFNBQU87QUFDVDtBQUNBLElBQU8sd0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==