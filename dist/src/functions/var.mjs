// src/WTFCss/src/functions/var.js
var cssVar = (name, fallback) => {
  if (typeof name !== "string") {
    throw new Error("The custom property name must be a string.");
  }
  if (fallback !== void 0 && typeof fallback !== "string") {
    throw new Error("The fallback value must be a string.");
  }
  return `var(${name}${fallback !== void 0 ? `, ${fallback}` : ""})`;
};
var var_default = cssVar;
export {
  cssVar,
  var_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3Zhci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDb25zdHJ1Y3RzIGEgQ1NTIHZhcmlhYmxlIHdpdGggYW4gb3B0aW9uYWwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBDU1MgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZhbGxiYWNrXSAtIFRoZSBvcHRpb25hbCBmYWxsYmFjayB2YWx1ZSBpZiB0aGUgdmFyaWFibGUgaXMgbm90IGRlZmluZWQuXG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG5hbWUgaXMgbm90IGEgc3RyaW5nIG9yIGlmIHRoZSBmYWxsYmFjayBpcyBwcm92aWRlZCBhbmQgaXMgbm90IGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY3NzVmFyID0gKG5hbWUsIGZhbGxiYWNrKSA9PiB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXN0b20gcHJvcGVydHkgbmFtZSBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgaWYgKGZhbGxiYWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZhbGxiYWNrICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZhbGxiYWNrIHZhbHVlIG11c3QgYmUgYSBzdHJpbmcuJyk7XG4gIH1cblxuICByZXR1cm4gYHZhcigke25hbWV9JHtmYWxsYmFjayAhPT0gdW5kZWZpbmVkID8gYCwgJHtmYWxsYmFja31gIDogJyd9KWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgY3NzVmFyOyJdLAogICJtYXBwaW5ncyI6ICI7QUFNTyxJQUFNLFNBQVMsQ0FBQyxNQUFNLGFBQWE7QUFDeEMsTUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixVQUFNLElBQUksTUFBTSw0Q0FBNEM7QUFBQSxFQUM5RDtBQUVBLE1BQUksYUFBYSxVQUFhLE9BQU8sYUFBYSxVQUFVO0FBQzFELFVBQU0sSUFBSSxNQUFNLHNDQUFzQztBQUFBLEVBQ3hEO0FBRUEsU0FBTyxPQUFPLElBQUksR0FBRyxhQUFhLFNBQVksS0FBSyxRQUFRLEtBQUssRUFBRTtBQUNwRTtBQUNBLElBQU8sY0FBUTsiLAogICJuYW1lcyI6IFtdCn0K