/**
 * Defines keyframe animations.
 * @param {string} name - The name of the animation.
 * @param {Array<Object>} frames - An array of objects representing the keyframes.
 * @throws {TypeError} If the arguments are not a string and an array of objects.
 * @returns {string} The formatted @keyframes rule.
 */
export const defineKeyframes = (name, frames) => {
  if (typeof name !== 'string' || !Array.isArray(frames)) {
    throw new TypeError('Invalid arguments for defineKeyframes.');
  }

  const keyframeRules = frames.map(frame => {
    const offset = Object.keys(frame)[0];
    const properties = Object.entries(frame[offset]).map(([prop, value]) => {
      return `${prop}: ${value}`;
    }).join('; ');

    return `${offset} { ${properties} }`;
  }).join(' ');

  return `@keyframes ${name} { ${keyframeRules} }`;
};
export default defineKeyframes