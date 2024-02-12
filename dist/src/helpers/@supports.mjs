// src/WTFCss/src/helpers/@supports.js
var defineSupports = (supportsCondition, rules) => {
  const conditionString = supportsCondition.map((condition) => `(${condition})`).join(" and ");
  const rulesString = Object.entries(rules).map(([selector, styles]) => {
    const styleString = Object.entries(styles).map(([property, value]) => `${property}: ${value};`).join(" ");
    return `${selector} { ${styleString} }`;
  }).join(" ");
  return `@supports ${conditionString} { ${rulesString} }`;
};
var supports_default = defineSupports;
export {
  supports_default as default,
  defineSupports
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9Ac3VwcG9ydHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBhIENTUyBAc3VwcG9ydHMgcnVsZS5cbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc3VwcG9ydHNDb25kaXRpb24gLSBBbiBhcnJheSBvZiBjb25kaXRpb25zIHRoYXQgdGhlIGJyb3dzZXIgbXVzdCBzdXBwb3J0LlxuICogQHBhcmFtIHtvYmplY3R9IHJ1bGVzIC0gQW4gb2JqZWN0IG1hcHBpbmcgc2VsZWN0b3JzIHRvIHRoZWlyIHJlc3BlY3RpdmUgc3R5bGUgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgQHN1cHBvcnRzIHJ1bGUgYXMgYSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVTdXBwb3J0cyA9IChzdXBwb3J0c0NvbmRpdGlvbiwgcnVsZXMpID0+IHtcbiAgY29uc3QgY29uZGl0aW9uU3RyaW5nID0gc3VwcG9ydHNDb25kaXRpb24ubWFwKGNvbmRpdGlvbiA9PiBgKCR7Y29uZGl0aW9ufSlgKS5qb2luKCcgYW5kICcpO1xuICBjb25zdCBydWxlc1N0cmluZyA9IE9iamVjdC5lbnRyaWVzKHJ1bGVzKS5tYXAoKFtzZWxlY3Rvciwgc3R5bGVzXSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlU3RyaW5nID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5tYXAoKFtwcm9wZXJ0eSwgdmFsdWVdKSA9PiBgJHtwcm9wZXJ0eX06ICR7dmFsdWV9O2ApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gYCR7c2VsZWN0b3J9IHsgJHtzdHlsZVN0cmluZ30gfWA7XG4gIH0pLmpvaW4oJyAnKTtcblxuICByZXR1cm4gYEBzdXBwb3J0cyAke2NvbmRpdGlvblN0cmluZ30geyAke3J1bGVzU3RyaW5nfSB9YDtcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVTdXBwb3J0czsiXSwKICAibWFwcGluZ3MiOiAiO0FBTU8sSUFBTSxpQkFBaUIsQ0FBQyxtQkFBbUIsVUFBVTtBQUMxRCxRQUFNLGtCQUFrQixrQkFBa0IsSUFBSSxlQUFhLElBQUksU0FBUyxHQUFHLEVBQUUsS0FBSyxPQUFPO0FBQ3pGLFFBQU0sY0FBYyxPQUFPLFFBQVEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsTUFBTSxNQUFNO0FBQ3BFLFVBQU0sY0FBYyxPQUFPLFFBQVEsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyxNQUFNLEdBQUcsUUFBUSxLQUFLLEtBQUssR0FBRyxFQUFFLEtBQUssR0FBRztBQUN4RyxXQUFPLEdBQUcsUUFBUSxNQUFNLFdBQVc7QUFBQSxFQUNyQyxDQUFDLEVBQUUsS0FBSyxHQUFHO0FBRVgsU0FBTyxhQUFhLGVBQWUsTUFBTSxXQUFXO0FBQ3REO0FBQ0EsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K