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

// src/WTFCss/src/helpers/@colorprofile.js
var colorprofile_exports = {};
__export(colorprofile_exports, {
  default: () => colorprofile_default,
  defineColorProfile: () => defineColorProfile
});
module.exports = __toCommonJS(colorprofile_exports);
var defineColorProfile = (name, src, renderingIntent) => {
  let profileRule = `@color-profile ${name} {
  src: url("${src}")`;
  if (renderingIntent) {
    profileRule += `;
  rendering-intent: ${renderingIntent}`;
  }
  profileRule += ";\n}";
  return profileRule;
};
var colorprofile_default = defineColorProfile;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY29sb3Jwcm9maWxlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMgYSBjb2xvciBwcm9maWxlIGZvciB1c2UgaW4gQ1NTLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY29sb3IgcHJvZmlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgLSBUaGUgVVJMIG9mIHRoZSBjb2xvciBwcm9maWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtyZW5kZXJpbmdJbnRlbnRdIC0gVGhlIHJlbmRlcmluZyBpbnRlbnQgdG8gdXNlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lQ29sb3JQcm9maWxlID0gKG5hbWUsIHNyYywgcmVuZGVyaW5nSW50ZW50KSA9PiB7XG4gIGxldCBwcm9maWxlUnVsZSA9IGBAY29sb3ItcHJvZmlsZSAke25hbWV9IHtcXG4gIHNyYzogdXJsKFxcXCIke3NyY31cXFwiKWA7XG5cbiAgaWYgKHJlbmRlcmluZ0ludGVudCkge1xuICAgIHByb2ZpbGVSdWxlICs9IGA7XFxuICByZW5kZXJpbmctaW50ZW50OiAke3JlbmRlcmluZ0ludGVudH1gO1xuICB9XG5cbiAgcHJvZmlsZVJ1bGUgKz0gJztcXG59JztcblxuICByZXR1cm4gcHJvZmlsZVJ1bGU7XG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb2xvclByb2ZpbGUiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLElBQU0scUJBQXFCLENBQUMsTUFBTSxLQUFLLG9CQUFvQjtBQUNoRSxNQUFJLGNBQWMsa0JBQWtCLElBQUk7QUFBQSxjQUFvQixHQUFHO0FBRS9ELE1BQUksaUJBQWlCO0FBQ25CLG1CQUFlO0FBQUEsc0JBQTBCLGVBQWU7QUFBQSxFQUMxRDtBQUVBLGlCQUFlO0FBRWYsU0FBTztBQUNUO0FBQ0EsSUFBTyx1QkFBUTsiLAogICJuYW1lcyI6IFtdCn0K