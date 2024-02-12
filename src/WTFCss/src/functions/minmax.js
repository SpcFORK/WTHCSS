/**
 * Defines a CSS minmax function with the given minimum and maximum values.
 * @param {string} min - The minimum value as a CSS unit or keyword.
 * @param {string} max - The maximum value as a CSS unit or keyword.
 * @throws {TypeError} If min or max are not of type string.
 * @returns {string} The constructed CSS minmax() function string.
 */
export const minmax = (min, max) => {
  if (typeof min !== 'string' || typeof max !== 'string') {
    throw new TypeError('Parameters min and max must be strings.');
  }

  // If max is less than min, treat minmax as min
  // if (parseFloat(max) < parseFloat(min)) {
  //   return min;
  // }

  return `minmax(${min}, ${max})`;
}
export default minmax;