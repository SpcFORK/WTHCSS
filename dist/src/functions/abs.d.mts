/**
 * Calculate the absolute value.
 * @param {number|string} payload - The value to be processed.
 * @returns {string} The absolute value expression for CSS.
 */
const abs = payload => {
  return `abs(${payload})`;
};

export { abs, abs as default };
