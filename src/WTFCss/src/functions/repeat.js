/**
 * Generates a CSS repeat() function string.
 * @param {number|string} count - The number of times to repeat the tracks or one of the keywords: 'auto-fill', 'auto-fit'.
 * @param {...string|array} tracks - The track sizes and/or names to be repeated.
 * @returns {string} - A CSS value string representing the repeat() function.
 */
export const repeat = (count, ...tracks) => {
  if (!Number.isInteger(count) && count !== 'auto-fill' && count !== 'auto-fit') {
    throw new TypeError('The repeat count must be an integer or one of the keywords: auto-fill, auto-fit.');
  }

  const trackList = tracks.map(track => {
    if (Array.isArray(track)) {
      return `[${track.join(' ')}]`;
    }
    return track;
  }).join(' ');

  return `repeat(${count}, ${trackList})`;
};
export default repeat;