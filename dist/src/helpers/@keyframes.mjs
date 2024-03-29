// src/WTFCss/src/helpers/@keyframes.js
var defineKeyframes = (name, frames) => {
  if (typeof name !== "string" || !Array.isArray(frames)) {
    throw new TypeError("Invalid arguments for defineKeyframes.");
  }
  const keyframeRules = frames.map((frame) => {
    const offset = Object.keys(frame)[0];
    const properties = Object.entries(frame[offset]).map(([prop, value]) => {
      return `${prop}: ${value}`;
    }).join("; ");
    return `${offset} { ${properties} }`;
  }).join(" ");
  return `@keyframes ${name} { ${keyframeRules} }`;
};
var keyframes_default = defineKeyframes;
export {
  keyframes_default as default,
  defineKeyframes
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Aa2V5ZnJhbWVzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGFuaW1hdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZnJhbWVzIC0gQW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIGtleWZyYW1lcy5cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGFyZ3VtZW50cyBhcmUgbm90IGEgc3RyaW5nIGFuZCBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAa2V5ZnJhbWVzIHJ1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVLZXlmcmFtZXMgPSAobmFtZSwgZnJhbWVzKSA9PiB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIUFycmF5LmlzQXJyYXkoZnJhbWVzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzIGZvciBkZWZpbmVLZXlmcmFtZXMuJyk7XG4gIH1cblxuICBjb25zdCBrZXlmcmFtZVJ1bGVzID0gZnJhbWVzLm1hcChmcmFtZSA9PiB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gT2JqZWN0LmtleXMoZnJhbWUpWzBdO1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3QuZW50cmllcyhmcmFtZVtvZmZzZXRdKS5tYXAoKFtwcm9wLCB2YWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiBgJHtwcm9wfTogJHt2YWx1ZX1gO1xuICAgIH0pLmpvaW4oJzsgJyk7XG5cbiAgICByZXR1cm4gYCR7b2Zmc2V0fSB7ICR7cHJvcGVydGllc30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBrZXlmcmFtZXMgJHtuYW1lfSB7ICR7a2V5ZnJhbWVSdWxlc30gfWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lS2V5ZnJhbWVzIl0sCiAgIm1hcHBpbmdzIjogIjtBQU9PLElBQU0sa0JBQWtCLENBQUMsTUFBTSxXQUFXO0FBQy9DLE1BQUksT0FBTyxTQUFTLFlBQVksQ0FBQyxNQUFNLFFBQVEsTUFBTSxHQUFHO0FBQ3RELFVBQU0sSUFBSSxVQUFVLHdDQUF3QztBQUFBLEVBQzlEO0FBRUEsUUFBTSxnQkFBZ0IsT0FBTyxJQUFJLFdBQVM7QUFDeEMsVUFBTSxTQUFTLE9BQU8sS0FBSyxLQUFLLEVBQUUsQ0FBQztBQUNuQyxVQUFNLGFBQWEsT0FBTyxRQUFRLE1BQU0sTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU07QUFDdEUsYUFBTyxHQUFHLElBQUksS0FBSyxLQUFLO0FBQUEsSUFDMUIsQ0FBQyxFQUFFLEtBQUssSUFBSTtBQUVaLFdBQU8sR0FBRyxNQUFNLE1BQU0sVUFBVTtBQUFBLEVBQ2xDLENBQUMsRUFBRSxLQUFLLEdBQUc7QUFFWCxTQUFPLGNBQWMsSUFBSSxNQUFNLGFBQWE7QUFDOUM7QUFDQSxJQUFPLG9CQUFROyIsCiAgIm5hbWVzIjogW10KfQo=