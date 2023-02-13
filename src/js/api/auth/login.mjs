import { API_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

/**
 * Logging in the user and sends of profile information to the localstorage.
 * @param {string} profile - input information
 */

export async function login(profile) {
  const loginURL = API_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const { accessToken, ...user } = await response.json();

  storage.save("token", accessToken);

  storage.save("profile", user);

  if (!accessToken) {
    alert("The user is NOT registered");
  } else {
    location.href = "/pages/profile";
  }
}
