
/**
 * Calculates the minimum value from the given arguments.
 * @param {...args} - A set of numeric values.
 * @returns {string} The constructed CSS min() function string.
 */
export const min = (...args) => `min(${args.join(', ')})`
export default min