/**
 * Adjusts the content size to fit the given size parameter.
 * @param {string} size - A string representing a length or a percentage.
 * @throws {TypeError} If the size is not a string.
 * @returns {string} The CSS fit-content function string.
 */
export const fitContent = (size) => {
  if (typeof size !== 'string') {
    throw new TypeError('Size must be a string representing a length or a percentage.');
  }
  return `fit-content(${size})`;
};

export default fitContent