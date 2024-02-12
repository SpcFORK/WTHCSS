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

// src/WTFCss/src/functions/env.js
var env_exports = {};
__export(env_exports, {
  default: () => env_default,
  env: () => env,
  keyboardInset: () => keyboardInset,
  safeAreaInsets: () => safeAreaInsets,
  titlebarArea: () => titlebarArea
});
module.exports = __toCommonJS(env_exports);
var env = (variable, fallback) => {
  const envVar = `env(${variable}${fallback ? `, ${fallback}` : ""})`;
  return envVar;
};
var safeAreaInsets = {
  top: (fallback) => env("safe-area-inset-top", fallback),
  right: (fallback) => env("safe-area-inset-right", fallback),
  bottom: (fallback) => env("safe-area-inset-bottom", fallback),
  left: (fallback) => env("safe-area-inset-left", fallback)
};
var titlebarArea = {
  x: (fallback) => env("titlebar-area-x", fallback),
  y: (fallback) => env("titlebar-area-y", fallback),
  width: (fallback) => env("titlebar-area-width", fallback),
  height: (fallback) => env("titlebar-area-height", fallback)
};
var keyboardInset = {
  top: (fallback) => env("keyboard-inset-top", fallback),
  right: (fallback) => env("keyboard-inset-right", fallback),
  bottom: (fallback) => env("keyboard-inset-bottom", fallback),
  left: (fallback) => env("keyboard-inset-left", fallback),
  width: (fallback) => env("keyboard-inset-width", fallback),
  height: (fallback) => env("keyboard-inset-height", fallback)
};
var env_default = {
  env,
  safeAreaInsets,
  titlebarArea,
  keyboardInset
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Vudi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBSZXRyaWV2ZXMgYSBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGUgdmFsdWUsIHdpdGggYW4gb3B0aW9uYWwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFyaWFibGUgLSBUaGUgbmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2ZhbGxiYWNrXSAtIFRoZSBmYWxsYmFjayB2YWx1ZSBpZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBDU1MgZW52KCkgZnVuY3Rpb24gc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZW52ID0gKHZhcmlhYmxlLCBmYWxsYmFjaykgPT4ge1xuICBjb25zdCBlbnZWYXIgPSBgZW52KCR7dmFyaWFibGV9JHtmYWxsYmFjayA/IGAsICR7ZmFsbGJhY2t9YCA6ICcnfSlgO1xuICByZXR1cm4gZW52VmFyO1xufTtcblxuLy8gUHJvdmlkZXMgYSBtZWNoYW5pc20gdG8gcmV0cmlldmUgZW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBDU1Ncbi8qKlxuICogUmVwcmVzZW50cyBzYWZlIGFyZWEgaW5zZXRzIGZvciBDU1MgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICovXG5leHBvcnQgY29uc3Qgc2FmZUFyZWFJbnNldHMgPSB7XG4gIHRvcDogKGZhbGxiYWNrKSA9PiBlbnYoJ3NhZmUtYXJlYS1pbnNldC10b3AnLCBmYWxsYmFjayksXG4gIHJpZ2h0OiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LXJpZ2h0JywgZmFsbGJhY2spLFxuICBib3R0b206IChmYWxsYmFjaykgPT4gZW52KCdzYWZlLWFyZWEtaW5zZXQtYm90dG9tJywgZmFsbGJhY2spLFxuICBsZWZ0OiAoZmFsbGJhY2spID0+IGVudignc2FmZS1hcmVhLWluc2V0LWxlZnQnLCBmYWxsYmFjaylcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aXRsZSBiYXIgYXJlYSBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHRpdGxlYmFyQXJlYSA9IHtcbiAgeDogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEteCcsIGZhbGxiYWNrKSxcbiAgeTogKGZhbGxiYWNrKSA9PiBlbnYoJ3RpdGxlYmFyLWFyZWEteScsIGZhbGxiYWNrKSxcbiAgd2lkdGg6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLXdpZHRoJywgZmFsbGJhY2spLFxuICBoZWlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCd0aXRsZWJhci1hcmVhLWhlaWdodCcsIGZhbGxiYWNrKVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGtleWJvYXJkIGluc2V0cyBmb3IgQ1NTIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGtleWJvYXJkSW5zZXQgPSB7XG4gIHRvcDogKGZhbGxiYWNrKSA9PiBlbnYoJ2tleWJvYXJkLWluc2V0LXRvcCcsIGZhbGxiYWNrKSxcbiAgcmlnaHQ6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC1yaWdodCcsIGZhbGxiYWNrKSxcbiAgYm90dG9tOiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtYm90dG9tJywgZmFsbGJhY2spLFxuICBsZWZ0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtbGVmdCcsIGZhbGxiYWNrKSxcbiAgd2lkdGg6IChmYWxsYmFjaykgPT4gZW52KCdrZXlib2FyZC1pbnNldC13aWR0aCcsIGZhbGxiYWNrKSxcbiAgaGVpZ2h0OiAoZmFsbGJhY2spID0+IGVudigna2V5Ym9hcmQtaW5zZXQtaGVpZ2h0JywgZmFsbGJhY2spXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVudixcbiAgc2FmZUFyZWFJbnNldHMsXG4gIHRpdGxlYmFyQXJlYSxcbiAga2V5Ym9hcmRJbnNldFxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU8sSUFBTSxNQUFNLENBQUMsVUFBVSxhQUFhO0FBQ3pDLFFBQU0sU0FBUyxPQUFPLFFBQVEsR0FBRyxXQUFXLEtBQUssUUFBUSxLQUFLLEVBQUU7QUFDaEUsU0FBTztBQUNUO0FBTU8sSUFBTSxpQkFBaUI7QUFBQSxFQUM1QixLQUFLLENBQUMsYUFBYSxJQUFJLHVCQUF1QixRQUFRO0FBQUEsRUFDdEQsT0FBTyxDQUFDLGFBQWEsSUFBSSx5QkFBeUIsUUFBUTtBQUFBLEVBQzFELFFBQVEsQ0FBQyxhQUFhLElBQUksMEJBQTBCLFFBQVE7QUFBQSxFQUM1RCxNQUFNLENBQUMsYUFBYSxJQUFJLHdCQUF3QixRQUFRO0FBQzFEO0FBS08sSUFBTSxlQUFlO0FBQUEsRUFDMUIsR0FBRyxDQUFDLGFBQWEsSUFBSSxtQkFBbUIsUUFBUTtBQUFBLEVBQ2hELEdBQUcsQ0FBQyxhQUFhLElBQUksbUJBQW1CLFFBQVE7QUFBQSxFQUNoRCxPQUFPLENBQUMsYUFBYSxJQUFJLHVCQUF1QixRQUFRO0FBQUEsRUFDeEQsUUFBUSxDQUFDLGFBQWEsSUFBSSx3QkFBd0IsUUFBUTtBQUM1RDtBQUtPLElBQU0sZ0JBQWdCO0FBQUEsRUFDM0IsS0FBSyxDQUFDLGFBQWEsSUFBSSxzQkFBc0IsUUFBUTtBQUFBLEVBQ3JELE9BQU8sQ0FBQyxhQUFhLElBQUksd0JBQXdCLFFBQVE7QUFBQSxFQUN6RCxRQUFRLENBQUMsYUFBYSxJQUFJLHlCQUF5QixRQUFRO0FBQUEsRUFDM0QsTUFBTSxDQUFDLGFBQWEsSUFBSSx1QkFBdUIsUUFBUTtBQUFBLEVBQ3ZELE9BQU8sQ0FBQyxhQUFhLElBQUksd0JBQXdCLFFBQVE7QUFBQSxFQUN6RCxRQUFRLENBQUMsYUFBYSxJQUFJLHlCQUF5QixRQUFRO0FBQzdEO0FBRUEsSUFBTyxjQUFRO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=