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

// src/WTFCss/src/helpers/@page.js
var page_exports = {};
__export(page_exports, {
  default: () => page_default,
  definePage: () => definePage
});
module.exports = __toCommonJS(page_exports);
var definePage = (name, styles) => {
  if (typeof styles !== "object") {
    throw new TypeError("Styles must be an object.");
  }
  const styleEntries = Object.entries(styles).map(([property, value]) => {
    if (!/^margin-|^border-|^padding-|^background-|^font-|^text-|^color$|^outline$|^counter-|^width$|^height$|^line-height$|^quotes$|^visibility$/.test(property)) {
      throw new Error(`Property "${property}" is not allowed within @page rule.`);
    }
    return `${property}: ${value};`;
  }).join(" ");
  const pageRule = `@page ${name} { ${styleEntries} }`;
  return pageRule;
};
var page_default = definePage;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AcGFnZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBEZWZpbmVzIGEgQ1NTIEBwYWdlIHJ1bGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgc3R5bGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHBhZ2UgcnVsZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBzdHlsZXMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgQ1NTIHByb3BlcnRpZXMgYW5kIHZhbHVlcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgc3R5bGVzIGlzIG5vdCBhbiBvYmplY3QuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYSBwcm9wZXJ0eSBpcyBub3QgYWxsb3dlZCB3aXRoaW4gQHBhZ2UgcnVsZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQHBhZ2UgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVBhZ2UgPSAobmFtZSwgc3R5bGVzKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3R5bGVzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0eWxlcyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHN0eWxlcykubWFwKChbcHJvcGVydHksIHZhbHVlXSkgPT4ge1xuICAgIGlmICghL15tYXJnaW4tfF5ib3JkZXItfF5wYWRkaW5nLXxeYmFja2dyb3VuZC18XmZvbnQtfF50ZXh0LXxeY29sb3IkfF5vdXRsaW5lJHxeY291bnRlci18XndpZHRoJHxeaGVpZ2h0JHxebGluZS1oZWlnaHQkfF5xdW90ZXMkfF52aXNpYmlsaXR5JC8udGVzdChwcm9wZXJ0eSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgXCIke3Byb3BlcnR5fVwiIGlzIG5vdCBhbGxvd2VkIHdpdGhpbiBAcGFnZSBydWxlLmApO1xuICAgIH1cbiAgICByZXR1cm4gYCR7cHJvcGVydHl9OiAke3ZhbHVlfTtgO1xuICB9KS5qb2luKCcgJyk7XG5cbiAgY29uc3QgcGFnZVJ1bGUgPSBgQHBhZ2UgJHtuYW1lfSB7ICR7c3R5bGVFbnRyaWVzfSB9YDtcblxuICByZXR1cm4gcGFnZVJ1bGU7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUGFnZTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNPLElBQU0sYUFBYSxDQUFDLE1BQU0sV0FBVztBQUMxQyxNQUFJLE9BQU8sV0FBVyxVQUFVO0FBQzlCLFVBQU0sSUFBSSxVQUFVLDJCQUEyQjtBQUFBLEVBQ2pEO0FBRUEsUUFBTSxlQUFlLE9BQU8sUUFBUSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLE1BQU07QUFDckUsUUFBSSxDQUFDLDBJQUEwSSxLQUFLLFFBQVEsR0FBRztBQUM3SixZQUFNLElBQUksTUFBTSxhQUFhLFFBQVEscUNBQXFDO0FBQUEsSUFDNUU7QUFDQSxXQUFPLEdBQUcsUUFBUSxLQUFLLEtBQUs7QUFBQSxFQUM5QixDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsUUFBTSxXQUFXLFNBQVMsSUFBSSxNQUFNLFlBQVk7QUFFaEQsU0FBTztBQUNUO0FBQ0EsSUFBTyxlQUFROyIsCiAgIm5hbWVzIjogW10KfQo=