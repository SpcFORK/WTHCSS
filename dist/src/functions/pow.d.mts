/**
 * Calculates the power of a base number raised to an exponent.
 * @param {number} a - The base number.
 * @param {number} b - The exponent.
 * @returns {string} The constructed CSS pow() function string.
 */
const pow = (a, b) => `pow(${a}, ${b})`;

export { pow as default, pow };
