/**
 * Calculate the absolute value.
 * @param {number|string} payload - The value to be processed.
 * @returns {string} The absolute value expression for CSS.
 */
export const abs = payload => {
  return `abs(${payload})`;
}

export default abs;