/**
 * Registers a custom CSS property using the @property rule.
 * @param {string} name - The name of the custom property.
 * @param {string} syntax - Describes the allowable syntax for the property.
 * @param {boolean} inherits - Controls whether the custom property inherits by default.
 * @param {string} initialValue - Sets the initial value for the property.
 * @returns {Object} The formatted @property rule.
 */
export const registerProperty = (name, syntax, inherits, initialValue) => {
  return {
    [`@property ${name}`]: (
      "{ " +
      (!syntax ?? `syntax: "${syntax}"; `) +
      (!inherits ?? `inherits: ${inherits}; `) +
      (!initialValue ?? `initial-value: ${initialValue};`) +
      " }"
    )
  }
}
export default registerProperty