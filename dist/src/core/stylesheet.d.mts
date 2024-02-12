import helpers from '../helpers/index.mjs';
import keywords from '../keywords/index.mjs';
import functions from '../functions/index.mjs';
import handles from '../handles/index.mjs';
import magic from '../magic/index.mjs';
import '../helpers/@charset.mjs';
import '../helpers/@colorprofile.mjs';
import '../helpers/@container.mjs';
import '../helpers/@property.mjs';
import '../helpers/@counterstyle.mjs';
import '../helpers/@fontface.mjs';
import '../helpers/@fontfeaturevalues.mjs';
import '../helpers/@fontpalletevalues.mjs';
import '../helpers/@import.mjs';
import '../helpers/@keyframes.mjs';
import '../helpers/@layer.mjs';
import '../helpers/@media.mjs';
import '../helpers/@namespace.mjs';
import '../helpers/@page.mjs';
import '../helpers/@startingstyle.mjs';
import '../helpers/@supports.mjs';
import '../keywords/types.mjs';
import '../keywords/important.mjs';
import '../functions/abs.mjs';
import '../functions/acos.mjs';
import '../functions/asin.mjs';
import '../functions/atan.mjs';
import '../functions/atan2.mjs';
import '../functions/attr.mjs';
import '../functions/calc.mjs';
import '../functions/clamp.mjs';
import '../functions/cos.mjs';
import '../functions/counter.mjs';
import '../functions/counters.mjs';
import '../functions/crossfade.mjs';
import '../functions/element.mjs';
import '../functions/env.mjs';
import '../functions/exp.mjs';
import '../functions/fitcontent.mjs';
import '../functions/hypot.mjs';
import '../functions/log.mjs';
import '../functions/max.mjs';
import '../functions/min.mjs';
import '../functions/minmax.mjs';
import '../functions/mod.mjs';
import '../functions/path.mjs';
import '../functions/pow.mjs';
import '../functions/ray.mjs';
import '../functions/rem.mjs';
import '../functions/repeat.mjs';
import '../functions/round.mjs';
import '../functions/sign.mjs';
import '../functions/sin.mjs';
import '../functions/sqrt.mjs';
import '../functions/symbols.mjs';
import '../functions/tan.mjs';
import '../functions/url.mjs';
import '../functions/var.mjs';
import '../handles/or.gate.mjs';
import '../magic/rootManipulate.mjs';

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
