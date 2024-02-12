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

// src/WTFCss/src/helpers/@counterstyle.js
var counterstyle_exports = {};
__export(counterstyle_exports, {
  default: () => counterstyle_default,
  defineCounterStyle: () => defineCounterStyle
});
module.exports = __toCommonJS(counterstyle_exports);
var defineCounterStyle = (name, rules) => {
  if (["decimal", "disc", "square", "circle", "disclosure-open", "disclosure-closed"].includes(name.toLowerCase())) {
    throw new Error(`The name "${name}" is not allowed for custom counter styles.`);
  }
  const ruleEntries = Object.entries(rules).map(([descriptor, value]) => {
    if (descriptor === "symbols" || descriptor === "additive-symbols") {
      value = value.map((symbol) => `"${symbol}"`).join(" ");
    }
    return `${descriptor}: ${value}`;
  });
  const ruleString = ruleEntries.join("; ");
  const counterRule = `@counter-style ${name} { ${ruleString} }`;
  return counterRule;
};
var counterstyle_default = defineCounterStyle;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY291bnRlcnN0eWxlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMgYSBjdXN0b20gY291bnRlciBzdHlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIgc3R5bGUuXG4gKiBAcGFyYW0ge29iamVjdH0gcnVsZXMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgZGVzY3JpcHRvcnMgYW5kIHZhbHVlcyBmb3IgdGhlIHN0eWxlLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBuYW1lIGlzIG9uZSBvZiB0aGUgcmVzZXJ2ZWQgc3R5bGUgbmFtZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIEBjb3VudGVyLXN0eWxlIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVDb3VudGVyU3R5bGUgPSAobmFtZSwgcnVsZXMpID0+IHtcbiAgaWYgKFsnZGVjaW1hbCcsICdkaXNjJywgJ3NxdWFyZScsICdjaXJjbGUnLCAnZGlzY2xvc3VyZS1vcGVuJywgJ2Rpc2Nsb3N1cmUtY2xvc2VkJ10uaW5jbHVkZXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIG5hbWUgXCIke25hbWV9XCIgaXMgbm90IGFsbG93ZWQgZm9yIGN1c3RvbSBjb3VudGVyIHN0eWxlcy5gKTtcbiAgfVxuXG4gIGNvbnN0IHJ1bGVFbnRyaWVzID0gT2JqZWN0LmVudHJpZXMocnVsZXMpLm1hcCgoW2Rlc2NyaXB0b3IsIHZhbHVlXSkgPT4ge1xuICAgIGlmIChkZXNjcmlwdG9yID09PSAnc3ltYm9scycgfHwgZGVzY3JpcHRvciA9PT0gJ2FkZGl0aXZlLXN5bWJvbHMnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLm1hcChzeW1ib2wgPT4gYFxcXCIke3N5bWJvbH1cXFwiYCkuam9pbignICcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7ZGVzY3JpcHRvcn06ICR7dmFsdWV9YDtcbiAgfSk7XG4gIGNvbnN0IHJ1bGVTdHJpbmcgPSBydWxlRW50cmllcy5qb2luKCc7ICcpO1xuICBjb25zdCBjb3VudGVyUnVsZSA9IGBAY291bnRlci1zdHlsZSAke25hbWV9IHsgJHtydWxlU3RyaW5nfSB9YDtcblxuICByZXR1cm4gY291bnRlclJ1bGVcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvdW50ZXJTdHlsZSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT08sSUFBTSxxQkFBcUIsQ0FBQyxNQUFNLFVBQVU7QUFDakQsTUFBSSxDQUFDLFdBQVcsUUFBUSxVQUFVLFVBQVUsbUJBQW1CLG1CQUFtQixFQUFFLFNBQVMsS0FBSyxZQUFZLENBQUMsR0FBRztBQUNoSCxVQUFNLElBQUksTUFBTSxhQUFhLElBQUksNkNBQTZDO0FBQUEsRUFDaEY7QUFFQSxRQUFNLGNBQWMsT0FBTyxRQUFRLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxZQUFZLEtBQUssTUFBTTtBQUNyRSxRQUFJLGVBQWUsYUFBYSxlQUFlLG9CQUFvQjtBQUNqRSxjQUFRLE1BQU0sSUFBSSxZQUFVLElBQUssTUFBTSxHQUFJLEVBQUUsS0FBSyxHQUFHO0FBQUEsSUFDdkQ7QUFDQSxXQUFPLEdBQUcsVUFBVSxLQUFLLEtBQUs7QUFBQSxFQUNoQyxDQUFDO0FBQ0QsUUFBTSxhQUFhLFlBQVksS0FBSyxJQUFJO0FBQ3hDLFFBQU0sY0FBYyxrQkFBa0IsSUFBSSxNQUFNLFVBQVU7QUFFMUQsU0FBTztBQUNUO0FBQ0EsSUFBTyx1QkFBUTsiLAogICJuYW1lcyI6IFtdCn0K