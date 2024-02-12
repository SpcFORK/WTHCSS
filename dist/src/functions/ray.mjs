// src/WTFCss/src/functions/ray.js
var ray = (angle, size = "closest-side", contain = false, position = "") => {
  if (typeof angle !== "number" || angle < 0 || angle >= 360) {
    throw new TypeError("The angle must be a number between 0 and 359.");
  }
  const sizeKeywords = ["closest-side", "closest-corner", "farthest-side", "farthest-corner", "sides"];
  if (!sizeKeywords.includes(size)) {
    throw new TypeError("The size must be one of the following values: " + sizeKeywords.join(", ") + ".");
  }
  const positionRegex = /^(left|center|right|top|bottom|(\d+(\.\d+)?(px|%)?))$/;
  if (position && !positionRegex.test(position)) {
    throw new TypeError("The position must be a valid CSS position value.");
  }
  let rayString = `ray(${angle}deg`;
  if (size !== "closest-side") {
    rayString += ` ${size}`;
  }
  if (contain) {
    rayString += " contain";
  }
  if (position) {
    rayString += ` at ${position}`;
  }
  rayString += ")";
  return `offset-path: ${rayString};`;
};
var ray_default = ray;
export {
  ray_default as default,
  ray
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL3JheS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDcmVhdGVzIGEgQ1NTIHJheSgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSAtIFRoZSBhbmdsZSBvZiB0aGUgcmF5IGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NpemU9J2Nsb3Nlc3Qtc2lkZSddIC0gVGhlIHNpemUga2V5d29yZCBmb3IgdGhlIHJheS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnRhaW49ZmFsc2VdIC0gV2hldGhlciB0aGUgcmF5IHNob3VsZCBjb250YWluIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IFtwb3NpdGlvbj0nJ10gLSBUaGUgcG9zaXRpb24gb2YgdGhlIHJheSB3aXRoaW4gdGhlIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgQ1NTIHJheSgpIGZ1bmN0aW9uIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHJheSA9IChhbmdsZSwgc2l6ZSA9ICdjbG9zZXN0LXNpZGUnLCBjb250YWluID0gZmFsc2UsIHBvc2l0aW9uID0gJycpID0+IHtcbiAgaWYgKHR5cGVvZiBhbmdsZSAhPT0gJ251bWJlcicgfHwgYW5nbGUgPCAwIHx8IGFuZ2xlID49IDM2MCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBhbmdsZSBtdXN0IGJlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMzU5LicpO1xuICB9XG5cbiAgY29uc3Qgc2l6ZUtleXdvcmRzID0gWydjbG9zZXN0LXNpZGUnLCAnY2xvc2VzdC1jb3JuZXInLCAnZmFydGhlc3Qtc2lkZScsICdmYXJ0aGVzdC1jb3JuZXInLCAnc2lkZXMnXTtcbiAgaWYgKCFzaXplS2V5d29yZHMuaW5jbHVkZXMoc2l6ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc2l6ZSBtdXN0IGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlczogJyArIHNpemVLZXl3b3Jkcy5qb2luKCcsICcpICsgJy4nKTtcbiAgfVxuXG4gIGNvbnN0IHBvc2l0aW9uUmVnZXggPSAvXihsZWZ0fGNlbnRlcnxyaWdodHx0b3B8Ym90dG9tfChcXGQrKFxcLlxcZCspPyhweHwlKT8pKSQvO1xuICBpZiAocG9zaXRpb24gJiYgIXBvc2l0aW9uUmVnZXgudGVzdChwb3NpdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgcG9zaXRpb24gbXVzdCBiZSBhIHZhbGlkIENTUyBwb3NpdGlvbiB2YWx1ZS4nKTtcbiAgfVxuXG4gIGxldCByYXlTdHJpbmcgPSBgcmF5KCR7YW5nbGV9ZGVnYDtcblxuICBpZiAoc2l6ZSAhPT0gJ2Nsb3Nlc3Qtc2lkZScpIHtcbiAgICByYXlTdHJpbmcgKz0gYCAke3NpemV9YDtcbiAgfVxuXG4gIGlmIChjb250YWluKSB7XG4gICAgcmF5U3RyaW5nICs9ICcgY29udGFpbic7XG4gIH1cblxuICBpZiAocG9zaXRpb24pIHtcbiAgICByYXlTdHJpbmcgKz0gYCBhdCAke3Bvc2l0aW9ufWA7XG4gIH1cblxuICByYXlTdHJpbmcgKz0gJyknO1xuXG4gIHJldHVybiBgb2Zmc2V0LXBhdGg6ICR7cmF5U3RyaW5nfTtgO1xufVxuZXhwb3J0IGRlZmF1bHQgcmF5OyJdLAogICJtYXBwaW5ncyI6ICI7QUFRTyxJQUFNLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWdCLFVBQVUsT0FBTyxXQUFXLE9BQU87QUFDbkYsTUFBSSxPQUFPLFVBQVUsWUFBWSxRQUFRLEtBQUssU0FBUyxLQUFLO0FBQzFELFVBQU0sSUFBSSxVQUFVLCtDQUErQztBQUFBLEVBQ3JFO0FBRUEsUUFBTSxlQUFlLENBQUMsZ0JBQWdCLGtCQUFrQixpQkFBaUIsbUJBQW1CLE9BQU87QUFDbkcsTUFBSSxDQUFDLGFBQWEsU0FBUyxJQUFJLEdBQUc7QUFDaEMsVUFBTSxJQUFJLFVBQVUsbURBQW1ELGFBQWEsS0FBSyxJQUFJLElBQUksR0FBRztBQUFBLEVBQ3RHO0FBRUEsUUFBTSxnQkFBZ0I7QUFDdEIsTUFBSSxZQUFZLENBQUMsY0FBYyxLQUFLLFFBQVEsR0FBRztBQUM3QyxVQUFNLElBQUksVUFBVSxrREFBa0Q7QUFBQSxFQUN4RTtBQUVBLE1BQUksWUFBWSxPQUFPLEtBQUs7QUFFNUIsTUFBSSxTQUFTLGdCQUFnQjtBQUMzQixpQkFBYSxJQUFJLElBQUk7QUFBQSxFQUN2QjtBQUVBLE1BQUksU0FBUztBQUNYLGlCQUFhO0FBQUEsRUFDZjtBQUVBLE1BQUksVUFBVTtBQUNaLGlCQUFhLE9BQU8sUUFBUTtBQUFBLEVBQzlCO0FBRUEsZUFBYTtBQUViLFNBQU8sZ0JBQWdCLFNBQVM7QUFDbEM7QUFDQSxJQUFPLGNBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==