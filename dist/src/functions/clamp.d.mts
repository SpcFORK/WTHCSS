/**
 * Clamps a value between a minimum and a maximum.
 * @param {number|string} min - The minimum value or CSS expression.
 * @param {number|string} val - The current value or CSS expression.
 * @param {number|string} max - The maximum value or CSS expression.
 * @returns {string} A CSS clamp() function with the provided values.
 */
const clamp = (min, val, max) => {
  return `clamp(${min}, ${val}, ${max})`;
};

export { clamp, clamp as default };
