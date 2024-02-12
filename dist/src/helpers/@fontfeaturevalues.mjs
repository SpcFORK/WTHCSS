// src/WTFCss/src/helpers/@fontfeaturevalues.js
var defineFontFeatureValues = (familyName, featureValues) => {
  const featureBlocks = Object.entries(featureValues).map(([feature, values]) => {
    const valueString = Array.isArray(values) ? values.join(" ") : values;
    return `@${feature} { ${familyName}: ${valueString}; }`;
  }).join("\n");
  return `@font-feature-values ${familyName} {
${featureBlocks}
}`;
};
var fontfeaturevalues_default = defineFontFeatureValues;
export {
  fontfeaturevalues_default as default,
  defineFontFeatureValues
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udGZlYXR1cmV2YWx1ZXMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBmb250IGZlYXR1cmUgdmFsdWVzIGZvciBhIGdpdmVuIGZvbnQgZmFtaWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IGZhbWlseU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZVZhbHVlcyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmZWF0dXJlIHRhZ3MgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1mZWF0dXJlLXZhbHVlcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udEZlYXR1cmVWYWx1ZXMgPSAoZmFtaWx5TmFtZSwgZmVhdHVyZVZhbHVlcykgPT4ge1xuICBjb25zdCBmZWF0dXJlQmxvY2tzID0gT2JqZWN0LmVudHJpZXMoZmVhdHVyZVZhbHVlcykubWFwKChbZmVhdHVyZSwgdmFsdWVzXSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlU3RyaW5nID0gQXJyYXkuaXNBcnJheSh2YWx1ZXMpID8gdmFsdWVzLmpvaW4oJyAnKSA6IHZhbHVlcztcbiAgICByZXR1cm4gYEAke2ZlYXR1cmV9IHsgJHtmYW1pbHlOYW1lfTogJHt2YWx1ZVN0cmluZ307IH1gO1xuICB9KS5qb2luKCdcXG4nKTtcbiAgcmV0dXJuIGBAZm9udC1mZWF0dXJlLXZhbHVlcyAke2ZhbWlseU5hbWV9IHtcXG4ke2ZlYXR1cmVCbG9ja3N9XFxufWA7XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRm9udEZlYXR1cmVWYWx1ZXMiXSwKICAibWFwcGluZ3MiOiAiO0FBTU8sSUFBTSwwQkFBMEIsQ0FBQyxZQUFZLGtCQUFrQjtBQUNwRSxRQUFNLGdCQUFnQixPQUFPLFFBQVEsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsTUFBTSxNQUFNO0FBQzdFLFVBQU0sY0FBYyxNQUFNLFFBQVEsTUFBTSxJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUk7QUFDL0QsV0FBTyxJQUFJLE9BQU8sTUFBTSxVQUFVLEtBQUssV0FBVztBQUFBLEVBQ3BELENBQUMsRUFBRSxLQUFLLElBQUk7QUFDWixTQUFPLHdCQUF3QixVQUFVO0FBQUEsRUFBTyxhQUFhO0FBQUE7QUFDL0Q7QUFDQSxJQUFPLDRCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=