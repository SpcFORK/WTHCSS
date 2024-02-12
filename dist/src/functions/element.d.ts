/**
 * Retrieves a CSS image value for a given element ID.
 * @param {string} id - The ID of the element, must start with '#'.
 * @throws {Error} If the ID is not a string or doesn't start with '#'.
 * @returns {string} The CSS image value for the element.
 */
const element = (id) => {
  if (typeof id !== 'string' || !id.startsWith('#')) {
    throw new Error('Invalid ID for element function. ID must be a string starting with "#".');
  }

  // Check if the function is supported
  if (typeof document.mozSetImageElement !== 'function') {
    console.warn('The element() function is experimental and not supported in all browsers.');
  }

  // Return the CSS image value
  return `-moz-element(${id})`;
};

export { element as default, element };
