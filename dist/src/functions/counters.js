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

// src/WTFCss/src/functions/counters.js
var counters_exports = {};
__export(counters_exports, {
  counters: () => counters,
  default: () => counters_default
});
module.exports = __toCommonJS(counters_exports);
var counters = (counterName, string, counterStyle = "decimal") => {
  if (typeof counterName !== "string" || counterName.startsWith("--") || ["none", "unset", "initial", "inherit"].includes(counterName)) {
    throw new Error("Invalid counter name.");
  }
  if (typeof string !== "string") {
    throw new Error("Invalid string for concatenation.");
  }
  if (typeof counterStyle !== "string") {
    throw new Error("Invalid counter style.");
  }
  return `counters(${counterName}, "${string}"${counterStyle !== "decimal" ? ", " + counterStyle : ""})`;
};
var counters_default = counters;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXJzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvbnN0cnVjdHMgYSBDU1MgY291bnRlcnMgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50ZXJOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gVGhlIHN0cmluZyB0byBiZSBjb25jYXRlbmF0ZWQgd2l0aCB0aGUgY291bnRlciB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY291bnRlclN0eWxlPSdkZWNpbWFsJ10gLSBUaGUgc3R5bGUgb2YgdGhlIGNvdW50ZXIsIGRlZmF1bHQgaXMgJ2RlY2ltYWwnLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBjb3VudGVyIG5hbWUsIHN0cmluZywgb3IgY291bnRlciBzdHlsZSBpcyBpbnZhbGlkLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY291bnRlcnMgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY291bnRlcnMgPSAoY291bnRlck5hbWUsIHN0cmluZywgY291bnRlclN0eWxlID0gJ2RlY2ltYWwnKSA9PiB7XG4gIGlmICh0eXBlb2YgY291bnRlck5hbWUgIT09ICdzdHJpbmcnIHx8IGNvdW50ZXJOYW1lLnN0YXJ0c1dpdGgoJy0tJykgfHwgWydub25lJywgJ3Vuc2V0JywgJ2luaXRpYWwnLCAnaW5oZXJpdCddLmluY2x1ZGVzKGNvdW50ZXJOYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIG5hbWUuJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nIGZvciBjb25jYXRlbmF0aW9uLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb3VudGVyU3R5bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgc3R5bGUuJyk7XG4gIH1cblxuICByZXR1cm4gYGNvdW50ZXJzKCR7Y291bnRlck5hbWV9LCBcIiR7c3RyaW5nfVwiJHtjb3VudGVyU3R5bGUgIT09ICdkZWNpbWFsJyA/ICcsICcgKyBjb3VudGVyU3R5bGUgOiAnJ30pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY291bnRlcnM7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRTyxJQUFNLFdBQVcsQ0FBQyxhQUFhLFFBQVEsZUFBZSxjQUFjO0FBQ3pFLE1BQUksT0FBTyxnQkFBZ0IsWUFBWSxZQUFZLFdBQVcsSUFBSSxLQUFLLENBQUMsUUFBUSxTQUFTLFdBQVcsU0FBUyxFQUFFLFNBQVMsV0FBVyxHQUFHO0FBQ3BJLFVBQU0sSUFBSSxNQUFNLHVCQUF1QjtBQUFBLEVBQ3pDO0FBRUEsTUFBSSxPQUFPLFdBQVcsVUFBVTtBQUM5QixVQUFNLElBQUksTUFBTSxtQ0FBbUM7QUFBQSxFQUNyRDtBQUVBLE1BQUksT0FBTyxpQkFBaUIsVUFBVTtBQUNwQyxVQUFNLElBQUksTUFBTSx3QkFBd0I7QUFBQSxFQUMxQztBQUVBLFNBQU8sWUFBWSxXQUFXLE1BQU0sTUFBTSxJQUFJLGlCQUFpQixZQUFZLE9BQU8sZUFBZSxFQUFFO0FBQ3JHO0FBRUEsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K