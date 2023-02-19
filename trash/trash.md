------------------------------------------ SINGLELISTING.MJS -----------------
/\*\*

- Function that gets one single listing based on ID
- @param {number} id
- @returns single listing
  \*/

export async function getListing(id) {
if (!id) {
throw new Error("Requires ID");
}

const singleListingURL = `${API_URL}${action}/${id}${author}`;

const response = await authFetch(singleListingURL);

return await response.json();
}

/\*\*

- Function that shows a single listing
  \*/

export async function getSingleListing() {
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const listing = await getListing(id);
const singleListingContainer = document.querySelector("#singleListing");
templates.renderListingTemplate(listing, singleListingContainer);
}

---------------------------------- SINGLELISTING TEMPLATE ---------------

/\*\*

- Makes the HTML for a single listing
  \*/

export function singleListingTemplate(title, description, endsAt, bids, media) {
const listingTemplate = `

  <div class="card mt-3">
    <div class="d-flex justify-content-between p-2 px-3">
        <div class="d-flex flex-row align-items-center">
                <img src="https://picsum.photos/200/300" />
                <div class="d-flex flex-column ml-2 p-2">
                    <span class="font-wigth-bold"></span>
                </div>
            </div>
        </div>
        <img src="${media}" class="img-fluid" />
        <div class="p-2">
            <h4 class="card-text">${title}</h4>
            <p class="text-justify">${description}</p>
        <p>${endsAt}</p>
        <p>${bids}</p>
    </div>
  </div>`;

return listingTemplate;
}

/\*\*

- Displays the single post
- @param {string} listingData
- @param {string} parent
  \*/
  export function renderListingTemplate(listingData, parent) {
  parent.append(singleListingTemplate(listingData));
  }

import { API_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import \* as templates from "../../templates/index.mjs";
//import { load } from "../../storage/index.mjs";

const action = "/listings";
const author = "?\_seller=true&\_bids=true&\_active=true&sort=created";

/\*\*

- Function that gets one single listing based on ID
- @param {number} id
- @returns single listing
  \*/

export async function getListing(id) {
if (!id) {
throw new Error("Requires ID");
}

const singleListingURL = `${API_URL}${action}/${id}${author}`;

const response = await authFetch(singleListingURL);

console.log(response);
return await response.json();
}

/\*\*

- Function that shows a single listing
  \*/

export async function getSingleListing() {
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const listing = await getListing(id);
const seller = listing.seller.name;
const { name } = load("profile");
const bidContainer = document.querySelector("#bidContainer");
const deleteEdit = document.querySelector("#deleteEdit");
if (seller === name) {
bidContainer.classList.add("visually-hidden");
deleteEdit.classList.remove("visually-hidden");
}

const singleListingContainer = document.querySelector("#singleListing");
templates.renderListingTemplate(listing, singleListingContainer);
}
