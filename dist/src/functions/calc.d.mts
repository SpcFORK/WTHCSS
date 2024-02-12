/**
 * Calculate a CSS calc() expression.
 * @param {string} payload - The expression to be calculated.
 * @returns {string} The calculated CSS expression.
 */
const calc = payload => `calc(${payload})`;

export { calc, calc as default };
