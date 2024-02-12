// src/WTFCss/src/helpers/@fontpalletevalues.js
var defineFontPaletteValues = (identifier, familyName, basePalette, overrideColors) => {
  const declarations = [];
  if (familyName)
    declarations.push(`font-family: ${familyName};`);
  if (basePalette)
    declarations.push(`base-palette: ${basePalette};`);
  if (overrideColors) {
    const colorOverrides = overrideColors.map((color) => color.join(" ")).join(",\n    ");
    declarations.push(`override-colors:
    ${colorOverrides};`);
  }
  return `@font-palette-values ${identifier} {
  ${declarations.join("\n  ")}
}`;
};
var fontpalletevalues_default = defineFontPaletteValues;
export {
  fontpalletevalues_default as default,
  defineFontPaletteValues
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvaGVscGVycy9AZm9udHBhbGxldGV2YWx1ZXMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRGVmaW5lcyBmb250IHBhbGV0dGUgdmFsdWVzIGZvciBhIGdpdmVuIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllciAtIFRoZSBpZGVudGlmaWVyIGZvciB0aGUgZm9udCBwYWxldHRlIHZhbHVlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZmFtaWx5TmFtZV0gLSBUaGUgbmFtZSBvZiB0aGUgZm9udCBmYW1pbHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2Jhc2VQYWxldHRlXSAtIFRoZSBiYXNlIHBhbGV0dGUgb2YgdGhlIGZvbnQuXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PHN0cmluZz4+fSBbb3ZlcnJpZGVDb2xvcnNdIC0gQW4gYXJyYXkgb2YgY29sb3Igb3ZlcnJpZGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBAZm9udC1wYWxldHRlLXZhbHVlcyBydWxlLlxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRm9udFBhbGV0dGVWYWx1ZXMgPSAoaWRlbnRpZmllciwgZmFtaWx5TmFtZSwgYmFzZVBhbGV0dGUsIG92ZXJyaWRlQ29sb3JzKSA9PiB7XG4gIGNvbnN0IGRlY2xhcmF0aW9ucyA9IFtdO1xuICBpZiAoZmFtaWx5TmFtZSkgZGVjbGFyYXRpb25zLnB1c2goYGZvbnQtZmFtaWx5OiAke2ZhbWlseU5hbWV9O2ApO1xuICBpZiAoYmFzZVBhbGV0dGUpIGRlY2xhcmF0aW9ucy5wdXNoKGBiYXNlLXBhbGV0dGU6ICR7YmFzZVBhbGV0dGV9O2ApO1xuICBpZiAob3ZlcnJpZGVDb2xvcnMpIHtcbiAgICBjb25zdCBjb2xvck92ZXJyaWRlcyA9IG92ZXJyaWRlQ29sb3JzLm1hcChjb2xvciA9PiBjb2xvci5qb2luKCcgJykpLmpvaW4oJyxcXG4gICAgJyk7XG4gICAgZGVjbGFyYXRpb25zLnB1c2goYG92ZXJyaWRlLWNvbG9yczpcXG4gICAgJHtjb2xvck92ZXJyaWRlc307YCk7XG4gIH1cblxuICByZXR1cm4gYEBmb250LXBhbGV0dGUtdmFsdWVzICR7aWRlbnRpZmllcn0ge1xcbiAgJHtkZWNsYXJhdGlvbnMuam9pbignXFxuICAnKX1cXG59YDtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUZvbnRQYWxldHRlVmFsdWVzIl0sCiAgIm1hcHBpbmdzIjogIjtBQVFPLElBQU0sMEJBQTBCLENBQUMsWUFBWSxZQUFZLGFBQWEsbUJBQW1CO0FBQzlGLFFBQU0sZUFBZSxDQUFDO0FBQ3RCLE1BQUk7QUFBWSxpQkFBYSxLQUFLLGdCQUFnQixVQUFVLEdBQUc7QUFDL0QsTUFBSTtBQUFhLGlCQUFhLEtBQUssaUJBQWlCLFdBQVcsR0FBRztBQUNsRSxNQUFJLGdCQUFnQjtBQUNsQixVQUFNLGlCQUFpQixlQUFlLElBQUksV0FBUyxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxTQUFTO0FBQ2xGLGlCQUFhLEtBQUs7QUFBQSxNQUF5QixjQUFjLEdBQUc7QUFBQSxFQUM5RDtBQUVBLFNBQU8sd0JBQXdCLFVBQVU7QUFBQSxJQUFTLGFBQWEsS0FBSyxNQUFNLENBQUM7QUFBQTtBQUM3RTtBQUNBLElBQU8sNEJBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==