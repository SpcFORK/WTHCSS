// src/WTFCss/src/helpers/@colorprofile.js
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
export {
  colorprofile_default as default,
  defineColorProfile
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AY29sb3Jwcm9maWxlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIERlZmluZXMgYSBjb2xvciBwcm9maWxlIGZvciB1c2UgaW4gQ1NTLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY29sb3IgcHJvZmlsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmMgLSBUaGUgVVJMIG9mIHRoZSBjb2xvciBwcm9maWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtyZW5kZXJpbmdJbnRlbnRdIC0gVGhlIHJlbmRlcmluZyBpbnRlbnQgdG8gdXNlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lQ29sb3JQcm9maWxlID0gKG5hbWUsIHNyYywgcmVuZGVyaW5nSW50ZW50KSA9PiB7XG4gIGxldCBwcm9maWxlUnVsZSA9IGBAY29sb3ItcHJvZmlsZSAke25hbWV9IHtcXG4gIHNyYzogdXJsKFxcXCIke3NyY31cXFwiKWA7XG5cbiAgaWYgKHJlbmRlcmluZ0ludGVudCkge1xuICAgIHByb2ZpbGVSdWxlICs9IGA7XFxuICByZW5kZXJpbmctaW50ZW50OiAke3JlbmRlcmluZ0ludGVudH1gO1xuICB9XG5cbiAgcHJvZmlsZVJ1bGUgKz0gJztcXG59JztcblxuICByZXR1cm4gcHJvZmlsZVJ1bGU7XG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb2xvclByb2ZpbGUiXSwKICAibWFwcGluZ3MiOiAiO0FBTU8sSUFBTSxxQkFBcUIsQ0FBQyxNQUFNLEtBQUssb0JBQW9CO0FBQ2hFLE1BQUksY0FBYyxrQkFBa0IsSUFBSTtBQUFBLGNBQW9CLEdBQUc7QUFFL0QsTUFBSSxpQkFBaUI7QUFDbkIsbUJBQWU7QUFBQSxzQkFBMEIsZUFBZTtBQUFBLEVBQzFEO0FBRUEsaUJBQWU7QUFFZixTQUFPO0FBQ1Q7QUFDQSxJQUFPLHVCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=