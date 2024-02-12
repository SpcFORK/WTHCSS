/**
 * Calculates the maximum value from the given arguments.
 * @param {...args} args - A set of numeric values.
 * @returns {string} The constructed CSS max() function string.
 */
export const max = (...args) => `max(${args.join(', ')})`
export default max