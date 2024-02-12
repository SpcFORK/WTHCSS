/**
 * Calculates the hypotenuse or Euclidean norm.
 * @param {...args} numbers - A set of numbers representing the sides of a right-angled triangle.
 * @returns {string} The CSS hypot function string.
 */
const hypot = (...args) => `hypot(${args.join(', ')})`;

export { hypot as default, hypot };
