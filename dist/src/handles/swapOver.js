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

// src/WTFCss/src/handles/swapOver.js
var swapOver_exports = {};
__export(swapOver_exports, {
  swapOver: () => swapOver
});
module.exports = __toCommonJS(swapOver_exports);

// src/WTFCss/src/functions/calc.js
var calc = (payload) => `calc(${payload})`;
var calc_default = calc;

// src/WTFCss/src/handles/swapOver.js
var swapOver = (a, b) => (Aover, Bover) => [
  calc_default(
    `${Bover} * ${a} + ${Aover} * ${b});`
  ),
  calc_default(
    `${Aover} * ${a} + ${Bover} * ${b});`
  )
];
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9zd2FwT3Zlci5qcyIsICIuLi8uLi8uLi9zcmMvV1RGQ3NzL3NyYy9mdW5jdGlvbnMvY2FsYy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgY2FsYyB9IGZyb20gJy4uL2Z1bmN0aW9ucy9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBzd2FwT3ZlciA9IChhLCBiKSA9PiAoQW92ZXIsIEJvdmVyKSA9PiBbXG4gIGNhbGMoXG4gICAgYCR7Qm92ZXJ9ICogJHthfSArICR7QW92ZXJ9ICogJHtifSk7YFxuICApLFxuICBjYWxjKFxuICAgIGAke0FvdmVyfSAqICR7YX0gKyAke0JvdmVyfSAqICR7Yn0pO2BcbiAgKVxuXSIsICIvKipcbiAqIENhbGN1bGF0ZSBhIENTUyBjYWxjKCkgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gVGhlIGV4cHJlc3Npb24gdG8gYmUgY2FsY3VsYXRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjYWxjdWxhdGVkIENTUyBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY2FsYyA9IHBheWxvYWQgPT4gYGNhbGMoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBjYWxjIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNLTyxJQUFNLE9BQU8sYUFBVyxRQUFRLE9BQU87QUFDOUMsSUFBTyxlQUFROzs7QURKUixJQUFNLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLFVBQVU7QUFBQSxFQUNsRDtBQUFBLElBQ0UsR0FBRyxLQUFLLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsSUFDRSxHQUFHLEtBQUssTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7QUFBQSxFQUNuQztBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=