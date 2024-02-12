/**
 * Calculate the arccosine value.
 * @param {number|string} payload - The value to be processed.
 * @returns {string} The arccosine expression for CSS.
 */
const acos = payload => `acos(${payload})`;

export { acos, acos as default };
