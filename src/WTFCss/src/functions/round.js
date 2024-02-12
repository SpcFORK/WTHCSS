/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} value - The number to round.
 * @param {number} [precision=0] - The number of decimal places to round to (default is 0).
 * @returns {string} - A CSS value string representing the rounded number.
 */
export const round = (value, precision = 0) => `round(${value}, ${precision})`;
export default round;