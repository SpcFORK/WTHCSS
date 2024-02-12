/**
 * Defines a CSS layer and its associated style rules.
 * @param {string} name - The name of the layer.
 * @param {object} rules - An object mapping selectors to their respective style rules.
 * @throws {TypeError} If the arguments are not a string and an object of style rules.
 * @returns {string} The formatted @layer rule as a string.
 */
export const defineLayer = (name, rules) => {
  if (!name || typeof rules !== 'object') {
    throw new TypeError('Invalid arguments for defineLayer.');
  }

  const layerRules = Object.entries(rules).map(([selector, styleRules]) => {
    const styleString = Object.entries(styleRules).map(([property, value]) => `${property}: ${value};`).join(' ');
    return `${selector} { ${styleString} }`;
  }).join(' ');

  return `@layer ${name} { ${layerRules} }`;
};

export const defineLayerOrder = (...names) => (`@layer ` + names.join(' '))

export default {
  defineLayer,
  defineLayerOrder
}