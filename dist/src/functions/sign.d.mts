/**
 * Returns the CSS sign function for a given value.
 * @param {number|string} value - The value to be used in the sign function.
 * @returns {string} - A CSS value string representing the sign of the value.
 */
const sign = (value) => `sign(${value})`;

export { sign as default, sign };
