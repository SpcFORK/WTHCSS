/**
 * Creates a CSS ray() function string.
 * @param {number} angle - The angle of the ray in degrees.
 * @param {string} [size='closest-side'] - The size keyword for the ray.
 * @param {boolean} [contain=false] - Whether the ray should contain the element.
 * @param {string} [position=''] - The position of the ray within the element.
 * @returns {string} The constructed CSS ray() function string.
 */
const ray = (angle, size = 'closest-side', contain = false, position = '') => {
  if (typeof angle !== 'number' || angle < 0 || angle >= 360) {
    throw new TypeError('The angle must be a number between 0 and 359.');
  }

  const sizeKeywords = ['closest-side', 'closest-corner', 'farthest-side', 'farthest-corner', 'sides'];
  if (!sizeKeywords.includes(size)) {
    throw new TypeError('The size must be one of the following values: ' + sizeKeywords.join(', ') + '.');
  }

  const positionRegex = /^(left|center|right|top|bottom|(\d+(\.\d+)?(px|%)?))$/;
  if (position && !positionRegex.test(position)) {
    throw new TypeError('The position must be a valid CSS position value.');
  }

  let rayString = `ray(${angle}deg`;

  if (size !== 'closest-side') {
    rayString += ` ${size}`;
  }

  if (contain) {
    rayString += ' contain';
  }

  if (position) {
    rayString += ` at ${position}`;
  }

  rayString += ')';

  return `offset-path: ${rayString};`;
};

export { ray as default, ray };
