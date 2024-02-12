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

// src/WTFCss/src/helpers/@property.js
var property_exports = {};
__export(property_exports, {
  default: () => property_default,
  registerProperty: () => registerProperty
});
module.exports = __toCommonJS(property_exports);
var registerProperty = (name, syntax, inherits, initialValue) => {
  return {
    [`@property ${name}`]: "{ " + !syntax + !inherits + !initialValue + " }"
  };
};
var property_default = registerProperty;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AcHJvcGVydHkuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogUmVnaXN0ZXJzIGEgY3VzdG9tIENTUyBwcm9wZXJ0eSB1c2luZyB0aGUgQHByb3BlcnR5IHJ1bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjdXN0b20gcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ludGF4IC0gRGVzY3JpYmVzIHRoZSBhbGxvd2FibGUgc3ludGF4IGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRzIC0gQ29udHJvbHMgd2hldGhlciB0aGUgY3VzdG9tIHByb3BlcnR5IGluaGVyaXRzIGJ5IGRlZmF1bHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5pdGlhbFZhbHVlIC0gU2V0cyB0aGUgaW5pdGlhbCB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIGZvcm1hdHRlZCBAcHJvcGVydHkgcnVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyUHJvcGVydHkgPSAobmFtZSwgc3ludGF4LCBpbmhlcml0cywgaW5pdGlhbFZhbHVlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgW2BAcHJvcGVydHkgJHtuYW1lfWBdOiAoXG4gICAgICBcInsgXCIgK1xuICAgICAgKCFzeW50YXggPz8gYHN5bnRheDogXCIke3N5bnRheH1cIjsgYCkgK1xuICAgICAgKCFpbmhlcml0cyA/PyBgaW5oZXJpdHM6ICR7aW5oZXJpdHN9OyBgKSArXG4gICAgICAoIWluaXRpYWxWYWx1ZSA/PyBgaW5pdGlhbC12YWx1ZTogJHtpbml0aWFsVmFsdWV9O2ApICtcbiAgICAgIFwiIH1cIlxuICAgIClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJQcm9wZXJ0eSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUU8sSUFBTSxtQkFBbUIsQ0FBQyxNQUFNLFFBQVEsVUFBVSxpQkFBaUI7QUFDeEUsU0FBTztBQUFBLElBQ0wsQ0FBQyxhQUFhLElBQUksRUFBRSxHQUNsQixPQUNDLENBQUMsU0FDRCxDQUFDLFdBQ0QsQ0FBQyxlQUNGO0FBQUEsRUFFSjtBQUNGO0FBQ0EsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K