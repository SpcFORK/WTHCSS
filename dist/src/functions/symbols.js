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

// src/WTFCss/src/functions/symbols.js
var symbols_exports = {};
__export(symbols_exports, {
  default: () => symbols_default,
  symbols: () => symbols
});
module.exports = __toCommonJS(symbols_exports);
var symbols = (type, ...values) => {
  const validTypes = ["cyclic", "numeric", "alphabetic", "symbolic", "fixed"];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid symbols type: ${type}. Expected one of ${validTypes.join(", ")}.`);
  }
  const formattedValues = values.map((value) => {
    if (typeof value === "string") {
      return `"${value}"`;
    } else if (value instanceof Image) {
      return value.toString();
    }
    throw new Error("Invalid value type: values must be strings or Image instances.");
  }).join(" ");
  return `symbols(${type} ${formattedValues})`;
};
var symbols_default = symbols;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3N5bWJvbHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogQ3JlYXRlcyBhIENTUyBzeW1ib2xzIHZhbHVlIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgdGhlIHN5bWJvbHMgbGlzdDsgb25lIG9mICdjeWNsaWMnLCAnbnVtZXJpYycsICdhbHBoYWJldGljJywgJ3N5bWJvbGljJywgJ2ZpeGVkJy5cbiAqIEBwYXJhbSB7Li4udmFsdWVzfSAtIFRoZSBzeW1ib2xzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBsaXN0LCB3aGljaCBjYW4gYmUgc3RyaW5ncyBvciBJbWFnZSBpbnN0YW5jZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIEEgQ1NTIHZhbHVlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHN5bWJvbHMgbGlzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbHMgPSAodHlwZSwgLi4udmFsdWVzKSA9PiB7XG4gIGNvbnN0IHZhbGlkVHlwZXMgPSBbJ2N5Y2xpYycsICdudW1lcmljJywgJ2FscGhhYmV0aWMnLCAnc3ltYm9saWMnLCAnZml4ZWQnXTtcbiAgaWYgKCF2YWxpZFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN5bWJvbHMgdHlwZTogJHt0eXBlfS4gRXhwZWN0ZWQgb25lIG9mICR7dmFsaWRUeXBlcy5qb2luKCcsICcpfS5gKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm1hdHRlZFZhbHVlcyA9IHZhbHVlcy5tYXAodmFsdWUgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gYFxcXCIke3ZhbHVlfVxcXCJgO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgICAgLy8gQXNzdW1pbmcgSW1hZ2UgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgYW4gaW1hZ2UsIGFuZCB0b1N0cmluZygpIHJldHVybnMgYSB2YWxpZCBDU1MgaW1hZ2UgdmFsdWVcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgdHlwZTogdmFsdWVzIG11c3QgYmUgc3RyaW5ncyBvciBJbWFnZSBpbnN0YW5jZXMuJyk7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYHN5bWJvbHMoJHt0eXBlfSAke2Zvcm1hdHRlZFZhbHVlc30pYDtcbn1cbmV4cG9ydCBkZWZhdWx0IHN5bWJvbHM7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNTyxJQUFNLFVBQVUsQ0FBQyxTQUFTLFdBQVc7QUFDMUMsUUFBTSxhQUFhLENBQUMsVUFBVSxXQUFXLGNBQWMsWUFBWSxPQUFPO0FBQzFFLE1BQUksQ0FBQyxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQzlCLFVBQU0sSUFBSSxNQUFNLHlCQUF5QixJQUFJLHFCQUFxQixXQUFXLEtBQUssSUFBSSxDQUFDLEdBQUc7QUFBQSxFQUM1RjtBQUVBLFFBQU0sa0JBQWtCLE9BQU8sSUFBSSxXQUFTO0FBQzFDLFFBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsYUFBTyxJQUFLLEtBQUs7QUFBQSxJQUNuQixXQUFXLGlCQUFpQixPQUFPO0FBRWpDLGFBQU8sTUFBTSxTQUFTO0FBQUEsSUFDeEI7QUFDQSxVQUFNLElBQUksTUFBTSxnRUFBZ0U7QUFBQSxFQUNsRixDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsU0FBTyxXQUFXLElBQUksSUFBSSxlQUFlO0FBQzNDO0FBQ0EsSUFBTyxrQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K