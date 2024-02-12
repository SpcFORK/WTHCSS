/**
 * Calculate a CSS calc() expression.
 * @param {string} payload - The expression to be calculated.
 * @returns {string} The calculated CSS expression.
 */
export const calc = payload => `calc(${payload})`
export default calc