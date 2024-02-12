/**
 * Creates an @import rule with optional conditions and layer.
 * @param {string} importPath - The URL of the file to be imported.
 * @param {string} [mediaQueries] - The media query conditions.
 * @param {string} [supportsCondition] - The supports condition.
 * @param {string} [layerName] - The name of the layer.
 * @returns {string} - The complete @import rule as a string.
 */
export const defineImport = (importPath, mediaQueries = '', supportsCondition = '', layerName = '') => {
  let importRule = `@import url(${importPath})`;

  if (layerName) {
    importRule += ` layer(${layerName})`;
  }

  if (supportsCondition) {
    importRule += ` supports(${supportsCondition})`;
  }

  if (mediaQueries) {
    importRule += ` ${mediaQueries}`;
  }

  importRule += ';';

  return importRule;
}
export default defineImport