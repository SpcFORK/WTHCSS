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

// src/WTFCss/src/handles/index.js
var handles_exports = {};
__export(handles_exports, {
  default: () => handles_default
});
module.exports = __toCommonJS(handles_exports);

// src/WTFCss/src/functions/calc.js
var calc = (payload) => `calc(${payload})`;
var calc_default = calc;

// src/WTFCss/src/handles/or.gate.js
var orGate = (a, b) => {
  const AoverB = (a2, b2) => calc_default(`min(1, max(${a2} - ${b2}, 0))`);
  const BoverA = (a2, b2) => calc_default(`(1 - ${AoverB(a2, b2)})`);
  return [
    `${BoverA(b, a)} * ${a} + ${AoverB(a, b)} * ${b}`,
    // True if either a or b is true
    `${AoverB(a, b)} * ${a} + ${BoverA(b, a)} * ${b}`
    // True if both a and b are true
  ];
};
var or_gate_default = orGate;

// src/WTFCss/src/handles/index.js
var handles_default = {
  orGate: or_gate_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9pbmRleC5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvY2FsYy5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9oYW5kbGVzL29yLmdhdGUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBvckdhdGUgZnJvbSAnLi9vci5nYXRlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvckdhdGUsXG59IiwgIi8qKlxuICogQ2FsY3VsYXRlIGEgQ1NTIGNhbGMoKSBleHByZXNzaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBUaGUgZXhwcmVzc2lvbiB0byBiZSBjYWxjdWxhdGVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNhbGN1bGF0ZWQgQ1NTIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBjb25zdCBjYWxjID0gcGF5bG9hZCA9PiBgY2FsYygke3BheWxvYWR9KWBcbmV4cG9ydCBkZWZhdWx0IGNhbGMiLCAiaW1wb3J0IHsgY2FsYyB9IGZyb20gJy4uL2Z1bmN0aW9ucy9pbmRleC5qcyc7XG5cbmNvbnN0IG9yR2F0ZSA9IChhLCBiKSA9PiB7XG4gIGNvbnN0IEFvdmVyQiA9IChhLCBiKSA9PiBjYWxjKGBtaW4oMSwgbWF4KCR7YX0gLSAke2J9LCAwKSlgKTtcbiAgY29uc3QgQm92ZXJBID0gKGEsIGIpID0+IGNhbGMoYCgxIC0gJHtBb3ZlckIoYSwgYil9KWApO1xuXG4gIHJldHVybiBbXG4gICAgYCR7Qm92ZXJBKGIsIGEpfSAqICR7YX0gKyAke0FvdmVyQihhLCBiKX0gKiAke2J9YCwgLy8gVHJ1ZSBpZiBlaXRoZXIgYSBvciBiIGlzIHRydWVcbiAgICBgJHtBb3ZlckIoYSwgYil9ICogJHthfSArICR7Qm92ZXJBKGIsIGEpfSAqICR7Yn1gICAvLyBUcnVlIGlmIGJvdGggYSBhbmQgYiBhcmUgdHJ1ZVxuICBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvckdhdGUiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0tPLElBQU0sT0FBTyxhQUFXLFFBQVEsT0FBTztBQUM5QyxJQUFPLGVBQVE7OztBQ0pmLElBQU0sU0FBUyxDQUFDLEdBQUcsTUFBTTtBQUN2QixRQUFNLFNBQVMsQ0FBQ0EsSUFBR0MsT0FBTSxhQUFLLGNBQWNELEVBQUMsTUFBTUMsRUFBQyxPQUFPO0FBQzNELFFBQU0sU0FBUyxDQUFDRCxJQUFHQyxPQUFNLGFBQUssUUFBUSxPQUFPRCxJQUFHQyxFQUFDLENBQUMsR0FBRztBQUVyRCxTQUFPO0FBQUEsSUFDTCxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFBQTtBQUFBLElBQy9DLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUFBO0FBQUEsRUFDakQ7QUFDRjtBQUVBLElBQU8sa0JBQVE7OztBRlZmLElBQU8sa0JBQVE7QUFBQSxFQUNiO0FBQ0Y7IiwKICAibmFtZXMiOiBbImEiLCAiYiJdCn0K