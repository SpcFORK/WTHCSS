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

// src/WTFCss/src/handles/or.gate.js
var or_gate_exports = {};
__export(or_gate_exports, {
  default: () => or_gate_default
});
module.exports = __toCommonJS(or_gate_exports);

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9vci5nYXRlLmpzIiwgIi4uLy4uLy4uL3NyYy9XVEZDc3Mvc3JjL2Z1bmN0aW9ucy9jYWxjLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjYWxjIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2luZGV4LmpzJztcblxuY29uc3Qgb3JHYXRlID0gKGEsIGIpID0+IHtcbiAgY29uc3QgQW92ZXJCID0gKGEsIGIpID0+IGNhbGMoYG1pbigxLCBtYXgoJHthfSAtICR7Yn0sIDApKWApO1xuICBjb25zdCBCb3ZlckEgPSAoYSwgYikgPT4gY2FsYyhgKDEgLSAke0FvdmVyQihhLCBiKX0pYCk7XG5cbiAgcmV0dXJuIFtcbiAgICBgJHtCb3ZlckEoYiwgYSl9ICogJHthfSArICR7QW92ZXJCKGEsIGIpfSAqICR7Yn1gLCAvLyBUcnVlIGlmIGVpdGhlciBhIG9yIGIgaXMgdHJ1ZVxuICAgIGAke0FvdmVyQihhLCBiKX0gKiAke2F9ICsgJHtCb3ZlckEoYiwgYSl9ICogJHtifWAgIC8vIFRydWUgaWYgYm90aCBhIGFuZCBiIGFyZSB0cnVlXG4gIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yR2F0ZSIsICIvKipcbiAqIENhbGN1bGF0ZSBhIENTUyBjYWxjKCkgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gVGhlIGV4cHJlc3Npb24gdG8gYmUgY2FsY3VsYXRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjYWxjdWxhdGVkIENTUyBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY2FsYyA9IHBheWxvYWQgPT4gYGNhbGMoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBjYWxjIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNLTyxJQUFNLE9BQU8sYUFBVyxRQUFRLE9BQU87QUFDOUMsSUFBTyxlQUFROzs7QURKZixJQUFNLFNBQVMsQ0FBQyxHQUFHLE1BQU07QUFDdkIsUUFBTSxTQUFTLENBQUNBLElBQUdDLE9BQU0sYUFBSyxjQUFjRCxFQUFDLE1BQU1DLEVBQUMsT0FBTztBQUMzRCxRQUFNLFNBQVMsQ0FBQ0QsSUFBR0MsT0FBTSxhQUFLLFFBQVEsT0FBT0QsSUFBR0MsRUFBQyxDQUFDLEdBQUc7QUFFckQsU0FBTztBQUFBLElBQ0wsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQUE7QUFBQSxJQUMvQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFBQTtBQUFBLEVBQ2pEO0FBQ0Y7QUFFQSxJQUFPLGtCQUFROyIsCiAgIm5hbWVzIjogWyJhIiwgImIiXQp9Cg==