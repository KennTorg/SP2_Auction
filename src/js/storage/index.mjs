/**
 * saves the user information to localstorage.
 * @param {string} key - description
 * @param {object} value - values
 */

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * loads the information stored in localstorage.
 * -- || --
 */

export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * deletes the user information from localstorage.
 * -- || --
 */

export function remove(key) {
  localStorage.removeItem(key);
}
