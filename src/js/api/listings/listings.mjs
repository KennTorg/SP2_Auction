import { API_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import * as templates from "../../templates/index.mjs";
//import { load } from "../storage/index.mjs";

const action = "/listings";
const author = "?_seller=true&_bids=true&_active=true&sort=created";

/**
 * Gets defaults numbers of listings
 * @returns 100 posts
 */

export async function getListings() {
  const getListingsURL = `${API_URL}${action}${author}`;

  const response = await authFetch(getListingsURL);

  return await response.json();
}

/**
 * Gets the listing with ID from the API.
 * @param {number} id of the the listing.
 * @returns a single listing.
 */

export async function getListing(id) {
  if (!id) {
    throw new Error("Requires listID");
  }
  const getListingURL = `${API_URL}${action}/${id}${author}`;

  const response = await authFetch(getListingURL);

  const listing = await response.json();

  return listing;
}

/**
 * Displays the Listings on homepage
 */

export async function listingFeed() {
  const listings = await getListings();
  const container = document.querySelector("#listings");
  templates.renderListingTemplates(listings, container);
}

/**
 * displays singlePost on /listing/index.html
 */

export const getSingleListing = async () => {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const listing = await getListing(id);
  const singleListingContainer = document.querySelector("#singleListing");
  templates.renderListingTemplate(listing, singleListingContainer);
};
