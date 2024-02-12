/**
 * Retrieves the corresponding keyword for a given parameter.
 * If the keyword is deprecated or unknown, a warning or error is thrown.
 
 * @param {
    'absolute-size' |
    'alpha-value' |
    'angle' |
    'angle-percentage' |
    'basic-shape' |
    'blend-mode' |
    'box-edge' |
    'calc-constant' |
    'calc-sum' |
    'color-interpolation-method' |
    'color' |
    'custom-ident' |
    'dashed-ident' |
    'dimension' |
    'display-box' |
    'display-inside' |
    'display-internal' |
    'display-legacy' |
    'display-listitem' |
    'display-outside' |
    'easing-function' |
    'filter-function' |
    'flex' |
    'frequency' |
    'frequency-percentage' |
    'generic-family' |
    'gradient' |
    'hex-color' |
    'hue' |
    'hue-interpolation-method' |
    'ident' |
    'image' |
    'integer' |
    'length' |
    'length-percentage' |
    'line-style' |
    'named-color' |
    'number' |
    'overflow' |
    'percentage' |
    'position' |
    'ratio' |
    'relative-size' |
    'resolution' |
    'string' |
    'system-color' |
    'time' |
    'time-percentage' |
    'transform-function'
  } param - The parameter to get the keyword for.
  
 * @returns {
    '<absolute-size>' |
    '<alpha-value>' |
    '<angle>' |
    '<angle-percentage>' |
    '<basic-shape>' |
    '<blend-mode>' |
    '<box-edge>' |
    '<calc-constant>' |
    '<calc-sum>' |
    '<color-interpolation-method>' |
    '<color>' |
    '<custom-ident>' |
    '<dashed-ident>' |
    '<dimension>' |
    '<display-box>' |
    '<display-inside>' |
    '<display-internal>' |
    '<display-legacy>' |
    '<display-listitem>' |
    '<display-outside>' |
    '<easing-function>' |
    '<filter-function>' |
    '<flex>' |
    '<frequency>' |
    '<frequency-percentage>' |
    '<generic-family>' |
    '<gradient>' |
    '<hex-color>' |
    '<hue>' |
    '<hue-interpolation-method>' |
    '<ident>' |
    '<image>' |
    '<integer>' |
    '<length>' |
    '<length-percentage>' |
    '<line-style>' |
    '<named-color>' |
    '<number>' |
    '<overflow>' |
    '<percentage>' |
    '<position>' |
    '<ratio>' |
    '<relative-size>' |
    '<resolution>' |
    '<string>' |
    '<system-color>' |
    '<time>' |
    '<time-percentage>' |
    '<transform-function>'
  } The corresponding keyword as a \<keyword\>.
 */
function getTypeKeyword(param = '') {
  switch (param) {
    case 'absolute-size':
    case 'alpha-value':
    case 'angle':
    case 'angle-percentage':
    case 'basic-shape':
    case 'blend-mode':
    case 'box-edge':
    case 'calc-constant':
    case 'calc-sum':
    case 'color-interpolation-method':
    case 'color':
    case 'custom-ident':
    case 'dashed-ident':
    case 'dimension':
    case 'display-box':
    case 'display-inside':
    case 'display-internal':
    case 'display-legacy':
    case 'display-listitem':
    case 'display-outside':
    case 'easing-function':
    case 'filter-function':
    case 'flex':
    case 'frequency':
    case 'frequency-percentage':
    case 'generic-family':
    case 'gradient':
    case 'hex-color':
    case 'hue':
    case 'hue-interpolation-method':
    case 'ident':
    case 'image':
    case 'integer':
    case 'length':
    case 'length-percentage':
    case 'line-style':
    case 'named-color':
    case 'number':
    case 'overflow':
    case 'percentage':
    case 'position':
    case 'ratio':
    case 'relative-size':
    case 'resolution':
    case 'string':
    case 'system-color':
    case 'time':
    case 'time-percentage':
    case 'transform-function':
      return `<${param}>`;

    default:
      return null;
  }
}

export { getTypeKeyword as default };
