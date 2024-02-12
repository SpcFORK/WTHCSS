/**
 * Defines a CSS @page rule with the given name and styles.
 *
 * @param {string} name - The name of the page rule.
 * @param {object} styles - An object containing the CSS properties and values.
 * @throws {TypeError} If styles is not an object.
 * @throws {Error} If a property is not allowed within @page rule.
 * @returns {string} The formatted @page rule as a string.
 */
export const definePage = (name, styles) => {
  if (typeof styles !== 'object') {
    throw new TypeError('Styles must be an object.');
  }

  const styleEntries = Object.entries(styles).map(([property, value]) => {
    if (!/^margin-|^border-|^padding-|^background-|^font-|^text-|^color$|^outline$|^counter-|^width$|^height$|^line-height$|^quotes$|^visibility$/.test(property)) {
      throw new Error(`Property "${property}" is not allowed within @page rule.`);
    }
    return `${property}: ${value};`;
  }).join(' ');

  const pageRule = `@page ${name} { ${styleEntries} }`;

  return pageRule;
};
export default definePage;