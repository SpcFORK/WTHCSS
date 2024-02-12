/**
 * Creates a CSS path() function string.
 * @param {string|null} fillRule - The fill-rule to apply to the path, or null if not applicable.
 * @param {string} svgPath - The SVG path data.
 * @returns {string} The constructed CSS path() function string.
 */
export const path = (fillRule, svgPath) => {
  if (typeof svgPath !== 'string') {
    throw new TypeError('The svgPath parameter must be a string.');
  }

  if (fillRule && typeof fillRule !== 'string') {
    throw new TypeError('The fillRule parameter must be a string.');
  }

  const validFillRules = ['nonzero', 'evenodd'];
  if (fillRule && !validFillRules.includes(fillRule)) {
    throw new Error('The fillRule parameter must be either "nonzero" or "evenodd".');
  }

  return `path(${fillRule ? `${fillRule}, ` : ''}"${svgPath}")`;
}
export default path;