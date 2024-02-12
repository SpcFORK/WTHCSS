/**
 * Formats a given path as a CSS URL value.
 * @param {string} path - The path to be formatted as a URL.
 * @returns {string} - The formatted URL string.
 */
export const url = (path) => {
  if (typeof path !== 'string') {
    throw new Error('URL must be a string.');
  }

  // Check if the URL is a data URL, absolute URL, or a relative URL
  const isDataUrl = path.startsWith('data:');
  const isAbsoluteUrl = /^(?:[a-z]+:)?\/\//i.test(path);
  const isRelativeUrl = !isDataUrl && !isAbsoluteUrl;

  // If the URL contains special characters, it should be quoted
  const needsQuotes = /[\s'"()]/.test(path);
  const quotedPath = needsQuotes ? `\"${path}\"` : path;

  // Return the formatted URL string
  return `url(${quotedPath})`;
};
export default url;