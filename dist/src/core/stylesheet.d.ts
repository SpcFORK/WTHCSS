import helpers from '../helpers/index.js';
import keywords from '../keywords/index.js';
import functions from '../functions/index.js';
import handles from '../handles/index.js';
import magic from '../magic/index.js';
import '../helpers/@charset.js';
import '../helpers/@colorprofile.js';
import '../helpers/@container.js';
import '../helpers/@property.js';
import '../helpers/@counterstyle.js';
import '../helpers/@fontface.js';
import '../helpers/@fontfeaturevalues.js';
import '../helpers/@fontpalletevalues.js';
import '../helpers/@import.js';
import '../helpers/@keyframes.js';
import '../helpers/@layer.js';
import '../helpers/@media.js';
import '../helpers/@namespace.js';
import '../helpers/@page.js';
import '../helpers/@startingstyle.js';
import '../helpers/@supports.js';
import '../keywords/types.js';
import '../keywords/important.js';
import '../functions/abs.js';
import '../functions/acos.js';
import '../functions/asin.js';
import '../functions/atan.js';
import '../functions/atan2.js';
import '../functions/attr.js';
import '../functions/calc.js';
import '../functions/clamp.js';
import '../functions/cos.js';
import '../functions/counter.js';
import '../functions/counters.js';
import '../functions/crossfade.js';
import '../functions/element.js';
import '../functions/env.js';
import '../functions/exp.js';
import '../functions/fitcontent.js';
import '../functions/hypot.js';
import '../functions/log.js';
import '../functions/max.js';
import '../functions/min.js';
import '../functions/minmax.js';
import '../functions/mod.js';
import '../functions/path.js';
import '../functions/pow.js';
import '../functions/ray.js';
import '../functions/rem.js';
import '../functions/repeat.js';
import '../functions/round.js';
import '../functions/sign.js';
import '../functions/sin.js';
import '../functions/sqrt.js';
import '../functions/symbols.js';
import '../functions/tan.js';
import '../functions/url.js';
import '../functions/var.js';
import '../handles/or.gate.js';
import '../magic/rootManipulate.js';

class WTFStylesheet {

  /**
   * Reference to the helpers module.
   */
  static helpers = helpers;

  /**
   * Reference to the keywords module.
   */
  static keywords = keywords;

  /**
   * Reference to the functions module.
   */
  static functions = functions;

  /**
   * Reference to the handles module.
   */
  static handles = handles;

  /**
   * Reference to the magic module.
   */
  static magic = magic;

  /**
   * Instance reference to the helpers module.
   */
  helpers = helpers;

  /**
   * Instance reference to the keywords module.
   */
  keywords = keywords;

  /**
   * Instance reference to the functions module.
   */
  functions = functions;

  /**
   * Instance reference to the handles module.
   */
  handles = handles;

  /**
   * Instance reference to the magic module.
   */
  magic = magic;

  /**
   * Static counter for unique identifier.
   */
  static count = 0;

  /**
   * Unique identifier for the stylesheet instance.
   */
  id = ++WTFStylesheet.count;

  /**
   * Collection of CSS rules.
   */
  rules = [];

  /**
   * Reference to the browser's CSS object.
   */
  CSS = window.CSS;

  /**
   * Creates an instance of WTFStylesheet.
   * @param {Document} document - The document in which the stylesheet will be created.
   */
  constructor(document) {
    this.document = document;
  }

  /**
   * Adds a CSS rule to the stylesheet.
   * @param {string} selector - The CSS selector for the rule.
   * @param {Object} declarations - The CSS declarations for the rule.
   * @param {number} [index] - The position at which to insert the rule.
   */
  addRule(selector, declarations, index) {
    if (index === undefined) {
      index = this.rules.length;
    }

    this.rules.splice(index, 0, {
      selector: selector,
      declarations: declarations,
    });
  }

  // ---

  /**
   * Creates or retrieves the style element for the stylesheet.
   * @return {HTMLStyleElement} The style element.
   */
  createStylesheet() {
    if (!this.stylesheet) {
      this.stylesheet = this.document.createElement('style');
    }

    return this.stylesheet;
  }

  isInDocument() {
    return this.document.contains(this.stylesheet);
  }

  /**
   * Retrieves the CSSStyleSheet object associated with a given DOM element or rule.
   * @param {HTMLElement|CSSRule} object - The DOM element or CSS rule to get the stylesheet from.
   * @throws {Error} Throws an error if the object type is unsupported.
   * @return {CSSStyleSheet|null} The associated CSSStyleSheet object, or null if not found.
   */
  getSheet(object) {
    // Get the CSSStyleSheet object associated with the owner element or rule
    switch (true) {
      case object instanceof HTMLLinkElement:
      case object instanceof HTMLStyleElement:
      case object instanceof SVGStyleElement:
      case object instanceof ProcessingInstruction && object.target === 'xml-stylesheet':
        return object.sheet;

      case object instanceof CSSImportRule:
        return object.styleSheet;

      default:
        throw new Error('Unsupported owner object for getting CSSStyleSheet.');
    }
  }

  deleteLastRule() {
    let ss = this.createStylesheet();
    let s_ = this.getSheet(ss);
    let rules = s_.cssRules;
    let lastRule = rules[rules.length - 1];
    s_.deleteRule(lastRule.index);
  }

  /**
   * Compiles the stylesheet into a style element.
   */
  compile() {
    let ss = this.createStylesheet();
    let s_ = this.getSheet(ss);

    style.setAttribute('type', 'text/css');

    this.CSS;

    // Add the CSS rules
    let allRules = this.rules.map(rule => {
      const { selector, declarations } = rule;

      declarations.map(([key, value]) => {
        let ruleString = `${key}: ${value}${value?.[1] ? ' !important' : ''}`;
        let style = `${selector} { ${ruleString} }`;
        s_.insertRule(style, s_.cssRules.length);
        return style;
      });

      return {
        [selector]: declarations,
      }
    });

    if (!this.isInDocument()) {
      this.document.head.appendChild(style);
    }

    return allRules;
  }

}

export { WTFStylesheet as default };
