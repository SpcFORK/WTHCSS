/**
 * Defines a CSS @supports rule.
 * @param {Array<string>} supportsCondition - An array of conditions that the browser must support.
 * @param {object} rules - An object mapping selectors to their respective style objects.
 * @returns {string} The formatted @supports rule as a string.
 */
export const defineSupports = (supportsCondition, rules) => {
  const conditionString = supportsCondition.map(condition => `(${condition})`).join(' and ');
  const rulesString = Object.entries(rules).map(([selector, styles]) => {
    const styleString = Object.entries(styles).map(([property, value]) => `${property}: ${value};`).join(' ');
    return `${selector} { ${styleString} }`;
  }).join(' ');

  return `@supports ${conditionString} { ${rulesString} }`;
};
export default defineSupports;