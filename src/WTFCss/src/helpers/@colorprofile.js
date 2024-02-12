/**
 * Defines a color profile for use in CSS.
 * @param {string} name - The name of the color profile.
 * @param {string} src - The URL of the color profile.
 * @param {string} [renderingIntent] - The rendering intent to use.
 */
export const defineColorProfile = (name, src, renderingIntent) => {
  let profileRule = `@color-profile ${name} {\n  src: url(\"${src}\")`;

  if (renderingIntent) {
    profileRule += `;\n  rendering-intent: ${renderingIntent}`;
  }

  profileRule += ';\n}';

  return profileRule;
}
export default defineColorProfile