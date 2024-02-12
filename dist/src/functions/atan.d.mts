/**
 * Calculate the arctangent value.
 * @param {number|string} payload - The value to be processed.
 * @returns {string} The arctangent expression for CSS.
 */
const atan = payload => `atan(${payload})`;

export { atan, atan as default };
