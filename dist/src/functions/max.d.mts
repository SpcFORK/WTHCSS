/**
 * Calculates the maximum value from the given arguments.
 * @param {...args} args - A set of numeric values.
 * @returns {string} The constructed CSS max() function string.
 */
const max = (...args) => `max(${args.join(', ')})`;

export { max as default, max };
