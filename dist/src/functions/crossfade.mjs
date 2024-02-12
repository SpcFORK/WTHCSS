// src/WTFCss/src/functions/crossfade.js
var crossFade = (...images) => {
  const validImages = images.filter((image) => {
    if (typeof image === "string" && image.startsWith("url(")) {
      return true;
    }
    const [img, percentage] = image;
    return typeof img === "string" && img.startsWith("url(") && typeof percentage === "number" && percentage >= 0 && percentage <= 100;
  });
  if (validImages.length < 2) {
    throw new Error("crossFade function requires at least two images.");
  }
  const crossFadeImages = validImages.map((image) => {
    if (typeof image === "string") {
      return image;
    }
    const [img, percentage] = image;
    return `${img} ${percentage}%`;
  }).join(", ");
  return `cross-fade(${crossFadeImages})`;
};
var crossfade_default = crossFade;
export {
  crossFade,
  crossfade_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL1dURkNzcy9zcmMvZnVuY3Rpb25zL2Nyb3NzZmFkZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IGNyb3NzRmFkZSA9ICguLi5pbWFnZXMpID0+IHtcbiAgLyoqXG4gICAqIEJsZW5kcyBpbWFnZXMgdXNpbmcgdGhlIGNyb3NzLWZhZGUgZWZmZWN0LlxuICAgKiBAcGFyYW0gey4uLmltYWdlc30gaW1hZ2VzIC0gQW4gYXJyYXkgb2YgaW1hZ2UgVVJMcyBvciB0dXBsZXMgb2YgaW1hZ2UgVVJMIGFuZCBwZXJjZW50YWdlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIENTUyBmdW5jdGlvbiByZXByZXNlbnRpbmcgdGhlIGNyb3NzLWZhZGUgb2YgdGhlIHByb3ZpZGVkIGltYWdlcy5cbiAgICogQHRocm93cyB7RXJyb3J9IElmIGxlc3MgdGhhbiB0d28gdmFsaWQgaW1hZ2VzIGFyZSBwcm92aWRlZC5cbiAgICovXG4gIGNvbnN0IHZhbGlkSW1hZ2VzID0gaW1hZ2VzLmZpbHRlcihpbWFnZSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZycgJiYgaW1hZ2Uuc3RhcnRzV2l0aCgndXJsKCcpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgW2ltZywgcGVyY2VudGFnZV0gPSBpbWFnZTtcbiAgICByZXR1cm4gdHlwZW9mIGltZyA9PT0gJ3N0cmluZycgJiYgaW1nLnN0YXJ0c1dpdGgoJ3VybCgnKSAmJlxuICAgICAgdHlwZW9mIHBlcmNlbnRhZ2UgPT09ICdudW1iZXInICYmIHBlcmNlbnRhZ2UgPj0gMCAmJiBwZXJjZW50YWdlIDw9IDEwMDtcbiAgfSk7XG5cbiAgaWYgKHZhbGlkSW1hZ2VzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nyb3NzRmFkZSBmdW5jdGlvbiByZXF1aXJlcyBhdCBsZWFzdCB0d28gaW1hZ2VzLicpO1xuICB9XG5cbiAgY29uc3QgY3Jvc3NGYWRlSW1hZ2VzID0gdmFsaWRJbWFnZXMubWFwKGltYWdlID0+IHtcbiAgICBpZiAodHlwZW9mIGltYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cbiAgICBjb25zdCBbaW1nLCBwZXJjZW50YWdlXSA9IGltYWdlO1xuICAgIHJldHVybiBgJHtpbWd9ICR7cGVyY2VudGFnZX0lYDtcbiAgfSkuam9pbignLCAnKTtcblxuICByZXR1cm4gYGNyb3NzLWZhZGUoJHtjcm9zc0ZhZGVJbWFnZXN9KWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcm9zc0ZhZGUiXSwKICAibWFwcGluZ3MiOiAiO0FBQU8sSUFBTSxZQUFZLElBQUksV0FBVztBQU90QyxRQUFNLGNBQWMsT0FBTyxPQUFPLFdBQVM7QUFDekMsUUFBSSxPQUFPLFVBQVUsWUFBWSxNQUFNLFdBQVcsTUFBTSxHQUFHO0FBQ3pELGFBQU87QUFBQSxJQUNUO0FBQ0EsVUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJO0FBQzFCLFdBQU8sT0FBTyxRQUFRLFlBQVksSUFBSSxXQUFXLE1BQU0sS0FDckQsT0FBTyxlQUFlLFlBQVksY0FBYyxLQUFLLGNBQWM7QUFBQSxFQUN2RSxDQUFDO0FBRUQsTUFBSSxZQUFZLFNBQVMsR0FBRztBQUMxQixVQUFNLElBQUksTUFBTSxrREFBa0Q7QUFBQSxFQUNwRTtBQUVBLFFBQU0sa0JBQWtCLFlBQVksSUFBSSxXQUFTO0FBQy9DLFFBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsYUFBTztBQUFBLElBQ1Q7QUFDQSxVQUFNLENBQUMsS0FBSyxVQUFVLElBQUk7QUFDMUIsV0FBTyxHQUFHLEdBQUcsSUFBSSxVQUFVO0FBQUEsRUFDN0IsQ0FBQyxFQUFFLEtBQUssSUFBSTtBQUVaLFNBQU8sY0FBYyxlQUFlO0FBQ3RDO0FBRUEsSUFBTyxvQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K