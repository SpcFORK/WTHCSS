/**
 * Applies styles to a containment context based on a condition.
 * @param {string} name - The optional name of the container.
 * @param {string} condition - The container query condition.
 * @param {string} styles - The CSS styles to be applied.
 * @returns {string} The formatted @container rule.
 */
export const applyContainerStyles = (name, condition, styles) => {
  let containerRule = `@container ${name ? name + ' ' : ''}(${condition}) {\n${styles}\n}`;
  return containerRule;
}
export default applyContainerStyles