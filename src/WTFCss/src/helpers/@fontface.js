/**
 * Creates a CSS @font-face rule string.
 * @param {object} fontFace - An object representing the font face configuration.
 * @returns {string} The formatted @font-face rule.
 */
export const defineFontFace = fontFace => {
  const fontFaceRule = `@font-face {
    font-family: "${fontFace.family}";
    src: ${fontFace.sources.map(source => {
      if (source.url) {
        return `url("${source.url}") format("${source.format}")`;
      } else if (source.local) {
        return `local("${source.local}")`;
      }
      return '';
    }).join(',\n    ')};
    ${fontFace.descriptors ? Object.entries(fontFace.descriptors).map(([key, value]) => `${key}: ${value}`).join(';\n    ') : ''}
  }`;

  return fontFaceRule
};
export default defineFontFace