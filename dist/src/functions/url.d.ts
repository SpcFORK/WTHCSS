/**
 * Formats a given path as a CSS URL value.
 * @param {string} path - The path to be formatted as a URL.
 * @returns {string} - The formatted URL string.
 */
const url = (path) => {
  if (typeof path !== 'string') {
    throw new Error('URL must be a string.');
  }

  // Check if the URL is a data URL, absolute URL, or a relative URL
  path.startsWith('data:');

  // If the URL contains special characters, it should be quoted
  const needsQuotes = /[\s'"()]/.test(path);
  const quotedPath = needsQuotes ? `\"${path}\"` : path;

  // Return the formatted URL string
  return `url(${quotedPath})`;
};

export { url as default, url };
