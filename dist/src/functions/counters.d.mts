/**
 * Constructs a CSS counters function string.
 * @param {string} counterName - The name of the counter.
 * @param {string} string - The string to be concatenated with the counter value.
 * @param {string} [counterStyle='decimal'] - The style of the counter, default is 'decimal'.
 * @throws {Error} If the counter name, string, or counter style is invalid.
 * @returns {string} A CSS counters function string.
 */
const counters = (counterName, string, counterStyle = 'decimal') => {
  if (typeof counterName !== 'string' || counterName.startsWith('--') || ['none', 'unset', 'initial', 'inherit'].includes(counterName)) {
    throw new Error('Invalid counter name.');
  }

  if (typeof string !== 'string') {
    throw new Error('Invalid string for concatenation.');
  }

  if (typeof counterStyle !== 'string') {
    throw new Error('Invalid counter style.');
  }

  return `counters(${counterName}, "${string}"${counterStyle !== 'decimal' ? ', ' + counterStyle : ''})`;
};

export { counters, counters as default };
