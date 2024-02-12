/**
 * Calculate the arcsine value.
 * @param {number|string} payload - The value to be processed.
 * @returns {string} The arcsine expression for CSS.
 */
const asin = payload => `asin(${payload})`;

export { asin, asin as default };
