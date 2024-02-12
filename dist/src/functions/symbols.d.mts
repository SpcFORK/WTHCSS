/**
 * Creates a CSS symbols value string.
 * @param {string} type - The type of the symbols list; one of 'cyclic', 'numeric', 'alphabetic', 'symbolic', 'fixed'.
 * @param {...values} - The symbols to be included in the list, which can be strings or Image instances.
 * @returns {string} - A CSS value string representing the symbols list.
 */
const symbols = (type, ...values) => {
  const validTypes = ['cyclic', 'numeric', 'alphabetic', 'symbolic', 'fixed'];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid symbols type: ${type}. Expected one of ${validTypes.join(', ')}.`);
  }

  const formattedValues = values.map(value => {
    if (typeof value === 'string') {
      return `\"${value}\"`;
    } else if (value instanceof Image) {
      // Assuming Image is a class representing an image, and toString() returns a valid CSS image value
      return value.toString();
    }
    throw new Error('Invalid value type: values must be strings or Image instances.');
  }).join(' ');

  return `symbols(${type} ${formattedValues})`;
};

export { symbols as default, symbols };
