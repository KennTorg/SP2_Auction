/**
 * Function to change avatar.
 */

import { load, save } from "../storage/index.mjs";
import { changeAvatar, getProfile } from "../api/profile/index.mjs";

export async function changeAvatarListener() {
  const input = document.querySelector("#input-for-changeAvatar");
  const avatarMedia = document.querySelector("#userAvatar");
  const userName = document.querySelector("#userName");

  if (input) {
    const { name } = load("profile");
    const avatar = load("avatar");

    avatarMedia.src = avatar;
    userName.innerText = name;

    const profile = await getProfile(name);
    input.avatar.value = profile.avatar;

    input.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = event.target;
      const formData = new FormData(input);
      const avatar = Object.fromEntries(formData.entries());
      save("avatar", input.avatar.value);

      changeAvatar(avatar);
      location.reload();
    });
  }
}
