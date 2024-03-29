// src/WTFCss/src/functions/counters.js
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
export {
  counters,
  counters_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXJzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENvbnN0cnVjdHMgYSBDU1MgY291bnRlcnMgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50ZXJOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gVGhlIHN0cmluZyB0byBiZSBjb25jYXRlbmF0ZWQgd2l0aCB0aGUgY291bnRlciB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY291bnRlclN0eWxlPSdkZWNpbWFsJ10gLSBUaGUgc3R5bGUgb2YgdGhlIGNvdW50ZXIsIGRlZmF1bHQgaXMgJ2RlY2ltYWwnLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBjb3VudGVyIG5hbWUsIHN0cmluZywgb3IgY291bnRlciBzdHlsZSBpcyBpbnZhbGlkLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY291bnRlcnMgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY291bnRlcnMgPSAoY291bnRlck5hbWUsIHN0cmluZywgY291bnRlclN0eWxlID0gJ2RlY2ltYWwnKSA9PiB7XG4gIGlmICh0eXBlb2YgY291bnRlck5hbWUgIT09ICdzdHJpbmcnIHx8IGNvdW50ZXJOYW1lLnN0YXJ0c1dpdGgoJy0tJykgfHwgWydub25lJywgJ3Vuc2V0JywgJ2luaXRpYWwnLCAnaW5oZXJpdCddLmluY2x1ZGVzKGNvdW50ZXJOYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb3VudGVyIG5hbWUuJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nIGZvciBjb25jYXRlbmF0aW9uLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb3VudGVyU3R5bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgc3R5bGUuJyk7XG4gIH1cblxuICByZXR1cm4gYGNvdW50ZXJzKCR7Y291bnRlck5hbWV9LCBcIiR7c3RyaW5nfVwiJHtjb3VudGVyU3R5bGUgIT09ICdkZWNpbWFsJyA/ICcsICcgKyBjb3VudGVyU3R5bGUgOiAnJ30pYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY291bnRlcnM7Il0sCiAgIm1hcHBpbmdzIjogIjtBQVFPLElBQU0sV0FBVyxDQUFDLGFBQWEsUUFBUSxlQUFlLGNBQWM7QUFDekUsTUFBSSxPQUFPLGdCQUFnQixZQUFZLFlBQVksV0FBVyxJQUFJLEtBQUssQ0FBQyxRQUFRLFNBQVMsV0FBVyxTQUFTLEVBQUUsU0FBUyxXQUFXLEdBQUc7QUFDcEksVUFBTSxJQUFJLE1BQU0sdUJBQXVCO0FBQUEsRUFDekM7QUFFQSxNQUFJLE9BQU8sV0FBVyxVQUFVO0FBQzlCLFVBQU0sSUFBSSxNQUFNLG1DQUFtQztBQUFBLEVBQ3JEO0FBRUEsTUFBSSxPQUFPLGlCQUFpQixVQUFVO0FBQ3BDLFVBQU0sSUFBSSxNQUFNLHdCQUF3QjtBQUFBLEVBQzFDO0FBRUEsU0FBTyxZQUFZLFdBQVcsTUFBTSxNQUFNLElBQUksaUJBQWlCLFlBQVksT0FBTyxlQUFlLEVBQUU7QUFDckc7QUFFQSxJQUFPLG1CQUFROyIsCiAgIm5hbWVzIjogW10KfQo=