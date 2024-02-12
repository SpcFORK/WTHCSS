/**
 * Retrieves a CSS environment variable value, with an optional fallback.
 * @param {string} variable - The name of the environment variable.
 * @param {string} [fallback] - The fallback value if the environment variable is not set.
 * @returns {string} The constructed CSS env() function string.
 */
export const env = (variable, fallback) => {
  const envVar = `env(${variable}${fallback ? `, ${fallback}` : ''})`;
  return envVar;
};

// Provides a mechanism to retrieve environment variables for CSS
/**
 * Represents safe area insets for CSS environment variables.
 */
export const safeAreaInsets = {
  top: (fallback) => env('safe-area-inset-top', fallback),
  right: (fallback) => env('safe-area-inset-right', fallback),
  bottom: (fallback) => env('safe-area-inset-bottom', fallback),
  left: (fallback) => env('safe-area-inset-left', fallback)
};

/**
 * Represents title bar area for CSS environment variables.
 */
export const titlebarArea = {
  x: (fallback) => env('titlebar-area-x', fallback),
  y: (fallback) => env('titlebar-area-y', fallback),
  width: (fallback) => env('titlebar-area-width', fallback),
  height: (fallback) => env('titlebar-area-height', fallback)
};

/**
 * Represents keyboard insets for CSS environment variables.
 */
export const keyboardInset = {
  top: (fallback) => env('keyboard-inset-top', fallback),
  right: (fallback) => env('keyboard-inset-right', fallback),
  bottom: (fallback) => env('keyboard-inset-bottom', fallback),
  left: (fallback) => env('keyboard-inset-left', fallback),
  width: (fallback) => env('keyboard-inset-width', fallback),
  height: (fallback) => env('keyboard-inset-height', fallback)
};

export default {
  env,
  safeAreaInsets,
  titlebarArea,
  keyboardInset
}