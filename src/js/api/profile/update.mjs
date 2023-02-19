import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";
import { API_URL } from "../constants.mjs";

const action = "/profiles";
const method = "put";

/**
 * Function to edit the users profile information (banner and avatar)
 * @param {string} profileData
 * @returns
 */
export async function updateProfile(profileData) {
  const { name } = load("profile");

  if (!name) {
    throw new Error("Requires a name");
  }
  const updateProfileURL = `${API_URL}${action}/${name}/media`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  return await response.json();
}
