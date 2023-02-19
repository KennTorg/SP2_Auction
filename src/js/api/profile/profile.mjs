import { API_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";

const action = "/profiles";
//const author = "?_seller=true&_count=true&_bids=true&_listings=true";

/**
 * Authenticates the user with authFetch
 * @param { string } name
 */

export async function getProfile(name) {
  if (!name) {
    throw new Error("Requires a name");
  }

  const profileURL = `${API_URL}${action}/${name}`;

  const response = await authFetch(profileURL);

  return await response.json();
}

/**
 * Function that shows the user information
 */

export async function profileInformation() {
  const userName = document.querySelector("#userName");
  const userAvatar = document.querySelector("#userAvatar");
  const userCredits = document.querySelector("#userCredit");
  const userBids = document.querySelector("#userBids");
  const userListings = document.querySelector("#userNumberListings");
  const profileListings = document.querySelector("#profileListings");

  const { name } = load("profile");
  const avatar = load("avatar");

  const user = await getProfile(name);
  userName.innerText = name;
  userAvatar.src = avatar;
  userCredits.innerText = user.credits;

  // User bids number
  const bids = await getProfile(name + "/bids");
  if (bids.length === 0) {
    userBids.innerText = "0 bids";
  } else {
    for (let i = 0; i < bids.length; i++) {
      if (i === 3) {
        break;
      }
      userBids.innerHTML += `<a href="/pages/profile/?id=${
        bids[i].listing.id
      }" class="btn btn-success m-2">
      ${bids[i].listing.title} <br>
      Bid made: $${bids[i].amount} </br>
      Ends: ${new Date(bids[i].created).toLocaleDateString()}
    </a>`;
    }
  }

  // Profile listings
  const listings = await getProfile(name + "/listings");

  if (listings.length === null) {
    userListings.innerHTML = "0 listings";
  } else {
    let sum = 0;
    for (let i = 0; i < listings.length; i++) {
      userListings.innerHTML = sum = listings.length;

      let endsAt = new Date(listings[i].endsAt).toLocaleDateString();
      const image = listings[i].media.length
        ? `<img 
      src="${listings[i].media[0]}" class="mb-2 card-img-top"
      onerror="this.src='https://cdn.pixabay.com/photo/2016/09/29/02/15/hand-1701969__340.jpg';"
      alt="Image for ${listings[i].title}"
      />`
        : `<img src="https://cdn.pixabay.com/photo/2016/09/29/02/15/hand-1701969__340.jpg" 
      class="mb-2 card-img-top" 
      alt="Obs, no image found"`;

      profileListings.innerHTML += `
          <a href="/pages/profile/?id=${listings[i].id}" class="small-card bg-secondary card m-3">
          ${image}
          <div class="d-flex justify-content-between p-3">
            <div class="d-flex flex-column">
                <h5>${listings[i].title}</h5>
            </div>
                <span>Closes at: <br> ${endsAt}</span>
            </div>
          </a>`;
    }
  }
}

/**
 * Redirects user to change avatar modal
 */

export function changeAvatar() {
  const userData = load("profile");
  const { name } = userData;
  const changeAvatar = document.querySelector("#change-avatar");
  changeAvatar.addEventListener(
    "click",
    () => (changeAvatar.href = `/pages/profile/?name=${name}`)
  );
}
