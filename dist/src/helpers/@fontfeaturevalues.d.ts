/**
 * Defines font feature values for a given font family.
 * @param {string} familyName - The name of the font family.
 * @param {object} featureValues - An object containing the feature tags and their corresponding values.
 * @returns {string} The formatted @font-feature-values rule.
 */
const defineFontFeatureValues = (familyName, featureValues) => {
  const featureBlocks = Object.entries(featureValues).map(([feature, values]) => {
    const valueString = Array.isArray(values) ? values.join(' ') : values;
    return `@${feature} { ${familyName}: ${valueString}; }`;
  }).join('\n');
  return `@font-feature-values ${familyName} {\n${featureBlocks}\n}`;
};

export { defineFontFeatureValues as default, defineFontFeatureValues };
