/**
 * Calculate the arctangent of two variables.
 * @param {number|string} payload - The values to be processed.
 * @returns {string} The arctangent expression for CSS.
 */
const atan2 = payload => `atan2(${payload})`;

export { atan2, atan2 as default };
