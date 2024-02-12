/**
 * Defines a charset for a CSS file.
 *
 * @param {string} charsetValue - The charset to be set for the CSS file.
 * @returns {string} The formatted @charset rule.
 */
export const charset = charsetValue => `@charset "${charsetValue}";`
export default charset;