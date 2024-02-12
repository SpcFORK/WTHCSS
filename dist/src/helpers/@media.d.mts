/**
 * Defines a CSS media query and its associated style rules.
 * @param {string} mediaQuery - The media query string.
 * @param {object} styles - An object mapping selectors to their respective style rules.
 * @throws {TypeError} If the arguments are not a string and an object of style rules.
 * @returns {string} The formatted @media rule as a string.
 */
const defineMedia = (mediaQuery, styles) => {
  if (typeof mediaQuery !== 'string' || typeof styles !== 'object') {
    throw new TypeError('Invalid arguments for defineMedia.');
  }

  const styleEntries = Object.entries(styles).map(([selector, styleRules]) => {
    const styleString = Object.entries(styleRules).map(([property, value]) => `${property}: ${value};`).join(' ');
    return `${selector} { ${styleString} }`;
  }).join(' ');

  return `@media ${mediaQuery} { ${styleEntries} }`;
};

export { defineMedia as default, defineMedia };
