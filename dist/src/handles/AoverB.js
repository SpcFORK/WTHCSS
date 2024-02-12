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

// src/WTFCss/src/handles/AoverB.js
var AoverB_exports = {};
__export(AoverB_exports, {
  AoverB: () => AoverB,
  BoverA: () => BoverA
});
module.exports = __toCommonJS(AoverB_exports);

// src/WTFCss/src/functions/max.js
var max = (...args) => `max(${args.join(", ")})`;
var max_default = max;

// src/WTFCss/src/functions/min.js
var min = (...args) => `min(${args.join(", ")})`;
var min_default = min;

// src/WTFCss/src/handles/AoverB.js
var AoverB = (a, b) => min_default(1, max_default(`a - b`, 0));
var BoverA = (a, b) => `(1 - ${AoverB(a, b)})`;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9Bb3ZlckIuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL21heC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvbWluLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBtaW4sIG1heCB9IGZyb20gJy4uL2Z1bmN0aW9ucy9pbmRleC5qcyc7XG4vLyBpbXBvcnQgaGVscGVycyBmcm9tICcuLi9oZWxwZXJzL2luZGV4LmpzJztcblxuY29uc3QgQW92ZXJCID0gKGEsIGIpID0+IG1pbigxLCBtYXgoYGEgLSBiYCwgMCkpXG5jb25zdCBCb3ZlckEgPSAoYSwgYikgPT4gYCgxIC0gJHtBb3ZlckIoYSwgYil9KWBcblxuZXhwb3J0IHtcbiAgQW92ZXJCLFxuICBCb3ZlckEsXG59IiwgIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWF4aW11bSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gKiBAcGFyYW0gey4uLmFyZ3N9IGFyZ3MgLSBBIHNldCBvZiBudW1lcmljIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgbWF4KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbWF4ID0gKC4uLmFyZ3MpID0+IGBtYXgoJHthcmdzLmpvaW4oJywgJyl9KWBcbmV4cG9ydCBkZWZhdWx0IG1heCIsICJcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWluaW11bSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gKiBAcGFyYW0gey4uLmFyZ3N9IC0gQSBzZXQgb2YgbnVtZXJpYyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIG1pbigpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbiA9ICguLi5hcmdzKSA9PiBgbWluKCR7YXJncy5qb2luKCcsICcpfSlgXG5leHBvcnQgZGVmYXVsdCBtaW4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDS08sSUFBTSxNQUFNLElBQUksU0FBUyxPQUFPLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDdEQsSUFBTyxjQUFROzs7QUNBUixJQUFNLE1BQU0sSUFBSSxTQUFTLE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQztBQUN0RCxJQUFPLGNBQVE7OztBRkpmLElBQU0sU0FBUyxDQUFDLEdBQUcsTUFBTSxZQUFJLEdBQUcsWUFBSSxTQUFTLENBQUMsQ0FBQztBQUMvQyxJQUFNLFNBQVMsQ0FBQyxHQUFHLE1BQU0sUUFBUSxPQUFPLEdBQUcsQ0FBQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=