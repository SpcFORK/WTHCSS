/**
 * Calculates the modulus of two numbers.
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {string} The constructed CSS mod() function string.
 */
const mod = (a, b) => `mod(${a}, ${b})`;

export { mod as default, mod };
