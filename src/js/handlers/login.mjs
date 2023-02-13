import { login } from "../api/auth/login.mjs";

/**
 * Listener for login
 */

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Send to the API
      login(profile);
    });
  }
}
