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

// src/WTFCss/src/functions/counter.js
var counter_exports = {};
__export(counter_exports, {
  counter: () => counter,
  default: () => counter_default
});
module.exports = __toCommonJS(counter_exports);
var counter = (counterName, counterStyle = "decimal") => {
  if (typeof counterName !== "string" || counterName.startsWith("--") || ["none", "unset", "initial", "inherit"].includes(counterName)) {
    throw new Error("Invalid counter name.");
  }
  if (typeof counterStyle !== "string") {
    throw new Error("Invalid counter style.");
  }
  return `counter(${counterName}${counterStyle !== "decimal" ? ", " + counterStyle : ""})`;
};
var counter_default = counter;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogR2VuZXJhdGVzIGEgQ1NTIGNvdW50ZXIgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50ZXJOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvdW50ZXJTdHlsZT0nZGVjaW1hbCddIC0gVGhlIHN0eWxlIG9mIHRoZSBjb3VudGVyLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY291bnRlciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvdW50ZXIgPSAoY291bnRlck5hbWUsIGNvdW50ZXJTdHlsZSA9ICdkZWNpbWFsJykgPT4ge1xuICBpZiAodHlwZW9mIGNvdW50ZXJOYW1lICE9PSAnc3RyaW5nJyB8fCBjb3VudGVyTmFtZS5zdGFydHNXaXRoKCctLScpIHx8IFsnbm9uZScsICd1bnNldCcsICdpbml0aWFsJywgJ2luaGVyaXQnXS5pbmNsdWRlcyhjb3VudGVyTmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBuYW1lLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb3VudGVyU3R5bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgc3R5bGUuJyk7XG4gIH1cblxuICByZXR1cm4gYGNvdW50ZXIoJHtjb3VudGVyTmFtZX0ke2NvdW50ZXJTdHlsZSAhPT0gJ2RlY2ltYWwnID8gJywgJyArIGNvdW50ZXJTdHlsZSA6ICcnfSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3VudGVyOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU8sSUFBTSxVQUFVLENBQUMsYUFBYSxlQUFlLGNBQWM7QUFDaEUsTUFBSSxPQUFPLGdCQUFnQixZQUFZLFlBQVksV0FBVyxJQUFJLEtBQUssQ0FBQyxRQUFRLFNBQVMsV0FBVyxTQUFTLEVBQUUsU0FBUyxXQUFXLEdBQUc7QUFDcEksVUFBTSxJQUFJLE1BQU0sdUJBQXVCO0FBQUEsRUFDekM7QUFFQSxNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDcEMsVUFBTSxJQUFJLE1BQU0sd0JBQXdCO0FBQUEsRUFDMUM7QUFFQSxTQUFPLFdBQVcsV0FBVyxHQUFHLGlCQUFpQixZQUFZLE9BQU8sZUFBZSxFQUFFO0FBQ3ZGO0FBRUEsSUFBTyxrQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K