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
export {
  or_gate_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NhbGMuanMiLCAiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGFuZGxlcy9vci5nYXRlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENhbGN1bGF0ZSBhIENTUyBjYWxjKCkgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gVGhlIGV4cHJlc3Npb24gdG8gYmUgY2FsY3VsYXRlZC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjYWxjdWxhdGVkIENTUyBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY2FsYyA9IHBheWxvYWQgPT4gYGNhbGMoJHtwYXlsb2FkfSlgXG5leHBvcnQgZGVmYXVsdCBjYWxjIiwgImltcG9ydCB7IGNhbGMgfSBmcm9tICcuLi9mdW5jdGlvbnMvaW5kZXguanMnO1xuXG5jb25zdCBvckdhdGUgPSAoYSwgYikgPT4ge1xuICBjb25zdCBBb3ZlckIgPSAoYSwgYikgPT4gY2FsYyhgbWluKDEsIG1heCgke2F9IC0gJHtifSwgMCkpYCk7XG4gIGNvbnN0IEJvdmVyQSA9IChhLCBiKSA9PiBjYWxjKGAoMSAtICR7QW92ZXJCKGEsIGIpfSlgKTtcblxuICByZXR1cm4gW1xuICAgIGAke0JvdmVyQShiLCBhKX0gKiAke2F9ICsgJHtBb3ZlckIoYSwgYil9ICogJHtifWAsIC8vIFRydWUgaWYgZWl0aGVyIGEgb3IgYiBpcyB0cnVlXG4gICAgYCR7QW92ZXJCKGEsIGIpfSAqICR7YX0gKyAke0JvdmVyQShiLCBhKX0gKiAke2J9YCAgLy8gVHJ1ZSBpZiBib3RoIGEgYW5kIGIgYXJlIHRydWVcbiAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3JHYXRlIl0sCiAgIm1hcHBpbmdzIjogIjtBQUtPLElBQU0sT0FBTyxhQUFXLFFBQVEsT0FBTztBQUM5QyxJQUFPLGVBQVE7OztBQ0pmLElBQU0sU0FBUyxDQUFDLEdBQUcsTUFBTTtBQUN2QixRQUFNLFNBQVMsQ0FBQ0EsSUFBR0MsT0FBTSxhQUFLLGNBQWNELEVBQUMsTUFBTUMsRUFBQyxPQUFPO0FBQzNELFFBQU0sU0FBUyxDQUFDRCxJQUFHQyxPQUFNLGFBQUssUUFBUSxPQUFPRCxJQUFHQyxFQUFDLENBQUMsR0FBRztBQUVyRCxTQUFPO0FBQUEsSUFDTCxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFBQTtBQUFBLElBQy9DLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUFBO0FBQUEsRUFDakQ7QUFDRjtBQUVBLElBQU8sa0JBQVE7IiwKICAibmFtZXMiOiBbImEiLCAiYiJdCn0K