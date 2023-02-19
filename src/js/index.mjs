import * as listeners from "./handlers/index.mjs";
import * as listings from "./api/listings/index.mjs";
import * as profile from "./api/profile/index.mjs";

//import * as templates from "./templates/index.mjs";

const path = location.pathname;

if (path === "/pages/login/") {
  listeners.setLoginFormListener();
} else if (path === "/pages/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/") {
  listings.listingFeed();
} else if (path === "/pages/listing/") {
  listings.getSingleListing();
} else if (path === "/pages/profile/") {
  profile.profileInformation();
  //profile.getProfile();
  listeners.changeAvatarListener();
  //profile.updateProfile();
}
