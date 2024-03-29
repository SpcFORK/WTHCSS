// src/WTFCss/src/functions/element.js
var element = (id) => {
  if (typeof id !== "string" || !id.startsWith("#")) {
    throw new Error('Invalid ID for element function. ID must be a string starting with "#".');
  }
  if (typeof document.mozSetImageElement !== "function") {
    console.warn("The element() function is experimental and not supported in all browsers.");
  }
  return `-moz-element(${id})`;
};
var element_default = element;
export {
  element_default as default,
  element
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2VsZW1lbnQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogUmV0cmlldmVzIGEgQ1NTIGltYWdlIHZhbHVlIGZvciBhIGdpdmVuIGVsZW1lbnQgSUQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgSUQgb2YgdGhlIGVsZW1lbnQsIG11c3Qgc3RhcnQgd2l0aCAnIycuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIElEIGlzIG5vdCBhIHN0cmluZyBvciBkb2Vzbid0IHN0YXJ0IHdpdGggJyMnLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIENTUyBpbWFnZSB2YWx1ZSBmb3IgdGhlIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBlbGVtZW50ID0gKGlkKSA9PiB7XG4gIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnIHx8ICFpZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSUQgZm9yIGVsZW1lbnQgZnVuY3Rpb24uIElEIG11c3QgYmUgYSBzdHJpbmcgc3RhcnRpbmcgd2l0aCBcIiNcIi4nKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZSBmdW5jdGlvbiBpcyBzdXBwb3J0ZWRcbiAgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pTZXRJbWFnZUVsZW1lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLndhcm4oJ1RoZSBlbGVtZW50KCkgZnVuY3Rpb24gaXMgZXhwZXJpbWVudGFsIGFuZCBub3Qgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vycy4nKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgQ1NTIGltYWdlIHZhbHVlXG4gIHJldHVybiBgLW1vei1lbGVtZW50KCR7aWR9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlbGVtZW50OyJdLAogICJtYXBwaW5ncyI6ICI7QUFNTyxJQUFNLFVBQVUsQ0FBQyxPQUFPO0FBQzdCLE1BQUksT0FBTyxPQUFPLFlBQVksQ0FBQyxHQUFHLFdBQVcsR0FBRyxHQUFHO0FBQ2pELFVBQU0sSUFBSSxNQUFNLHlFQUF5RTtBQUFBLEVBQzNGO0FBR0EsTUFBSSxPQUFPLFNBQVMsdUJBQXVCLFlBQVk7QUFDckQsWUFBUSxLQUFLLDJFQUEyRTtBQUFBLEVBQzFGO0FBR0EsU0FBTyxnQkFBZ0IsRUFBRTtBQUMzQjtBQUVBLElBQU8sa0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==