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

// src/WTFCss/src/helpers/@fontface.js
var fontface_exports = {};
__export(fontface_exports, {
  default: () => fontface_default,
  defineFontFace: () => defineFontFace
});
module.exports = __toCommonJS(fontface_exports);
var defineFontFace = (fontFace) => {
  const fontFaceRule = `@font-face {
    font-family: "${fontFace.family}";
    src: ${fontFace.sources.map((source) => {
    if (source.url) {
      return `url("${source.url}") format("${source.format}")`;
    } else if (source.local) {
      return `local("${source.local}")`;
    }
    return "";
  }).join(",\n    ")};
    ${fontFace.descriptors ? Object.entries(fontFace.descriptors).map(([key, value]) => `${key}: ${value}`).join(";\n    ") : ""}
  }`;
  return fontFaceRule;
};
var fontface_default = defineFontFace;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udGZhY2UuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQ3JlYXRlcyBhIENTUyBAZm9udC1mYWNlIHJ1bGUgc3RyaW5nLlxuICogQHBhcmFtIHtvYmplY3R9IGZvbnRGYWNlIC0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgZm9udCBmYWNlIGNvbmZpZ3VyYXRpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBmb250LWZhY2UgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZUZvbnRGYWNlID0gZm9udEZhY2UgPT4ge1xuICBjb25zdCBmb250RmFjZVJ1bGUgPSBgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6IFwiJHtmb250RmFjZS5mYW1pbHl9XCI7XG4gICAgc3JjOiAke2ZvbnRGYWNlLnNvdXJjZXMubWFwKHNvdXJjZSA9PiB7XG4gICAgICBpZiAoc291cmNlLnVybCkge1xuICAgICAgICByZXR1cm4gYHVybChcIiR7c291cmNlLnVybH1cIikgZm9ybWF0KFwiJHtzb3VyY2UuZm9ybWF0fVwiKWA7XG4gICAgICB9IGVsc2UgaWYgKHNvdXJjZS5sb2NhbCkge1xuICAgICAgICByZXR1cm4gYGxvY2FsKFwiJHtzb3VyY2UubG9jYWx9XCIpYDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9KS5qb2luKCcsXFxuICAgICcpfTtcbiAgICAke2ZvbnRGYWNlLmRlc2NyaXB0b3JzID8gT2JqZWN0LmVudHJpZXMoZm9udEZhY2UuZGVzY3JpcHRvcnMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgJHtrZXl9OiAke3ZhbHVlfWApLmpvaW4oJztcXG4gICAgJykgOiAnJ31cbiAgfWA7XG5cbiAgcmV0dXJuIGZvbnRGYWNlUnVsZVxufTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUZvbnRGYWNlIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLTyxJQUFNLGlCQUFpQixjQUFZO0FBQ3hDLFFBQU0sZUFBZTtBQUFBLG9CQUNILFNBQVMsTUFBTTtBQUFBLFdBQ3hCLFNBQVMsUUFBUSxJQUFJLFlBQVU7QUFDcEMsUUFBSSxPQUFPLEtBQUs7QUFDZCxhQUFPLFFBQVEsT0FBTyxHQUFHLGNBQWMsT0FBTyxNQUFNO0FBQUEsSUFDdEQsV0FBVyxPQUFPLE9BQU87QUFDdkIsYUFBTyxVQUFVLE9BQU8sS0FBSztBQUFBLElBQy9CO0FBQ0EsV0FBTztBQUFBLEVBQ1QsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDO0FBQUEsTUFDaEIsU0FBUyxjQUFjLE9BQU8sUUFBUSxTQUFTLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxHQUFHLEdBQUcsS0FBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLFNBQVMsSUFBSSxFQUFFO0FBQUE7QUFHOUgsU0FBTztBQUNUO0FBQ0EsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K