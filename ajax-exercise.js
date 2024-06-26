import axios from "axios";

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  const url = "https://dog.ceo/api/breeds/image/random";
  axios.get(url).then((res) => {
    const dogImage = res.data.message;
    document.querySelector("#dog-image").innerHTML = `<img src = ${dogImage}>`;
  });
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
}

document
  .querySelector("#get-dog-image")
  .addEventListener("click", showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector("#zipcode-field").value;
  const url = `/weather.txt?zipcode=${zipcode}`;
  const res = await axios.get(url);
  document.querySelector("#weather-info").innerText = res.data;
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document
  .querySelector("#weather-button")
  .addEventListener("click", showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault();
  const cookieType = document.querySelector("#cookie-type-field").value;
  const qty = document.querySelector("#qty-field").value;
  const res = await axios.post("/order-cookies.json", {
    cookieType: cookieType,
    qty: qty,
  });

  const orderStatusDiv = document.querySelector("#order-status");
  orderStatusDiv.innerText = res.data.message;
  if (res.data.resultCode === "ERROR") {
    orderStatusDiv.classList.add("order-error");
  } else {
    orderStatusDiv.classList.remove("order-error");
  }
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector("#order-form").addEventListener("submit", orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  const formData = { term: searchTerm };
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  const res = await axios.get(url);
  console.log(res);
  let displayString = "";
  for (const result of res.data.results) {
    displayString += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`;
  }
  document.querySelector("#itunes-results").innerHTML = displayString;
  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document
  .querySelector("#itunes-search-form")
  .addEventListener("submit", iTunesSearch);
