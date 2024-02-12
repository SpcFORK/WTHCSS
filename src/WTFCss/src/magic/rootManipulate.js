import { cssVar } from '../functions/var.js'

// Getting a variable in CSS scope.
// window
//   .getComputedStyle(div)
//   .getPropertyValue('--example-var')

const Anoop = async () => {}

/**
 * Gets the root element of the document.
 * @returns {HTMLElement} The root element.
 */
const getRoot = _ => 
  document.documentElement;

/**
 * Gets the computed style of the root element.
 * @returns {CSSStyleDeclaration} The computed style object for the root element.
 */
const getRootStyle = _ => 
  window.getComputedStyle(getRoot())

/**
 * Retrieves a CSS property value from the root style.
 * @param {string} property The CSS property name.
 * @returns {string} The value of the CSS property.
 */
const getRootStyleProperty = property => getRootStyle().getPropertyValue(property)

/**
 * Retrieves a CSS property value from the root style with a fallback function.
 * @param {string} property The CSS property name.
 * @param {Function} [fallbackFn=Anoop] The fallback function to execute if the property is not found.
 * @returns {Promise<string>} The value of the CSS property or the result of the fallback function.
 */
const getRootStylePropertyWithFallback = async (property, fallbackFn = Anoop) => {
  let rs = getRootStyle()
  return rs.getPropertyValue(property) 
    || await fallbackFn(rs)
}

/**
 * Sets a CSS property on the root element.
 * @param {string} property The CSS property name to set.
 * @param {string} value The value to assign to the CSS property.
 */
const setRootProp = (property, value) => {
  const root = getRoot()
  root.style.setProperty(property, value)
}

const deleteRootProp = property => {
  const root = getRoot()
  root.style.removeProperty(property)
}

/**
 * Sets a CSS variable on the root element.
 * @param {string} property The name of the CSS variable to set.
 * @param {string} value The value to assign to the CSS variable.
 */
const setRootVar = (property, value) => {
  setRootProp(`--${property}`, value)
}

const deleteRootVar = property => {
  deleteRootProp(`--${property}`)
}

/**
 * Retrieves a CSS variable value from the root style.
 * @param {string} property The name of the CSS variable.
 * @returns {string} The value of the CSS variable.
 */
const getRootVar = property => getRootStyleProperty(`--${property}`)

/**
 * Sets a CSS property on a given element.
 * @param {HTMLElement} element The element on which to set the property.
 * @param {string} property The CSS property name to set.
 * @param {string} value The value to assign to the CSS property.
 */
const setCSSProp = (element, property, value) => window.getComputedStyle(element)
  .setProperty(property, value)

const deleteCSSProp = (element, property) => window.getComputedStyle(element)
  .removeProperty(property)

/**
 * Retrieves a CSS property value from a given element.
 * @param {HTMLElement} element The element from which to get the property.
 * @param {string} property The CSS property name.
 * @returns {string} The value of the CSS property.
 */
const getCSSProp = (element, property) => window.getComputedStyle(element)
  .getPropertyValue(property)

/**
 * Retrieves a CSS variable value from a given element.
 * @param {HTMLElement} element The element from which to get the variable.
 * @param {string} property The name of the CSS variable.
 * @returns {string} The value of the CSS variable.
 */
const getCSSVar = (element, property) => getCSSProp(element, `--${property}`)

/**
 * Sets a CSS variable on a given element.
 * @param {HTMLElement} element The element on which to set the variable.
 * @param {string} property The name of the CSS variable to set.
 * @param {string} value The value to assign to the CSS variable.
 */
const setCSSVar = (element, property, value) => setCSSProp(element, `--${property}` , value)

/**
 * Removes a CSS variable from a given element.
 * @param {HTMLElement} element The element from which to remove the variable.
 * @param {string} property The name of the CSS variable to remove.
 */
const deleteCSSVar = (element, property) => deleteCSSProp(element, `--${property}`)

// ---
var runningCSS_Evals = 0;

/**
 * Evaluates a CSS property by temporarily applying it to the root and retrieving its computed value.
 * @param {string} css The CSS property value to evaluate.
 * @returns {string} The computed value of the CSS property.
 */
const evalCSSProp = css => {
  const name = 'eval-css-' + runningCSS_Evals;
  ++runningCSS_Evals;
  setRootVar(name, css)
  
  let res = getRootVar(name)
  --runningCSS_Evals;
  deleteRootVar(name)

  return res;
}

const evalCSSHard = (rule, css) => CSSStyleValue.parse(rule, css)

const createCounter = (element, property, var_) => {
  element.style.setProperty(property, `counter(${var_})`)
  element.style.setProperty('counter-reset', `${var_} ${cssVar(var_)}`)
  return element.style.getPropertyValue(property)
}

/**
 * Creates a custom CSS property with a given name and optional parameters.
 * If the browser is Firefox, the property is set on the root element instead.
 * @param {string} name The name of the CSS property to create.
 * @param {Object} [data={}] Additional parameters for the property, such as syntax and initialValue.
 * @param {boolean} [inherits=false] Whether the property should be inherited by descendant elements.
 */
const createProperty = (name, data = {}, inherits = false) => {
  // Is firefox?
  let isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (!isFF) {
    CSS.registerProperty({
      name,
      syntax: data?.syntax || "<color>",
      inherits: inherits || false,
      initialValue: data?.initialValue || "#c0ffee",
    })
  } else {
    setRootVar(name, data?.initialValue || "#c0ffee")
  }
}

export default {
  getRoot,
  getRootStyle,
  getRootStyleProperty,
  getRootStylePropertyWithFallback,
  setRootProp,
  deleteRootProp,
  setRootVar,
  deleteRootVar,
  getRootVar,
  setCSSProp,
  deleteCSSProp,
  getCSSProp,
  getCSSVar,
  setCSSVar,
  deleteCSSVar,

  evalCSSProp,
  evalCSSHard,
  
  createProperty,
  createCounter,
}