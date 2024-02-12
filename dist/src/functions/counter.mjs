// src/WTFCss/src/functions/counter.js
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
export {
  counter,
  counter_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2NvdW50ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogR2VuZXJhdGVzIGEgQ1NTIGNvdW50ZXIgZnVuY3Rpb24gc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50ZXJOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvdW50ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvdW50ZXJTdHlsZT0nZGVjaW1hbCddIC0gVGhlIHN0eWxlIG9mIHRoZSBjb3VudGVyLlxuICogQHJldHVybnMge3N0cmluZ30gQSBDU1MgY291bnRlciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvdW50ZXIgPSAoY291bnRlck5hbWUsIGNvdW50ZXJTdHlsZSA9ICdkZWNpbWFsJykgPT4ge1xuICBpZiAodHlwZW9mIGNvdW50ZXJOYW1lICE9PSAnc3RyaW5nJyB8fCBjb3VudGVyTmFtZS5zdGFydHNXaXRoKCctLScpIHx8IFsnbm9uZScsICd1bnNldCcsICdpbml0aWFsJywgJ2luaGVyaXQnXS5pbmNsdWRlcyhjb3VudGVyTmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY291bnRlciBuYW1lLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb3VudGVyU3R5bGUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvdW50ZXIgc3R5bGUuJyk7XG4gIH1cblxuICByZXR1cm4gYGNvdW50ZXIoJHtjb3VudGVyTmFtZX0ke2NvdW50ZXJTdHlsZSAhPT0gJ2RlY2ltYWwnID8gJywgJyArIGNvdW50ZXJTdHlsZSA6ICcnfSlgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3VudGVyOyJdLAogICJtYXBwaW5ncyI6ICI7QUFNTyxJQUFNLFVBQVUsQ0FBQyxhQUFhLGVBQWUsY0FBYztBQUNoRSxNQUFJLE9BQU8sZ0JBQWdCLFlBQVksWUFBWSxXQUFXLElBQUksS0FBSyxDQUFDLFFBQVEsU0FBUyxXQUFXLFNBQVMsRUFBRSxTQUFTLFdBQVcsR0FBRztBQUNwSSxVQUFNLElBQUksTUFBTSx1QkFBdUI7QUFBQSxFQUN6QztBQUVBLE1BQUksT0FBTyxpQkFBaUIsVUFBVTtBQUNwQyxVQUFNLElBQUksTUFBTSx3QkFBd0I7QUFBQSxFQUMxQztBQUVBLFNBQU8sV0FBVyxXQUFXLEdBQUcsaUJBQWlCLFlBQVksT0FBTyxlQUFlLEVBQUU7QUFDdkY7QUFFQSxJQUFPLGtCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=