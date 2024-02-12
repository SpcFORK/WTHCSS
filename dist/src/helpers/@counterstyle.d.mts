/**
 * Defines a custom counter style.
 * @param {string} name - The name of the counter style.
 * @param {object} rules - An object containing the descriptors and values for the style.
 * @throws {Error} If the name is one of the reserved style names.
 * @returns {string} The formatted @counter-style rule.
 */
const defineCounterStyle = (name, rules) => {
  if (['decimal', 'disc', 'square', 'circle', 'disclosure-open', 'disclosure-closed'].includes(name.toLowerCase())) {
    throw new Error(`The name "${name}" is not allowed for custom counter styles.`);
  }

  const ruleEntries = Object.entries(rules).map(([descriptor, value]) => {
    if (descriptor === 'symbols' || descriptor === 'additive-symbols') {
      value = value.map(symbol => `\"${symbol}\"`).join(' ');
    }
    return `${descriptor}: ${value}`;
  });
  const ruleString = ruleEntries.join('; ');
  const counterRule = `@counter-style ${name} { ${ruleString} }`;

  return counterRule
};

export { defineCounterStyle as default, defineCounterStyle };
