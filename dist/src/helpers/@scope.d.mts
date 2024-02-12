/**
 * Defines a CSS scope for a set of rules.
 * @param {string|null} scopeRoot - The root selector of the scope, or null for no root.
 * @param {string|null} scopeLimit - The limit selector of the scope, or null for no limit.
 * @param {object} rulesets - An object mapping selectors to their respective style objects.
 * @returns {string} The formatted @scope rule as a string.
 */
const defineScope = (scopeRoot, scopeLimit, rulesets) => {
  const scopeRootSelector = scopeRoot ? `(${scopeRoot})` : '';
  const scopeLimitSelector = scopeLimit ? ` to (${scopeLimit})` : '';
  const rulesetString = Object.entries(rulesets).map(([selector, styles]) => {
    const styleString = Object.entries(styles).map(([property, value]) => `${property}: ${value};`).join(' ');
    return `${selector} { ${styleString} }`;
  }).join(' ');

  return `@scope ${scopeRootSelector}${scopeLimitSelector} { ${rulesetString} }`;
};

export { defineScope as default, defineScope };
