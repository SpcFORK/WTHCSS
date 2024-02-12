/**
 * Defines a starting style for a selector.
 * @param {string} selector - The CSS selector to which the starting style will be applied.
 * @param {object} properties - An object containing the CSS properties and values.
 * @returns {string} The formatted @starting-style rule as a string.
 */
const defineStartingStyle = (selector, properties) => {
  const propertyEntries = Object.entries(properties).map(([property, value]) => {
    return `${property}: ${value};`;
  }).join(' ');

  const startingStyleRule = `@starting-style {\n  ${selector} { ${propertyEntries} }\n}`;

  return startingStyleRule;
};

export { defineStartingStyle as default, defineStartingStyle };
