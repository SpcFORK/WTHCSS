/**
 * Defines a CSS namespace.
 * @param {string} [prefix] - The optional prefix for the namespace.
 * @param {string} uri - The URI of the namespace.
 * @throws {Error} If the URI is not provided.
 * @returns {string} The formatted @namespace rule as a string.
 */
export const defineNamespace = (prefix, uri) => {
  if (!uri) {
    throw new Error('URI for namespace is required.');
  }

  const namespacePrefix = prefix ? `${prefix} ` : '';
  return `@namespace ${namespacePrefix}url(${uri});`;
};
export default defineNamespace