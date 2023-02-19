/**
- Makes the HTML for a single listing
*/

//import { listingTemplates } from "./listingTemplates.mjs";

export function singleListingTemplate(title, description, endsAt, bids, media) {
  const listingTemplate = `<div class="card mt-3">
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

/**
- Displays the single post
- @param {string} listingData
- @param {string} parent
*/

export function renderListingTemplate(listingData, parent) {
  parent.append(singleListingTemplate(listingData));
}
