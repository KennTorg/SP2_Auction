import { load } from "../storage/index.mjs";

/**
 * Sets the headers.
 * @returns token
 */

export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Authorization fetch for create, read, delete and update.
 * @param {string} url
 * @param {object} options
 */

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
