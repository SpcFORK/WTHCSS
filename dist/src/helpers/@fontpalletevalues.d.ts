/**
 * Defines font palette values for a given identifier.
 * @param {string} identifier - The identifier for the font palette values.
 * @param {string} [familyName] - The name of the font family.
 * @param {string} [basePalette] - The base palette of the font.
 * @param {Array<Array<string>>} [overrideColors] - An array of color overrides.
 * @returns {string} The formatted @font-palette-values rule.
 */
const defineFontPaletteValues = (identifier, familyName, basePalette, overrideColors) => {
  const declarations = [];
  if (familyName) declarations.push(`font-family: ${familyName};`);
  if (basePalette) declarations.push(`base-palette: ${basePalette};`);
  if (overrideColors) {
    const colorOverrides = overrideColors.map(color => color.join(' ')).join(',\n    ');
    declarations.push(`override-colors:\n    ${colorOverrides};`);
  }

  return `@font-palette-values ${identifier} {\n  ${declarations.join('\n  ')}\n}`;
};

export { defineFontPaletteValues as default, defineFontPaletteValues };
