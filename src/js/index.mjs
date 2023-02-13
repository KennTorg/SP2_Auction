import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

if (path === "/pages/login/") {
  listeners.setLoginFormListener();
} else if (path === "/pages/register/") {
  listeners.setRegisterFormListener();
}
