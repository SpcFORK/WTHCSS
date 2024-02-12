/**
 * Generates a CSS counter function string.
 * @param {string} counterName - The name of the counter.
 * @param {string} [counterStyle='decimal'] - The style of the counter.
 * @returns {string} A CSS counter function.
 */
const counter = (counterName, counterStyle = 'decimal') => {
  if (typeof counterName !== 'string' || counterName.startsWith('--') || ['none', 'unset', 'initial', 'inherit'].includes(counterName)) {
    throw new Error('Invalid counter name.');
  }

  if (typeof counterStyle !== 'string') {
    throw new Error('Invalid counter style.');
  }

  return `counter(${counterName}${counterStyle !== 'decimal' ? ', ' + counterStyle : ''})`;
};

export { counter, counter as default };
