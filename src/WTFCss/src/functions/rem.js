/**
 * Converts a pixel value to rem units based on a root font size.
 * @param {number} value - The pixel value to convert to rem.
 * @param {number} [rootValue=16] - The root font size in pixels. Default is 16.
 * @returns {string} - A CSS value string in rem units.
 */
export const rem = (value, rootValue = 16) => `rem(${value}, ${rootValue})`;
export default rem;