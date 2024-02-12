/**
 * Retrieve the value of an attribute from a CSS selector.
 * @param {string} payload - The attribute to retrieve.
 * @returns {string} The CSS function to retrieve the attribute value.
 */
export const attr = payload => `attr(${payload})`
export default attr