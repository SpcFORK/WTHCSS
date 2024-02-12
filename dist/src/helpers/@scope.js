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

// src/WTFCss/src/helpers/@scope.js
var scope_exports = {};
__export(scope_exports, {
  default: () => scope_default,
  defineScope: () => defineScope
});
module.exports = __toCommonJS(scope_exports);
var defineScope = (scopeRoot, scopeLimit, rulesets) => {
  const scopeRootSelector = scopeRoot ? `(${scopeRoot})` : "";
  const scopeLimitSelector = scopeLimit ? ` to (${scopeLimit})` : "";
  const rulesetString = Object.entries(rulesets).map(([selector, styles]) => {
    const styleString = Object.entries(styles).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@scope ${scopeRootSelector}${scopeLimitSelector} { ${rulesetString} }`;
};
var scope_default = defineScope;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Ac2NvcGUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBhIENTUyBzY29wZSBmb3IgYSBzZXQgb2YgcnVsZXMuXG4gKiBAcGFyYW0ge3N0cmluZ3xudWxsfSBzY29wZVJvb3QgLSBUaGUgcm9vdCBzZWxlY3RvciBvZiB0aGUgc2NvcGUsIG9yIG51bGwgZm9yIG5vIHJvb3QuXG4gKiBAcGFyYW0ge3N0cmluZ3xudWxsfSBzY29wZUxpbWl0IC0gVGhlIGxpbWl0IHNlbGVjdG9yIG9mIHRoZSBzY29wZSwgb3IgbnVsbCBmb3Igbm8gbGltaXQuXG4gKiBAcGFyYW0ge29iamVjdH0gcnVsZXNldHMgLSBBbiBvYmplY3QgbWFwcGluZyBzZWxlY3RvcnMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBzdHlsZSBvYmplY3RzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAc2NvcGUgcnVsZSBhcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVNjb3BlID0gKHNjb3BlUm9vdCwgc2NvcGVMaW1pdCwgcnVsZXNldHMpID0+IHtcbiAgY29uc3Qgc2NvcGVSb290U2VsZWN0b3IgPSBzY29wZVJvb3QgPyBgKCR7c2NvcGVSb290fSlgIDogJyc7XG4gIGNvbnN0IHNjb3BlTGltaXRTZWxlY3RvciA9IHNjb3BlTGltaXQgPyBgIHRvICgke3Njb3BlTGltaXR9KWAgOiAnJztcbiAgY29uc3QgcnVsZXNldFN0cmluZyA9IE9iamVjdC5lbnRyaWVzKHJ1bGVzZXRzKS5tYXAoKFtzZWxlY3Rvciwgc3R5bGVzXSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlU3RyaW5nID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2ApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gYCR7c2VsZWN0b3J9IHsgJHtzdHlsZVN0cmluZ30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBzY29wZSAke3Njb3BlUm9vdFNlbGVjdG9yfSR7c2NvcGVMaW1pdFNlbGVjdG9yfSB7ICR7cnVsZXNldFN0cmluZ30gfWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVTY29wZSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT08sSUFBTSxjQUFjLENBQUMsV0FBVyxZQUFZLGFBQWE7QUFDOUQsUUFBTSxvQkFBb0IsWUFBWSxJQUFJLFNBQVMsTUFBTTtBQUN6RCxRQUFNLHFCQUFxQixhQUFhLFFBQVEsVUFBVSxNQUFNO0FBQ2hFLFFBQU0sZ0JBQWdCLE9BQU8sUUFBUSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxNQUFNLE1BQU07QUFDekUsVUFBTSxjQUFjLE9BQU8sUUFBUSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLE1BQU0sR0FBRyxRQUFRLEtBQUssS0FBSyxHQUFHLEVBQUUsS0FBSyxHQUFHO0FBQ3hHLFdBQU8sR0FBRyxRQUFRLE1BQU0sV0FBVztBQUFBLEVBQ3JDLENBQUMsRUFBRSxLQUFLLEdBQUc7QUFFWCxTQUFPLFVBQVUsaUJBQWlCLEdBQUcsa0JBQWtCLE1BQU0sYUFBYTtBQUM1RTtBQUVBLElBQU8sZ0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==