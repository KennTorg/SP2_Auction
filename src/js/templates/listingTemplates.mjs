/**
 * Creates HTML for list of posts on /pages/profile/.
 * @param {string} listingData
 */

export function listingTemplate(listingData) {
  const { title, media, id, endsAt, bids } = listingData;

  // Listing Card
  const cardClass = document.createElement("div");
  cardClass.classList = "col-lg-4 col-md-6 col-sm-12";

  const listing = document.createElement("div");
  listing.classList = "card mt-3";

  const card = document.createElement("a");
  card.setAttribute("href", `/pages/listing/?id=${id}`);
  listing.append(card);

  // CARD HEADER
  const cardHeader = document.createElement("div");
  cardHeader.classList = "card mt-5 box-shadow";

  // card media
  const cardMedia = document.createElement("img");
  cardMedia.classList = "card-img-top card-img";
  cardMedia.onerror = "https://picsum.photos/200/300";
  const image = media.length
    ? media[0]
    : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=996";
  cardMedia.src = image;
  cardMedia.alt = `Image of ${title}`;

  // CARD BODY
  const cardBody = document.createElement("div");
  cardBody.classList = "card-body";
  listing.append(cardBody);

  const listingTitle = document.createElement("h5");
  listingTitle.classList = "card-title text-center";
  if (!title) {
    listingTitle.innerText = "Missing Title";
  } else {
    listingTitle.innerText = title;
  }

  //Card bottom
  const cardBottom = document.createElement("div");
  cardBottom.classList = "d-flex justify-content-around mt-3";

  //the content in the second half of card
  const lastBid = document.createElement("button");
  lastBid.classList = "btn btn-success btn-small";
  lastBid.innerText = "No bids yet";

  if (bids) {
    for (var i = 0; i < bids.length; i++) {
      if (bids.length > 1) {
        bids.sort((firstBid, secondBid) => firstBid.amount - secondBid.amount);
      }
      lastBid.classList = "btn btn-success btn-small";
      lastBid.innerText = `$ ${bids[i].amount}`;
    }
  }

  const listingEnds = document.createElement("p");
  listingEnds.innerHTML =
    "Closes at:" + `<br>` + new Date(endsAt).toLocaleDateString();

  cardBottom.append(lastBid, listingEnds);

  card.append(cardHeader, cardMedia, cardBody);

  return card;
}

export function renderListingTemplates(listingDataList, parent) {
  parent.append(...listingDataList.map(listingTemplate));
}
