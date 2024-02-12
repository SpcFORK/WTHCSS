/**
 * Constructs a CSS variable with an optional fallback.
 * @param {string} name - The name of the CSS variable.
 * @param {string} [fallback] - The optional fallback value if the variable is not defined.
 * @throws Will throw an error if the name is not a string or if the fallback is provided and is not a string.
 */
export const cssVar = (name, fallback) => {
  if (typeof name !== 'string') {
    throw new Error('The custom property name must be a string.');
  }

  if (fallback !== undefined && typeof fallback !== 'string') {
    throw new Error('The fallback value must be a string.');
  }

  return `var(${name}${fallback !== undefined ? `, ${fallback}` : ''})`;
};
export default cssVar;